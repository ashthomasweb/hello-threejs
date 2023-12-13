import * as THREE from 'three';

class ThreeFactory {

    createCube(geom) {
        const geometry = new THREE.BoxGeometry(...geom);
        const material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
        const depth = new THREE.MeshDepthMaterial({ color: 0x40ff10 });
        const cube = new THREE.Mesh(geometry, material, depth);
        return cube
    }
}

export default new ThreeFactory()