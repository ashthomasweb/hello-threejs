
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeFactory from '../services/threeFactory.service'

import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls'


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


        camera.position.z = 5;

        const light = new THREE.AmbientLight(0x404040, 0.5); // soft white light

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
        
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
        // const depth = new THREE.MeshDepthMaterial({ color: 0x40ff10 });

        const cube = ThreeFactory.createCube()
        scene.add(directionalLight, cube, hemisphereLight, light );

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
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
