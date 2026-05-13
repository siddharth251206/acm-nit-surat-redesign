"use client";

import { useEffect, useRef } from "react";

interface WireframeBackgroundProps {
  opacity?: number;
  speed?: number;
  className?: string;
}

export default function WireframeBackground({
  opacity = 0.4,
  speed = 1,
  className = "",
}: WireframeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let animationId: number;
    let disposed = false;

    const init = async () => {
      const THREE = await import("three");

      if (disposed) return;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 5);
      camera.rotation.x = 0.1;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);

      // Detect mobile for lower geometry detail
      const isMobile = window.innerWidth < 640;
      const detail = isMobile ? 1 : 2;

      // Primary icosahedron
      const icoGeo = new THREE.IcosahedronGeometry(2.8, detail);
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0x2a2a2a,
        wireframe: true,
      });
      const icoMesh = new THREE.Mesh(icoGeo, icoMat);
      scene.add(icoMesh);

      // Secondary smaller icosahedron for depth
      const icoGeo2 = new THREE.IcosahedronGeometry(1.6, detail);
      const icoMat2 = new THREE.MeshBasicMaterial({
        color: 0x1a1a1a,
        wireframe: true,
      });
      const icoMesh2 = new THREE.Mesh(icoGeo2, icoMat2);
      icoMesh2.rotation.set(0.5, 0.5, 0);
      scene.add(icoMesh2);

      // Handle resize
      const handleResize = () => {
        if (disposed) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      // Animation loop
      const animate = () => {
        if (disposed) return;
        animationId = requestAnimationFrame(animate);
        icoMesh.rotation.y += 0.0008 * speed;
        icoMesh.rotation.x += 0.0003 * speed;
        icoMesh2.rotation.y -= 0.0005 * speed;
        icoMesh2.rotation.x += 0.0002 * speed;
        renderer.render(scene, camera);
      };
      animate();

      // Cleanup closure
      return () => {
        disposed = true;
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
        icoGeo.dispose();
        icoMat.dispose();
        icoGeo2.dispose();
        icoMat2.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((c) => {
      cleanup = c;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      if (cleanup) cleanup();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
