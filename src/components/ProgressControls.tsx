import { ReactElement, useContext } from "react"
import { Slider } from "./Slider"
import { StateContext } from "../state"

export function ProgressControls(): ReactElement {
  const state = useContext(StateContext)
  const { progress, updateProgress } = state
  
  return (
    <Slider 
      label={`Progress ${Math.floor(progress * 100)}%`}
      max={1} 
      min={0} 
      onChange={updateProgress} 
      value={progress} 
      width={600}
    />
  )
}
