import {
    useEffect,
    useRef
} from 'react'
import * as THREE from 'three'
import {
    OrbitControls
} from '../../node_modules/three/examples/jsm/controls/OrbitControls'

import ThreeFactory from '../services/threeFactory.service'
import NeptuneTexture from '../../public/neptunemap.jpg'

const Scene = () => {

    const sceneRef = useRef(null)

    useEffect(() => {

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        new OrbitControls(camera, renderer.domElement)
        sceneRef.current.appendChild(renderer.domElement)
        camera.position.z = 50

        const light = new THREE.AmbientLight(0x404040, 0.5) // soft white light
        light.castShadow = true
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6)
        const directionalLight = new THREE.DirectionalLight(0x9999ff, 4)
        directionalLight.position.set(20, 10, 30) // Adjust the light position
        directionalLight.castShadow = true
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        directionalLight.shadow.mapSize.width = 4096 * 4;
        directionalLight.shadow.mapSize.height = 4096 * 4;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 200;

        const sunLight = new THREE.PointLight(0xffffff, 1, 0, 2); // Color, intensity, distance, decay
        sunLight.position.set(0, 0, 0); // Position the light at the center of the scene (representing the sun)
        sunLight.castShadow = true; // Enable casting shadows from the sun
        // scene.add(sunLight);

        scene.add(hemisphereLight, directionalLight)

        /* Planet */
        const neptuneOptions = {
            texture: NeptuneTexture,
            geometry: [5, 64, 64],
            roughness: 0.7,
            metalness: 0.5,
        }
        const neptune = ThreeFactory.createPlanet(neptuneOptions)
        scene.add(neptune)

        /* Moons */
        const moon1Options = {
            texture: NeptuneTexture,
            // color: 0x4444dd00,
            geometry: [2, 32, 32],
            roughness: 0.5,
            metalness: 0.4,
            orbit: {
                primaryAxis: 'x',
                secondaryAxis: 'z',
                tertiaryAxis: 'y',
                radius: 30,
                speed: 0.005,
                angle: 90, // degree of tilt from secondary axis
            },
            axialRotation: { // rotation of the body itself
                axis: 'z',
                speed: 0.01 // set to the same value as orbitSpeed for tidal locking
            },
            positionCounter: 0
        }
        const moon1 = ThreeFactory.createMoon(moon1Options)

        const moon2Options = {
            texture: NeptuneTexture,
            // color: 0x4444dd00,
            geometry: [1, 32, 32],
            roughness: 0.5,
            metalness: 0.9,
            orbit: {
                primaryAxis: 'z',
                secondaryAxis: 'x',
                tertiaryAxis: 'y',
                radius: 20,
                speed: 0.005,
                angle: 30, // degree of tilt from secondary axis
            },
            axialRotation: { // rotation of the body itself
                axis: 'y',
                speed: 0.1 // set to the same value as orbitSpeed for tidal locking
            },
            positionCounter: 0
        }
        const moon2 = ThreeFactory.createMoon(moon2Options)
        scene.add(moon1, moon2)


        // const ringPlane = new THREE.MeshBasicMaterial({
        //     color: new THREE.Color("rgba(255, 255, 255, 1)"),
        //     opacity: 0.1,
        //     side: THREE.DoubleSide,
        //     transparent: true,
        //     receiveShadow: true,
        //     castShadow: true
        // })
        // const ringObject = new THREE.RingGeometry(8.1, 8.46, 500)
        // const ringActual = new THREE.Mesh(ringObject, ringPlane)
        // ringActual.rotation.x = 1.58
        // scene.add(ringActual)

        // /* Torus Rings */
        // const torusMaterial = new THREE.MeshStandardMaterial({
        //     color: new THREE.Color("rgba(255, 255, 255, 1)"), // Set a color for debugging purposes
        //     receiveShadow: true,
        //     transparent: true,
        //     opacity: .5,
        //     side: THREE.DoubleSide,
        // })
        // const torusArray = [
        //     [8.1, .002, 100, 300],
        //     [8.12, .001, 100, 300],
        //     [8.13, .002, 100, 300],
        //     [8.16, .001, 100, 300],
        //     [8.18, .001, 100, 300],
        //     [8.2, .002, 100, 300],
        //     [8.25, .002, 100, 300],
        //     [8.27, .001, 100, 300],
        //     [8.28, .001, 100, 300],
        //     [8.31, .001, 100, 300],
        //     [8.34, .001, 100, 300],
        //     [8.35, .001, 100, 300],
        //     [8.4, .002, 100, 300],
        //     [8.41, .001, 100, 300],
        //     [8.42, .001, 100, 300],
        //     [8.44, .002, 100, 300],
        //     [8.46, .001, 100, 300],
        //     // [8.8, .002, 100, 300],
        //     // [8.8, .01, 100, 300],
        //     // [8.8, .01, 100, 300],
        //     // [8.8, .01, 100, 300],
        //     // [9.8, .01, 100, 300],
        //     // [9.8, .01, 100, 300],
        //     // [9.8, .01, 100, 300],
        //     // [9.8, .01, 100, 300],
        //     // [9.8, .01, 100, 300],
        //     // [9.8, .01, 100, 300],
        //     // [9.8, .01, 100, 300],
        //     // [9.8, .01, 100, 300],
        //     // [10.1, .01, 100, 300],
        //     // [10.14, .01, 100, 300],
        //     // [10.23, .01, 100, 300],
        //     // [10.34, .01, 100, 300],
        //     // [10.4, .01, 100, 300],
        //     // [10.45, .01, 100, 300],
        //     // [10.7, .01, 100, 300],
        //     // [10.8, .01, 100, 300],
        //     // [10.98, .01, 100, 300],
        //     // [11.4, .01, 100, 300],
        //     // [11.5, .01, 100, 300],
        //     // [11.55, .01, 100, 300],
        //     // [12, .01, 100, 300],
        // ]
        // let torusGroup = []
        // torusArray.forEach(torusEntry => {
        //     let entry = new THREE.Mesh(new THREE.TorusGeometry(...torusEntry), torusMaterial)
        //     entry.castShadow = true
        //     entry.receiveShadow = true
        //     entry.rotation.x = 1.58
        //     torusGroup.push(entry)
        // })

        const ring1Options = {
            width: .4,
            innerRadius: 8.1,
            rings: {
                color: new THREE.Color("rgba(255, 255, 255, 1)"),
                opacity: 0.5,
                transparent: true,
                receiveShadow: true,
                castShadow: true
            },
            field: {
                color: new THREE.Color("rgba(255, 255, 255, 1)"),
                opacity: 0.1,
                receiveShadow: true,
                transparent: true,
            },
            rotation: {
                x: 1.58,
                y: 0,
                z: 0
            },
        }

        
        const ring2Options = {
            width: .8,
            innerRadius: 10,
            rings: {
                color: new THREE.Color("rgba(255, 50, 255, 1)"),
                opacity: 0.5,
                transparent: true,
                receiveShadow: true,
                castShadow: true
            },
            field: {
                color: new THREE.Color("rgba(255, 50, 255, 1)"),
                opacity: 0.1,
                receiveShadow: true,
                transparent: true,
            },
            rotation: {
                x: 1.68,
                y: 0,
                z: 0
            },
        }

        const ring3Options = {
            width: 5,
            innerRadius: 15,
            rings: {
                color: new THREE.Color("rgba(50, 50, 255, 1)"),
                opacity: 0.5,
                transparent: true,
                receiveShadow: true,
                castShadow: true
            },
            field: {
                color: new THREE.Color("rgba(50, 50, 255, 1)"),
                opacity: 0.1,
                receiveShadow: true,
                transparent: true,
            },
            rotation: {
                x: 1.58,
                y: 0,
                z: 0
            },
        }

        const ring1 = ThreeFactory.createRingGroup(ring1Options)
        const ring2 = ThreeFactory.createRingGroup(ring2Options)
        const ring3 = ThreeFactory.createRingGroup(ring3Options)


        scene.add(...ring1.ringGroup, ring1.ringField)
        scene.add(...ring2.ringGroup, ring2.ringField)
        scene.add(...ring3.ringGroup, ring3.ringField)



        directionalLight.target = neptune

        // let moon1Position = 0
        function animate() {
            requestAnimationFrame(animate)

            neptune.rotation.x = 0
            neptune.rotation.y += 0.009

            // neptune.position.x += 0.01 // move the planet
            // torusGroup.forEach(ring => {
            // ring.position.x = neptune.position.x // move rings with planet
            // })

            ThreeFactory.animateMoon(moon1)
            ThreeFactory.animateMoon(moon2)

            renderer.render(scene, camera)
        }
        animate()
    }, [])

    return <div ref={sceneRef} />
}

export default Scene