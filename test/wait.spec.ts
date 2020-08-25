import { wait } from '../src/index'

describe(wait.name, () => {
  it('表现正常', async () => {
    const start = Date.now()
    await wait(110)
    const end = Date.now()
    expect(end - start >= 100).toBe(true)
  })

  it('可取消等待', async () => {
    const cb = jest.fn()
    const w = wait(100)
    w.then(cb)
    w.cancel()
    await wait(100)
    expect(cb).not.toBeCalled()
  })
})
