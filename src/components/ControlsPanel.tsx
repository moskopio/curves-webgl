import { ReactElement, useContext } from "react"
import { SettingsContext, StateContext } from "../state"
import { Checkbox } from "./Checkbox"
import "./ControlsPanel.css"
import { Slider } from "./Slider"

export function ControlsPanel(): ReactElement {
  const state = useContext(StateContext)
  const { steps, updateSteps } = state
  
  const settings = useContext(SettingsContext)
  const { bezierEnabled, catmullEnabled, svgEnabled, markersEnabled } = settings
  const { setBezierEnabled, setCatmullEnabled, setSvgEnabled, setMarkersEnabled } = settings
  
  return (
    <div className="controls-panel" > 
      <Checkbox label="Bezier Curve" value={bezierEnabled} onChange={setBezierEnabled} />
      <Checkbox label="Catmull-Rom Curve" value={catmullEnabled} onChange={setCatmullEnabled} />
      <Checkbox label="SVG Preview" value={svgEnabled} onChange={setSvgEnabled} />
      <Checkbox label="Markers" value={markersEnabled} onChange={setMarkersEnabled} />
      <Slider label={`Steps ${Math.ceil(steps)}`} max={50} min={0} onChange={updateSteps} value={steps} width={145} />
    </div>
  )
}