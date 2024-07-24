import { ReactElement } from "react"
import "./Panel.css"
import { Slider } from "./Slider"
import { Checkbox } from "./Checkbox"

export function Panel(): ReactElement {


  return (
  <div className="panel" > 
  <Checkbox label="Bezier Curve" value={false} onChange={() => null} />
  <Checkbox label="Catmull-Rom Curve" value={false} onChange={() => null} />
  <Checkbox label="SVD Preview" value={false} onChange={() => null} />
        
    <Slider 
      label='Segments' 
      max={1} 
      min={0} 
      onChange={() => null} 
      value={0.5} 
      width={200}
      />

  </div>
  )
}
