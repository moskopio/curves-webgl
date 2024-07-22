import React from 'react'
import ReactDOM from 'react-dom/client'
import { Slider } from './controls/Slider'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="canvas-display" />
    <Slider onChange={() => null} value={100} min={0} max={100} />
  </React.StrictMode>
)
