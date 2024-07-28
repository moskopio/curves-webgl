import { ReactElement, useContext } from "react"
import { Points } from "../types"
import './SVGPreview.css'
import { SettingsContext, StateContext } from "../state"


export function SVGPreview(): ReactElement {  
  const state = useContext(StateContext)
  const settings = useContext(SettingsContext)
  
  const { points } = state
  const { svgEnabled } = settings
  
  return (
    <div>
    <svg className="svg-preview">
      { svgEnabled && <Lines {...points} /> }
   </svg>
   </div>
  )
}

function Lines(props: Points): ReactElement {
  const { p0, p1, p2, p3 } = props

  return (
    <g id="lines">
    <line x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} />
    <line x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} />
    <line x1={p2[0]} y1={p2[1]} x2={p3[0]} y2={p3[1]} />
  </g>
  )
}
