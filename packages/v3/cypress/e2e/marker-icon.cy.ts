type CypressMarkerWindow = Window & {
  __mapMarkers__?: unknown[];
  __gmvMarkerDebug__?: {
    isReady: boolean;
    expectedCount: number;
  };
};

function assertMarkerCount(expected: number): void {
  cy.window().should((win) => {
    const markerWindow = win as CypressMarkerWindow;
    expect(markerWindow.__gmvMarkerDebug__?.isReady).to.eq(true);
    expect(markerWindow.__gmvMarkerDebug__?.expectedCount).to.eq(expected);
    expect(markerWindow.__mapMarkers__).to.have.length(expected);
  });
}

describe('MarkerIcon component', () => {
  afterEach(() => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
  });

  it('should add 4 markers on the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('.gmv-map').should('exist');
    cy.get('.gm-style').should('be.visible');
    assertMarkerCount(4);
  });

  it('should hide 2 markers from the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('.gmv-map').should('exist');
    cy.get('.gm-style').should('be.visible');
    cy.get('#visibility2').click();
    assertMarkerCount(2);
  });

  it('should make visible again the 2 hidden markers on the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('.gmv-map').should('exist');
    cy.get('.gm-style').should('be.visible');
    cy.get('#visibility2').click();
    assertMarkerCount(2);
    cy.get('#visibility2').click();
    assertMarkerCount(4);
  });

  it('should clean the markers array from the map removing 2 of the 4 markers', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('.gmv-map').should('exist');
    cy.get('.gm-style').should('be.visible');
    cy.get('.gmv-map').should('be.visible');
    cy.get('#empty').click();
    assertMarkerCount(2);
  });

  it('should fill the markers array from the map adding the 2 removed markers', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('.gmv-map').should('exist');
    cy.get('.gm-style').should('be.visible');
    cy.get('#empty').click();
    assertMarkerCount(2);
    cy.get('#empty').click();
    assertMarkerCount(4);
  });
});
