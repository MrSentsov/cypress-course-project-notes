
describe(
    "My test file for practicing API testing with cypress",
    // eslint-disable-next-line max-lines-per-function
    () => {
        it(
            "Mocking a response",
            () => {
                cy.visit("https://www.rahulshettyacademy.com/angularAppdemo/")
                // Cy.intercept({request object JSON}, {response object JSON}) is a common format
                // Mocking a response
                cy.intercept(
                    {
                        "method": "GET",
                        "url": "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty"
                    },

                    {
                        "statusCode": 200,
                        "body": [
                            {
                                "book_name": "RestAssured with Java",
                                "isbn": "RSU",
                                "aisle": "2301"
                            }
                        ]
                    }
                ).as("courseList")
                // Since test-execution is syncronous, after cypress sees the call, it intercepts.
                cy.get("button[class='btn btn-primary']").click()
                cy.wait("@courseList").should(({request, response}) => {
                    cy.get("tr").should(
                        "have.length",
                        response.body.length + 1
                    )
                })
                // Waits to resolve promise because of async, and verifies that all body items are displayed.d
                cy.get("p").should("be.visible")
                    .and(
                        "have.text",
                        "Oops only 1 Book available"
                    )
            }
        )

        it(
            "Mocking a request",
            () => {
                cy.visit("https://www.rahulshettyacademy.com/angularAppdemo/")
                cy.intercept(
                    "GET",
                    "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
                    (req) => {
                        req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=Andrey"
                        // Mocking the HTTP request
                        req.continue((res) => {
                            expect(res.statusCode).to.equal(404)
                        })
                    }
                ).as("mockRequest")

                cy.get("button[class='btn btn-primary']").click()
                cy.wait("@mockRequest")
            }
        )
    }
)
