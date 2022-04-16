import { firstAlphaLower, firstAlphaUpper, getParamsStringFromArr } from './utils'

export class StatementsHelper {
  lang2method: Map<string, (methodCallArr: Array<any>, paramsArr: Array<any>) => string[]>

  constructor () {
    this.lang2method = new Map([
      ['c++', this.getCppResult],
      ['cpp', this.getCppResult],
      ['java', this.getJavaResult],
      ['python', this.getPyResult],
      ['python3', this.getPyResult],
      ['c', this.getCResult],
      ['javascript', this.getJSResult],
      ['typescript', this.getJSResult],
      ['php', this.getPhpResult],
    ])
  }

  // TODO: s.replaceAll('[', '{').replaceAll(']', '}') change to a correct implementation
  getCppResult (methodCallArr: Array<any>, paramsArr: Array<any>) {
    const className = methodCallArr[0]
    const paramsString = getParamsStringFromArr(paramsArr[0])
      .replaceAll('[', '{').replaceAll(']', '}')
    const statements = [`${className}* obj = new ${className}(${paramsString});`]
    for (let i = 1; i < methodCallArr.length; ++i) {
      const paramsString = getParamsStringFromArr(paramsArr[i])
        .replaceAll('[', '{').replaceAll(']', '}')
      statements.push(`obj->${methodCallArr[i]}(${paramsString});`)
    }
    return statements
  }

  // TODO: s.replaceAll('[', '{').replaceAll(']', '}') change to a correct implementation
  getJavaResult (methodCallArr: Array<any>, paramsArr: Array<any>) {
    const className = methodCallArr[0]
    const paramsString = getParamsStringFromArr(paramsArr[0])
      .replaceAll('[', '{').replaceAll(']', '}')
    const statements = [`${className} obj = new ${className}(${paramsString});`]
    for (let i = 1; i < methodCallArr.length; ++i) {
      const paramsString = getParamsStringFromArr(paramsArr[i])
        .replaceAll('[', '{').replaceAll(']', '}')
      statements.push(`obj.${methodCallArr[i]}(${paramsString});`)
    }
    return statements
  }

  getPyResult (methodCallArr: Array<any>, paramsArr: Array<any>) {
    const className = methodCallArr[0]
    const statements = [`obj = ${className}(${getParamsStringFromArr(paramsArr[0])})`]
    for (let i = 1; i < methodCallArr.length; ++i) {
      statements.push(`obj.${methodCallArr[i]}(${getParamsStringFromArr(paramsArr[i])})`)
    }
    return statements
  }

  getCResult (methodCallArr: Array<any>, paramsArr: Array<any>) {
    const className = methodCallArr[0]
    const lowerClassName = firstAlphaLower(className)
    const statements = [`${className}* obj = ${lowerClassName}Create(${getParamsStringFromArr(paramsArr[0])});`]
    for (let i = 1; i < methodCallArr.length; ++i) {
      const paramsString = getParamsStringFromArr(paramsArr[i])
      statements.push(`${lowerClassName + firstAlphaUpper(methodCallArr[i])}(obj${paramsString ? ',' : ''}${paramsString});`)
    }
    statements.push(`${lowerClassName}Free(obj);`)
    return statements
  }

  getJSResult (methodCallArr: Array<any>, paramsArr: Array<any>) {
    const className = methodCallArr[0]
    const statements = [`var obj = new ${className}(${getParamsStringFromArr(paramsArr[0])})`]
    for (let i = 1; i < methodCallArr.length; ++i) {
      statements.push(`obj.${methodCallArr[i]}(${getParamsStringFromArr(paramsArr[i])})`)
    }
    return statements
  }

  getPhpParamsString (paramsArr:Array<any>) {
    const paramStrings = []
    for (const param of paramsArr) {
      if (Array.isArray(param)) {
        paramStrings.push(`array(${getParamsStringFromArr(param)})`)
      } else if (typeof param === 'string') {
        paramStrings.push(`"${param}"`)
      } else {
        paramStrings.push(param)
      }
    }
    return paramStrings.join(', ')
  }

  getPhpResult (methodCallArr: Array<any>, paramsArr: Array<any>) {
    const className = methodCallArr[0]
    const statements = [`$obj = ${className}(${this.getPhpParamsString(paramsArr[0])})`]
    for (let i = 1; i < methodCallArr.length; ++i) {
      statements.push(`$obj->${methodCallArr[i]}(${this.getPhpParamsString(paramsArr[i])})`)
    }
    return statements
  }

  getStatements (curLang: string, methodCallArr: Array<any>, paramsArr: Array<any>) {
    let method = this.lang2method.get(curLang)
    let hasLang = true
    if (!method) {
      method = this.getJSResult
      hasLang = false
    }
    return { hasLang, statements: method.call(this, methodCallArr, paramsArr) }
  }
}
