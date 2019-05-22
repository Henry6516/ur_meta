import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(access_token) {
  return Cookies.set(TokenKey, access_token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setBackendDebug() {
  return Cookies.set('Cookies', 'XDEBUG_SESSION=PHPSTORM')
}
