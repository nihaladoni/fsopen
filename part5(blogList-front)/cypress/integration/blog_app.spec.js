describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.contains("login").click();
    cy.get("input:first").type("username");
    cy.get("input:last").type("password");
    cy.get("#login-button").click();
  });

  it("after login, page contains logged in ", function () {
    cy.contains("user logged in");
  });

  // it("front page contains longin butto", function () {
  //   cy.visit("http://localhost:3000");
  //   cy.contains("login").click();
  // });
});
