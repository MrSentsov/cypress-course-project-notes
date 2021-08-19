/* eslint-disable cypress/no-unnecessary-waiting */

describe(
    "My First Test Suite",
    () => {

        it(
            "My First Test case",
            () => {

                cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
                // Cypress get acts like findElement of selenium
                cy.get(".search-keyword").type("ca")
                cy.wait(2000)
                cy.get(".product").should(
                    "have.length",
                    5
                )
                cy.get(".product:visible").should(
                    "have.length",
                    4
                )
                cy.get(".products").as("productLocator")
                cy.get("@productLocator").find(".product")
                    .should(
                        "have.length",
                        4
                    )
                // Parent child chaining
                cy.get(":nth-child(3) > .product-action > button").click()
                cy.get("@productLocator").find(".product")
                    .eq(2)
                    .contains("ADD TO CART")
                    .click()
                    .then(() => {
                        console.log("sf")
                    })

                cy.get("@productLocator").find(".product")
                    .each(($el, index, $list) => {

                        const textVeg = $el.find("h4.product-name").text()

                        if (textVeg.includes("Cashews")) {
                            $el.find("button").click()
                        }
                    })

                // Assert that logo text is correctly displayed
                cy.get(".brand").should(
                    "have.text",
                    "GREENKART"
                )

                // This is to print in logs
                cy.get(".brand").then((logoelement) => {
                    cy.log(logoelement.text())

                })
                describe(
                    "My Second Test Suite",
                    () => {

                        it(
                            "My FirstTest case",
                            () => {

                                cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
                                cy.get(".search-keyword").type("ca")
                                cy.wait(2000)
                                cy.get(".products").as("productLocator")
                                cy.get("@productLocator").find(".product")
                                    .each(($el, index, $list) => {

                                        const textVeg = $el.find("h4.product-name").text()

                                        if (textVeg.includes("Cashews")) {
                                            $el.find("button").click()
                                        }
                                    })
                                cy.get(".cart-icon > img").click()

                            }
                        )
                    }
                )

            }
        )

    }
)
