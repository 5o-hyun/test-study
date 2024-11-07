describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");

    // 버튼이 존재하는지 검사
    // cy.get("[data-cy=deliveryBtn]").should("exist").as("deliveryBtn");
    cy.get("[data-cy=deliveryBtn]").should("be.visible").as("deliveryBtn");
    cy.get("[data-cy=pickupBtn]").should("be.visible").as("pickupBtn");

    // 존재하면, 클릭하고 food-type페이지로이동
    cy.get("@deliveryBtn").click();
    cy.url().should("include", "/food-type");
  });
});
