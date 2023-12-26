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

    // exampleMoon1.position.set(x + x2, y + y2, z + z2) // for adding complex tilts. Additional orbital angles must be assigned.
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

        /* 
        NOTE: The Primary and Secondary axis both pass through the CENTER of the orbit.
        The Primary is orbited around evenly.
        The Secondary is the degree of tilt away from 0.
        The Tertiary axis is intersected directly by the body, twice, along the axis.
        */

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

    createRingGroup(ringOptions) {
        const ring = ringOptions.rings
        const field = ringOptions.field
        
        // debugger
        /* Ring Field Plane */
        const fieldMaterial = new THREE.MeshBasicMaterial({
            color: field.color,
            opacity: field.opacity,
            side: THREE.DoubleSide,
            // receiveShadow: true,
            transparent: true
            // castShadow: true
        })

        const fieldGeometry = new THREE.RingGeometry(ringOptions.innerRadius, ringOptions.innerRadius + ringOptions.width, 500)
        const fieldActual = new THREE.Mesh(fieldGeometry, fieldMaterial)
        fieldActual.rotation.x = ringOptions.rotation.x
        fieldActual.rotation.y = ringOptions.rotation.y
        fieldActual.rotation.z = ringOptions.rotation.z

        /* Torus Rings Material */
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: ring.color,
            opacity: ring.opacity,
            receiveShadow: true,
            castShadow: true,
            transparent: true,
            // side: THREE.DoubleSide,
        })

        const torusArray = []
        for (let i = 0; i < ringOptions.width * 100; i++) {
            Math.floor(Math.random() * 2) === 1 && torusArray.push([ringOptions.innerRadius + (i / 100), Math.floor(Math.random * 2) === 1 ? .001 : .002, 100, 300])
        }

        let torusGroup = []
        torusArray.forEach(torusEntry => {
            let entry = new THREE.Mesh(new THREE.TorusGeometry(...torusEntry), torusMaterial)
            entry.castShadow = true
            entry.receiveShadow = true
            entry.rotation.x = ringOptions.rotation.x
            entry.rotation.y = ringOptions.rotation.y
            entry.rotation.z = ringOptions.rotation.z
            torusGroup.push(entry)
        })

        return { ringGroup: torusGroup, ringField: fieldActual }
    }
}

export default new ThreeFactory()




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
// ]