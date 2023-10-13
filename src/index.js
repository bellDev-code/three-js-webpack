import * as THREE from 'three';
import { WEBGL } from './webgl';

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xFFFFFF)

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true 
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement);

  // 카메라
  const fov = 80; // 화각 8-28이하 망원(확대), 화각 47 평범, 화각 63이상 광각(멀리)
  const aspect = window.innerWidth / window.innerHeight; // 종횡비 
  const near = 0.1; // 카메라의 시점이 시작되는 위치
  const far = 1000; // 카메라의 시점이 끝나는 위치
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  // camera.position.set(0, 0, 1)
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 1;
  camera.lookAt(new THREE.Vector3(0,0,0))


  // 도형 추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material = new THREE.MeshStandardMaterial({color: 0xFFA500})

  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5;
  
  scene.add(cube)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({color: 0xeeeeee})

  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI;
  plane.rotation.y = -0.2

  scene.add(plane)

  // 빛 추가
  const pointLight = new THREE.PointLight(0xffffbb, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  function render(time) {
    time *= 0.001

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}