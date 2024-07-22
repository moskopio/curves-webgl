import { MouseEvent, ReactElement, useCallback, useState } from "react";
import './Slider.css'

interface Props {
  onChange: (value: number) => void
  value:     number
  min:       number
  max:       number
}

export function Slider(props: Props): ReactElement {
  const { onChange, value = 0, min = 0, max = 100 } = props
  
  const [currentValue, setCurrentValue] = useState(value)
  const [isDragged, setIsDragged] = useState(false)
  
  const getPercentage = useCallback((v: number) => ((v - min) / (max - min)) * 100, [min, max])
  const handleDragEnd = useCallback(() => setIsDragged(false), [setIsDragged])
  
  const updateValue = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const {left, width } = event?.currentTarget.getBoundingClientRect()
    const percentage = (event.clientX - left) / width
    const newValue = Math.round(min + percentage * (max - min))
    setCurrentValue(newValue)
  }, [setCurrentValue, min, max])
  
  const handleDrag = useCallback((event: MouseEvent<HTMLDivElement>) => {
    isDragged && updateValue(event)
  }, [isDragged, updateValue])
  
  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    setIsDragged(true)
    updateValue(event)
  }, [setIsDragged, updateValue])
  
  return (
  <div 
    className="slider-track"
    onMouseDown={handleClick}
    onMouseUp={handleDragEnd}
    onMouseMove={handleDrag}
  >
    <div className="slider-handle" style={{ width: `${getPercentage(currentValue)}%` }} />
  </div>
  )
}
