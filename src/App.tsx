import { ReactNode, useState } from "react";
import { Slider } from "./controls/Slider";
import { SVGPreview } from "./svg/SVGPreview";
import { Points } from "./types";
import { Markers } from "./svg/SVGMarkers";
import { WebGLPreview } from "./webgl/WebGLPreview";
import { Panel } from "./controls/Panel"
import './App.css'


const DEFAULT_POINTS: Points = {
  p0: [50, 200],
  p1: [150, 300],
  p2: [350, 100],
  p3: [550, 200],
}

export function App(): ReactNode {
  const [points, updatePoints] = useState(DEFAULT_POINTS)
  const [steps, updateSteps] = useState(100)
  const [progress, updateProgress] = useState(1)
  
  return (
  <div className="application">
    <div className="preview">
    <WebGLPreview points={points} steps={steps} progress={progress} />
    <SVGPreview points={points} />
    <Markers points={points} onChange={updatePoints} />
    <Slider 
      label='Progress' 
      max={1} 
      min={0} 
      onChange={updateProgress} 
      value={progress} 
      width={600}
      />
    </div>
    <Panel  />
  </div>)
}
