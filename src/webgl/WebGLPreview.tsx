import { ReactElement, useContext, useEffect, useRef, useState } from "react"
import { SettingsContext, StateContext } from "../state"
import './WebGLPreview.css'
import bezierFragment from './bezier.frag'
import bezierVertex from './bezier.vert'
import catmullFragment from './catmull.frag'
import catmullVertex from './catmull.vert'
import { createLineDrawer, LineDrawer } from "./line-drawer"

export function WebGLPreview(): ReactElement {
  const state = useContext(StateContext)
  const settings = useContext(SettingsContext)
  const { bezierEnabled, catmullEnabled } = settings
  
  const { points, steps, progress } = state
  
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
    bezierDrawer?.updateSteps(steps, progress)
    bezierEnabled && bezierDrawer?.draw()
    
    catmullDrawer?.updatePoints(points)
    catmullDrawer?.updateSteps(steps, progress)
    catmullEnabled && catmullDrawer?.draw()
  }, [points, steps, progress, bezierDrawer, bezierEnabled, catmullEnabled])
  
  return (
    <canvas ref={canvasRef} className="webgl-canvas" width={600} height={400} />
  )
}
