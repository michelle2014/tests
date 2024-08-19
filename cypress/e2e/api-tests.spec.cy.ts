describe('API Tests', () => {

  // secret should be store in .env file, it's here only for the purpose of running the tests locally
  // by somesone else cloning the test repo, the key will be deleted later

  let apiKey = ''

  let wrongApiKey = ''

  let requestBody = {
    person: {
      id: 'a51eebec-033e-42ca-ac1b-7e937bf47580',
      name: 'Lyanna Moreton'
    },
  }

  it('use a get request to retrieve the record', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.login).to.eq('michelle2014')
      expect(response.body.type).to.eq('User')
    })
  })

  it('use a post request and handle 401', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.github.com/michelle2014',
      headers: {
        Authorization: 'Bearer ' + wrongApiKey,
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false,
      body: requestBody
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('use a post request and handle 404', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.github.com/michelle2010',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false,
      body: requestBody
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('should handle 500 Internal Server Error from httpbin', () => {
    cy.request({
      method: 'POST',
      url: 'https://httpbin.org/status/500',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('error', 'Internal Server Error');
      expect(response.body).to.have.property('message', 'Something went wrong.');
    })
  })
})
