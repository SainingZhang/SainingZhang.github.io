import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/DRACOLoader';

const W_H = 16 / 9;
const allModelUrl = [
  './glb/table_31249.glb', './glb/storage_47648.glb', './glb/storage_45503.glb', './glb/oven_101918.glb', './glb/table_25493.glb', 
  './glb/all.glb', 
  './glb/cab1r.glb', './glb/cab1r2p.glb', './glb/microwave.glb', './glb/cab3r.glb', './glb/washing_machine.glb',
  // './glb/blade_103706.glb', './glb/oven_101917.glb', './glb/scissor_11100.glb', './glb/USB_100109.glb', './glb/stapler_103111.glb', 
  // './glb/washer_103776.glb', './glb/storage_45135.glb', './glb/fridge_10905.glb', './glb/laptop_10211.glb', './glb/foldchair_102255.glb'
];
const allCanvas = document.querySelectorAll('canvas');
const allRenders = [];

// Process all canvas
for (let i = 0; i < allCanvas.length; i++) {
  const canvas = allCanvas[i];
  const scene = new THREE.Scene();
  const modelUrl = new URL(allModelUrl[i], import.meta.url);

  // load glb model and add to scene
  let mixer;
  const draco = new DRACOLoader();
  draco.setDecoderConfig({ type: 'js' });
  draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

  const assetLoader = new GLTFLoader();
  assetLoader.setDRACOLoader(draco)
  assetLoader.load(modelUrl.href, function(gltf) {
      const model = gltf.scene;
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      clips.forEach(function(clip) {
          const action = mixer.clipAction(clip);
          action.play();
      });
  }, undefined, function(error) {
      console.error(error);
  });

  // create camera
  const camera = new THREE.PerspectiveCamera(45, W_H, 0.1, 100);
  camera.position.set(3, 2, -3);
  scene.add(camera);

  // create light
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  // create grid
  const grid = new THREE.GridHelper(30, 30);
  scene.add(grid);

  // create controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.object.position.set(camera.position.x, camera.position.y, camera.position.z);
  controls.target = new THREE.Vector3(0, 0, 0);
  controls.update();

  // create renderer
  const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (mixer)
      mixer.update(clock.getDelta());
    renderer.render(scene, camera);
  });

  allRenders.push(renderer);
}

// resize renderers
function resizeRenderers() {
  let content_width = document.querySelector('#teaser-demo').offsetWidth * 0.8;
  for (let i = 0; i < allRenders.length; i++) {
    allRenders[i].setSize(content_width, content_width / W_H);
  }
}
window.addEventListener('resize', () => {
  resizeRenderers();
})
resizeRenderers();
