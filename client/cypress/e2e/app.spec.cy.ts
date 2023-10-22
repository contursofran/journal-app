describe("Journal App", () => {
  it("should display the journal page", () => {
    cy.visit("http://localhost:3000");
    cy.contains(new Date().toDateString().slice(4));
  });

  describe("UI features", () => {
    it("date with body should have a different color", () => {
      cy.contains(25).should("have.css", "color", "rgb(25, 113, 194)");
    });

    it("it should change the theme", () => {
      cy.visit("http://localhost:3000");

      cy.get('[data-cy="theme-toggle"]').click();
      cy.get("body").should(
        "have.css",
        "background-color",
        "rgb(255, 255, 255)"
      );
      cy.get("body").should("have.css", "color", "rgb(0, 0, 0)");
    });

    it("should change the accent color", () => {
      cy.get('[data-cy="menu"]').click();
      cy.get('[data-cy="settings"]').click();
      cy.get('[data-cy="violet"]').click();
      cy.get(".mantine-Modal-close").click();
      cy.contains(25).should("have.css", "color", "rgb(132, 94, 247)");
    });

    it("calendar button should hide and show the calendar", () => {
      cy.get('[data-cy="calendar-button"]').click();
      cy.get("#calendar").should("not.exist");
      cy.get('[data-cy="calendar-button"]').click();
      cy.get("#calendar").should("be.visible");
    });

    it("renders the body of the date", () => {
      cy.contains(25).click();
      cy.contains("Test 3");
      cy.contains("Lorium");
    });

    it("changes editor body font size", () => {
      cy.contains("Lorium").should("have.css", "font-size", "16px");
      cy.get('[data-cy="menu"]').click();
      cy.get('[data-cy="settings"]').click();
      cy.get(".mantine-Slider-thumb").click();
      cy.get(".mantine-Slider-thumb")
        .should("have.attr", "aria-valuenow", "16")
        .type("{rightarrow}");
      cy.get(".mantine-Slider-thumb").should(
        "have.attr",
        "aria-valuenow",
        "18"
      );
      cy.get(".mantine-Modal-close").click();
      cy.contains("Lorium").should("have.css", "font-size", "18px");
    });
  });
});

export {};
