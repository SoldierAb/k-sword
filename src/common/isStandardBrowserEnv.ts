export const isStandardBrowserEnv = () => {
  if (
    navigator &&
    (navigator.product === 'ReactNative' ||
      navigator.product === 'NativeScript' ||
      navigator.product === 'NS')
  ) {
    return false
  }

  return window && document
}
