describe("Journal App", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should display the journal page", () => {
    cy.contains(new Date().toDateString().slice(4));
  });

  it("renders the body of the date", () => {
    cy.contains(new Date().getDate() + 1).click();
    cy.contains("Test");
    cy.contains("Lorium");
  });

  it("date with body should have a different color", () => {
    cy.contains(new Date().getDate() + 1).should(
      "have.css",
      "color",
      "rgb(25, 113, 194)"
    );
  });
  describe("UI features", () => {
    it("it should change the theme", () => {
      cy.get("#theme-toggle").click();
      cy.get("body").should(
        "have.css",
        "background-color",
        "rgb(255, 255, 255)"
      );
      cy.get("body").should("have.css", "color", "rgb(0, 0, 0)");
    });

    it("should change the accent color", () => {
      cy.get("#settings").click();
      cy.get("#violet").click();
      cy.contains(new Date().getDate() + 1).should(
        "have.css",
        "color",
        "rgb(103, 65, 217)"
      );
    });

    it("calendar button should hide and show the calendar", () => {
      cy.get("#calendar-button").click();
      cy.get("#calendar").should("not.exist");
      cy.get("#calendar-button").click();
      cy.get("#calendar").should("be.visible");
    });
  });
});
