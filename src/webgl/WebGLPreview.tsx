import { ReactElement, useContext, useEffect, useRef, useState } from "react"
import { SettingsContext, StateContext } from "../state"
import './WebGLPreview.css'
import bezierVertex from './bezier.vert'
import catmullVertex from './catmull.vert'
import bSplineVertex from './b-spline.vert'
import { createLineDrawer, LineDrawer } from "./line-drawer"


const PREVIEW_WIDTH = 600
const PREVIEW_HEIGHT = 400

export function WebGLPreview(): ReactElement {
  const state = useContext(StateContext)
  const settings = useContext(SettingsContext)
  const { bezierEnabled, catmullEnabled, bSplineEnabled } = settings
  
  const { points, steps, progress, weight } = state
  
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
        const bezier = createLineDrawer({ gl, lineVertex: bezierVertex, color: 0xbf6b6b } )
        const catmull = createLineDrawer({ gl, lineVertex: catmullVertex, color: 0x628090 } )
        const bSpline = createLineDrawer({ gl, lineVertex: bSplineVertex, color: 0x7db096 } )
        
        catmull?.setViewPort(PREVIEW_WIDTH, PREVIEW_HEIGHT)
        bezier?.setViewPort(PREVIEW_WIDTH, PREVIEW_HEIGHT)
        bSpline?.setViewPort(PREVIEW_WIDTH, PREVIEW_HEIGHT)
        
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
    bezierDrawer?.updateSteps(steps, progress, weight)
    bezierEnabled && bezierDrawer?.draw()
    
    catmullDrawer?.updatePoints(points)
    catmullDrawer?.updateSteps(steps, progress, weight)
    catmullEnabled && catmullDrawer?.draw()
    
    bSplineDrawer?.updatePoints(points)
    bSplineDrawer?.updateSteps(steps, progress, weight)
    bSplineEnabled && bSplineDrawer?.draw()
  }, [points, steps, progress, bezierDrawer, bSplineDrawer, catmullDrawer, bezierEnabled, bSplineEnabled, catmullEnabled, weight])
  
  return (
    <canvas ref={canvasRef} className="webgl-canvas" width={PREVIEW_WIDTH} height={PREVIEW_HEIGHT} />
  )
}
