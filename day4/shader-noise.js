const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true
};

// Your glsl code
const frag = glsl(/* glsl */`
  precision highp float;

	#pragma glslify: noise = require('glsl-noise/simplex/3d');
  #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');

  uniform float time;
	uniform float aspect;
  varying vec2 vUv;


  void main () {
 
		vec3 colorA = sin(time * 2.0) + vec3(1.0, 0.0, 0.0);
		vec3 colorB = vec3(0.0, 0.5, 0.0);

   // 设置圆形中心
		vec2  center = vUv - 0.5;
		center.x *= aspect;
  
		float dist = length(center);

		float alpha = smoothstep(0.251, 0.25, dist);

		// 噪声函数
		float  n = noise(vec3(center * 0.6, time));
		vec3 color = hsl2rgb(
      (n * 0.5 + 0.2),
      0.5,
      0.5
    );
    gl_FragColor = vec4(color, alpha);
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
		clearColor: 'hsl(0, 0%, 95%)',
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
			aspect: ({width, height}) => width / height
    }
  });
};

canvasSketch(sketch, settings);
