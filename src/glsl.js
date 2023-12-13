export const ringVertexShader = `
    varying vec2 vUv;

    void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

export const ringFragmentShader = `
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

export const ringShaderWithShadow = `
uniform sampler2D ringTexture;
varying vec2 vUv;

float computeShadow() {
    // Add your shadow calculation logic here
    // This function should return a value between 0.0 (fully in shadow) and 1.0 (fully lit)
    // Example: return 1.0 - shadow2D(shadowMap, shadowCoord).r;
    return 1.0;  // Placeholder value, replace with your shadow calculation
}

void main() {
    float shadowIntensity = computeShadow();

    // Convert UV coordinates to polar coordinates
    float angle = atan(vUv.y - 0.5, vUv.x - 0.5) + 3.14159265359;
    float radius = length(vUv - vec2(0.5, 0.5)) * 2.0;

    // Map polar coordinates to texture coordinates with a 90-degree rotation
    vec2 circularUV = vec2((angle + 1.57079632679) / (2.0 * 3.14159265359), radius);

    // Sample the texture with alpha
    vec4 texColor = texture2D(ringTexture, circularUV);

    // Use premultiplied alpha blending to correctly handle transparency
    gl_FragColor = vec4(texColor.rgb * texColor.a * shadowIntensity, texColor.a);
}
`