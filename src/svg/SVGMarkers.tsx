import { Fragment, MouseEvent, ReactElement, useCallback, useState } from "react"
import { Point, PointIndex, Points } from "../types"
import './SVGMarkers.css'


interface Props {
  points:   Points
  onChange: (points: Points) => void
}

// Necessary to center points
const POSITION_CORRECTION = 12

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
      const x = event?.clientX - POSITION_CORRECTION
      const y = event?.clientY - POSITION_CORRECTION
      onPointChange(selectedMarker, [x, y])
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
  id:           PointIndex
  point:        [number, number]
  selectMarker: (id: PointIndex | null) => void
}

function Marker(props: MarkerProps): ReactElement {
  const { id, point, selectMarker } = props
  const handleDragStart = useCallback(() => selectMarker(id), [selectMarker])

  return (
    <Fragment>
      <circle onMouseDown={handleDragStart} cx={point[0]} cy={point[1]} />
      <text x={point[0] - 4} y={point[1] + 3}>{id}</text>
    </Fragment>
  )
}
