const TIMEOUT_MS = 40000;

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

    it("should download an Interactive Dashboard", () => {
      cy.visit({
        url: "/interactive-dashboard",
      });

      expect(cy.findByTestId("embed-frame", {timeout: TIMEOUT_MS}).should("exist"));
      cy.findByTestId("embed-frame", {timeout: TIMEOUT_MS}).within(() => {
        cy.findByTestId("fixed-width-dashboard-header").within(() => {
          // Different icons for 54 and 55
          cy.get('button svg.Icon-download, button svg.Icon-document').first().click();
        });

        cy.readFile('cypress/downloads/E-commerce Insights.pdf', {timeout: TIMEOUT_MS}).should('exist');
      });
    });

    it("should load a metabase locale", () => {
      cy.visit({
        url: "/interactive-question?locale=es",
      });

      expect(cy.findByText('Tabla', {timeout: TIMEOUT_MS}).should("exist"));
    });

    it("should load a moment locale", () => {
      cy.visit({
        url: "/interactive-question?locale=es",
      });

      cy.findByText('Filtro', {timeout: TIMEOUT_MS}).click();
      cy.get('[data-element-id="mantine-popover"]').within(() => {
        cy.findByText('Created At').click();
        cy.findByText(/(Fechas específicas…|Rango de fechas fijo…)/).click();
      })

      cy.findByTestId('date-filter-picker').within(() => {
        const monthName = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(new Date());

        cy.findByText(new RegExp(monthName, 'i')).should('exist');
      })
    });

    it("should load a dayjs locale", () => {
      cy.visit({
        url: "/interactive-question?locale=es",
      });

      cy.findByText('Filtro', {timeout: TIMEOUT_MS}).click();
      cy.get('[data-element-id="mantine-popover"]').within(() => {
        cy.findByText('Created At').click();
        // Different texts for 54 and 55
        cy.findByText(/(Fechas específicas…|Rango de fechas fijo…)/).click();
      })

      cy.findByTestId('date-filter-picker').within(() => {
        const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());

        cy.findByText(new RegExp(monthName, 'i')).should('exist');
      })
    });
  });
});
