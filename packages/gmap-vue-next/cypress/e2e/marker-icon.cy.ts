describe('MarkerIcon component', () => {
  it('should ', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('.gmap-vue-map').find('map').should('have.length', 2);
  });
});
