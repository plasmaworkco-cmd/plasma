'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import gsap from 'gsap';

import {
    abs,
    blendScreen,
    float,
    mod,
    mx_cell_noise_float,
    oneMinus,
    smoothstep,
    texture,
    uniform,
    uv,
    vec2,
    vec3,
    pass,
    mix,
    add,
} from 'three/tsl';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE);

/* ─────────────────────── POST PROCESSING ─────────────────────── */
const PostProcessing = ({
    strength = 1,
    threshold = 1,
    fullScreenEffect = true,
}) => {
    const { gl, scene, camera } = useThree();
    const progressRef = useRef({ value: 0 });

    const render = useMemo(() => {
        const postProcessing = new THREE.PostProcessing(gl);
        const scenePass = pass(scene, camera);
        const scenePassColor = scenePass.getTextureNode('output');
        const bloomPass = bloom(scenePassColor, strength * 0.4, 0.5, threshold);

        const uScanProgress = uniform(0);
        progressRef.current = uScanProgress;

        const scanPos = float(uScanProgress.value);
        const uvY = uv().y;
        const scanWidth = float(0.05);
        const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
        // Emerald lightning overlay (reduced multiplier so it doesn't blowout the text)
        const greenOverlay = vec3(0.31, 1.0, 0.47).mul(oneMinus(scanLine)).mul(0.15);

        const withScanEffect = mix(
            scenePassColor,
            add(scenePassColor, greenOverlay),
            fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
        );

        const final = withScanEffect.add(bloomPass);
        postProcessing.outputNode = final;
        return postProcessing;
    }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

    useFrame(({ clock }) => {
        progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
        render.renderAsync();
    }, 1);

    return null;
};

/* ─────────────────────── THREE.JS SCENE ─────────────────────── */
const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
    const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
    const meshRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (rawMap && depthMap) setVisible(true);
    }, [rawMap, depthMap]);

    const { material, uniforms } = useMemo(() => {
        const uPointer = uniform(new THREE.Vector2(0));
        const uProgress = uniform(0);

        // Tripled strength — richer parallax depth on mouse move
        const strength = 0.03;

        const tDepthMap = texture(depthMap);
        const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

        const aspect = float(WIDTH).div(HEIGHT);
        const tUv = vec2(uv().x.mul(aspect), uv().y);
        const tiling = vec2(120.0);
        const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
        const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
        const dist = float(tiledUv.length());
        const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
        const depth = tDepthMap;
        const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));
        // Emerald dot-matrix mask (adjusted to be more transparent overall)
        const mask = dot.mul(flow).mul(vec3(0.31, 10.0, 0.47)).mul(0.6);
        const final = blendScreen(tMap, mask);

        const material = new THREE.MeshBasicNodeMaterial({
            colorNode: final,
            transparent: true,
            opacity: 0,
        });

        return { material, uniforms: { uPointer, uProgress } };
    }, [rawMap, depthMap]);

    const [w, h] = useAspect(WIDTH, HEIGHT);

    useFrame(({ clock }) => {
        uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
        if (meshRef.current?.material && 'opacity' in meshRef.current.material) {
            meshRef.current.material.opacity = THREE.MathUtils.lerp(
                meshRef.current.material.opacity,
                // Only go up to 0.6 opacity when visible so text behind isn't hidden completely
                visible ? 0.6 : 0,
                0.07
            );
        }
    });

    useFrame(({ pointer }) => {
        uniforms.uPointer.value = pointer;
    });

    return (
        <mesh ref={meshRef} scale={[w * 0.42, h * 0.42, 1]} material={material}>
            <planeGeometry />
        </mesh>
    );
};

/* ─────────────────────── HTML OVERLAY ─────────────────────── */
const titleWords = 'Build Your Dreams'.split(' ');
const subtitle = 'AI-powered creativity for the next generation.';

export const HeroFuturisticOverlay = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const sub = subRef.current;
        const btn = btnRef.current;
        if (!section || !title || !sub || !btn) return;

        const words = title.querySelectorAll('.word');

        /* ── Entrance timeline ── */
        gsap.set(words, { opacity: 0, y: 28, skewX: -7, willChange: 'transform' });
        gsap.set(sub, { opacity: 0, y: 14, willChange: 'transform' });
        gsap.set(btn, { opacity: 0, y: 10, willChange: 'transform' });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
            .to(words, { opacity: 1, y: 0, skewX: 0, duration: 0.6, stagger: 0.14 })
            .to(sub, { opacity: 1, y: 0, duration: 0.55 }, '-=0.25')
            .to(btn, { opacity: 1, y: 0, duration: 0.45 }, '-=0.15')
            .call(() => {
                // Release will-change after animation to free GPU memory
                gsap.set([words, sub, btn], { willChange: 'auto' });
            });

        /* ── Mouse parallax (Internal WebGL Only) ── */
        // Removed text parallax to keep Hero dynamic but stationary as requested.

        /* ── Magnetic button ── */
        const onBtnMove = (e) => {
            const r = btn.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            gsap.to(btn, { x: dx * 0.3, y: dy * 0.3, duration: 0.3, ease: 'power2.out' });
        };
        const onBtnLeave = () =>
            gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' });

        btn.addEventListener('mousemove', onBtnMove);
        btn.addEventListener('mouseleave', onBtnLeave);

        return () => {
            tl.kill();
            btn.removeEventListener('mousemove', onBtnMove);
            btn.removeEventListener('mouseleave', onBtnLeave);
        };
    }, []);

    return (
        <div ref={sectionRef} className="h-svh relative">
            {/* Text overlay - ensure text is above the 3D element */}
            <div className="h-svh uppercase items-center w-full absolute z-10 pointer-events-none px-10 flex justify-center flex-col">
                <div
                    ref={titleRef}
                    className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold"
                >
                    <div className="flex space-x-2 lg:space-x-6 text-text-primary">
                        {titleWords.map((word, i) => (
                            <span key={i} className="word inline-block">
                                {word}
                            </span>
                        ))}
                    </div>
                </div>

                <div
                    ref={subRef}
                    className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 text-text-secondary font-bold"
                >
                    {subtitle}
                </div>
            </div>

            {/* Magnetic explore button */}
            <button ref={btnRef} className="explore-btn" style={{ opacity: 0 }}>
                Scroll to explore
                <span className="explore-arrow">
                    <svg
                        width="22" height="22" viewBox="0 0 22 22"
                        fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="arrow-svg"
                    >
                        <path d="M11 5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M6 12L11 17L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </span>
            </button>

            {/* WebGPU Canvas wrapped in inverted light mode themes - lower z-index and opacity handling */}
            <div className="absolute inset-0 z-0 w-full h-full dark:invert-0 dark:hue-rotate-0 invert hue-rotate-180 transition-[filter] duration-700 pointer-events-none opacity-80">
                <Canvas
                    flat
                    gl={async (props) => {
                        const renderer = new THREE.WebGPURenderer(props);
                        await renderer.init();
                        return renderer;
                    }}
                >
                    <PostProcessing fullScreenEffect={true} />
                    <Scene />
                </Canvas>
            </div>
        </div>
    );
};

export default HeroFuturisticOverlay;
