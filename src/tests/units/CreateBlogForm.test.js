import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import CreateBlogForm from '../../components/CreateBlogForm'

test('フォームに入力された情報が正しく送信されること', () => {
  const handleCreate = jest.fn()
  const component = render(
    <CreateBlogForm handleCreate={handleCreate} />
  )

  const titleInput = component.container.querySelector('.title-input')
  const authorInput = component.container.querySelector('.author-input')
  const urlInput = component.container.querySelector('.url-input')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { target: { value: 'テストタイトル' } })
  fireEvent.change(authorInput, { target: { value: 'テスト著者' } })
  fireEvent.change(urlInput, { target: { value: 'テストURL' } })

  console.log(prettyDOM(titleInput))

  fireEvent.submit(form)

  console.log(handleCreate.mock.calls[0][0])

  expect(handleCreate.mock.calls).toHaveLength(1)
  expect(handleCreate.mock.calls[0][0].title).toBe('テストタイトル')
  expect(handleCreate.mock.calls[0][0].author).toBe('テスト著者')
  expect(handleCreate.mock.calls[0][0].url).toBe('テストURL')
})
