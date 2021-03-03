describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'test',
      name: 'test',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('ログイン', function() {
    it('正しいユーザー名とパスワードのときログインに成功すること', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#login-btn').click()

      cy.contains('ログインに成功しました')
      cy.contains('test logged in')
    })

    it('不正なユーザー名とパスワードのときログインに失敗すること', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('pwd')
      cy.get('#login-btn').click()

      cy.contains('ログインに失敗しました')
    })
  })

  describe.only('ログインしているとき', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login/', {
        username: 'test',
        password: 'password'
      }).then(res => {
        localStorage.setItem('bloglistAppUser', JSON.stringify(res.body))
        cy.visit('http://localhost:3001')
      })
    })

    it('ブログが作成できること', function() {
      cy.get('#new-blog-open').click()
      cy.get('.title-input').type('tst title')
      cy.get('.author-input').type('tst author')
      cy.get('.url-input').type('tst url')
      cy.get('#create-blog-btn').click()

      cy.contains('a new blog tst title by tst author')
      cy.get('.blog').should('have.length', 1)
    })
  })
})
