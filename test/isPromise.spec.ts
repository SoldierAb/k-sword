import { isPromise } from '../src'

describe('isPromise', () => {
  it('不像 Promise', () => {
    for (const value of [
      '',
      null,
      undefined,
      1,
      /dd/,
      {},
      [],
      async () => 1,
      Map,
    ]) {
      expect(isPromise(value)).toBe(false)
    }
  })

  it('像 Promise', () => {
    for (const value of [
      { then: () => 1 },
      Promise.resolve(),
      (async () => true)(),
    ]) {
      expect(isPromise(value)).toBe(true)
    }
  })
})
