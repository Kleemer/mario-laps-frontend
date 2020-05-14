export const toPath = (path?: string | null): string => {
  return '/api' + (path ? path.replace(/^(\w)/, '/$1') : '')
}
