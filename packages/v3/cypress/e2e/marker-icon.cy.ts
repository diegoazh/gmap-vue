describe('MarkerIcon component', () => {
  it('should ', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('.gmv-map').find('map').should('have.length', 2);
  });
});
