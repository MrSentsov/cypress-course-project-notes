/* eslint-disable no-undef */

describe(
    "Fills out a form using data called from a fixture file",
    () => {

        before(() => {
            // Runs one time before all of the tests in the block
            cy.fixture("testData").then((data) => {
                globalThis.data = data
            })
        })
        it(
            "visits a page for log in",
            () => {
                cy.visit("https://www.rahulshettyacademy.com/angularpractice/")
            }
        )
        it(
            "Fills out the form",
            () => {
                cy.get(":nth-child(1) > .form-control").type(globalThis.data.name)
                    .should(
                        "have.attr",
                        "minlength",
                        "2"
                    )
                cy.get("select#exampleFormControlSelect1").select(globalThis.data.gender)
                cy.get(":nth-child(4) > .ng-untouched").should(
                    "have.value",
                    globalThis.data.name
                )
                cy.get("#inlineRadio3").should("be.disabled")

            }
        )
        it(
            "Finds and adds Nokia to cart",
            () => {
                cy.get(":nth-child(2) > .nav-link").click()
                cy.findPhone("iphone")
            }
        )
    }
)
