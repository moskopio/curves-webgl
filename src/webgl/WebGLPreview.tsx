import { ReactElement, useEffect, useRef, useState } from "react"
import { Points } from "../types"
import './WebGLPreview.css'
import { createLineDrawer, LineDrawer } from "./line-drawer"
import bezierFragment from './bezier.frag'
import bezierVertex from './bezier.vert'
import catmullFragment from './catmull.frag'
import catmullVertex from './catmull.vert'

interface Props {
  points: Points
  steps:  number
}

export function WebGLPreview(props: Props): ReactElement {
  const { points, steps } = props
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [bezierDrawer, setBezierDrawer] = useState<LineDrawer | undefined>(undefined)
  const [catmullDrawer, setCatmullDrawer] = useState<LineDrawer | undefined>(undefined)
  const [gl, setGL] = useState<WebGLRenderingContext | undefined>(undefined)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const gl = canvas.getContext("webgl", {antialias: false, depth: false})
      if (gl) {
        
        const bezier = createLineDrawer({ gl, vertexSource: bezierVertex, fragmentSource: bezierFragment} )
        const catmull = createLineDrawer({ gl, vertexSource: catmullVertex, fragmentSource: catmullFragment} )
        
        catmull?.setViewPort(600, 400)
        bezier?.setViewPort(600, 400)
        setBezierDrawer(bezier)
        setCatmullDrawer(catmull)
        setGL(gl)
      }
    }
  }, [])
  
  useEffect(() => { 
    gl?.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    
    bezierDrawer?.updatePoints(points)
    bezierDrawer?.updateSteps(steps)
    bezierDrawer?.draw()
    
    catmullDrawer?.updatePoints(points)
    catmullDrawer?.updateSteps(steps)
    catmullDrawer?.draw()
  }, [points, steps, bezierDrawer])
  
  return (
    <canvas ref={canvasRef} className="webgl-canvas" width={600} height={400} />
  )
}
