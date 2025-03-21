import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Appstate from './context/Appstate.jsx'

createRoot(document.getElementById('root')).render(
  <Appstate>
    <App />
  </Appstate>,
)
