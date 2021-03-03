import { func } from "prop-types"

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
})
