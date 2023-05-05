import { useEffect, useState } from 'react'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import './App.css'

function App() {
  const [response, setResponse] = useState("");

  function handleSend(url) {
    fetch(url)
      .then(res => res.text())
      .then(text => setResponse(text));
  }

  return (
    <div>
      <CommandsPanel handleSend={handleSend}  />
      <PayloadsPanel />
      <ResultPanel res={response}/>
    </div>
  )
}

function CommandsPanel({ handleSend }) {
  const [url, setUrl] = useState("");

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSend(url)
      }}>
        <div>
          <select>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>
        <div>
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          <button>Send</button>
        </div>
      </form>
    </div>
  )
}

function PayloadsPanel() {
  return (
    <div>
      <div>
        <button>Params</button>
        <button>Headers</button>
        <button>Body</button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Key</th>
            <th>Value</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <ParamsTab />
        </tbody>
      </table>
      <div>
      </div>
    </div>
  )
}

function ParamsTab() {
  return (
    <tr>
      <td><input type="checkbox" /></td>
      <td><input type="text" /></td>
      <td><input type="text" /></td>
      <td><input type="text" /></td>
      <td><button>delete</button></td>
    </tr>
  )
}

function HeadersTab() {
  return (
    <tr>
      <td><input type="checkbox" /></td>
      <td><input type="text" /></td>
      <td><input type="text" /></td>
      <td><input type="text" /></td>
    </tr>
  )
}

function BodyTab() {
  return (
    <div>
      <h1>Body</h1>
    </div>
  )
}

function ResultPanel({ res }) {
  return (
    <div>
      <h1>Response</h1>
      <JSONPretty data={res}></JSONPretty>
    </div>
  )
}

export default App
