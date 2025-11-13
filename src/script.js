import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { aleatorityCorrection, getRandomValue } from "./utils/inde.js";
import { setUpGUIControls } from "./utils/gui.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// parameteres
const parameters = {};
parameters.count = 100000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 5;
parameters.spin = 1;
parameters.randomness = 2;
parameters.randomnessPower = 5;
parameters.insideColor = "#23e754";
parameters.outsideColor = "#831b3f";

/**
 *Buffer Geometry
 */

const galaxyGgeometry = new THREE.BufferGeometry();

const positions = new Float32Array(parameters.count * 3);
const colors = new Float32Array(parameters.count * 3);

const generateGalaxy = () => {
  let colorInside = new THREE.Color(parameters.insideColor);
  let colorOutside = new THREE.Color(parameters.outsideColor);
  for (let i = 0; i < parameters.count * 3; i += 3) {
    const pos = i;
    const radius = Math.pow(Math.random(), 2) * parameters.radius;

    const currentVertex = i / 3;
    const currentBranch = currentVertex % parameters.branches;
    const branchAngle = (currentBranch / parameters.branches) * Math.PI * 2;
    const spinAngle =
      Math.pow(parameters.spin, 2) * radius * (parameters.spin < 0 ? -1 : 1);
    // ramdomness decay in reaseon of the radius
    const aleatority =
      Math.pow(radius / parameters.radius - 2, 2) * parameters.randomness * 0.2;

    const randomOffsetX =
      getRandomValue(parameters.randomness, parameters.randomnessPower) *
      aleatority;
    const randomOffsetY =
      getRandomValue(parameters.randomness, parameters.randomnessPower) *
      aleatority *
      0.2;
    const randomOffsetZ =
      getRandomValue(parameters.randomness, parameters.randomnessPower) *
      aleatority;

    const vertex = {
      x: Math.cos(branchAngle + spinAngle) * radius,
      y: randomOffsetY,
      z: Math.sin(branchAngle + spinAngle) * radius,
    };

    const randomVertex = {
      x: vertex.x + randomOffsetX,
      y: vertex.y + randomOffsetY,
      z: vertex.z + randomOffsetZ,
    };
    const vertexR = aleatorityCorrection(vertex, randomVertex, radius);
    positions[pos] = vertexR.x;
    positions[pos + 1] = vertexR.y;
    positions[pos + 2] = vertexR.z;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[pos] = mixedColor.r;
    colors[pos + 1] = mixedColor.g;
    colors[pos + 2] = mixedColor.b;
  }
  // add positions of each vertex to the geometry
  galaxyGgeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  galaxyGgeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
};

setUpGUIControls(parameters, generateGalaxy);

const galaxyMaterial = new THREE.PointsMaterial({
  size: parameters.size,
  sizeAttenuation: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});

const galaxy = new THREE.Points(galaxyGgeometry, galaxyMaterial);

generateGalaxy();
scene.add(galaxy);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animation
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
