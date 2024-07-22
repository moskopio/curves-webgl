import { ReactNode, useState } from "react";
import { Slider } from "./controls/Slider";
import { Preview } from "./preview/Preview";
import { Points } from "./types";
import { Markers } from "./preview/Markers";


const DEFAULT_POINTS: Points = {
  p0: [50, 200],
  p1: [150, 300],
  p2: [350, 100],
  p3: [550, 200],
}

export function App(): ReactNode {
  const [points, updatePoints] = useState(DEFAULT_POINTS)
  

  return (
  <div>
    <canvas className="canvas-display" />
    <Preview points={points} />
    <Markers points={points} onChange={updatePoints} />
    <Slider onChange={() => null} value={100} min={0} max={100} />
  </div>)
}
