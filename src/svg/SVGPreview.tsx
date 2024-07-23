import { ReactElement } from "react"
import { Points } from "../types"
import './SVGPreview.css'

interface Props {
  points: Points
}

export function SVGPreview(props: Props): ReactElement {  
  const { points } = props
  
  return (
    <div>
    <svg className="svg-preview">
      <Curve {...points} />
      <Lines {...points} />
   </svg>
   </div>
  )
}

function Curve(props: Points): ReactElement { 
  const { p0, p1, p2, p3 } = props
  
  const d = `
  M${p0[0]}, ${p0[1]} 
  C${p1[0]}, ${p1[1]}
   ${p2[0]}, ${p2[1]}
   ${p3[0]}, ${p3[1]}`
  
  return (
    <path d={d} />
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
