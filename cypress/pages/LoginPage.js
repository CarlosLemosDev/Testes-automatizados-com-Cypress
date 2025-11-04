class LoginPage {
    // Elementos da página - adaptados para funcionar em todos os ambientes
    elements = {
        emailInput: () => cy.get('[name="email"], #email'),
        passwordInput: () => cy.get('[name="passwd"], #passwd'),
        signInButton: () => cy.get('button[type="submit"], #SubmitLogin'),
        createAccountEmailInput: () => cy.get('#email_create'),
        createAccountButton: () => cy.get('#SubmitCreate'),
        errorMessage: () => cy.get('.alert-danger, div.alert.alert-danger'),
        errorList: () => cy.get('ol > li'),
        forgotPasswordLink: () => cy.get('.lost_password a'),
        accountInfo: () => cy.get('.info-account'),
        logoutButton: () => cy.get('.logout'),
        authenticationHeader: () => cy.get('.page-heading')
    }

    // Ações da página com tratamento para diferentes ambientes
    visit() {
        const url = '/index.php?controller=authentication&back=my-account';
        const baseConfig = {
            timeout: 30000,
            retryOnNetworkFailure: true,
            retryOnStatusCodeFailure: true
        };

        if (Cypress.env('USE_MOCK')) {
            cy.visit(url, baseConfig);
            // No ambiente mock, apenas verificamos se o formulário existe
            cy.get('form', { timeout: 10000 }).should('exist');
        } else {
            // No ambiente real, interceptamos as requisições
            cy.intercept('GET', '**/*.js').as('scripts');
            cy.intercept('GET', '**/*.css').as('styles');
            cy.intercept('GET', '**/authentication*').as('auth');
            
            cy.visit(url, {
                ...baseConfig,
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                },
                onBeforeLoad: (win) => {
                    Object.defineProperty(win.navigator, 'webdriver', {get: () => undefined});
                }
            });

            // Aguarda carregamento dos recursos principais
            if (!Cypress.env('USE_MOCK')) {
                cy.wait(['@auth'], { timeout: 30000 });
                cy.get('#login_form', { timeout: 20000 }).should('be.visible');
            }
        }
    }

    typeEmail(email) {
        this.elements.emailInput()
            .should('be.visible', { timeout: 10000 })
            .clear()
            .type(email, { force: true });
    }

    typePassword(password) {
        this.elements.passwordInput()
            .should('be.visible', { timeout: 10000 })
            .clear()
            .type(password, { force: true });
    }

    clickSignIn() {
        this.elements.signInButton()
            .should('be.visible', { timeout: 10000 })
            .click({ force: true });
    }

    login(email, password) {
        this.typeEmail(email);
        this.typePassword(password);
        this.clickSignIn();
    }

    typeCreateAccountEmail(email) {
        this.elements.createAccountEmailInput()
            .should('be.visible', { timeout: 10000 })
            .clear()
            .type(email, { force: true });
    }

    clickCreateAccount() {
        this.elements.createAccountButton()
            .should('be.visible', { timeout: 10000 })
            .click({ force: true });
    }

    clickForgotPassword() {
        this.elements.forgotPasswordLink()
            .should('be.visible', { timeout: 10000 })
            .click({ force: true });
    }

    getErrorMessage() {
        return this.elements.errorMessage();
    }

    getErrorList() {
        return this.elements.errorList();
    }

    getAccountInfo() {
        return this.elements.accountInfo();
    }

    logout() {
        this.elements.logoutButton()
            .should('be.visible', { timeout: 10000 })
            .click({ force: true });
    }
}

module.exports = { LoginPage };
