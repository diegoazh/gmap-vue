describe('RectangleShape component', () => {
  it('should contain a 2 rectangle shape with 8 points', function () {
    cy.visit('/');
    cy.get('button[name=rectangle]').click();
    cy.get('[aria-label=Map]').within(() => {
      cy.get(
        'div > div > [style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"] > div > div'
      ).should('have.length', 8);
    });
  });
});
