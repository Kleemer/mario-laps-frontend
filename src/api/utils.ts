export const toPath = (path?: string | null): string =>
  '/api' + (path ? path.replace(/^(\w)/, '/$1') : '')
