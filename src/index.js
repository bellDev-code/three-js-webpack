import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0X004fff)

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 3

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true 
  }
  )
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1, 1); 
  const material = new THREE.MeshBasicMaterial(
    {color: 0x999999}
  ); 
  const cube = new THREE.Mesh( geometry, material ); 
  scene.add(cube);

  function render(time) {
    time *= 0.001

    cube.rotation.x = time
    cube.rotation.y = time

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
