export const SYMBOLS: string = '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ'

export const getRandomString = (length: number): string => {
  let uniqueId = ''

  for (let i = 0; i < length; i++) {
    uniqueId += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length))
  }

  return uniqueId
}
