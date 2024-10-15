import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class Buggy {
    constructor(scene) {        
        this.scene = scene;
        this.buggy
        this.wheelFrontLeft
        this.wheelFrontRight
        this.wheelRearLeft
        this.wheelRearRight
        this.steer = 0
        this.steerTo = 0
        this.speed = 0
        this.speedTo = 0
        this.angle = 0
        this.isLoaded = false
        this.loadBuggy()
    }

    steerLeft() {
        this.steerTo = -1
        //this.wheelFrontLeft.rotation.y = -Math.PI / 6
        //this.wheelFrontRight.rotation.y = -Math.PI / 6
    }

    steerRight() {
        this.steerTo = 1
        //this.wheelFrontLeft.rotation.y = Math.PI / 6
        //this.wheelFrontRight.rotation.y = Math.PI / 6
    }

    releaseSteer() {
        this.steerTo = 0
    }

    accelerate() {
        this.speedTo = 1
    }

    decelerate() {
        this.speedTo = 0
    }

    reverse() {
        this.speedTo = -1
    }

    animate() {
        this.speed += (this.speedTo - this.speed) / 100
        console.log(this.speed);
        this.wheelFrontLeft.rotation.z -= this.speed
        this.wheelFrontRight.rotation.z += this.speed
        this.wheelRearLeft.rotation.z -= this.speed
        this.wheelRearRight.rotation.z += this.speed

        const dx = Math.cos(this.angle) * this.speed
        const dz = Math.sin(this.angle) * this.speed
        this.buggy.position.x += dx
        this.buggy.position.z += dz

        this.buggy.rotation.y = -this.angle
        this.steer += (this.steerTo - this.steer) / 10
        this.wheelFrontLeft.rotation.y = -this.steer * 30 * Math.PI / 180
        this.wheelFrontRight.rotation.y = this.steer * 30 * Math.PI / 180
        this.angle += this.steer * this.speed / 10
    }

    loadBuggy() {
        console.log('load buggy');
        const loader = new GLTFLoader()
        loader.load('./assets/buggy.glb', (gltf) => {
                console.log( gltf )
                this.buggy = gltf.scene
                this.buggy.castShadow = true
                this.buggy.scale.set(0.01, 0.01, 0.01)
                this.buggy.position.y = 0.35

                this.scene.add(this.buggy)
                this.buggy.traverse((child) => {
                    console.log(child.name)
                    switch (child.name) {
                        case "Front_wheel":
                            this.wheelFrontLeft = child                            
                            break;
                            case "Front_wheel001":
                            this.wheelFrontRight = child                            
                            break;
                            case "Rear_wheel":
                            this.wheelRearLeft = child                            
                            break;
                            case "Rear_wheel001":
                            this.wheelRearRight = child                            
                            break;
                    }
                })
                this.isLoaded = true
            }
        )
    }
}
export default Buggy
