import * as THREE from 'three'

class Lights {
    
    constructor(){
        this.ambientLight
        this.pointLight
        this.directionalLight
        this.hemisphereLight
        this.spotLight

        this.addLights()
    }

    addLights(){
        console.log("creating Lights")
        this.ambientLight = new THREE.AmbientLight( 0xffffff, 4 )
        
        this.hemisphereLight = new THREE.HemisphereLight( 0xffff00, 0x0000ff, 1 )
        
        this.spotLight = new THREE.SpotLight( 0xffffff, 20 );
        this.spotLight.position.set( -1, 0, 1 );
        
        this.pointLight = new THREE.PointLight( 0xff0000, 200, 100 );
        this.pointLight.position.set( 5, 5, 5 );
        this.pointLight.castShadow = true
        
        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 )
        this.directionalLight.castShadow = true
        
        this.directionalLight.position.y = 100
        this.directionalLight.position.z = 3
        
        
        //Set up shadow properties for the light (not necessary, but useful for tweaking)
        this.directionalLight.shadow.mapSize.width = 512; // default
        this.directionalLight.shadow.mapSize.height = 512; // default
        this.directionalLight.shadow.camera.near = 0.5; // default
        this.directionalLight.shadow.camera.far = 500; // default        

    }

}

export default Lights
