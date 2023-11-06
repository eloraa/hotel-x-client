import * as THREE from 'three';
let renderer;
export const canvas = element => {
  if (element.querySelector('canvas')) return;
  if (renderer) {
    element.appendChild(renderer.domElement);
    return;
  }

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerWidth > 800) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;
    //renderer.toneMapping = THREE.ReinhardToneMapping;
    //console.log(window.innerWidth);
  }
  //---

  element.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);

  camera.position.set(0, 2, 14);

  const scene = new THREE.Scene();
  const city = new THREE.Object3D();
  const smoke = new THREE.Object3D();
  const town = new THREE.Object3D();

  const uSpeed = 0.0008;

  //----------------------------------------------------------------- FOG background

  const setcolor = 0xd6941e;
  //   const setcolor = 0xf02050;
  //const setcolor = 0xF2F111;
  //const setcolor = 0xFF6347;

  scene.background = new THREE.Color(setcolor);
  scene.fog = new THREE.Fog(setcolor, 10, 16);
  //scene.fog = new THREE.FogExp2(setcolor, 0.05);
  //----------------------------------------------------------------- RANDOM Function
  function mathRandom(num = 8) {
    const numValue = -Math.random() * num + Math.random() * num;
    return numValue;
  }

  //----------------------------------------------------------------- CREATE City

  function init() {
    for (let i = 1; i < 30; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0xff4c41,
        side: THREE.DoubleSide,
      });
      const wmaterial = new THREE.MeshLambertMaterial({
        color: 0xff4c41,
        wireframe: true,
        transparent: true,
        opacity: 0.03,
        side: THREE.DoubleSide,
      });

      const cube = new THREE.Mesh(geometry, material);
      const floor = new THREE.Mesh(geometry, material);
      const wfloor = new THREE.Mesh(geometry, wmaterial);

      cube.add(wfloor);
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

      floor.scale.y = 0.05; //+mathRandom(0.5);
      cube.scale.y = 0.1 + Math.abs(mathRandom(8));

      const cubeWidth = 0.9;
      cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
      //cube.position.y = cube.scale.y / 2;
      cube.position.x = Math.round(mathRandom());
      cube.position.z = Math.round(mathRandom());

      floor.position.set(cube.position.x, 0 /*floor.scale.y / 2*/, cube.position.z);

      town.add(floor);
      town.add(cube);
    }
    //----------------------------------------------------------------- Particular
    const pmaterial = new THREE.MeshPhongMaterial({
      color: 0xff4c41,
      side: THREE.DoubleSide,
      opacity: 0.9,
      transparent: true,
    });
    const pgeometry = new THREE.PlaneGeometry(60, 60);
    const pelement = new THREE.Mesh(pgeometry, pmaterial);
    pelement.rotation.x = (-90 * Math.PI) / 180;
    pelement.position.y = -0.001;
    pelement.receiveShadow = true;

    city.add(pelement);
  }

  const mouse = new THREE.Vector2();

  function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  function onDocumentTouchStart(event) {
    if (event.touches.length == 1) {
      event.preventDefault();
      mouse.x = event.touches[0].pageX - window.innerWidth / 2;
      mouse.y = event.touches[0].pageY - window.innerHeight / 2;
    }
  }
  function onDocumentTouchMove(event) {
    if (event.touches.length == 1) {
      event.preventDefault();
      mouse.x = event.touches[0].pageX - window.innerWidth / 2;
      mouse.y = event.touches[0].pageY - window.innerHeight / 2;
    }
  }
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('touchstart', onDocumentTouchStart, false);
  window.addEventListener('touchmove', onDocumentTouchMove, false);

  smoke.position.y = 2;

  scene.add(city);
  city.add(smoke);
  city.add(town);

  const animate = function () {
    requestAnimationFrame(animate);

    city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
    city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
    if (city.rotation.x < -0.05) city.rotation.x = -0.05;
    else if (city.rotation.x > 1) city.rotation.x = 1;

    smoke.rotation.y += 0.01;
    smoke.rotation.x += 0.01;

    camera.lookAt(city.position);
    renderer.render(scene, camera);
  };

  init();
  animate();
};
