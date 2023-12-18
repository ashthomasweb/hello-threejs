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

    // NEW
    // createMoons(moonOptionArray) {
    //     const moons = []
    //     moonOptionArray.forEach(moonOptions => {
    //         moons.push(this.createMoon(moonOptions))
    //     })
    //     return moons
    // }
    // END

    createMoon(options) {
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
        moon.options = options
        return moon
    }

    setMoonOrbitAndPosition(moon) {
        const orbit = moon.options.orbit
        const position = moon.options.positionCounter

        const primaryAxis = Math.sin(position) * Math.sin(orbit.angle * (Math.PI / 180)) * orbit.radius
        const secondaryAxis = Math.sin(position) * Math.cos(orbit.angle * (Math.PI / 180)) * orbit.radius
        const tertiaryAxis = Math.cos(position) * orbit.radius

        let axes = {
            x: null,
            y: null,
            z: null
        }

        axes[orbit.primaryAxis] = primaryAxis
        axes[orbit.secondaryAxis] = secondaryAxis
        axes[orbit.tertiaryAxis] = tertiaryAxis

        return [axes.x, axes.y, axes.z]
    }

    animateMoon(moon) {
        moon.rotation[moon.options.axialRotation.axis] += moon.options.axialRotation.speed
        moon.options.positionCounter -= moon.options.orbit.speed
        moon.position.set(...this.setMoonOrbitAndPosition(moon))
    }
}

export default new ThreeFactory()