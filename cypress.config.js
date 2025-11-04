const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://automationpractice.pl',
    chromeWebSecurity: false,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 40000,
    retries: {
      runMode: 3,
      openMode: 2
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    watchForFileChanges: false,
    testIsolation: false,
    failOnStatusCode: false
  },
});
