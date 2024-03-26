import { DASHBOARD_NAME_FOR_CREATE } from "../../fixtures/sharedConstants";

describe("check dashboard functionality", () => {
  let dashboardID: string | null = null;

  before(() => {
    cy.visit("/");

    cy.intercept({
      method: "POST",
      url: "/dashboard",
    }).as("createDashboard");
  });

  it("should create dashboard", () => {
    cy.getByTestId("create-dashboard-btn").should("exist").click();

    cy.getByTestId("create-edit-dashboard-name-input")
      .should("exist")
      .type(DASHBOARD_NAME_FOR_CREATE);

    cy.getByTestId("create-dashboard-btn")
      .should("exist")
      .click({ force: true });

    cy.getByTestId("create-edit-dashboard-submit-btn")
      .should("exist")
      .click({ force: true });

    cy.wait("@createDashboard").then((interception) => {
      dashboardID = interception.response.body.id;
    });

    cy.getByTestId("dashboard-name-chip")
      .should("exist")
      .invoke("text")
      .should("eq", `Dashboard: ${DASHBOARD_NAME_FOR_CREATE}`);

    cy.getByTestId("dashboard-id-chip")
      .invoke("text")
      .then((text) => {
        expect(`ID: ${dashboardID}`).to.eq(text.trim());
      });
  });

  it("should find created dashboard", () => {
    cy.visit("/");
    cy.getByTestId("dashboard-input-id").type(dashboardID);
    cy.getByTestId("load-dashboard-btn").click();
  });
});
