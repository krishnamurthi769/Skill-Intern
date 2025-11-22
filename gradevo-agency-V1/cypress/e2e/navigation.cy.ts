describe('Navigation', () => {
    it('should navigate to the contact page', () => {
        cy.visit('/');
        cy.contains('Start a Project').click();
        cy.url().should('include', '/contact');
        cy.contains('Get in Touch').should('be.visible');
    });
});
