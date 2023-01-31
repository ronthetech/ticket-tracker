/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate to the tickets page", () => {
    //start from the index page
    cy.visit("https://trackerx.vercel.app")

    // find a link with an href attribute containing "tickets" and click it
    cy.get("[href='/tickets']").click()

    // the new url should include "/tickets"
    cy.url().should("include", "/tickets")

    // the new page should contain an h1 with the text "Tickets"
    cy.get("h1").contains("Tickets")
  })
})

export {}
