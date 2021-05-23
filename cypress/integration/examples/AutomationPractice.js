/// <reference types="Cypress" />   
describe('My First Test Suite', function() 
{
it('Selects a checkbox', function()
{
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
    //when should is called add assertions with .and; "be" - behavior; "have" - property
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
    cy.get("input[type='checkbox']").check(['option1', 'option2', 'option3'])
    //.check can select based on "value"
})

it('Selects a static dropbox item', function()
{
    cy.get('select').select('option2').should('have.value', 'option2')
})

it('Selects a dynamic dropdown', function()
{
    cy.get('#autocomplete').type('Af')
    cy.get('.ui-menu-item div').each(($e1, index, $list) => {
        if($e1.text()==="South Africa")
        {
            $e1.click()
        }
    })
    cy.get('#autocomplete').should('have.value', 'South Africa')
})

it('Handles visable and invisable elements', function()
{
    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')
})

it('Selects a radio button', function()
{
    cy.get('[value="radio2"]').check().should('be.checked')
})

it('Handles an alert', function()
{
    cy.get('#alertbtn').click()
    cy.get('[value="Confirm"]').click()
    //the on method fires an event and yields
    cy.on('window:alert',(str) =>
    {   //all of the tests based on Mocha
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
    })
    cy.on('window:confirm', (str) =>
    {
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
    })
})

it('Handles a child tab', function()
{
    cy.get('#opentab').invoke('removeAttr', 'target').click()
    //invokes a jQuerry function
    cy.url().should('include', 'https://www.rahulshettyacademy.com/#/index')
    cy.go('back')
})

it('Handles a web table', function()
{
    cy.get('tr td:nth-child(2)').each(($e1, index, $list) =>
    {
        const text=$e1.text()
        if(text.includes('SQL')) 
        {
            cy.get('tr td:nth-child(2)').eq(index).next().then(function(price)
            //.text is jQuarry, so the promise should be resolved with .then
            {
                const priceText=price.text()
                expect(priceText).to.equal("25")
            })
            
        }
    })
})


})