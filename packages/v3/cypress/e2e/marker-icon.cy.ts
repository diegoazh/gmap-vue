describe('MarkerIcon component', () => {
  it('should add 4 markers on the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('.gmv-map').find('map').should('have.length', 4);
  });

  it('should hide 2 markers from the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('#visibility').click();
    cy.get('.gmv-map').find('map').should('have.length', 2);
  });

  it('should make visible again the 2 hidden markers on the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('#visibility').click();
    cy.get('#visibility').click();
    cy.get('.gmv-map').find('map').should('have.length', 4);
  });

  it('should destroy 2 markers from the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('#visibility2').click();
    cy.get('.gmv-map').find('map').should('have.length', 2);
  });

  it('should re-build the 2 destroyed markers on the map', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('#visibility2').click();
    cy.get('#visibility2').click();
    cy.get('.gmv-map').find('map').should('have.length', 4);
  });

  it('should empty the markers array from the map removing 2 of the 4 markers', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('#empty').click();
    cy.get('.gmv-map').find('map').should('have.length', 2);
  });

  it('should fill the markers array from the map adding the 2 removed markers', function () {
    cy.visit('/');
    cy.get('button[name=marker]').click();
    cy.get('#empty').click();
    cy.get('#empty').click();
    cy.get('.gmv-map').find('map').should('have.length', 4);
  });
});
