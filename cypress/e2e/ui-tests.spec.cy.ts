describe('Browser UI Tests', () => {

  it('login and logout', () => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')
    cy.get('#email').type('michelle.codebetter@gmail.com')
    cy.get('#password').type('abcd1234')
    cy.get('#submit').click()
    cy.contains('Click on any contact to view the Contact Details').should('be.visible')

    cy.get('#logout').click()
  })

  it('create and update operations', () => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')
    cy.get('#email').type('michelle.codebetter@gmail.com')
    cy.get('#password').type('abcd1234')
    cy.get('#submit').click()

    // might need to verify first if the data to be created not existing
    // depends on different database reset configurations of the test environments

    cy.get('#add-contact').click()
    cy.get('#firstName').type('Miss{enter}')
    cy.get('#lastName').type('Fisher{enter}')
    cy.get('#submit').click()
    cy.contains('Miss Fisher')

    cy.get('td').contains('Miss Fisher').click()
    cy.get('#edit-contact').click()
    cy.get('#city').type('Brisbane{enter}')
    cy.get('button').contains('Submit').click({ force: true })
    cy.get('#return').click()
    cy.contains('Brisbane')

    // might need to delete the created data to reset data back to the original state
  })

  it.only('search functionaltiy', () => {
    // due to the test website performance, this test might be a bit flaky
    // it returns Nikolay instead of Michelle when search
    cy.visit('https://gh-users-search.netlify.app/')
    cy.get('[data-testid="search-bar"]').type('michelle')
    cy.get('button').contains('search').click({ force: true })

    cy.get('.sc-dkrFOg').within((el) => {
      expect(el.text()).to.contain('michelle')
    })
  })

  it('handle invalid inputs and checks for error message', () => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')
    cy.get('#email').type('michelle.codebetter@gmail.com')
    cy.get('#password').type('abcd1234')
    cy.get('#submit').click()

    cy.get('#add-contact').click()
    cy.get('#firstName').type('Miss{enter}')
    cy.get('#submit').click()
    cy.contains('Contact validation failed: lastName: Path `lastName` is required.').should('be.visible')
    cy.get('#firstName').clear()
    cy.get('#lastName').type('Michelle')
    cy.get('#submit').click()
    cy.contains('Contact validation failed: firstName: Path `firstName` is required.').should('be.visible')
  })
})
