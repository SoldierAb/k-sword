import { upload } from '../src'

Object.defineProperty(window, 'XMLHttpRequest', {
  writable: true
})

describe('upload ', () => {
  it('基本使用', () => {
    const res = {
        code: 1,
        msg: 'success'
    }
    let xhrMock = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      onreadystatechange: jest.fn(),
      send: jest.fn(),
      readyState: 4,
      responseText: JSON.stringify(res),
      status: 200
    }
    // @ts-ignore
    window.XMLHttpRequest = jest.fn(() => xhrMock)
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    })
    const data = {
      name: 'upload'
    }
    const headers = {
      Token:'asdfsfJKJFDhsdaHsadfsaHJjjkliuecxadsdKJsdfKHJHK_L'
    }
    upload({
      headers,
      file,
      action: 'http://example.com',
      data,
      onProgress: () => { },
      onSuccess: (result: any) => {
        expect(result).toStrictEqual(res)
      },
      onError: () => { }
    })
  })

})
