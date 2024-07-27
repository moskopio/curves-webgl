import { ReactElement, ReactNode } from "react"
import './App.css'
import { ControlsPanel } from "./components/ControlsPanel"
import { PointsPanel } from "./components/PointsPanel"
import { ProgressControls } from "./components/ProgressControls"
import { SettingsContext, StateContext, useAppState, useSettingsState } from "./state"
import { Markers } from "./svg/SVGMarkers"
import { SVGPreview } from "./svg/SVGPreview"
import { WebGLPreview } from "./webgl/WebGLPreview"


export function App(): ReactNode {  
  const state = useAppState()
  const settings = useSettingsState()
  
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
