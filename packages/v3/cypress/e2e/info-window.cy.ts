/* eslint-disable @typescript-eslint/no-unused-expressions */
describe('InfoWindow component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('button[name=info-window]').click();
    cy.get('.gmv-map').should('exist');
    cy.get('.gm-style').should('be.visible');
  });

  it('should click on the 3 clickable markers and display a different text on the info-window when each of it is clicked', function () {
    cy.get('[role=button]', { timeout: 8000 }).each((el) => {
      cy.wrap(el).click({ force: true });
      cy.get('strong')
        .invoke('text')
        .then((txt) => {
          const regex = /Marker\s\d/;
          expect(regex.test(txt)).to.be.true;
        });
    });
  });

  it('should move a shared open info-window when clicking different markers', function () {
    cy.get('[aria-label="Marker 1"]', { timeout: 8000 }).click({
      force: true,
    });
    cy.contains('strong', 'Marker 1')
      .should('be.visible')
      .then(($markerContent) => {
        const firstRect = $markerContent[0].getBoundingClientRect();

        cy.get('[aria-label="Marker 2"]').click({ force: true });
        cy.contains('strong', 'Marker 2').should(($movedMarkerContent) => {
          const movedRect = $movedMarkerContent[0].getBoundingClientRect();

          const movedHorizontally =
            Math.round(movedRect.left) !== Math.round(firstRect.left);
          const movedVertically =
            Math.round(movedRect.top) !== Math.round(firstRect.top);

          expect(
            movedHorizontally || movedVertically,
            'info-window content screen position changed',
          ).to.be.true;
        });
      });
  });
});
