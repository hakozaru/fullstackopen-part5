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

    describe('ブログ', function() {
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

    describe('likes', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'test', author: 'aut', url: 'https://hoge.com' })
      })
      it('likesを押すと1ずつ加算されること', function() {
        cy.get('.test-btn').click()
        cy.get('.blog').contains('0')
        cy.get('.blog').get('.likes-btn').click()
        cy.get('.blog').contains('1')
      })
    })

    describe('remove', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'test', author: 'aut', url: 'https://hoge.com' })
      })
      it('removeを押すとブログが削除されること', function() {
        cy.get('.test-btn').click()
        cy.get('.blog').contains('test')
        cy.get('.blog').get('.remove-btn').click()
        cy.get('.blog').should('have.length', 0)
      })
    })

    describe.only('並び順', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'test', author: 'aut', url: 'https://hoge.com' })
        cy.createBlog({ title: 'test2', author: 'aut2', url: 'https://hoge2.com' })
        cy.createBlog({ title: 'test3', author: 'aut3', url: 'https://hoge3.com' })
      })

      it('likesの多い順番に並ぶこと', function() {
        cy.get('.blog').get('.test-btn').last().click()
        cy.get('.blog').get('.likes-btn').click()

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('test3')
          cy.wrap(blogs[1]).contains('test')
          cy.wrap(blogs[2]).contains('test2')
        })
      })
    })
  })
})
