import { ReactElement, ReactNode, useMemo, useState } from "react"
import './App.css'
import { ControlsPanel } from "./components/ControlsPanel"
import { ProgressControls } from "./components/ProgressControls"
import { DEFAULT_POINTS, SettingsContext, StateContext } from "./state"
import { Markers } from "./svg/SVGMarkers"
import { SVGPreview } from "./svg/SVGPreview"
import { WebGLPreview } from "./webgl/WebGLPreview"
import { PointsPanel } from "./components/PointsPanel"


export function App(): ReactNode {
  const [points, updatePoints] = useState(DEFAULT_POINTS)
  const [steps, updateSteps] = useState(20)
  const [progress, updateProgress] = useState(1)
  
  const [bezierEnabled, setBezierEnabled] = useState(true)
  const [catmullEnabled, setCatmullEnabled] = useState(true)
  const [svgEnabled, setSvgEnabled] = useState(true)
  const [markersEnabled, setMarkersEnabled] = useState(true)
  
  const state = useMemo(() => ({
    points,   updatePoints,
    steps,    updateSteps,
    progress, updateProgress
  }), [points, steps, progress])
  
  const settings = useMemo(() => ({
    bezierEnabled,  setBezierEnabled,
    catmullEnabled, setCatmullEnabled,
    svgEnabled,     setSvgEnabled,
    markersEnabled, setMarkersEnabled
  }), [bezierEnabled, catmullEnabled, svgEnabled, markersEnabled])
  
  return (
    <StateContext.Provider value={state}>
    <SettingsContext.Provider value={settings}>
      <div className="application">
        <Preview />
        <Panels />
      </div>
    </SettingsContext.Provider>
    </StateContext.Provider>
  )
}

function Preview(): ReactElement {
  return (
    <div className="preview">
      <WebGLPreview />
      <SVGPreview />
      <Markers />
      <ProgressControls />
    </div>
  )
}

function Panels(): ReactElement {
  return (
    <div className="panels">
      <ControlsPanel />
      <PointsPanel />
    </div>
  )
}
