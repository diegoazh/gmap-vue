describe('KmlLayer component', () => {
  it('should have a kml icon in the map', function () {
    cy.visit('/');
    cy.get('button[name=kml-layer]').click();
    cy.get('.gmv-map').should('exist');
    cy.get('.gm-style').should('be.visible');
    cy.get('.gmv-map-container').should('be.visible');
    cy.window().should((win) => {
      expect(win.__gmvKmlLayerDebug__?.isReady).to.eq(true);
      expect(win.__gmvKmlLayerDebug__?.url).to.include('westcampus.kml');
    });
  });
});
