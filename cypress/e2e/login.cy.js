const { LoginPage } = require('../pages/LoginPage')

describe('Testes da Página de Login - Automation Practice', () => {
    const loginPage = new LoginPage()

    beforeEach(() => {
        // Configuração específica para ambiente mock
        if (Cypress.env('USE_MOCK')) {
            cy.intercept('GET', '/index.php?controller=authentication*').as('loginPage')
            cy.intercept('POST', '/index.php?controller=authentication', (req) => {
                if (req.body.includes('email=user@test.com') && req.body.includes('passwd=password123')) {
                    req.reply({
                        statusCode: 200,
                        body: {
                            authenticated: true,
                            customer: {
                                id: 1,
                                email: 'user@test.com',
                                firstname: 'John',
                                lastname: 'Doe',
                                logged: 1
                            },
                            hasError: false
                        }
                    })
                } else {
                    req.reply({
                        statusCode: 400,
                        body: {
                            authenticated: false,
                            errors: ['Authentication failed.'],
                            hasError: true
                        }
                    })
                }
            }).as('loginRequest')
        }
        loginPage.visit()
    })

    /**
     * Cenário: Login com credenciais válidas
     * • Dado que o usuário esteja na página de autenticação
     * • Quando inserir email e senha válidos
     * • Então deve ser redirecionado para sua conta
     */
    it('Deve fazer login com sucesso usando credenciais válidas', () => {
        // Configuração dos dados de teste
        const testData = {
            email: Cypress.env('USER_EMAIL') || 'user@test.com',
            password: Cypress.env('USER_PASSWORD') || 'password123'
        }

        // Ação de login
        loginPage.login(testData.email, testData.password)

        // Verificações
        cy.url().should('include', 'controller=my-account')
        loginPage.getAccountInfo()
            .should('be.visible')
            .and('contain', 'Welcome to your account')
    })

    /**
     * Cenário: Tentativa de login com email inválido
     * • Dado que o usuário esteja na página de autenticação
     * • Quando tentar fazer login com email em formato inválido
     * • Então deve ver mensagem de erro apropriada
     */
    it('Deve mostrar erro ao usar email inválido', () => {
        const invalidEmails = ['invalid.email', 'test@', '@test.com', 'test@test']
        
        invalidEmails.forEach(invalidEmail => {
            loginPage.login(invalidEmail, 'anypassword123')
            
            loginPage.getErrorMessage()
                .should('be.visible')
            loginPage.getErrorList()
                .should('contain', 'Invalid email address.')
        })
    })

    /**
     * Cenário: Tentativa de login com senha inválida
     * • Dado que o usuário esteja na página de autenticação
     * • Quando tentar fazer login com senha inválida
     * • Então deve ver mensagem de erro apropriada
     */
    it('Deve mostrar erro ao usar senha inválida', () => {
        loginPage.login('user@test.com', 'wrongpassword')
        
        loginPage.getErrorMessage()
            .should('be.visible')
        loginPage.getErrorList()
            .should('contain', 'Authentication failed.')
    })

    /**
     * Cenário: Tentativa de login com campos vazios
     * • Dado que o usuário esteja na página de autenticação
     * • Quando tentar fazer login sem preencher os campos
     * • Então deve ver mensagem sobre campos obrigatórios
     */
    it('Deve validar campos obrigatórios', () => {
        // Testa botão de login sem preencher campos
        loginPage.clickSignIn()
        loginPage.getErrorList()
            .should('contain', 'An email address required.')

        // Testa email preenchido mas sem senha
        loginPage.typeEmail('test@example.com')
        loginPage.clickSignIn()
        loginPage.getErrorList()
            .should('contain', 'Password is required.')
    })

    /**
     * Cenário: Processo de criação de conta
     * • Dado que o usuário esteja na página de autenticação
     * • Quando inserir email para nova conta
     * • Então deve ver formulário de criação
     */
    it('Deve iniciar processo de criação de conta', () => {
        const newEmail = `test_${Date.now()}@example.com`
        
        loginPage.typeCreateAccountEmail(newEmail)
        loginPage.clickCreateAccount()

        cy.get('#account-creation_form').should('be.visible')
        cy.get('h3').should('contain', 'Your personal information')
    })

    /**
     * Cenário: Acesso à recuperação de senha
     * • Dado que o usuário esteja na página de autenticação
     * • Quando clicar no link "Forgot your password?"
     * • Então deve ser redirecionado para recuperação
     */
    it('Deve acessar recuperação de senha', () => {
        loginPage.clickForgotPassword()

        cy.url().should('include', 'controller=password')
        cy.get('.page-subheading').should('contain', 'Forgot your password?')
    })
})
