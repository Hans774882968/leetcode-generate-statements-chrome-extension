import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { calculateStatements } from '../contentScript/calculateStatements'

const App = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [curLang, setCurLang] = useState('cpp')
  const [copied, setCopied] = useState(false)

  function getStatements (text: string) {
    if (!text) {
      setResult('输入不能为空！')
      setCopied(false)
      return
    }
    const { legal, reason, statements } = calculateStatements(text, curLang)
    const curResult = legal ? statements.join('\n') : reason
    setResult(curResult)
    setCopied(false)
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
      <strong>力扣网站上，根据输入自动生成调用语句的chrome插件</strong>
      <strong>
        注意：
        <ol>
          <li>Java、C、PHP等语言的翻译结果仅供参考。</li>
          <li>目前每次只能输入一组测试数据。</li>
        </ol>
      </strong>

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
        {copied ? <strong className="copy-message">复制成功！</strong> : null}
        <CopyToClipboard
          text={result}
          onCopy={() => setCopied(true)}>
          <button>复制</button>
        </CopyToClipboard>
      </div>
      <pre className="translate-result">
        {result}
      </pre>
    </div>
  )
}

export default App
