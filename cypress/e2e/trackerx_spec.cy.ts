/// <reference types="cypress" />

describe("test", () => {
  it("Creating a new ticket", () => {
    cy.visit("https://trackerx.vercel.app")
    cy.contains("Get Started").click()
    cy.get("button").contains("Add").click()
    cy.get("input#subject").type("1st Cypress Test")
    cy.get("input#description").type("I am writing this with cypress!")
    cy.get("select#severity").select("Medium")
    // cy.get("input#assignee").type("Cypress")
    // cy.get("button").contains("Add").click()
    cy.get("input#assignee").type("Cypress{Enter}")
  })
})

// describe("test two", function () {
// 	it("passes", () => {
// 		cy.visit("https://trackerx.vercel.app")
// 	})
// })

export {}
