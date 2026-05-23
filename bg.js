// bg.js - Three.js animated background
// This script creates a full‑screen WebGL canvas behind the glass‑morphism UI.
// It is intentionally lightweight and uses only the core Three.js library.

// Ensure Three.js is loaded via CDN before this script runs.

(() => {
  const container = document.getElementById('bg-canvas');
  if (!container) return;

  // Renderer with transparent background so UI shows through.
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Lights – ambient for base illumination, point for subtle glow.
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  const point = new THREE.PointLight(0xffffff, 0.8);
  point.position.set(5, 5, 5);
  scene.add(point);

  // TorusKnot geometry.
  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 1,
    metalness: 0.5,
    roughness: 0.2,
  });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  // Animation loop.
  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.003;
    torus.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();

  // Resize handling.
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
})();
