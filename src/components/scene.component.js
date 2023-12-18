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
            color: '0x4444dd',
            geometry: [2, 32, 32],
            roughness: 0.5,
            metalness: 0.4,
            orbit: {
                primaryAxis: 'x',
                secondaryAxis: 'z',
                tertiaryAxis: 'y',
                radius: 20,
                speed: 0.02,
                angle: 90, // degree of tilt from secondary axis
            },
            axialRotation: { // rotation of the body itself
                axis: 'z',
                speed: 0.1 // set to the same value as orbitSpeed for tidal locking
            },
            positionCounter: 0
        }
        const moon1 = ThreeFactory.createMoon(moon1Options)

        const moon2Options = {
            texture: NeptuneTexture,
            color: '0x4444dd',
            geometry: [1, 32, 32],
            roughness: 0.5,
            metalness: 0.9,
            orbit: {
                primaryAxis: 'z',
                secondaryAxis: 'x',
                tertiaryAxis: 'y',
                radius: 10,
                speed: 0.1,
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


        /* Torus Rings */
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color("rgba(0, 65, 150, 1)"), // Set a color for debugging purposes
            receiveShadow: true,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide,
        })
        const torusArray = [
            [8, .001, 100, 300],
            [8.1, .002, 100, 300],
            [8.12, .001, 100, 300],
            [8.13, .002, 100, 300],
            [8.16, .001, 100, 300],
            [8.18, .001, 100, 300],
            [8.2, .002, 100, 300],
            [8.25, .002, 100, 300],
            [8.27, .001, 100, 300],
            [8.28, .001, 100, 300],
            [8.31, .001, 100, 300],
            [8.34, .001, 100, 300],
            [8.35, .001, 100, 300],
            [8.4, .002, 100, 300],
            [8.41, .001, 100, 300],
            [8.42, .001, 100, 300],
            [8.44, .002, 100, 300],
            [8.46, .001, 100, 300],
            [8.8, .002, 100, 300],
            [8.8, .01, 100, 300],
            [8.8, .01, 100, 300],
            [8.8, .01, 100, 300],
            [9.8, .01, 100, 300],
            [9.8, .01, 100, 300],
            [9.8, .01, 100, 300],
            [9.8, .01, 100, 300],
            [9.8, .01, 100, 300],
            [9.8, .01, 100, 300],
            [9.8, .01, 100, 300],
            [9.8, .01, 100, 300],
            [10.1, .01, 100, 300],
            [10.14, .01, 100, 300],
            [10.23, .01, 100, 300],
            [10.34, .01, 100, 300],
            [10.4, .01, 100, 300],
            [10.45, .01, 100, 300],
            [10.7, .01, 100, 300],
            [10.8, .01, 100, 300],
            [10.98, .01, 100, 300],
            [11.4, .01, 100, 300],
            [11.5, .01, 100, 300],
            [11.55, .01, 100, 300],
            [12, .01, 100, 300],
        ]
        let torusGroup = []
        torusArray.forEach(ring => {
            let entry = new THREE.Mesh(new THREE.TorusGeometry(...ring), torusMaterial)
            entry.castShadow = true
            entry.receiveShadow = true
            entry.rotation.x = 1.58
            torusGroup.push(entry)
        })
        scene.add(...torusGroup)

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

            // moon1.rotation[moon1.options.axialRotation.axis] += moon1.options.axialRotation.speed
            // moon1.options.positionCounter -= moon1.orbitSpeed
            // moon1.position.set(...ThreeFactory.setMoonOrbitAndPosition(moon1))
            ThreeFactory.animateMoon(moon1)
            ThreeFactory.animateMoon(moon2)

            /* 
            NOTE: The Primary and Secondary axis both pass through the CENTER of the orbit.
            The Primary is orbited around evenly.
            The Secondary is the degree of tilt away from 0.
            The Tertiary axis is intersected directly by the body, twice, along the axis.
            */

            // const positionCounter = moon1Position
            // const x = Math.cos(positionCounter) * moon1.orbitRadius // tertiary axis
            // const y = Math.sin(positionCounter) * Math.sin(20 * (Math.PI / 180)) * moon1.orbitRadius // primary axis
            // const z = Math.sin(positionCounter) * Math.cos(20 * (Math.PI / 180)) * moon1.orbitRadius // secondary axis

            // moon1.position.set(x, y, z)
            // moon1.position.set(x + x2, y + y2, z + z2) // for adding complex tilts. Additional orbital angles must be assigned.

            renderer.render(scene, camera)
        }
        animate()
    }, [])

    return <div ref={sceneRef} />
}

export default Scene