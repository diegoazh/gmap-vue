describe('MarkerIcon component', () => {
  it('should add 2 markers on the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('.gmv-map').find('map').should('have.length', 2);
  });

  it('should remove all markers from the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('#visibility').click();
    cy.get('.gmv-map').find('map').should('have.length', 0);
  });

  it('should re-add all markers on the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('#visibility').click();
    cy.get('#visibility').click();
    cy.get('.gmv-map').find('map').should('have.length', 2);
  });
});
