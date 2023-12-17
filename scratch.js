
// import SaturnRings from '../../public/Solarsystemscope_texture_2k_saturn_ring_alpha.png'
// import {
//     ringVertexShader,
//     ringFragmentShader,
//     ringShaderWithShadow
// } from '../glsl'

/* Rings via texture map */
// const ringTextureLoader = new THREE.TextureLoader()
// const ringTexture = ringTextureLoader.load(SaturnRings)
// const ringGeometry = new THREE.RingGeometry(8, 12, 64)
// const ringMaterial = new THREE.ShaderMaterial({
//     side: THREE.DoubleSide,
//     transparent: true,
//     blending: THREE.AdditiveBlending,
//     uniforms: {
//         ringTexture: {
//             value: ringTexture
//         },
//     },
//     vertexShader: ringVertexShader,
//     fragmentShader: ringFragmentShader,
//     shadowSide: THREE.DoubleSide,
//     receiveShadow: true,
//     flatShading: true,
//     opacity: 0.5
// })
// const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
// ringMesh.castShadow = true
// ringMesh.receiveShadow = true
// scene.add(ringMesh)

// const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial)
// ringMesh2.castShadow = true
// ringMesh2.receiveShadow = true
// scene.add(ringMesh2)

// const ringShadowGeometry = new THREE.RingGeometry(8, 12, 64)
// const newRingMaterial = new THREE.MeshNormalMaterial({
//     color: new THREE.Color("rgba(0, 0, 100, 1)"), // Set a color for debugging purposes
//     // blending: THREE.NormalBlending,
//     // shadowSide: THREE.DoubleSide,
//     receiveShadow: true,
//     // flatShading: true,
//     transparent: true,
//     opacity: .02, // Adjust opacity for transparency
//     side: THREE.DoubleSide,
// })
// const ringShadow = new THREE.Mesh(ringShadowGeometry, newRingMaterial)
// ringShadow.castShadow = true
// ringShadow.receiveShadow = true
// scene.add(ringShadow)
