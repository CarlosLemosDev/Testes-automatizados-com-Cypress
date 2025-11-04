// Comando para configurar os mocks de autenticação
Cypress.Commands.add('mockAuthRequests', () => {
  // Mock da página de login
  cy.intercept('GET', '**/authentication**', {
    statusCode: 200,
    fixture: 'mocks/login-page.json'
  }).as('loginPage')

  // Mock de login com sucesso
  cy.intercept('POST', '**/authentication**', (req) => {
    if (req.body.includes('email=user@test.com') && req.body.includes('passwd=password123')) {
      req.reply({
        statusCode: 200,
        fixture: 'mocks/auth-responses.json',
        headers: {
          'content-type': 'application/json',
        }
      })
    } else if (!req.body.includes('email=') || !req.body.includes('passwd=')) {
      req.reply({
        statusCode: 400,
        body: {
          errors: ['An email address required.']
        }
      })
    } else if (!req.body.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      req.reply({
        statusCode: 400,
        body: {
          errors: ['Invalid email address.']
        }
      })
    } else {
      req.reply({
        statusCode: 401,
        body: {
          errors: ['Authentication failed.']
        }
      })
    }
  }).as('auth')

  // Mock do redirecionamento após login
  cy.intercept('GET', '**/my-account**', {
    statusCode: 200,
    body: '<html><body><div class="info-account">Welcome to your account.</div></body></html>'
  }).as('myAccount')
})

// Comando para simular o ambiente do site
Cypress.Commands.add('mockWebsite', () => {
  cy.mockAuthRequests()
  
  // Mock de recursos estáticos
  cy.intercept('GET', '**/*.css', { statusCode: 200, body: '' })
  cy.intercept('GET', '**/*.js', { statusCode: 200, body: '' })
  cy.intercept('GET', '**/*.png', { statusCode: 200, body: '' })
  
  // Mock de outros endpoints necessários
  cy.intercept('GET', '**/password**', {
    statusCode: 200,
    body: '<html><body><h1>Forgot your password?</h1></body></html>'
  }).as('forgotPassword')
})
