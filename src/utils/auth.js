const TokenKey = 'access_token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function removeToken() {
  return localStorage.remove(TokenKey)
}
