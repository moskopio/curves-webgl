import { MouseEvent, ReactElement, useCallback, useState } from "react"
import { Point, PointIndex, Points } from "../types"
import './Markers.css'

interface Props {
  points:   Points
  onChange: (points: Points) => void
}

export function Markers(props: Props): ReactElement {
  const { points, onChange } = props
  const { p0, p1, p2, p3 } = points
  
  const [selectedMarker, selectMarker] = useState<PointIndex | null>(null)
  
  const onPointChange = useCallback((id: PointIndex, point: Point) => {
    const newPoints = {...points}
    newPoints[id] = point
    onChange(newPoints)
  }, [points, onChange])
  
  const handleDrag = useCallback((event: MouseEvent) => {
    if (selectedMarker) {
      const x = event?.clientX
      const y = event?.clientY
      onPointChange(selectedMarker, [x,y])
    }
  }, [selectedMarker, onPointChange])
  const handleDragEnd = useCallback(() => selectMarker(null), [selectMarker])
  
  return (
    <svg className="svg-marker" onMouseMove={handleDrag} onMouseUp={handleDragEnd}>
    <Marker id="p0" point={p0} selectMarker={selectMarker} />
    <Marker id="p1" point={p1} selectMarker={selectMarker} />
    <Marker id="p2" point={p2} selectMarker={selectMarker} />
    <Marker id="p3" point={p3} selectMarker={selectMarker} />
  </svg>
  )
}

interface MarkerProps {
  id:     PointIndex
  point:  [number, number]
  selectMarker: (id: PointIndex | null) => void
}

function Marker(props: MarkerProps): ReactElement {
  const { id, point, selectMarker } = props
  const handleDragStart = useCallback(() => selectMarker(id), [selectMarker])

  return (
      <circle id={id} 
        onMouseDown={handleDragStart} 
        cx={point[0]} 
        cy={point[1]} 
      />
  )
}
