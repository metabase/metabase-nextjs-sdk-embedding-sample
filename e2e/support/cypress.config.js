const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: null,
    supportFile: 'e2e/support/cypress.js',
    specPattern: 'e2e/test/**/*.cy.spec.js',
    defaultBrowser: 'chrome',
    env: {
      BASE_URL_APP_ROUTER: `http://localhost:${process.env.CLIENT_PORT_APP_ROUTER}`,
      BASE_URL_PAGES_ROUTER: `http://localhost:${process.env.CLIENT_PORT_PAGES_ROUTER}`,
    }
  },
})
