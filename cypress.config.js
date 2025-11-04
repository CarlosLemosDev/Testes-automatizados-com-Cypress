const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // URL padrão para mocks
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 1,
      openMode: 0
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    watchForFileChanges: false,
    experimentalSourceRewriting: true,
    setupNodeEvents(on, config) {
      // Configuração baseada no ambiente
      if (config.env.USE_MOCK) {
        config.baseUrl = 'http://localhost:3000';
      } else if (config.env.LOCAL) {
        config.baseUrl = 'http://localhost/prestashop';
      } else {
        config.baseUrl = 'http://automationpractice.pl';
      }

      // Configurações do Chrome para todos os ambientes
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--disable-site-isolation-trials');
          launchOptions.args.push('--ignore-certificate-errors');
        }
        return launchOptions;
      });

      return config;
    }
  }
});
