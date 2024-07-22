import { ReactNode } from "react";
import { Slider } from "./controls/Slider"
import { Overview } from "./Overview";

export function App(): ReactNode {

  
  return (
  <div>
    <canvas className="canvas-display" />
    <Overview />
    <Slider onChange={() => null} value={100} min={0} max={100} />
  </div>)
}
