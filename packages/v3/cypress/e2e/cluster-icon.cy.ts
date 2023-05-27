describe('ClusterIcon component', () => {
  it('should have a cluster of 2 markers', function () {
    cy.visit('/');
    cy.get('button[name=cluster]').click();
    cy.get('[aria-label="Zoom out"]', { timeout: 3000 }).should('be.visible');
    cy.get('[aria-label="Zoom out"]').click();
    cy.get('[aria-label="Zoom out"]').click();
    cy.get('[aria-label="Zoom out"]').click();
    cy.get('[aria-label="Cluster of 2 markers"]').should(
      'have.attr',
      'title',
      'Cluster of 2 markers'
    );
  });
});
