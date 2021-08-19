describe(
    "It can perform API testing without UI",
    () => {
        it(
            "Tests API better than Postman",
            () => {
                // Making an API cy.request(method, URL, body if POST)
                // API testing with no UI
                cy.request(
                    "POST",
                    "http://216.10.245.166/Library/Addbook.php",
                    {
                        "name": "Bible",
                        "isbn": "BIBL",
                        "aisle": "100",
                        "author": "Holy Spirit"
                    }
                ).then((response) => {
                    expect(response.body).to.have.property(
                        "Msg",
                        "Add Book operation failed, looks like the book already exists"
                    )
                    expect.statusCode.to.equal(200)
                })
            }
        )
    }
)
