/// <reference types="Cypress" />
describe('Verify that listener is able to log in', function()
{
    it("Visits the website", function()
    {
        cy.visit('https://sanomindadmin:admin!9@qa.sanomind.com/')
    })

    it("Clicks 'Log in'", function()
    {
        cy.get('.NavBar_header__menu__W24vL > :nth-child(4) > a')
            .click()
    })

    it('Enters listener email', function()
    {
        cy.readFile("cypress/to/../fixtures/listenerTestData.json")
            .then((str) => {
                cy.get("input[type=email]").last()
                  .type(str.email)
        })
    })

    it("Enters listener password", function()
    {
        cy.readFile("cypress/fixtures/listenerTestData.json")
            .then((str) =>{
                cy.get("input[type=password]").last()
                    .type(str.password)
            })
    })

    it("Clicks the 'Log in' button", function()
    {
        cy.get("button[type=submit]")
            .last()
            .click()
    })

    it("Verifies the URL", function()
    {
        cy.url().should('have.string', 'https://qa.sanomind.com/#')
    })
})