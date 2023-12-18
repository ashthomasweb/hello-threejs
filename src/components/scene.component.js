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
            orbitRadius: 14,
            orbitSpeed: 0.01,
            orbitalAngle: 45,
            rotationalAxis: 'z',
            axialRotation: {
                axis: 'z',
                speed: 0.1 // set to the same value as orbitSpeed for tidal locking
            }
        }
        const moon1 = ThreeFactory.createMoon(moon1Options)

        const moon2Options = {
            texture: null,
            color: '0x0044dd',
            geometry: [.3, 32, 32],
            roughness: 1,
            metalness: 1,
            orbitRadius: 19,
            orbitSpeed: 0.002
        }
        // const moon2 = ThreeFactory.createMoon(moon2Options)

        const moon3Options = {
            texture: NeptuneTexture,
            color: '0x0044dd',
            geometry: [.8, 32, 32],
            roughness: 1,
            metalness: 1,
            orbitRadius: 25,
            orbitSpeed: 0.001
        }
        // const moon3 = ThreeFactory.createMoon(moon3Options)

        scene.add(moon1)


        /* Torus Rings */
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color("rgba(0, 65, 150, 1)"), // Set a color for debugging purposes
            receiveShadow: true,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide,
        })
        const torusGeometry = new THREE.TorusGeometry(8, .005, 16, 100)

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
            entry.rotation.x = 1.9
            torusGroup.push(entry)
        })
        const torus = new THREE.Mesh(torusGeometry, torusMaterial)
        torus.castShadow = true
        torus.receiveShadow = true
        scene.add(torus, ...torusGroup)

        directionalLight.target = neptune

        let moon1Position = 0
        function animate() {
            requestAnimationFrame(animate)

            neptune.rotation.x = 0.4
            neptune.rotation.y += 0.009

            neptune.position.x += 0.01

            torus.rotation.x = 1.91
            // torus.position.x += neptune.position.x
            torusGroup.forEach(ring => {
                ring.position.x = neptune.position.x
            })

            moon1.rotation[moon1.options.axialRotation.axis] += moon1.options.axialRotation.speed
            moon1Position -= moon1.orbitSpeed

            // moon2.rotation.y += moon2.orbitSpeed
            // moon3.rotation.y += moon3.orbitSpeed


            // ThreeFactory.setMoonOrbitAndPosition(moon1)
            const positionCounter = moon1Position
            const x = Math.cos(positionCounter) * moon1.orbitRadius
            const y = Math.sin(positionCounter) * Math.sin(-30 * (Math.PI / 180)) * moon1.orbitRadius // primary axis
            const z = Math.sin(positionCounter) * Math.cos(-30 * (Math.PI / 180)) * moon1.orbitRadius
            moon1.position.set(x + neptune.position.x, y, z)


            // moon1.position.set(...ThreeFactory.setMoonOrbitAndPosition(moon1Options, moon1.rotation))

            // const angle2 = moon2.rotation.y
            // const y2 = Math.cos(angle2) * moon2.orbitRadius
            // const x2 = Math.sin(angle2) * Math.sin(45 * (Math.PI / 180)) * moon2.orbitRadius
            // const z2 = Math.sin(angle2) * Math.cos(45 * (Math.PI / 180)) * moon2.orbitRadius
            // moon2.position.set(x2, y2, z2)

            // const angle3 = moon3.rotation.y
            // const y3 = Math.cos(angle3) * moon3.orbitRadius
            // const x3 = Math.sin(angle3) * Math.sin(70 * (Math.PI / 180)) * moon3.orbitRadius
            // const z3 = Math.sin(angle3) * Math.cos(70 * (Math.PI / 180)) * moon3.orbitRadius
            // moon3.position.set(x3, y3, z3)

            renderer.render(scene, camera)
        }
        animate()
    }, [])

    return <div ref={sceneRef} />
}

export default Scene