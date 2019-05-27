// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })



// I had problems with importing fixtures, so I hardcoded user details and locators
// in next iteration this will be fixed and rewritten in more fancy way...
Cypress.Commands.add('login', function() {
    // get baseURl from cypress.json
    cy.visit("/login")


    // Enter email and check email field when user types his email
    cy.get('#email_address')
        .type('ma1mddx@yahoo.com')
        .should("have.value", 'ma1mddx@yahoo.com');

    // Enter a password and check password field when user types his password
    cy.get('#password')
        .type('LetMeTestYou123')
        .should("have.value", 'LetMeTestYou123');

    // Click 'Login button'
    cy.get('#login')
        .submit()

    // check if user's profile is present
    cy.get('span.business_name')
        .should("be.visible")

    // click on given user profile
    cy.get('.business_url').click()

    // check if 'Dashboard' label is present
    cy.get('h1')
        .should("contain", 'Dashboard')
        .and("be.visible")
    

  })
