describe('InfoWindow component', () => {
  it('should ', function () {
    cy.visit('/');
    cy.get('button[name=info-window]').click();
    cy.get('div[role=button]').each((el, index) => {
      cy.wrap(el).click();
      cy.get('strong').should('contain.text', `Marker ${index + 1}`);
    });
  });
});
