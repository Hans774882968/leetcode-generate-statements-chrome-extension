import { useState } from 'react'
import { calculateStatements } from '../contentScript/calculateStatements'

const App = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [curLang, setCurLang] = useState('cpp')

  function getStatements (text: string) {
    if (!text) {
      setResult('输入不能为空！')
      return
    }
    const { legal, reason, statements } = calculateStatements(text, curLang)
    const curResult = legal ? statements.join('\n') : reason
    setResult(curResult)
  }

  const langs = [
    { label: 'C++', value: 'cpp' },
    { label: 'Java', value: 'java' },
    { label: 'Python', value: 'python' },
    { label: 'Python3', value: 'python3' },
    { label: 'C', value: 'c' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'PHP', value: 'php' },
  ]

  return (
    <div className="leetcode-generate-statements">
      <strong>输入测试数据</strong>
      <textarea
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      >
      </textarea>

      <strong>选择语言</strong>
      <select onChange={(e) => setCurLang(e.target.value)}>
        {langs.map((lang) => <option value={lang.value}>{lang.label}</option>)}
      </select>

      <div className="translate-btn-container">
        <button
          className="translate-btn"
          onClick={() => getStatements(text.trim())}>
          <span>翻译</span>
        </button>
      </div>

      <div className="translate-result-tab">
        <strong>翻译结果</strong>
        <button>复制</button>
      </div>
      <pre className="translate-result">
        {result}
      </pre>
    </div>
  )
}

export default App
