const TIMEOUT_MS = 20000;

Cypress.config('baseUrl', Cypress.env('BASE_URL_APP_ROUTER'))

describe("Embedding SDK: next-sample-app-router compatibility", () => {
  it("should open an Interactive Question", () => {
    cy.visit({
      url: "/interactive-question",
    });

    expect(cy.findByText("Orders + People", {timeout: TIMEOUT_MS}).should("exist"));
  });
});
