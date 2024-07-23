import { ReactElement, useEffect, useRef, useState } from "react"
import { Points } from "../types"
import './WebGLPreview.css'
import { createBezierDrawer, LineDraw } from "./bezier"

interface Props {
  points: Points
}

export function WebGLPreview(props: Props): ReactElement {
  const { points } = props
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [bezierDrawer, setBezierDrawer] = useState<LineDraw | null>(null)
  const [gl, setGL] = useState<WebGLRenderingContext | null>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const gl = canvas.getContext("webgl", {antialias: false, depth: false})
      if (gl) {
        const bezier = createBezierDrawer(gl)
        bezier.setViewPort(600, 400)
        setBezierDrawer(bezier)
        setGL(gl)
      }
    }
  }, [])
  
  useEffect(() => { 
    gl?.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    bezierDrawer?.updatePoints(points)
    bezierDrawer?.draw()
  }, [points, bezierDrawer])
  
  return (
    <canvas ref={canvasRef} className="webgl-canvas" width={600} height={400} />
  )
}
