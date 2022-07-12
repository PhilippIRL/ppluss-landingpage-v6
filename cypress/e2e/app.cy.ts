/// <reference types="cypress" />

describe('App', () => {

  it('can handle term parameter', () => {
    cy.visit('http://localhost:3000/#term')
    
    cy.get('div form input[type="text"]')
  })

  it('can handle forcecommand parameter', () => {
    const randomValue = Math.random().toString().substring(2)

    cy.visit('http://localhost:3000/#forcecommand=' + randomValue)
    
    cy.contains(randomValue)
  })

  it('can handle old imprint paths', () => {
    cy.visit('http://localhost:3000/#modal=impressum')
    cy.url().should('contain', '/contact')

    cy.visit('http://localhost:3000/#modal=datenschutz')
    cy.url().should('contain', '/contact')
  })

})
