import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../../components/Blog'

test('初期状態ではブログのタイトルだけが表示されていること', () => {
  const blog = {
    title: "mission street",
    author: "はこざる",
    url: "https://hakozaru.com",
    likes: 10
  }
  const updateMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlogs={updateMockHandler} deleteBlogs={deleteMockHandler}/>
  )

  const btn = component.container.getElementsByClassName('test-btn')[0]

  // コンポーネント全体の表示
  component.debug()
  // コンポーネント内の一部の要素をデバッグプリントするには
  // btn.debug() これはできないので、prettyDOMを使って以下のようにする
  console.log(prettyDOM(btn))

  expect(component.container).toHaveTextContent('mission street')
  expect(component.container).not.toHaveTextContent('はこざる')
  expect(component.container).not.toHaveTextContent("https://hakozaru.com")
  expect(component.container).not.toHaveTextContent("10")
})

test('viewボタンをクリックすると、詳細情報が表示される', () => {
  const blog = {
    title: "mission street",
    author: "はこざる",
    url: "https://hakozaru.com",
    likes: 10
  }
  const updateMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlogs={updateMockHandler} deleteBlogs={deleteMockHandler}/>
  )

  const btn = component.container.getElementsByClassName('test-btn')[0]
  fireEvent.click(btn)

  expect(component.container).toHaveTextContent('mission street')
  expect(component.container).toHaveTextContent('はこざる')
  expect(component.container).toHaveTextContent("https://hakozaru.com")
  expect(component.container).toHaveTextContent("10")
})
