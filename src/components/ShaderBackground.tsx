import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - fluvial water flow pattern
const fragmentShader = `
  #ifdef GL_ES
    precision highp float;
  #endif
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;
  
  // Noise functions for fluvial patterns
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // FBM for layered detail
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for(int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.3;
      amplitude *= 0.47;
    }
    return value;
  }

  // Fluvial water flow pattern
  vec3 fluvialFlow(vec2 uv, float time) {
    // Create flowing striations
    vec2 flow = uv * 3.5;
    flow.y += time * 0.08;
    flow.x += sin(uv.y * 4.0 + time * 0.15) * 0.25;
    
    // Layered noise for depth
    float n1 = fbm(flow * 1.2);
    float n2 = fbm(flow * 2.4 + vec2(100.0));
    float n3 = fbm(flow * 0.6 + vec2(200.0));
    
    // Diagonal striations
    float striation = sin((uv.x - uv.y) * 12.0 + n1 * 3.0 + time * 0.1) * 0.5 + 0.5;
    striation = pow(striation, 2.5);
    
    // Horizontal flow lines
    float flowLines = sin(uv.y * 25.0 + n2 * 5.0 + time * 0.05) * 0.5 + 0.5;
    flowLines = smoothstep(0.3, 0.7, flowLines);
    
    // Combine patterns
    float pattern = mix(n1, striation, 0.4);
    pattern = mix(pattern, flowLines, 0.25);
    pattern += n3 * 0.15;
    
    // HydroTrace color palette - adjusted to match brand
    vec3 darkCharcoal = vec3(0.08, 0.10, 0.12);
    vec3 midBlue = vec3(0.15, 0.35, 0.42);
    vec3 aquaBlue = vec3(0.36, 0.66, 0.78);
    vec3 lightCyan = vec3(0.65, 0.78, 0.85);
    
    vec3 color = mix(darkCharcoal, midBlue, smoothstep(0.0, 0.4, pattern));
    color = mix(color, aquaBlue, smoothstep(0.3, 0.7, pattern));
    color = mix(color, lightCyan, smoothstep(0.6, 1.0, pattern * striation));
    
    return color;
  }
  
  void main() {
    vec2 uv = vUv;
    uv.y = 1.0 - uv.y;
    
    vec3 col = fluvialFlow(uv, iTime);
    
    // Add subtle vignette
    float vignette = smoothstep(1.2, 0.3, length(uv - 0.5));
    col *= mix(0.7, 1.0, vignette);
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

const WaterShaderMaterial = shaderMaterial(
  { iTime: 0, iResolution: new THREE.Vector2(1, 1) },
  vertexShader,
  fragmentShader
);

extend({ WaterShaderMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    waterShaderMaterial: any;
  }
}

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.iTime = state.clock.elapsedTime;
    const { width, height } = state.size;
    materialRef.current.iResolution.set(width, height);
  });

  return (
    <mesh ref={meshRef} position={[0, -0.75, -0.5]}>
      <planeGeometry args={[4, 4]} />
      <waterShaderMaterial ref={materialRef} side={THREE.DoubleSide} />
    </mesh>
  );
}

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  
  const camera = useMemo(() => ({ 
    position: [0, 0, 1] as [number, number, number], 
    fov: 75, 
    near: 0.1, 
    far: 1000 
  }), []);
  
  useGSAP(
    () => {
      if (!canvasRef.current) return;
      
      gsap.set(canvasRef.current, {
        filter: 'blur(20px)',
        scale: 1.1,
        autoAlpha: 0.7
      });
      
      gsap.to(canvasRef.current, {
        filter: 'blur(0px)',
        scale: 1,
        autoAlpha: 1,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3
      });
    },
    { scope: canvasRef }
  );
  
  return (
    <div ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full bg-primary" aria-hidden="true">
      <Canvas
        camera={camera}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <ShaderPlane />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-primary/30" />
    </div>
  );
};

export default ShaderBackground;
