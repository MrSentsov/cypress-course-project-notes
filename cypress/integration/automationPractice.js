
describe(
    "My First Test Suite",
    () => {

        it(
            "Selects a checkbox",
            () => {
                cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
                cy.get("#checkBoxOption1").check()
                    .should("be.checked")
                    .and(
                        "have.value",
                        "option1"
                    )
                // When should is called add assertions with .and; "be" - behavior; "have" - property
                cy.get("#checkBoxOption1").uncheck()
                    .should("not.be.checked")
                cy.get("input[type='checkbox']").check([
                    "option1",
                    "option2",
                    "option3"
                ])
                // .check can select based on value
            }
        )

        it(
            "Selects a static dropbox item",
            () => {
                cy.get("select").select("option2")
                    .should(
                        "have.value",
                        "option2"
                    )
            }
        )

        it(
            "Selects a dynamic dropdown",
            () => {
                cy.get("#autocomplete").type("Af")
                // Iterates until text is found
                cy.get(".ui-menu-item div").each(($e1, index, $list) => {
                    if ($e1.text() === "South Africa") {
                        $e1.click()
                    }
                })
                cy.get("#autocomplete").should(
                    "have.value",
                    "South Africa"
                )
            }
        )

        it(
            "Handles visable and invisable elements",
            () => {
                cy.get("#displayed-text").should("be.visible")
                cy.get("#hide-textbox").click()
                cy.get("#displayed-text").should("not.be.visible")
                cy.get("#show-textbox").click()
                cy.get("#displayed-text").should("be.visible")
            }
        )

        it(
            "Selects a radio button",
            () => {
                cy.get("[value=\"radio2\"]").check()
                    .should("be.checked")
            }
        )

        it(
            "Handles an alert",
            () => {
                cy.get("#alertbtn").click()
                cy.get("[value=\"Confirm\"]").click()
                // The on method fires an event and yields the output
                cy.on(
                    "window:alert",
                    (str) => {
                        // Mocha
                        expect(str).to.equal("Hello , share this practice page and share your knowledge")
                    }
                )
                cy.on(
                    "window:confirm",
                    (str) => {
                        expect(str).to.equal("Hello , Are you sure you want to confirm?")
                    }
                )
            }
        )

        it(
            "Handles a child tab",
            () => {
                // Invokes a jQuerry function
                cy.get("#opentab").invoke(
                    "removeAttr",
                    "target"
                )
                    .click()
                cy.url().should(
                    "include",
                    "https://www.rahulshettyacademy.com/#/index"
                )
                cy.go("back")
            }
        )

        it(
            "Handles a web table",
            () => {
                cy.get("tr td:nth-child(2)").each(($e1, index, $list) => {
                    const text = $e1.text()

                    if (text.includes("SQL")) {
                        cy.get("tr td:nth-child(2)").eq(index)
                            .next()
                            // .text is jQuarry, so the promise should be resolved with .then
                            .then((price) => {
                                const priceText = price.text()

                                expect(priceText).to.equal("25")
                            })

                    }
                })
            }
        )

    }
)
