import {
    useEffect,
    useRef
} from 'react'
import * as THREE from 'three'
import ThreeFactory from '../services/threeFactory.service'

import {
    OrbitControls
} from '../../node_modules/three/examples/jsm/controls/OrbitControls'
import Neptune from '../../public/neptunemap.jpg'
import SaturnRings from '../../public/Solarsystemscope_texture_2k_saturn_ring_alpha.png'
import {
    ringVertexShader,
    ringFragmentShader,
    ringShaderWithShadow
} from '../glsl'

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
        // light.shadow.camera.near = 0.5
        // light.shadow.camera.far = 100
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6)
        const directionalLight = new THREE.DirectionalLight(0x9999ff, 4)
        directionalLight.position.set(20, 10, 30) // Adjust the light position
        directionalLight.castShadow = true
        // directionalLight.shadow.camera.near = 1.5
        // directionalLight.shadow.camera.far = 200

        // TEST
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        directionalLight.shadow.mapSize.width = 4096 * 4;
        directionalLight.shadow.mapSize.height = 4096 * 4;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 200;
        // END

        const sunLight = new THREE.PointLight(0xffffff, 1, 0, 2); // Color, intensity, distance, decay
        sunLight.position.set(0, 0, 0); // Position the light at the center of the scene (representing the sun)
        sunLight.castShadow = true; // Enable casting shadows from the sun
        // scene.add(sunLight);

        scene.add(hemisphereLight, directionalLight)




        /* Planet */
        const neptuneTextureLoader = new THREE.TextureLoader()
        const neptuneTexture = neptuneTextureLoader.load(Neptune)
        const sphereGeometry = new THREE.SphereGeometry(5, 64, 64)
        const sphereMaterial = new THREE.MeshStandardMaterial({
            map: neptuneTexture,
            roughness: 0.7,
            metalness: 0.5
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.castShadow = true
        sphere.receiveShadow = true
        scene.add(sphere)

        /* Moon */
        // const moonTextureLoader = new THREE.TextureLoader()
        // const moonTexture = moonTextureLoader.load(MoonTexture)
        const moonGeometry = new THREE.SphereGeometry(.6, 32, 32)
        const moonMaterial = new THREE.MeshStandardMaterial({
            // map: moonTexture,
            color: '0x4444dd',
            roughness: 0.5,
            metalness: 0.2
        })
        const moon = new THREE.Mesh(moonGeometry, moonMaterial)
        moon.castShadow = true
        moon.receiveShadow = true
        const moonOrbitRadius = 14
        const moonOrbitSpeed = 0.005
        scene.add(moon)


        /* Ring */
        const ringTextureLoader = new THREE.TextureLoader()
        const ringTexture = ringTextureLoader.load(SaturnRings)
        const ringGeometry = new THREE.RingGeometry(8, 12, 64)
        const ringMaterial = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            blending: THREE.AdditiveBlending,
            uniforms: {
                ringTexture: {
                    value: ringTexture
                },
            },
            vertexShader: ringVertexShader,
            fragmentShader: ringFragmentShader,
            shadowSide: THREE.DoubleSide,
            receiveShadow: true,
            flatShading: true,
            opacity: 0.5
        })
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
        ringMesh.castShadow = true
        ringMesh.receiveShadow = true
        // scene.add(ringMesh)

        const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial)
        ringMesh2.castShadow = true
        ringMesh2.receiveShadow = true
        // scene.add(ringMesh2)

        // TEST
        const ringShadowGeometry = new THREE.RingGeometry(8, 12, 64)
        const newRingMaterial = new THREE.MeshNormalMaterial({
            color: new THREE.Color("rgba(0, 0, 100, 1)"), // Set a color for debugging purposes
            // blending: THREE.NormalBlending,
            // shadowSide: THREE.DoubleSide,
            receiveShadow: true,
            // flatShading: true,
            transparent: true,
            opacity: .02, // Adjust opacity for transparency
            side: THREE.DoubleSide,
        })
        const ringShadow = new THREE.Mesh(ringShadowGeometry, newRingMaterial)
        ringShadow.castShadow = true
        ringShadow.receiveShadow = true
        // scene.add(ringShadow)

        // END

        const torusMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color("rgba(0, 65, 150, 1)"), // Set a color for debugging purposes
            // blending: THREE.NormalBlending,
            // shadowSide: THREE.DoubleSide,s
            receiveShadow: true,
            // flatShading: true,
            transparent: true,
            opacity: 1, // Adjust opacity for transparency
            side: THREE.DoubleSide,
        })
        const torusGeometry = new THREE.TorusGeometry(8, .005, 16, 100);

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
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.castShadow = true
        torus.receiveShadow = true

        // Add the torus to the scene
        scene.add(torus, ...torusGroup);





        directionalLight.target = sphere // Point the light at the sphere

        function animate() {
            requestAnimationFrame(animate)

            sphere.rotation.x = 0.4
            sphere.rotation.y += 0.002
            ringMesh.rotation.x = 1.91
            ringShadow.rotation.x = 1.91
            // ringShadow.position.z = -0.01

            ringMesh2.rotation.x = 1.91
            ringMesh2.position.z = -0.02
            torus.rotation.x = 1.91

            moon.rotation.y += moonOrbitSpeed

            // Update moon position based on a 45-degree angle orbit
            const angle = moon.rotation.y;
            const z = Math.cos(angle) * moonOrbitRadius;
            const x = Math.sin(angle) * Math.sin(45 * (Math.PI / 180)) * moonOrbitRadius;
            const y = Math.sin(angle) * Math.cos(45 * (Math.PI / 180)) * moonOrbitRadius;
            moon.position.set(x, y, z);
            // cube.rotation.x += 0.01
            // cube.rotation.y += 0.01
            // cube2.rotation.x += 0.03
            // cube2.rotation.y += 0.02

            // centerPoint.rotation.y += orbitSpeed
            // cube.position.x = Math.cos(centerPoint.rotation.y) * orbitRadius
            // cube.position.z = Math.sin(centerPoint.rotation.y) * orbitRadius

            renderer.render(scene, camera)
        }
        animate()
    }, [])

    return ( <
        div ref = {
            sceneRef
        }
        />
    )

}

export default Scene