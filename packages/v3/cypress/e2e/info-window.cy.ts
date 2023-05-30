describe('InfoWindow component', () => {
  it('should click on the 3 clickable markers and display a different text on the info-window when each of it is clicked', function () {
    cy.visit('/');
    cy.get('button[name=info-window]').click();
    cy.get('div[role=button]').each((el, index) => {
      cy.wrap(el).click();
      cy.get('strong').should('contain.text', `Marker ${index + 1}`);
    });
  });
});
