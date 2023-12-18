import * as THREE from 'three';

class ThreeFactory {

    createCube(geom) { // NEED: options array
        const geometry = new THREE.BoxGeometry(...geom);
        const material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
        const depth = new THREE.MeshDepthMaterial({ color: 0x40ff10 });
        const cube = new THREE.Mesh(geometry, material, depth);
        return cube
    }

    createPlanet(options) {
        const neptuneTextureLoader = new THREE.TextureLoader()
        const neptuneTexture = neptuneTextureLoader.load(options.texture)
        const sphereGeometry = new THREE.SphereGeometry(...options.geometry)
        const sphereMaterial = new THREE.MeshStandardMaterial({
            map: neptuneTexture,
            roughness: options.roughness,
            metalness: options.metalness
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.castShadow = true
        sphere.receiveShadow = true
        return sphere
    }

    createMoon(options) {
        console.log(options)
        const moonTextureLoader = new THREE.TextureLoader()
        const moonTexture = options.texture ? moonTextureLoader.load(options.texture) : null
        const moonGeometry = new THREE.SphereGeometry(...options.geometry)
        const moonMaterial = new THREE.MeshStandardMaterial({
            map: moonTexture,
            color: options.color,
            roughness: options.roughness,
            metalness: options.metalness
        })
        const moon = new THREE.Mesh(moonGeometry, moonMaterial)
        moon.castShadow = true
        moon.receiveShadow = true
        moon.orbitRadius = options.orbitRadius
        moon.orbitSpeed = options.orbitSpeed
        moon.options = options
        // moon.rotation[options.axialRotation.axis] = options.axialRotation.speed
        console.log(moon)
        return moon
    }

    setMoonOrbitAndPosition(moon, rotation) {
        // console.log(moon)
        // moon.rotation.y += moon.orbitSpeed
        // const angle = moon.orbitSpeed
        let x = {
            axis: 'x',
            value: null
        }
        let y = {
            axis: 'y',
            value: null
        }
        let z = {
            axis: 'z',
            value: null
        }
        const positionArray = [x, y, z]
        positionArray.forEach(axis => {
            const factor = moon.rotationalAxis === axis.axis ? moon.orbitRadius : Math.sin(moon.orbitalAngle * (Math.PI / 180)) * moon.orbitRadius
            axis.value = `${Math.cos(rotation.y) * factor}`
        })
        // console.log(x.value, y.value, z.value)
        return [x.value, y.value, z.value]
    }
}

export default new ThreeFactory()