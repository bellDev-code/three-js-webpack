import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xFFFFFF)

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

  // 빛 추가
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  // 도형 추가
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material = new THREE.MeshBasicMaterial({
    color: 0xFF7F00,
    wireframe: true
  })

  const object = new THREE.Mesh(geometry, material)
  object.position.x = -2
  scene.add(object)

  const geometry02 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xFF7F00,
    metalness: 0.9,
    roughness: 0.5,
    // transparent: true,
    // opacity: 0.5
  })

  const object02 = new THREE.Mesh(geometry02, material02)
  object02.position.x = -1
  scene.add(object02)

  const geometry03 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xFF7F00,
    clearcoat: 1,
    clearcoatRoughness: 0.2
  })

  const object03 = new THREE.Mesh(geometry03, material03)
  object03.position.x = 0
  scene.add(object03)

  const geometry04 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material04 = new THREE.MeshLambertMaterial({
    color: 0xFF7F00,
  })

  const object04 = new THREE.Mesh(geometry04, material04)
  object04.position.x = 1
  scene.add(object04)

  const geometry05 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material05 = new THREE.MeshPhongMaterial({
    color: 0xFF7F00,
    shininess: 60,
    specular: 0x004fff
  })

  const object05 = new THREE.Mesh(geometry05, material05)
  object05.position.x = 2
  scene.add(object05)

  function render(time) {
    time *= 0.001

    object.rotation.y += 0.01
    object02.rotation.y += 0.01
    object03.rotation.y += 0.01
    object04.rotation.y += 0.01
    object05.rotation.y += 0.01

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
