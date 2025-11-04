// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Sobrescreve o comando visit para ser mais resiliente
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const opts = {
    retryOnStatusCodeFailure: true,
    retryOnNetworkFailure: true,
    timeout: 30000,
    ...options,
  }

  return originalFn(url, opts)
})

// Adiciona retry para comandos de clique
Cypress.Commands.overwrite('click', (originalFn, element, options = {}) => {
  const opts = {
    timeout: 10000,
    retries: 3,
    ...options,
  }

  return Cypress._.times(opts.retries, (attempts) => {
    return originalFn(element, opts).catch((error) => {
      if (attempts === opts.retries - 1) {
        throw error
      }
      return cy.wait(1000) // Espera 1 segundo entre tentativas
    })
  })
})

// Comando para lidar com elementos que podem levar tempo para carregar
Cypress.Commands.add('getWithRetry', (selector, options = {}) => {
  const opts = {
    timeout: 10000,
    interval: 500,
    ...options,
  }

  return cy.get(selector, { timeout: opts.timeout }).should('exist')
})
