/// <reference types="cypress" />

describe('Testing', () => {

  it('says hey', () => {
    cy.visit('http://localhost:3000/')
    
    cy.contains('Hey')
  })

  it('can go to socials', () => {
    cy.visit('http://localhost:3000/')

    cy.get('a[href="/socials/"] img').click()

    cy.url().should('eq', 'http://localhost:3000/socials/')
  })

  it('can go back', () => {
    cy.visit('http://localhost:3000/more/')

    cy.get('header a[href="/"] span').click()
    
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('has a working terminal', () => {
    cy.visit('http://localhost:3000/more/')

    cy.get('body').trigger('keydown', { altKey: true, code: 'KeyT' })

    cy.get('div form input[type="text"]').type('adri', { force: true })
    cy.get('div form').submit()
    cy.contains('ly <3')
  })

  it('shows 404 page', () => {
    cy.visit('http://localhost:3000/' + Math.random(), { failOnStatusCode: false })

    cy.contains('404')
  })

  it('shows rainbow ice card', () => {
    cy.visit('http://localhost:3000/')

    cy.get('img[src="/assets/v6/cards/regenbogenice.webp"]')
  })

  it('shows terminal on button press', () => {
    cy.visit('http://localhost:3000/')

    cy.get('a[href="/terminal/"] img').click()

    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('div form input[type="text"]')
  })

  it('has a contact page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('a[href="/contact/"] img').click()

    cy.url().should('eq', 'http://localhost:3000/contact/')
  })

  it('has a working socials page', () => {
    cy.visit('http://localhost:3000/socials/')

    cy.contains('Socials')
    cy.contains('Twitter')
    cy.contains('Discord')
    cy.contains('YouTube')

    cy.get('h1').click()
  })

})
