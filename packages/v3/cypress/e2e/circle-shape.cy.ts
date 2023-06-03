describe('CircleShape component', () => {
  it('should contain a circle shape with 5 points', function () {
    cy.visit('/');
    cy.get('button[name=circle]').click();
    cy.get('[aria-label=Map]').within(() => {
      cy.get(
        'div > div > [style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"] > div > div'
      ).should('have.length', 5);
    });
  });
});
