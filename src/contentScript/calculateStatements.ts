import { StatementsHelper } from './statementsHelper'

export function calculateStatements (text: string, curLang: string) {
  const lines = text.split('\n')
  let arrLines = lines.filter((line) => /\[(.*?)\]/.test(line))
  if (arrLines.length !== 2) {
    return {
      legal: false,
      reason: `输入的数组应为两行（检测到${arrLines.length}行）`,
      hasLang: false,
      statements: [],
    }
  }
  arrLines = arrLines.map((arrLine) => arrLine.replaceAll('\'', '"'))
  // console.log(arrLines)
  let methodCallArr; let paramsArr
  try {
    [methodCallArr, paramsArr] = arrLines.map((arrLine) => JSON.parse(arrLine))
  } catch (e) {
    return {
      legal: false,
      reason: `数组解析出错：${e}`,
      hasLang: false,
      statements: [],
    }
  }
  // the length of method call array and parameters array should be equal, and >= 1
  if (methodCallArr.length !== paramsArr.length || !methodCallArr.length) {
    return {
      legal: false, reason: '两个数组长度应相等，且大于0', hasLang: false, statements: [],
    }
  }

  const statementsHelper = new StatementsHelper()
  return {
    legal: true,
    reason: '',
    ...statementsHelper.getStatements(
      curLang.toLowerCase(),
      methodCallArr,
      paramsArr,
    ),
  }
}
