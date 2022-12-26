// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const canvasSketch = require("canvas-sketch");
const eases = require('eases')
const BezierEasing = require('bezier-easing')

const glslify = require('glslify');

const settings = {
	fps: 24,
	duration: 4,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("hsl(0, 0%, 95%)", 1.0);

  // Setup a camera
  const camera = new THREE.OrthographicCamera()
  // camera.position.set(0, 0, -4);
  // camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();
  const mesgs = []
  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 35, 32);
	const palette = random.pick(palettes)
  

	const vertexShader = glslify(`
    varying vec2 vUv;
    uniform float time;
    #pragma glslify: noise = require('glsl-noise/simplex/4d');
 
    void main () {
      vUv = uv;
      vec3 transformed = position.xyz;
      // float offset = 0.0;
      // offset += 0.5 * (noise(vec4(normal.xyz * 1.0, time * 0.25)) * 0.5 + 0.5);
      // transformed += normal * offset;
			transformed += noise(vec4(transformed.xyz * 4.0, time));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `);

	const fragmentShader = glslify(`
	varying vec2 vUv;
	uniform float time;
	#pragma glslify: hsl2rgb = require('glsl-hsl2rgb');
	#pragma glslify: noise = require('glsl-noise/simplex/3d');
	uniform vec3 color;
	void main () {
		// vec3 color = hsl2rgb(mod(vUv.y * 0.1 + time * 0.1, 1.0), 0.5, 0.5);

		// float offect = noise(vec3(vUv.xy * 0.5, time));
		// gl_FragColor = vec4(vec3( color * vUv.x + offect), 1.0);


		// float alpha = smoothstep(0.251, 0.25, dist);

		float  n = noise(vec3(vUv.xy , time));
		vec3 color = hsl2rgb(
      (n * 0.5 + 0.2),
      0.5,
      0.5
    );
		gl_FragColor = vec4(color, 1.0);
	}
`);


	for(let i = 0; i < 30; i++) {
		// Setup a material
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
        time: { value: 0 },
				color: { value: new  THREE.Color(random.pick(palette))}
      }
		});

		// Setup a mesh with geometry + material
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.set( random.range(-1, 1), random.range(-1, 1), random.range(-1, 1))
		mesh.scale.set( random.range(-1, 1), random.range(-1, 1), random.range(-1, 1))
		mesh.scale.multiplyScalar(0.5)
		scene.add(mesh);
		mesgs.push(mesh)
	}

	scene.add(new THREE.AmbientLight('hsl(0, 0%, 25%)'))

	const light = new  THREE.DirectionalLight('white', 1)
	light.position.set(0,0,4)
	scene.add(light)
	const easing = BezierEasing(0.12,0.62,1, 0.31);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
			renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      const aspect = viewportWidth / viewportHeight;

			// Ortho zoom
			const zoom = 1;

			// Bounds
			camera.left = -zoom * aspect;
			camera.right = zoom * aspect;
			camera.top = zoom;
			camera.bottom = -zoom;

			// Near/Far
			camera.near = -100;
			camera.far = 100;

			// Set position & look at world center
			camera.position.set(zoom, zoom, zoom);
			// camera.scale.manhattanDistanceTo(0.5)
			camera.lookAt(new THREE.Vector3());

			// Update the camera
			camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ playhead }) {
      // controls.update();
			const t = Math.sin(playhead * Math.PI ) 
			// scene.rotation.z = easing(t)

			mesgs.forEach( item => {
				item.material.uniforms.time.value = playhead;
			})
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      // controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
