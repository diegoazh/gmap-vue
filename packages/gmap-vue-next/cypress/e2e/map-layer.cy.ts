// https://docs.cypress.io/api/introduction/api.html

import AUTWindow = Cypress.AUTWindow;

describe('MapLayer component', () => {
  it('visits the app root url', () => {
    const newCenter = { lat: -31.4196, lng: -64.1939 };
    cy.visit('/');
    cy.get('button[name=map]').click();
    cy.contains('h2', 'Test E2E: Map layer');
    cy.get('.gmv-map-container > .gmv-map > div');
    cy.get('.gmv-map-container > .gmv-map-hidden');
    cy.get('input[name=lat]')
      .clear()
      .type(`${newCenter.lat}`)
      .tab()
      .clear()
      .type(`${newCenter.lng}{enter}`)
      .tab();
    cy.window().then((win) => {
      const { google, GoogleMapsCallback, __gmc__ } = win as AUTWindow & {
        google: Record<any, any>;
        GoogleMapsCallback: string;
        __gmc__: { map: Record<any, any> };
      };
      const center = __gmc__.map.getCenter();
      const rawCenter = { lat: center.lat(), lng: center.lng() };

      expect(google).to.not.be.undefined;
      expect(typeof google).to.be.eq('object');
      expect(typeof GoogleMapsCallback).to.be.eq('function');
      expect(__gmc__).to.not.be.undefined;
      expect(typeof __gmc__).to.be.eq('object');
      expect(__gmc__.map).to.be.instanceof(google.maps.Map);
      expect(rawCenter.lat).to.be.eq(newCenter.lat);
      expect(rawCenter.lng).to.be.eq(newCenter.lng);
    });
  });
});
