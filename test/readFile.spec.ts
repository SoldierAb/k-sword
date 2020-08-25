import { readFile } from '../src'
import { TextDecoder, TextEncoder } from 'util'

describe(readFile.name, () => {
  it('text should work', async () => {
    const expectedText = 'vizier-utils'
    const actualText = await readFile(new File([expectedText], 'x')).text()
    expect(actualText).toBe(expectedText)
  })

  it('json should work', async () => {
    const expectedJson = { a: 1 }
    const actualJson = await readFile(
      new File([JSON.stringify(expectedJson)], 'x'),
    ).json<typeof expectedJson>()
    expect(actualJson).toEqual(expectedJson)
  })


  it('arrayBuffer should work', async () => {
    const expectedData = 'hello'
    const expectedArrayBuffer = new TextEncoder().encode(expectedData)
    const actualArrayBuffer = await readFile(
      new File([expectedArrayBuffer], 'x'),
    ).arrayBuffer()
    expect(new TextDecoder('utf-8').decode(actualArrayBuffer)).toBe(
      expectedData,
    )
  })
})
