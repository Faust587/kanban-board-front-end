describe("check dashboard functionality", () => {
  before(() => {
    cy.visit("/");
  });

  it("should create dashboard", () => {
    cy.getByTestId("dashboard-input-id").should("exist");
  });
});
