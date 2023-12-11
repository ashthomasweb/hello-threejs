
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeFactory from '../services/threeFactory.service';

import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls'
import Neptune from '../../public/neptunemap.jpg'
import SaturnRings from '../../public/Solarsystemscope_texture_2k_saturn_ring_alpha.png'

// Vertex shader
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment shader
const fragmentShader = `
uniform sampler2D texture;
varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(texture, vUv);
}
`;

const Scene = () => {
    // const loader = new GLTFLoader();

    const sceneRef = useRef(null)

    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls(camera, renderer.domElement);
        renderer.setSize(window.innerWidth, window.innerHeight);

        sceneRef.current.appendChild(renderer.domElement);


        camera.position.z = 10;

        const light = new THREE.AmbientLight(0x404040, 2); // soft white light
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
        scene.add(light, hemisphereLight)

        const cube = ThreeFactory.createCube([1, 1, 1])
        const cube2 = ThreeFactory.createCube([1.4, 1.4, 1.4])

        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load(Neptune)

        const ringTextureLoader = new THREE.TextureLoader()
        const ringTexture = ringTextureLoader.load(SaturnRings)


        const sphereGeometry = new THREE.SphereGeometry(5, 64, 64)
        const sphereMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.7,
            metalness: 0.5
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.castShadow = true
        sphere.receiveShadow = true

        // Create a shader material
        const material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide, // Render both sides of the geometry
            transparent: true,       // Enable transparency
            blending: THREE.NormalBlending,  // Adjust blending mode if needed
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                ringTexture: { value: ringTexture },
            },
            vertexShader: `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,
            fragmentShader: `
uniform sampler2D ringTexture;
varying vec2 vUv;

void main() {
    // Convert UV coordinates to polar coordinates
    float angle = atan(vUv.y - 0.5, vUv.x - 0.5) + 3.14159265359;
    float radius = length(vUv - vec2(0.5, 0.5)) * 2.0; // Adjust the multiplier to control the radius
  
    // Map polar coordinates to texture coordinates with a 90-degree rotation
    vec2 circularUV = vec2((angle + 1.57079632679) / (2.0 * 3.14159265359), radius);
  
    // Sample the texture with alpha
    vec4 texColor = texture2D(ringTexture, circularUV);
    
    // Use premultiplied alpha blending to correctly handle transparency
    gl_FragColor = vec4(texColor.rgb * texColor.a, texColor.a);
}
`
        })




        // Create a ring geometry
        const ringGeometry = new THREE.RingGeometry(8, 12, 64); // Inner radius, outer radius, segments
        // Create a mesh with the ring geometry and shader material
        const ringMesh = new THREE.Mesh(ringGeometry, material);

        // Add the ring mesh to the scene
        scene.add(ringMesh);

        // // Create a custom shader material for circular texture mapping
        // const ringMaterial = new THREE.MeshStandardMaterial({
        //     map: ringTexture,
        //     side: THREE.DoubleSide, // Render both sides of the geometry
        //     roughness: 0.7,
        //     metalness: 0.5,
        // });
        // const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        // ring.rotation.x = Math.PI / 2; // Rotate the ring to be horizontal
        // ring.receiveShadow = true
        // // ring.castShadow = true
        // scene.add(ring);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
        directionalLight.position.set(10, 10, 10); // Adjust the light position
        directionalLight.target = sphere; // Point the light at the sphere
        directionalLight.castShadow = true
        scene.add(directionalLight);

        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        // const centerPoint = new THREE.Object3D()
        // centerPoint.add(cube)
        // cube.position.set(2,0,0)

        // const orbitRadius = 5
        // const orbitSpeed = 0.04

        scene.add(sphere);

        function animate() {
            requestAnimationFrame(animate);

            sphere.rotation.x = 0.4
            sphere.rotation.y += 0.002
            ringMesh.rotation.x = 1.91;
            ringMesh.rotation.z += 0.01;
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            // cube2.rotation.x += 0.03;
            // cube2.rotation.y += 0.02;

            // centerPoint.rotation.y += orbitSpeed;
            // cube.position.x = Math.cos(centerPoint.rotation.y) * orbitRadius;
            // cube.position.z = Math.sin(centerPoint.rotation.y) * orbitRadius;

            renderer.render(scene, camera);
        }
        animate();
    }, [])

    return (
        <div ref={sceneRef} >

        </div>
    )

}

export default Scene
