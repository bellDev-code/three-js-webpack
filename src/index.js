import * as THREE from 'three';
import { WEBGL } from './webgl';

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xFFFFFF)

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true 
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement);

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 3


  // 빛 추가
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  // 텍스쳐 추가
  const textureLoader = new THREE.TextureLoader()
  const textBasicColor = textureLoader.load('../static/textures/Gravel_001_BaseColor.jpg')
  const textNormalColor = textureLoader.load('../static/textures/Gravel_001_Normal.jpg')
  const textHeightColor = textureLoader.load('../static/textures/Gravel_001_Height.png')
  const textRoughenessColor = textureLoader.load('../static/textures/Gravel_001_Roughness.jpg')

  // 도형 추가
  const geometry = new THREE.SphereGeometry(0.3, 32, 16)
  const material = new THREE.MeshStandardMaterial({
    map: textBasicColor
  })

  const object = new THREE.Mesh(geometry, material)
  object.position.x = -2
  scene.add(object)

  const geometry02 = new THREE.SphereGeometry(0.3, 32, 16)
  const material02 = new THREE.MeshStandardMaterial({
    map: textBasicColor,
    normalMap: textNormalColor
  })

  const object02 = new THREE.Mesh(geometry02, material02)
  object02.position.x = -1
  scene.add(object02)

  const geometry03 = new THREE.SphereGeometry(0.3, 32, 16)
  const material03 = new THREE.MeshStandardMaterial({
    map: textBasicColor,
    normalMap: textNormalColor,
    displacementMap: textHeightColor,
    displacementScale: 0.1
  })

  const object03 = new THREE.Mesh(geometry03, material03)
  object03.position.x = 0
  scene.add(object03)

  const geometry04 = new THREE.SphereGeometry(0.3, 32, 16)
  const material04 = new THREE.MeshStandardMaterial({
    map: textBasicColor,
    normalMap: textNormalColor,
    displacementMap: textHeightColor,
    displacementScale: 0.1,
    roughnessMap: textRoughenessColor,
    roughness: 1
  })

  const object04 = new THREE.Mesh(geometry04, material04)
  object04.position.x = 1
  scene.add(object04)

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