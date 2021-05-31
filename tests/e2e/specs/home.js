// https://docs.cypress.io/api/introduction/api.html

describe('Homepage initial load', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('header', 'Chicago Horrors')
  })
})
