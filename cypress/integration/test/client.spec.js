import client from "./../../../src/client";
/// <reference types="cypress" />

context("Client", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("subscribe", () => {
    client.subscribe();
  });

  it("publish", () => {
    client.publish("/", { data: "sample" });

    // https://on.cypress.io/its
  });

  it("event", () => {
    // our div is hidden in our script.js
    // $('.connectors-div').hide()
    // https://on.cypress.io/invoke
  });
});
