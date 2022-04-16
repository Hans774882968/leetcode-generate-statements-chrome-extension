import { dbg, getCurLang } from './utils'
import { calculateStatements } from './calculateStatements'

function main () {
  const translateResultClassName = 'implement-class-input-translate-result'

  const curLang = getCurLang()
  if (curLang === lastLang) return

  const pres = [
    // problems
    ...document.querySelectorAll('.notranslate pre'),
    // weekly contest
    ...document.querySelectorAll('.question-content.default-content pre'),
  ]
  pres.forEach((pre) => {
    const legalResults: string[] = [] as string[];
    (Array.from(pre.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE) as Array<Text>)
      .forEach((textNode) => {
        const text = textNode.data
        const {
          legal, hasLang, statements,
        } = calculateStatements(text, curLang)

        if (!legal) return
        legalResults.push(`\n翻译结果（当前语言：${hasLang ? curLang : `暂不支持${curLang || '该语言'}，展示JavaScript结果`}）\n${statements.join('\n')}`)

        // set lastLang only when we ensure that methodCallArr and paramsArr exist
        lastLang = curLang
        dbg('curLang', curLang)//
      })

    // delete previous result elements
    const previousTranslateResultElements = document.querySelectorAll(`.${translateResultClassName}`)
    previousTranslateResultElements.forEach((e) => pre.removeChild(e))

    legalResults.forEach((result) => {
      const translateResultElement = document.createElement('strong')
      translateResultElement.className = translateResultClassName
      translateResultElement.innerText = result
      pre.appendChild(translateResultElement)
    })
  })
}

let lastLang: string | null = null
// DOMContentLoaded事件会被力扣的js覆盖，因此选择了body的click事件
document.body.addEventListener('click', () => {
  main()
})
