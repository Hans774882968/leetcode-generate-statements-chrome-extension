export function firstAlphaLower (s: string) {
  return s[0].toLowerCase() + s.substring(1)
}

export function firstAlphaUpper (s: string) {
  return s[0].toUpperCase() + s.substring(1)
}

export function getParamsStringFromArr (a: Array<any>) {
  const s = JSON.stringify(a)
  return s.substring(1, s.length - 1)
}

export function dbg (...args:any[]) {
  console.log('%c<leetcode-generate-statements-chrome-extension>', 'color:#3498db', ...args)
}

export function getCurLang () {
  const btn = document.getElementById('lang-select')
  const inputLangSelect: HTMLInputElement | null = document.querySelector('input[name=lang-select]')
  return (btn && btn.innerText) || (inputLangSelect && inputLangSelect.value) || ''
}
