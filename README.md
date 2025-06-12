# solar_system

The frontend of this project is a single-page, mobile-responsive web interface that renders a 3D simulation of the solar system using Three.js. It visually represents the Sun and all 8 planets (Mercury to Neptune), with orbiting motion and interactive speed control features.

1. 3D Rendering with Three.js
Sun and Planets are created using THREE.SphereGeometry with distinct materials and sizes.

Each planet is animated to orbit around the Sun using real-time trigonometric updates in the render loop.

The scene is rendered using a WebGLRenderer for high performance and cross-browser compatibility.

✅ 2. Responsive UI
The web page uses a full-screen canvas that scales with the viewport to ensure optimal viewing on both desktop and mobile devices.

UI elements (speed sliders) are fixed-positioned and styled with clean, minimal CSS for easy usability.

✅ 3. Real-Time Orbit Speed Control
Each planet has its own slider input, allowing users to change its orbital speed instantly.

Speed changes are reflected immediately in the animation loop without reloading the scene.

✅ 4. Lighting and Camera
A PointLight source simulates the Sun's illumination, enhancing realism through shading and highlights.

The camera uses PerspectiveCamera with an optimal field of view to capture all planetary orbits in a single frame.

✅ 5. Animation Loop
Animation is driven by requestAnimationFrame, ensuring smooth and consistent rendering across devices.

The angle of each planet is updated per frame, resulting in continuous and accurate orbits.


Technology	Purpose
HTML5	Structure of the page
CSS3	Responsive styling and UI layout
JavaScript	Logic and user interaction
Three.js	3D rendering of the scene, lighting, and animation
Django (Template)	Dynamic HTML rendering with backend integration


User Interface Elements
Canvas: Fullscreen rendering area for 3D objects.

Control Panel: Positioned on top-left; includes sliders labeled for each planet.

Responsive Design: Adjusts layout and controls for smaller screens.

