import { ReactElement, useContext } from "react"
import { Slider } from "./Slider"
import { StateContext } from "../state"
import './ProgressControls.css'

export function ProgressControls(): ReactElement {
  const state = useContext(StateContext)
  const { progress, updateProgress } = state
  
  return (
    <div className="progress-background">
      <Slider 
        label={`Progress ${Math.floor(progress * 100)}%`}
        max={1} 
        min={0} 
        onChange={updateProgress} 
        value={progress} 
        width={600}
      />
    </ div>
  )
}
