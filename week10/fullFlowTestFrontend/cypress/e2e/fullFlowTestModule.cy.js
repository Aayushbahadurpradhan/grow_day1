/// <reference types="cypress" />
/* global describe, it, cy, expect */
describe('Full Auth Flow', () => {
    it('Login ➝ Dashboard ➝ Protected Route', () => {
        cy.visit('/');
        cy.get('input').first().type('user@example.com');
        cy.get('input[type="password"]').type('123456');
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');
        cy.contains('Welcome, Test User');
    });

    it('Access protected route without login ➝ redirect to 403', () => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/dashboard');
        cy.url().should('include', '/unauthorized');
        cy.contains('403');
    });

    it('Forgot Password ➝ Email Sent ➝ Reset Link', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.visit('/forgot-password');
        cy.get('input').type('user@example.com');
        cy.contains('Send Reset Link').click();

        cy.visit('/reset-password');
        cy.get('input[type="password"]').type('newpass123');
        cy.get('button').contains('Reset Password').click();
        cy.wrap(null).then(() => {
            expect(alertStub.getCall(0)).to.be.calledWith('Password reset email sent!');
            expect(alertStub.getCall(1)).to.be.calledWith('Password successfully reset');
        });

        cy.url().should('include', '/');
    });
    it('SessionStorage contains auth data after login', () => {
        cy.visit('/');
        cy.get('input').first().type('user@example.com');
        cy.get('input[type="password"]').type('123456');
        cy.get('button').contains('Login').click();
        cy.wait(300);

        cy.window().then((win) => {
            const userStr = win.sessionStorage.getItem('user');
            const token = win.sessionStorage.getItem('token');
            const user = userStr ? JSON.parse(userStr) : null;
            expect(user).to.have.property('email', 'user@example.com');
            expect(token).to.eq('fake-jwt-token');
        });
    });

});
