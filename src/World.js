import * as THREE from 'three'
import Buggy from "./Buggy";

class World{
    constructor(scene, camera){
        this.scene = scene
        this.camera = camera
        this.cube
        this.plane
        this.addObjects()

        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()

        this.onPointerMove = this.onPointerMove.bind(this)
        window.addEventListener( 'pointermove', this.onPointerMove )

        document.addEventListener('keydown', (event) => {
            console.log(event);
            if(event.key == 'a') {
                this.buggy.steerLeft()
            }
            if(event.key == 'd') {
                this.buggy.steerRight()
            }
            if(event.key == 'w') {
                this.buggy.accelerate()
            }
            if(event.key == 's') {
                this.buggy.reverse()
            }
        })

        document.addEventListener('keyup', (event) => {
            console.log(event);
            if(event.key == 'a') {
                this.buggy.releaseSteer()
            }
            if(event.key == 'd') {
                this.buggy.releaseSteer()
            }
            if(event.key == 'w') {
                this.buggy.decelerate()
            }
            if(event.key == 's') {
                this.buggy.decelerate()
            }
        })
    }

    onPointerMove( event ) {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        //console.log(this.pointer)
    }

    addObjects(){
        const geometry = new THREE.BoxGeometry( 1, 1, 1 )
        const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
        this.cube = new THREE.Mesh( geometry, material )
        this.cube.position.y = 1
        this.cube.castShadow = true

        const planeGeometry = new THREE.PlaneGeometry( 10, 10 );
        const planeMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
        this.plane = new THREE.Mesh( planeGeometry, planeMaterial );
        this.plane.rotation.x = -Math.PI / 2
        this.plane.receiveShadow = true
        console.log(this.plane)

        this.scene.add(this.plane)
        //this.scene.add(this.cube)

        this.buggy = new Buggy(this.scene)
    }

    animate(){
        if(this.buggy.isLoaded) {
            this.buggy.animate()
        }
        
        this.cube.rotation.y += 0.1
        this.cube.rotation.x += 0.01

        this.cube.position.z += 0.001
        this.cube.position.x += 0.001

        this.cube.material.color.set(0xffffff)

        
        // update the picking ray with the camera and pointer position
        this.raycaster.setFromCamera( this.pointer, this.camera )
        // calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects( this.scene.children );
        for ( let i = 0; i < intersects.length; i ++ ) {
            //intersects[ i ].object.material.color.set( 0xff0000 );
            //console.log(intersects.length)
        }
         
    }
}
export default World
