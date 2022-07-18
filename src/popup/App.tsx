import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  Button, Input, Select, message,
} from 'antd'
import { calculateStatements } from '../contentScript/calculateStatements'

const { TextArea } = Input
const { Option } = Select

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
      <TextArea
        showCount
        value={text}
        onChange={(e) => setText(e.target.value)}
      >
      </TextArea>

      <strong>选择语言</strong>
      {/* <select onChange={(e) => setCurLang(e.target.value)}> */}
      {/*   {langs.map((lang) => <option value={lang.value}>{lang.label}</option>)} */}
      {/* </select> */}
      <Select defaultValue="cpp" onChange={(e: string) => setCurLang(e)}>
        {langs.map((lang) => <Option value={lang.value}>{lang.label}</Option>)}
      </Select>

      <div className="translate-btn-container">
        <Button
          type="primary"
          onClick={() => getStatements(text.trim())}>
          <span>翻译</span>
        </Button>
      </div>

      <div className="translate-result-tab">
        <strong>翻译结果</strong>
        {copied ? <strong className="copy-message">复制成功！</strong> : null}
        <CopyToClipboard
          text={result}
          onCopy={() => {
            setCopied(true)
            message.success('复制成功！')
          }}>
          <Button type="primary">复制</Button>
        </CopyToClipboard>
      </div>
      <pre className="translate-result">
        {result}
      </pre>
    </div>
  )
}

export default App
