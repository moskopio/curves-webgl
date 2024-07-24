import { MouseEvent, ReactElement, useCallback, useState } from "react";
import './Slider.css'

interface Props {
  label:     string
  max:       number
  min:       number
  onChange: (value: number) => void
  value:     number
  width:     number
}

export function Slider(props: Props): ReactElement {
  const { label, min, max, onChange, value, width } = props
  
  const [isDragged, setIsDragged] = useState(false)
  
  const getPercentage = useCallback((v: number) => ((v - min) / (max - min)) * 100, [min, max])
  
  const style = { width: `${width}px` }

  const updateValue = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const {left, width } = event?.currentTarget.getBoundingClientRect()
    const percentage = (event.clientX - left) / width
    
    const newValue = min + percentage * (max - min)
    onChange(newValue)
  }, [onChange, min, max])
  
  const handleDrag = useCallback((event: MouseEvent<HTMLDivElement>) => {
    isDragged && updateValue(event)
  }, [isDragged, updateValue])
  
  const handleDragEnd = useCallback(() => setIsDragged(false), [setIsDragged])
  
  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    setIsDragged(true)
    updateValue(event)
  }, [setIsDragged, updateValue])
  
  
  return (
  <div 
    className="slider-track"
    style={style}
    onMouseDown={handleClick}
    onMouseUp={handleDragEnd}
    onMouseMove={handleDrag}
    onMouseLeave={handleDragEnd}
  >
    <div className="slider-label" style={style}>{label}</div>
    <div className="slider-handle" style={{ width: `${getPercentage(value)}%` }} />
  </div>
  )
  
  
}
