const { defineConfig } = require('cypress')
const path = require('path')

module.exports = defineConfig({
  e2e: {
    baseUrl: null,
    supportFile: path.resolve(path.join(__dirname, './cypress.js')),
    specPattern: path.resolve(path.join(__dirname, '../test/**/*.cy.spec.js')),
    defaultBrowser: process.env.CYPRESS_BROWSER ?? "chrome",
    retries: { runMode: 1, openMode: 0 },
    env: {
      BASE_URL_APP_ROUTER: `http://localhost:${process.env.CLIENT_PORT_APP_ROUTER}`,
      BASE_URL_PAGES_ROUTER: `http://localhost:${process.env.CLIENT_PORT_PAGES_ROUTER}`,
    }
  },
})
