class LoginPage {
    // Elementos da página
    elements = {
        emailInput: () => cy.get('#email'),
        passwordInput: () => cy.get('#passwd'),
        signInButton: () => cy.get('#SubmitLogin'),
        createAccountEmailInput: () => cy.get('#email_create'),
        createAccountButton: () => cy.get('#SubmitCreate'),
        errorMessage: () => cy.get('.alert-danger'),
        errorList: () => cy.get('ol > li'),
        forgotPasswordLink: () => cy.get('.lost_password a'),
        accountInfo: () => cy.get('.info-account'),
        logoutButton: () => cy.get('.logout'),
        authenticationHeader: () => cy.get('.page-heading')
    }

    // Ações da página
    visit() {
        cy.intercept('GET', '**/*.js').as('scripts')
        cy.intercept('GET', '**/*.css').as('styles')
        cy.intercept('GET', '**/authentication*').as('auth')
        
        cy.visit('/index.php?controller=authentication&back=my-account', {
            timeout: 30000,
            retryOnNetworkFailure: true,
            retryOnStatusCodeFailure: true,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            onBeforeLoad: (win) => {
                Object.defineProperty(win.navigator, 'webdriver', {get: () => undefined})
            }
        })

        // Aguarda carregamento dos recursos principais
        cy.wait(['@auth'], { timeout: 30000 })
        
        // Verifica se a página carregou corretamente
        cy.get('#login_form', { timeout: 20000 }).should('be.visible')
    }

    typeEmail(email) {
        this.elements.emailInput().should('be.visible', { timeout: 10000 }).type(email)
    }

    typePassword(password) {
        this.elements.passwordInput().should('be.visible', { timeout: 10000 }).type(password)
    }

    clickSignIn() {
        this.elements.signInButton().should('be.visible', { timeout: 10000 }).click()
    }

    login(email, password) {
        this.typeEmail(email)
        this.typePassword(password)
        this.clickSignIn()
    }

    typeCreateAccountEmail(email) {
        this.elements.createAccountEmailInput().should('be.visible', { timeout: 10000 }).type(email)
    }

    clickCreateAccount() {
        this.elements.createAccountButton().should('be.visible', { timeout: 10000 }).click()
    }

    clickForgotPassword() {
        this.elements.forgotPasswordLink().should('be.visible', { timeout: 10000 }).click()
    }

    getErrorMessage() {
        return this.elements.errorMessage()
    }

    getErrorList() {
        return this.elements.errorList()
    }

    getAccountInfo() {
        return this.elements.accountInfo()
    }

    logout() {
        this.elements.logoutButton().should('be.visible', { timeout: 10000 }).click()
    }
}

module.exports = { LoginPage }
