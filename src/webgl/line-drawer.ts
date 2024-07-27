import { Points } from "../types"
import { createShaderProgram } from "./program"


export interface LineDrawer {
  draw:           () => void
  setViewPort:    (w: number, h: number) => void
  updatePoints:   (points: Points) => void
  updateSteps:    (steps: number, progress: number, weight: number) => void
}

interface Parameters {
  gl:             WebGLRenderingContext
  vertexSource:   string
  fragmentSource: string
  color:          number
}

export function createLineDrawer(parameters: Parameters): LineDrawer | undefined {
  const { gl, vertexSource, fragmentSource, color } = parameters
  const program = createShaderProgram(gl, vertexSource, fragmentSource)
  
  if (!program) {
    console.error('Failed to create a WebGL Program')
    return undefined
  }
  
  const uMVP = gl.getUniformLocation(program, 'mvp')
  const uP0 = gl.getUniformLocation(program, 'p0')
  const uP1 = gl.getUniformLocation(program, 'p1')
  const uP2 = gl.getUniformLocation(program, 'p2')
  const uP3 = gl.getUniformLocation(program, 'p3')
  const uColor = gl.getUniformLocation(program, 'color')
  
  const aStep = gl.getAttribLocation(program, 't')
  const aWeight = gl.getAttribLocation(program, 'weight')
  
  const stepBuffer = gl.createBuffer()
  const pBuffer = gl.createBuffer()
  
  let stepsCount = 100
  updateSteps(100, 100, 5)
  updateColor(color)
  
  return { updateSteps, setViewPort, updatePoints, draw }
  
  function updateColor(color: number): void { 
    gl.useProgram(program!)
    const r = (color >> 16) / 255
    const g = (color >> 8 & 0xFF) / 255
    const b = (color & 0xFF) / 255
    
    gl.uniform3f(uColor, r, g, b)
  }
  
  function updateSteps(steps: number, progress: number, weight: number): void {
    stepsCount = Math.floor(steps);
    
    const stepsArray = []
    const weightArray = []
    for (let i = 0; i < stepsCount; i++) {
      stepsArray.push(i * progress / (stepsCount - 1))
      stepsArray.push(i * progress / (stepsCount - 1))
      weightArray.push(-weight)
      weightArray.push(weight)
    }
      
    gl.useProgram(program!)
    gl.bindBuffer(gl.ARRAY_BUFFER, stepBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stepsArray), gl.STATIC_DRAW)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(weightArray), gl.STATIC_DRAW)
    
  }
  

  function setViewPort(w: number, h: number): void {
    const transformationMatrix = [ 
       2/w,    0, 0, 0, 
         0, -2/h, 0, 0, 
         0,    0, 1, 0, 
        -1,    1, 0, 1 
    ]
    gl.useProgram(program!)
    gl.uniformMatrix4fv(uMVP, false, transformationMatrix)
  }
  
  function updatePoints(points: Points): void {
    gl.useProgram(program!)
		gl.uniform2fv(uP0, points.p0)
		gl.uniform2fv(uP1, points.p1)
		gl.uniform2fv(uP2, points.p2)
		gl.uniform2fv(uP3, points.p3)
  }
  
  function draw(): void { 
    gl.useProgram(program!)
    
		gl.bindBuffer(gl.ARRAY_BUFFER, stepBuffer)
		gl.vertexAttribPointer(aStep, 1, gl.FLOAT, false, 0, 0)
		gl.enableVertexAttribArray(aStep)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer)
		gl.vertexAttribPointer(aWeight, 1, gl.FLOAT, false, 0, 0)
		gl.enableVertexAttribArray(aWeight)
    
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, stepsCount * 2)
  }
}
