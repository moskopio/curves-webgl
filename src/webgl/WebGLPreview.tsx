import { ReactElement, useContext, useEffect, useRef, useState } from "react"
import { SettingsContext, StateContext } from "../state"
import './WebGLPreview.css'
import lineFragment from './line.frag'
import bezierVertex from './bezier.vert'
import catmullVertex from './catmull.vert'
import bSplineVertex from './b-spline.vert'
import { createLineDrawer, LineDrawer } from "./line-drawer"

export function WebGLPreview(): ReactElement {
  const state = useContext(StateContext)
  const settings = useContext(SettingsContext)
  const { bezierEnabled, catmullEnabled, bSplineEnabled } = settings
  
  const { points, steps, progress } = state
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [bezierDrawer, setBezierDrawer] = useState<LineDrawer | undefined>(undefined)
  const [catmullDrawer, setCatmullDrawer] = useState<LineDrawer | undefined>(undefined)
  const [bSplineDrawer, setBSplineDrawer] = useState<LineDrawer | undefined>(undefined)
  const [gl, setGL] = useState<WebGLRenderingContext | undefined>(undefined)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const gl = canvas.getContext("webgl", {antialias: false, depth: false})
      if (gl) {
        const bezier = createLineDrawer({ gl, vertexSource: bezierVertex, fragmentSource: lineFragment, color: 0xFF0000 } )
        const catmull = createLineDrawer({ gl, vertexSource: catmullVertex, fragmentSource: lineFragment, color: 0x00FF00 } )
        const bSpline = createLineDrawer({ gl, vertexSource: bSplineVertex, fragmentSource: lineFragment, color: 0x0000FF } )
        
        catmull?.setViewPort(600, 400)
        bezier?.setViewPort(600, 400)
        bSpline?.setViewPort(600, 400)
        
        setBezierDrawer(bezier)
        setCatmullDrawer(catmull)
        setBSplineDrawer(bSpline)
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
    
    bSplineDrawer?.updatePoints(points)
    bSplineDrawer?.updateSteps(steps, progress)
    bSplineEnabled && bSplineDrawer?.draw()
  }, [points, steps, progress, bezierDrawer, bSplineDrawer, catmullDrawer, bezierEnabled, bSplineEnabled, catmullEnabled])
  
  return (
    <canvas ref={canvasRef} className="webgl-canvas" width={600} height={400} />
  )
}
