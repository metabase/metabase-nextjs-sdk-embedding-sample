const TIMEOUT_MS = 40000;

[
  {
    name: "next-sample-app-router",
    baseUrl: Cypress.env("BASE_URL_APP_ROUTER"),
  },
  {
    name: "next-sample-pages-router",
    baseUrl: Cypress.env("BASE_URL_PAGES_ROUTER"),
  },
].forEach(({ name, baseUrl }) => {
  describe(`Embedding SDK: ${name} compatibility`, () => {
    beforeEach(() => {
      Cypress.config("baseUrl", baseUrl);
    });

    it("should open a Static Question", () => {
      cy.visit({
        url: "/static-question",
      });

      cy.findByTestId("visualization-root", { timeout: TIMEOUT_MS }).should(
        "exist",
      );
    });

    it("should open an Interactive Question", () => {
      cy.visit({
        url: "/interactive-question",
      });

      cy.findByText("Orders + People", { timeout: TIMEOUT_MS }).should("exist");
      cy.findByTestId("interactive-question-result-toolbar").should("exist");
      cy.findByTestId("visualization-root").should("exist");
    });

    it("should open a Static Dashboard", () => {
      cy.visit({
        url: "/static-dashboard",
      });

      sdkRoot().should("exist");
      sdkRoot().within(() => {
        cy.findByRole("heading", { name: "Static Dashboard Example" }).should(
          "exist",
        );

        cy.findByRole("heading", {
          name: "E-commerce Insights",
          timeout: TIMEOUT_MS,
        }).should("exist");

        cy.findByTestId("fixed-width-filters").should("exist");

        cy.findByTestId("dashboard-grid").should("exist");
      });
    });

    it("should open an Interactive Dashboard", () => {
      cy.visit({
        url: "/interactive-dashboard",
      });

      sdkRoot().should("exist");
      sdkRoot().within(() => {
        cy.findByRole("heading", {
          name: "Interactive Dashboard Example",
        }).should("exist");

        cy.findByRole("heading", {
          name: "E-commerce Insights",
          timeout: TIMEOUT_MS,
        }).should("exist");

        cy.findByTestId("fixed-width-filters").should("exist");

        cy.findByTestId("dashboard-grid").should("exist");
      });
    });
  });
});

function sdkRoot() {
  return cy.get("#metabase-sdk-root", { timeout: TIMEOUT_MS });
}
