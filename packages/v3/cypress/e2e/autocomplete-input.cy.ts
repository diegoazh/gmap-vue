describe('AutocompleteInput component', () => {
  it('should set a marker on the selected place', function () {
    const search = 'la serranita';

    cy.visit('/');
    cy.get('button[name=autocomplete]').click();
    cy.get('.gmv-map').should('exist');
    cy.get('.gm-style').should('be.visible');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    const input = () => cy.get('input');
    input().type(search);
    cy.get('.pac-item').first().click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get('#use-place-btn').click();
    cy.get('.gmv-map').find('.GMAMP-maps-pin-view').should('have.length', 1);
  });
});
