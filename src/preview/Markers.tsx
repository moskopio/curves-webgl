import { Fragment, ReactElement, useCallback, useState, MouseEvent } from "react"
import { Point, PointIndex, Points } from "../types"
import './Markers.css'

interface Props {
  points:   Points
  onChange: (points: Points) => void
}

export function Markers(props: Props): ReactElement {
  const { points, onChange } = props
  const { p0, p1, p2, p3 } = points
  
  const [selectedMarker, selectMarker] = useState(null)
  
  const onPointChange = useCallback((id: PointIndex, point: Point) => {
    const newPoints = {...points}
    newPoints[id] = point
    onChange(newPoints)
  }, [points, onChange])
  
  return (
    <svg className="svg-marker" >
    <Marker id="p0" point={p0} onChange={onPointChange} />
    <Marker id="p1" point={p1} onChange={onPointChange} />
    <Marker id="p2" point={p2} onChange={onPointChange} />
    <Marker id="p3" point={p3} onChange={onPointChange} />
  </svg>
  )
}

interface MarkerProps {
  id:       PointIndex
  point:    [number, number]
  onChange: (id: PointIndex, point: Point) => void
}

function Marker(props: MarkerProps): ReactElement {
  const { id, point, onChange } = props
  
  const [isDragged, setIsDragged] = useState(false)
  const handleDragStart = useCallback(() => setIsDragged(true), [setIsDragged])
  const handleDragEnd = useCallback(() => setIsDragged(false), [setIsDragged])
  const handleDrag = useCallback((event: MouseEvent<SVGGeometryElement>) => {
    if (!isDragged) return
    const x = event?.clientX
    const y = event?.clientY
    onChange(id, [x,y])
  }, [isDragged])
  
  return (
      <circle id={id} 
        onMouseDown={handleDragStart} 
        onMouseUp={handleDragEnd}
        onMouseMove={handleDrag}
        onMouseLeave={handleDragEnd}
        cx={point[0]} 
        cy={point[1]} 
      />
  )
}
