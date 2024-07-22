import { ReactElement } from "react";
import './Overview.css'

export function Overview(): ReactElement {
  
  const p0 = [50, 200] as [number, number]
  const p1 = [150, 300] as [number, number]
  const p2 = [350, 100] as [number, number]
  const p3 = [550, 200] as [number, number]
  
  return (
    <svg className="svg-overlay">
      <Curve p0={p0} p1={p1} p2={p2} p3={p3} />
      <Lines p0={p0} p1={p1} p2={p2} p3={p3} />
      <Marker p={p0} />
      <Marker p={p1} />
      <Marker p={p2} />
      <Marker p={p3} />
   </svg>
  )
}


interface PointsProps {
  p0: [number, number]
  p1: [number, number]
  p2: [number, number]
  p3: [number, number]
}

function Curve(props: PointsProps): ReactElement { 
  const { p0, p1, p2, p3 } = props
  
  const d = `M${p0[0]},${p0[1]} C${p1[0]},${p1[1]} ${p2[0]},${p2[1]}  ${p3[0]},${p3[1]}`
  
  return (
    <path d={d} />
  )
}

function Lines(props: PointsProps): ReactElement {
  const { p0, p1, p2, p3 } = props

  return (
    <g id="lines">
    <line x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} />
    <line x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} />
    <line x1={p2[0]} y1={p2[1]} x2={p3[0]} y2={p3[1]} />
  </g>
  )
}


interface MarkerProps {
  p: [number, number]
  onChange?: (x: number, y: number) => void
}

function Marker(props: MarkerProps): ReactElement {
  const { p } = props
  const [x, y] = p
  
  return (
    <circle cx={x} cy={y} />
  )
}
