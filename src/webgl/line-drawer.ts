import { Points } from "../types"
import { createShaderProgram } from "./program"


export interface LineDrawer {
  draw:         () => void
  setViewPort:  (w: number, h: number) => void
  updatePoints: (points: Points) => void
  updateSteps:  (steps: number) => void
}

interface Parameters {
  gl:             WebGLRenderingContext
  vertexSource:   string
  fragmentSource: string
}

export function createLineDrawer(parameters: Parameters): LineDrawer | undefined {
  const { gl, vertexSource, fragmentSource } = parameters
  const program = createShaderProgram(gl, vertexSource, fragmentSource)
  
  if (!program) {
    console.error('Failed to create a WebGL Program')
    return undefined
  }
  
  // Uniforms
  const mvp = gl.getUniformLocation(program, 'mvp')
  const p0 = gl.getUniformLocation(program, 'p0')
  const p1 = gl.getUniformLocation(program, 'p1')
  const p2 = gl.getUniformLocation(program, 'p2')
  const p3 = gl.getUniformLocation(program, 'p3')
  
  // Attribute
  const vertT = gl.getAttribLocation(program, 't')
    
  // Create the vertex buffer object
  const buffer = gl.createBuffer()
  
  // update parts
  let stepsCount = 100
  updateSteps(100)

  
  return { updateSteps, setViewPort, updatePoints, draw }
  
  function updateSteps(steps: number): void {
    stepsCount = steps;
    
    const stepsArray = []
    for ( var i = 0; i<steps; ++i ) {
      stepsArray.push(i / (steps - 1))
  }
  
  gl.useProgram(program!)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stepsArray), gl.STATIC_DRAW)
  }

  function setViewPort(w: number, h: number): void {
    var transformationMatrix = [ 
       2/w,    0, 0, 0, 
         0, -2/h, 0, 0, 
         0,    0, 1, 0, 
        -1,    1, 0, 1 
    ]
    gl.useProgram(program!)
    gl.uniformMatrix4fv(mvp, false, transformationMatrix)
  }
  
  function updatePoints(points: Points): void {
    gl.useProgram(program!)
		gl.uniform2fv(p0, points.p0)
		gl.uniform2fv(p1, points.p1)
		gl.uniform2fv(p2, points.p2)
		gl.uniform2fv(p3, points.p3)
  }
  
  function draw(): void { 
    gl.useProgram(program!)
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
		gl.vertexAttribPointer(vertT, 1, gl.FLOAT, false, 0, 0 )
		gl.enableVertexAttribArray(vertT )
		gl.drawArrays(gl.LINE_STRIP, 0, stepsCount)
  }
}
