import { ReactElement, useContext } from "react"
import { StateContext } from "../state"
import { Point } from "../types"
import "./PointsPanel.css"

export function PointsPanel(): ReactElement {
  const state = useContext(StateContext)
  const { points } = state
  const { p0, p1, p2, p3 } = points

  return (
    <div className="points-panel" >
      <PointPreview id="P0" point={p0} />
      <PointPreview id="P1" point={p1} />
      <PointPreview id="P2" point={p2} />
      <PointPreview id="P3" point={p3} />
    </div>
  )
}

interface Props {
  id:   string
  point: Point
}

function PointPreview(props: Props): ReactElement {
  const { id, point } = props
    
  return (
    <div className="point-preview"> 
      <div className="point-preview-label">{id}: </div>
      <div className="point-preview-coordinate">{point[0]}</div>
      <div className="point-preview-coordinate">{point[1]}</div>
    </div>
  )
}
