describe('InfoWindow component', () => {
  it('should click on the 3 clickable markers and display a different text on the info-window when each of it is clicked', function () {
    cy.visit('/');
    cy.get('button[name=info-window]').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(8000);
    cy.get('[aria-label=Map]').within(() => {
      cy.get('[role=button]', { timeout: 8000 }).each((el) => {
        cy.wrap(el).click({ force: true });
        cy.get('strong')
          .invoke('text')
          .then((txt) => {
            const regex = /Marker\s\d/;
            expect(regex.test(txt)).to.be.true;
          });
      });
    });
  });
});
