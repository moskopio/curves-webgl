import { Points } from "../types"
import { createShaderProgram } from "./program"


const vertexSource = `
attribute float t;
uniform mat4 mvp;
uniform vec2 p0;
uniform vec2 p1;
uniform vec2 p2;
uniform vec2 p3;

void main() {
  vec2 part0 = (1.0 - t) * (1.0 - t) * (1.0 - t) * p0;
  vec2 part1 = 3.0 * t * (1.0 - t) * (1.0 - t) * p1;
  vec2 part2 = 3.0 * t * t * (1.0 - t) * p2;
  vec2 part3 = t * t * t * p3;
  
  vec2 pos = part0 + part1 + part2 + part3;
  
  gl_Position = mvp * vec4(pos, 0,1);
}
`;


const fragmentSource = `
	precision mediump float;
  
	void main() {
		gl_FragColor = vec4(1,0,0,1);
	}
`;

export interface LineDraw {
  draw(): void
  setViewPort(w: number, h: number): void
  updatePoints(points: Points): void
}

export function createBezierDrawer(gl: WebGLRenderingContext): LineDraw {
  const program = createShaderProgram(gl, vertexSource, fragmentSource)!
  
  // Uniforms
  const mvp = gl.getUniformLocation(program, 'mvp')
  const p0 = gl.getUniformLocation(program, 'p0')
  const p1 = gl.getUniformLocation(program, 'p1')
  const p2 = gl.getUniformLocation(program, 'p2')
  const p3 = gl.getUniformLocation(program, 'p3')
  
  // Attribute
  const vertPos = gl.getAttribLocation(program, 't')
  
  // Initialize the attribute buffer
  const steps = 20;
  var tv = [];
  for ( var i = 0; i<steps; ++i ) {
      tv.push(i / (steps-1))
  }
  
  // Create the vertex buffer object
  const buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tv), gl.STATIC_DRAW)
  
  return { setViewPort, updatePoints, draw }

  function setViewPort(w: number, h: number): void {
    var transformationMatrix = [ 
       2/w,    0, 0, 0, 
         0, -2/h, 0, 0, 
         0,    0, 1, 0, 
        -1,    1, 0, 1 
    ]
    gl.useProgram(program)
    gl.uniformMatrix4fv(mvp, false, transformationMatrix)
  }
  
  function updatePoints(points: Points): void {
    gl.useProgram(program)
		gl.uniform2fv(p0, points.p0)
		gl.uniform2fv(p1, points.p1)
		gl.uniform2fv(p2, points.p2)
		gl.uniform2fv(p3, points.p3)
  }
  
  function draw(): void { 
    gl.useProgram(program)
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
		gl.vertexAttribPointer(vertPos, 1, gl.FLOAT, false, 0, 0 )
		gl.enableVertexAttribArray(vertPos )
		gl.drawArrays(gl.LINE_STRIP, 0, steps)
  }
}
