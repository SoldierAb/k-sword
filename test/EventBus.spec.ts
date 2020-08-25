import { EventBus } from '../src/index'

type Events = {
  enter: () => number
  success: () => any
  error: (payload: { message: string }) => any
}

describe(EventBus.name, () => {
  it('可订阅发布', () => {
    const bus = new EventBus<Events>()
    const enterCallback = jest.fn()
    bus.on('enter', enterCallback)
    bus.emit('enter')
    expect(enterCallback).toHaveBeenCalledTimes(1)
  })

  it('可取消订阅', () => {
    const bus = new EventBus<Events>()
    const enterCallback = jest.fn()
    const enterCallback2 = jest.fn()
    const enterCallback3 = jest.fn()
    bus.on('enter', enterCallback)
    const offCallback2 = bus.on('enter', enterCallback2)
    bus.on('enter', enterCallback3)
    bus.emit('enter')
    expect(enterCallback).toHaveBeenCalledTimes(1)
    expect(enterCallback2).toHaveBeenCalledTimes(1)
    expect(enterCallback3).toHaveBeenCalledTimes(1)
    offCallback2()
    bus.emit('enter')
    expect(enterCallback).toHaveBeenCalledTimes(2)
    expect(enterCallback2).toHaveBeenCalledTimes(1)
    expect(enterCallback3).toHaveBeenCalledTimes(2)
    bus.off('enter', enterCallback3)
    bus.emit('enter')
    expect(enterCallback).toHaveBeenCalledTimes(3)
    expect(enterCallback2).toHaveBeenCalledTimes(1)
    expect(enterCallback3).toHaveBeenCalledTimes(2)
    bus.off('enter')
    bus.emit('enter')
    expect(enterCallback).toHaveBeenCalledTimes(3)
    expect(enterCallback2).toHaveBeenCalledTimes(1)
    expect(enterCallback3).toHaveBeenCalledTimes(2)
  })

  it('可订阅发布多次', () => {
    const bus = new EventBus<Events>()
    const enterCallback = jest.fn()
    const enterCallback2 = jest.fn()
    bus.on('enter', enterCallback)
    bus.on('enter', enterCallback2)
    bus.emit('enter')
    bus.emit('enter')
    bus.emit('enter')
    expect(enterCallback).toHaveBeenCalledTimes(3)
    expect(enterCallback2).toHaveBeenCalledTimes(3)
  })

  it('可传递参数', () => {
    const bus = new EventBus<Events>()
    const errorCallback = jest.fn()
    bus.on('error', errorCallback)
    bus.emit('error', { message: 'unexpected error' })
    expect(errorCallback).toBeCalledWith({
      message: 'unexpected error',
    })
  })

  it('可只订阅一次', () => {
    const bus = new EventBus<Events>()
    const successCallback = jest.fn()
    bus.once('success', successCallback)
    bus.emit('success')
    bus.emit('success')
    bus.emit('success')
    bus.emit('success')
    expect(successCallback).toHaveBeenCalledTimes(1)
  })

  it('可获取订阅回调结果', () => {
    const bus = new EventBus<Events>()
    const enterCallback = jest.fn().mockImplementation(() => 1)
    const enterCallback2 = jest.fn().mockImplementation(() => 2)
    bus.on('enter', enterCallback)
    bus.on('enter', enterCallback2)
    const results = bus.emit('enter')
    expect(results).toEqual([1, 2])
  })
})
