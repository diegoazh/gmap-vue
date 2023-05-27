describe('AutocompleteInput component', () => {
  it('should set a marker on the selected place', function () {
    const search = 'la serranita';

    cy.visit('/');
    cy.get('button[name=autocomplete]').click();
    const input = () => cy.get('.pac-target-input');
    input().type(`${search}`);
    cy.get('.pac-item').first().click();
    cy.get('.gmv-map').find('map').should('have.length', 1);
  });
});
