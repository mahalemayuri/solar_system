import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(0, 0, 0); // Sun position light
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sun (yellow, basic material)
const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFDB813 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planets data: name, size, distance from sun, default speed, color
const planetData = [
  { name: 'Mercury', size: 0.3, distance: 6, speed: 0.04, color: 0xaaaaaa },
  { name: 'Venus', size: 0.6, distance: 8, speed: 0.03, color: 0xffcc99 },
  { name: 'Earth', size: 0.65, distance: 10, speed: 0.02, color: 0x3399ff },
  { name: 'Mars', size: 0.5, distance: 12, speed: 0.018, color: 0xff3300 },
  { name: 'Jupiter', size: 1.2, distance: 16, speed: 0.01, color: 0xff9966 },
  { name: 'Saturn', size: 1.0, distance: 20, speed: 0.009, color: 0xffcc66 },
  { name: 'Uranus', size: 0.8, distance: 24, speed: 0.008, color: 0x66ffff },
  { name: 'Neptune', size: 0.8, distance: 28, speed: 0.007, color: 0x6666ff }
];

// Create planets mesh and initial angle for orbiting
const planets = planetData.map(data => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: data.color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return {
    ...data,
    mesh,
    angle: Math.random() * Math.PI * 2 // random start angle for variety
  };
});

// Create controls container dynamically
const controlsDiv = document.createElement('div');
controlsDiv.style.position = 'fixed';
controlsDiv.style.top = '10px';
controlsDiv.style.left = '10px';
controlsDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
controlsDiv.style.color = 'white';
controlsDiv.style.padding = '10px';
controlsDiv.style.borderRadius = '8px';
controlsDiv.style.maxHeight = '90vh';
controlsDiv.style.overflowY = 'auto';
controlsDiv.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(controlsDiv);

planets.forEach(p => {
  const label = document.createElement('label');
  label.style.display = 'block';
  label.style.marginBottom = '8px';

  label.innerText = `${p.name} speed: `;

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '0.1';
  slider.step = '0.001';
  slider.value = p.speed;
  slider.style.width = '150px';
  slider.style.marginLeft = '10px';

  slider.addEventListener('input', (e) => {
    p.speed = parseFloat(e.target.value);
  });

  label.appendChild(slider);
  controlsDiv.appendChild(label);
});

// Pause/Resume button
const pauseBtn = document.createElement('button');
pauseBtn.textContent = 'Pause';
pauseBtn.style.marginTop = '10px';
pauseBtn.style.padding = '5px 10px';
pauseBtn.style.cursor = 'pointer';
controlsDiv.appendChild(pauseBtn);

let paused = false;
pauseBtn.addEventListener('click', () => {
  paused = !paused;
  pauseBtn.textContent = paused ? 'Resume' : 'Pause';
});

// Animate planets orbiting the sun
function animate() {
  requestAnimationFrame(animate);

  if (!paused) {
    planets.forEach(p => {
      p.angle += p.speed;
      const x = Math.cos(p.angle) * p.distance;
      const z = Math.sin(p.angle) * p.distance;
      p.mesh.position.set(x, 0, z);
    });
  }

  renderer.render(scene, camera);
}

animate();

// Responsive resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
