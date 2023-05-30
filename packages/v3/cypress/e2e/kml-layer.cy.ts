describe('KmlLayer component', () => {
  it('should have a kml icon in the map', function () {
    cy.visit('/');
    cy.get('button[name=kml-layer]').click();
  });
});
