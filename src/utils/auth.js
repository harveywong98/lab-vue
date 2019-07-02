import Cookies from 'js-cookie'

const expires = 0.24

// USER_TOKEN
// USER_NAME

export function getCookie (key) {
  return Cookies.get(key)
}

export function setCookie (key, val) {
  return Cookies.set(key, val, { expires: expires })
}

export function removeCookie (key) {
  return Cookies.remove(key)
}
