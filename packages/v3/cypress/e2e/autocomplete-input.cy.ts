type CypressAutocompleteWindow = Window & {
  console: Console;
  __mapMarkers__?: unknown[];
  __gmvAutocompleteDebug__?: {
    hasPlaceSelection: boolean;
    markerSyncReady: boolean;
  };
  __gmvGoogleDebug__?: {
    authFailure: boolean;
    consoleErrors: string[];
    consoleWarnings: string[];
    location?: string;
  };
  gm_authFailure?: () => void;
};

function installGoogleDebugHooks(win: CypressAutocompleteWindow) {
  win.__gmvGoogleDebug__ = {
    authFailure: false,
    consoleErrors: [],
    consoleWarnings: [],
    location: win.location.href,
  };

  const googleDebug = win.__gmvGoogleDebug__;

  win.gm_authFailure = () => {
    googleDebug.authFailure = true;
  };

  const originalError = win.console.error.bind(win.console);
  win.console.error = (...args: unknown[]) => {
    googleDebug.consoleErrors.push(String(args.join(' ')));
    originalError(...args);
  };

  const originalWarn = win.console.warn.bind(win.console);
  win.console.warn = (...args: unknown[]) => {
    googleDebug.consoleWarnings.push(String(args.join(' ')));
    originalWarn(...args);
  };
}

function getGoogleMapsConfigurationError(win: CypressAutocompleteWindow) {
  const debug = win.__gmvGoogleDebug__;
  const messages = [
    ...(debug?.consoleErrors ?? []),
    ...(debug?.consoleWarnings ?? []),
  ];
  const combinedMessage = messages.join('\n');

  if (debug?.authFailure) {
    return 'Google Maps authentication failed. Check the VITE_GOOGLE_API_KEY value and HTTP referrer restrictions.';
  }

  if (combinedMessage.includes('BillingNotEnabledMapError')) {
    return 'Google Maps billing is not enabled for VITE_GOOGLE_API_KEY. Check the Google Cloud billing account/payment method.';
  }

  if (combinedMessage.includes('ApiNotActivatedMapError')) {
    return 'A required Google Maps API is not enabled for VITE_GOOGLE_API_KEY. Enable Maps JavaScript API and Places API for the key project.';
  }

  if (combinedMessage.includes('RefererNotAllowedMapError')) {
    return 'The current test URL is not allowed by VITE_GOOGLE_API_KEY HTTP referrer restrictions. Allow http://localhost:4173/* for CI e2e.';
  }

  if (combinedMessage.includes('InvalidKeyMapError')) {
    return 'VITE_GOOGLE_API_KEY is invalid. Check the GitHub Actions secret value.';
  }

  return undefined;
}

function assertNoGoogleMapsConfigurationError(win: CypressAutocompleteWindow) {
  const configurationError = getGoogleMapsConfigurationError(win);

  expect(configurationError, configurationError).to.equal(undefined);
}

describe('AutocompleteInput component', () => {
  afterEach(function () {
    if (this.currentTest?.state !== 'failed') return;

    cy.window().then((win) => {
      const autocompleteWindow = win as CypressAutocompleteWindow;

      console.log(
        'Autocomplete Google debug:',
        JSON.stringify(autocompleteWindow.__gmvGoogleDebug__, null, 2),
      );
    });
  });

  it('should set a marker on the selected place', function () {
    const search = 'la serranita';

    cy.visit('/', {
      onBeforeLoad(win) {
        installGoogleDebugHooks(win as CypressAutocompleteWindow);
      },
    });
    cy.get('button[name=autocomplete]').click();
    cy.get('.gmv-map').should('exist');
    cy.get('.gm-style').should('be.visible');
    cy.window().should((win) => {
      assertNoGoogleMapsConfigurationError(win as CypressAutocompleteWindow);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    // Click the input to trigger a real pointer interaction — this sets
    // document.activeElement, which Google Places Autocomplete checks before
    // firing prediction requests. Using focus() alone dispatches a synthetic
    // event that does NOT reliably set document.activeElement in headless Electron.
    cy.get('input').should('be.visible').click();
    // 'pac-target-input' is added synchronously by Google's Autocomplete
    // constructor. If this assertion times out, the Autocomplete instance was
    // never attached to the input (initialization failure). If it passes,
    // initialization is fine and the problem is at the Places API response layer.
    cy.get('input').should('have.class', 'pac-target-input');
    // Delay between keystrokes gives the Places API time to react to each
    // character and return suggestions before the next one is typed.
    cy.get('input').type(search, { delay: 100 });
    cy.window().should((win) => {
      assertNoGoogleMapsConfigurationError(win as CypressAutocompleteWindow);
    });
    // Increased timeout: on CI the Places API response can take longer than 4 s
    cy.get('.pac-item', { timeout: 10000 }).first().click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get('#use-place-btn').click();
    cy.window().should((win) => {
      const autocompleteWindow = win as CypressAutocompleteWindow;
      expect(
        autocompleteWindow.__gmvAutocompleteDebug__?.hasPlaceSelection,
      ).to.eq(false);
      expect(
        autocompleteWindow.__gmvAutocompleteDebug__?.markerSyncReady,
      ).to.eq(true);
      expect(autocompleteWindow.__mapMarkers__).to.have.length(1);
    });
  });
});
