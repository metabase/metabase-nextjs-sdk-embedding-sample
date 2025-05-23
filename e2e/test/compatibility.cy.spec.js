const TIMEOUT_MS = 20000;

[
  {
    name: "next-sample-app-router",
    baseUrl: Cypress.env("BASE_URL_APP_ROUTER"),
  },
  {
    name: "next-sample-pages-router",
    baseUrl: Cypress.env("BASE_URL_PAGES_ROUTER"),
  }
].forEach(({name, baseUrl}) => {
  describe(`Embedding SDK: ${name} compatibility`, () => {
    beforeEach(() => {
      Cypress.config("baseUrl", baseUrl);
    });

    it("should open a Static Question", () => {
      cy.visit({
        url: "/static-question",
      });

      expect(cy.findByTestId("visualization-root", {timeout: TIMEOUT_MS}).should("exist"));
    });

    it("should open an Interactive Question", () => {
      cy.visit({
        url: "/interactive-question",
      });

      expect(cy.findByText("Orders + People", {timeout: TIMEOUT_MS}).should("exist"));

      expect(cy.findByTestId("interactive-question-result-toolbar").should("exist"));

      expect(cy.findByTestId("visualization-root").should("exist"));
    });

    it("should open a Static Dashboard", () => {
      cy.visit({
        url: "/static-dashboard",
      });

      expect(cy.findByTestId("embed-frame", {timeout: TIMEOUT_MS}).should("exist"));
      cy.findByTestId("embed-frame", {timeout: TIMEOUT_MS}).within(() => {
        cy.findByTestId("embed-frame-header").should("exist");

        cy.findByText("E-commerce Insights").should("exist");

        cy.findByTestId("fixed-width-filters").should("exist");

        cy.findByTestId("dashboard-grid").should("exist");
      });
    });

    it("should open an Interactive Dashboard", () => {
      cy.visit({
        url: "/interactive-dashboard",
      });

      expect(cy.findByTestId("embed-frame", {timeout: TIMEOUT_MS}).should("exist"));
      cy.findByTestId("embed-frame", {timeout: TIMEOUT_MS}).within(() => {
        cy.findByTestId("embed-frame-header").should("exist");

        cy.findByText("E-commerce Insights").should("exist");

        cy.findByTestId("fixed-width-filters").should("exist");

        cy.findByTestId("dashboard-grid").should("exist");
      });
    });

    it.only("should download an Interactive Dashboard", () => {
      cy.visit({
        url: "/interactive-dashboard",
      });

      expect(cy.findByTestId("embed-frame", {timeout: TIMEOUT_MS}).should("exist"));
      cy.findByTestId("embed-frame", {timeout: TIMEOUT_MS}).within(() => {
        cy.findByTestId("fixed-width-dashboard-header").within(() => {
          cy.get('button svg.Icon-download, button svg.Icon-document').first().click();
        });

        cy.readFile('cypress/downloads/E-commerce Insights.pdf', {timeout: TIMEOUT_MS}).should('exist');
      });
    });
  });
});
