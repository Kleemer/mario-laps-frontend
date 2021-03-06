export const first = (arr: any[]): any | null => {
  if (!arr.length) {
    return null
  }

  return arr[0]
}

export const last = <T>(arr?: T[]): T | null => {
  if (!arr?.length) {
    return null
  }

  return arr[arr.length - 1]
}
