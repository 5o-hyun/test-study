// cypress는 test 못씀 it만!
describe("로그인 화면", () => {
  it("사용자는 아이디와 비밀번호를 사용해서 로그인한다.", () => {
    // given - 로그인 페이지에 접근한다.
    cy.visit("/login");
    cy.get("[data-cy=emailInput]").as("emailInput");
    cy.get("[data-cy=passwordInput]").as("passwordInput");
    // when - 아이디,비번을 입력하고 로그인버튼을 클릭한다.
    //입력
    cy.get("@emailInput").type("test@email.com"); // get(@emailInput)은 위에 as 즉, alias를 접근할 수 있다.
    cy.get("@passwordInput").type("password");

    //입력이잘되었는지검증
    cy.get("@emailInput").invoke("val").should("eq", "test@email.com");
    cy.get("@passwordInput").invoke("val").should("eq", "password");

    //http mocking
    cy.intercept(
      {
        method: "POST",
        url: "/user/login",
      },
      { token: "Authorization" }
    ).as("login");

    //로그인버튼이존재하면클릭해라
    cy.get("[data-cy=loginButton").should("exist").click();
    // then - 로그인에 성공한다.
    cy.url().should("include", "http://localhost:5173/");
  });
});
