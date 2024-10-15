import * as THREE from 'three'
import Lights from "./src/Lights"
import World from "./src/World"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setAnimationLoop( animate )
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild( renderer.domElement )

const lights = new Lights()
scene.add( lights.directionalLight )

const world = new World(scene, camera)

camera.position.z = 5
camera.position.y = 1.6

function animate() {
    world.animate()
    renderer.render( scene, camera )
}

window.addEventListener('resize', function(event){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )
})

console.log("Hello World!")
