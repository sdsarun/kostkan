import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HeadersProvider } from "./shared/headersContext";
import { SenderProvider } from "./shared/senderContext"
import axios from "axios"

axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeadersProvider>
      <SenderProvider>
        <App />
      </SenderProvider>
    </HeadersProvider>
  </React.StrictMode>,
)
