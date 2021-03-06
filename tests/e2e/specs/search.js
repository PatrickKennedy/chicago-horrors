// https://docs.cypress.io/api/introduction/api.html

describe('Search Behavior', () => {
  beforeEach(() => {
    cy.intercept('cwig-ma7x').as('api')
    // dunno why, but Cypress wouldn't let the request from Axios in the browser through without this
    cy.visit('/')
  })

  it('Displays options when focused', () => {
    cy.get('.autocomplete-container').as('autocomplete')
    cy.get('input')
      .first()
      .as('searchBox')
      .click()

    cy.get('@autocomplete')
      .find('.autocomplete-list')
      .should('be.visible')
      .contains('canvas')
  })

  it('Performs search', () => {
    cy.get('.autocomplete-container').as('autocomplete')
    cy.get('input')
      .first()
      .as('searchBox')
      .type('canvas')

    cy.wait('@api')
    cy.get('@searchBox')
      .type('{enter}')
      .type('{enter}')

    cy.get('.search-result')
      .first()
      .should('be.visible')
  })
})
