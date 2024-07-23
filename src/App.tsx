import { ReactNode, useState } from "react";
import { Slider } from "./controls/Slider";
import { SVGPreview } from "./svg/SVGPreview";
import { Points } from "./types";
import { Markers } from "./svg/SVGMarkers";
import { WebGLPreview } from "./webgl/WebGLPreview";


const DEFAULT_POINTS: Points = {
  p0: [50, 200],
  p1: [150, 300],
  p2: [350, 100],
  p3: [550, 200],
}

export function App(): ReactNode {
  const [points, updatePoints] = useState(DEFAULT_POINTS)
  const [steps, updateSteps] = useState(100)
  
  return (
  <div>
    <WebGLPreview points={points} steps={steps} />
    <SVGPreview points={points} />
    <Markers points={points} onChange={updatePoints} />
    <Slider onChange={updateSteps} value={steps} min={5} max={100} />
  </div>)
}
