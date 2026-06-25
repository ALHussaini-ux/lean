import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DBackgroundProps {
  activeTab: number; // 0, 1, 2, 3
}

export default function Hero3DBackground({ activeTab }: Hero3DBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef(activeTab);
  
  // Keep activeTabRef synced for the render loop to avoid closing over stale state
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e); // Deep charcoal requested background

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // Groups for each slide scene
    const group1 = new THREE.Group(); // Slide 1: Real Estate (Buildings & Grid)
    const group2 = new THREE.Group(); // Slide 2: Lead Generation (funnel)
    const group3 = new THREE.Group(); // Slide 3: WhatsApp Automation (Broadcast/Rings)
    const group4 = new THREE.Group(); // Slide 4: Infrastructure (Knot & Grid)

    scene.add(group1);
    scene.add(group2);
    scene.add(group3);
    scene.add(group4);

    // Track active transition opacities
    const opacities = [0, 0, 0, 0];
    opacities[activeTab] = 1.0; // Start with active tab fully opaque

    // =========================================================================
    // SLIDE 1: REAL ESTATE (Floating Skyscraper Wireframes & Grid)
    // =========================================================================
    // Navy blue grid lines (#0f3460)
    const gridHelper = new THREE.GridHelper(60, 30, 0x0f3460, 0x0f3460);
    gridHelper.position.y = -6;
    group1.add(gridHelper);

    const buildings: {
      group: THREE.Group;
      yPos: number;
      speed: number;
      height: number;
      x: number;
      z: number;
    }[] = [];

    // Create 14 floating wireframe skyscraper outlines
    for (let i = 0; i < 14; i++) {
      const bGroup = new THREE.Group();
      
      const w = 1.6 + Math.random() * 2.2;
      const h = 5 + Math.random() * 9;
      const d = 1.6 + Math.random() * 2.2;
      
      const geom = new THREE.BoxGeometry(w, h, d);
      geom.translate(0, h / 2, 0); // Translate anchor to bottom of building
      
      const edges = new THREE.EdgesGeometry(geom);
      
      // Navy blue skeleton body (#0f3460)
      const lineMesh = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: 0x0f3460,
          transparent: true,
          opacity: 0.6
        })
      );
      bGroup.add(lineMesh);
      
      // Glowing electric orange top outline cap (#ff6b35)
      const capGeom = new THREE.BoxGeometry(w + 0.04, 0.15, d + 0.04);
      capGeom.translate(0, h, 0);
      const capEdges = new THREE.EdgesGeometry(capGeom);
      const capMesh = new THREE.LineSegments(
        capEdges,
        new THREE.LineBasicMaterial({
          color: 0xff6b35,
          transparent: true,
          opacity: 0.9
        })
      );
      bGroup.add(capMesh);

      // Add a couple of electric orange vertical accent edge glows on selected buildings
      if (Math.random() > 0.4) {
        const edgeGlowGeo = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          w / 2 + 0.01, 0, d / 2 + 0.01,
          w / 2 + 0.01, h, d / 2 + 0.01
        ]);
        edgeGlowGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const edgeGlow = new THREE.Line(
          edgeGlowGeo,
          new THREE.LineBasicMaterial({
            color: 0xff6b35,
            transparent: true,
            opacity: 0.85
          })
        );
        bGroup.add(edgeGlow);
      }
      
      const x = (Math.random() - 0.5) * 36;
      const z = (Math.random() - 0.5) * 16 - 2;
      const y = -6 - h - Math.random() * 15; // Start floating up below the grid
      
      bGroup.position.set(x, y, z);
      group1.add(bGroup);
      
      buildings.push({
        group: bGroup,
        yPos: y,
        speed: 0.8 + Math.random() * 1.4,
        height: h,
        x,
        z
      });
    }

    // =========================================================================
    // SLIDE 2: LEAD GENERATION PIPELINE (Converging Funnel Network)
    // =========================================================================
    const funnelRings: THREE.Line[] = [];
    const ringCount = 6;
    for (let i = 0; i < ringCount; i++) {
      const y = 8 - (i * 16) / (ringCount - 1); // From y=8 to y=-8
      // Exponential curve for funnel diameter narrowing toward the bottom
      const r = 1.2 + 7.5 * Math.pow((y + 10) / 18, 1.8);
      
      const ringGeom = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
      }
      ringGeom.setFromPoints(points);
      const ringMesh = new THREE.Line(
        ringGeom,
        new THREE.LineBasicMaterial({
          color: 0x0f3460, // navy blue
          transparent: true,
          opacity: 0.45
        })
      );
      group2.add(ringMesh);
      funnelRings.push(ringMesh);
    }

    // Connect vertical struts of funnel in navy
    const strutCount = 12;
    for (let i = 0; i < strutCount; i++) {
      const theta = (i / strutCount) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j < ringCount; j++) {
        const y = 8 - (j * 16) / (ringCount - 1);
        const r = 1.2 + 7.5 * Math.pow((y + 10) / 18, 1.8);
        points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
      }
      const strutGeom = new THREE.BufferGeometry().setFromPoints(points);
      const strutMesh = new THREE.Line(
        strutGeom,
        new THREE.LineBasicMaterial({
          color: 0x0f3460,
          transparent: true,
          opacity: 0.35
        })
      );
      group2.add(strutMesh);
    }

    // Dynamic Flowing Particles (glowing electric orange & white dots)
    const funnelParticles: {
      mesh: THREE.Mesh;
      yPos: number;
      speed: number;
      angleOffset: number;
      spiralSpeed: number;
      isOrange: boolean;
    }[] = [];

    const fPartGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const orangeMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true });
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });

    for (let i = 0; i < 110; i++) {
      const isOrange = Math.random() > 0.4;
      const mesh = new THREE.Mesh(fPartGeo, isOrange ? orangeMat : whiteMat);
      
      const y = -8 + Math.random() * 16;
      const speed = 1.6 + Math.random() * 2.8;
      const angleOffset = Math.random() * Math.PI * 2;
      const spiralSpeed = 0.4 + Math.random() * 1.2;
      
      group2.add(mesh);
      funnelParticles.push({
        mesh,
        yPos: y,
        speed,
        angleOffset,
        spiralSpeed,
        isOrange
      });
    }

    // =========================================================================
    // SLIDE 3: WHATSAPP AUTOMATION (Expanding Concentric Broadcast Signals)
    // =========================================================================
    const signalRings: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      maxRadius: number;
    }[] = [];

    // Create 4 concentric expanding pulse rings
    for (let i = 0; i < 4; i++) {
      const ringGeom = new THREE.RingGeometry(0.98, 1.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff6b35, // electric orange (#ff6b35)
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0
      });
      const mesh = new THREE.Mesh(ringGeom, ringMat);
      mesh.rotation.x = Math.PI / 2.4; // Tilted flat plane orientation
      group3.add(mesh);
      
      signalRings.push({
        mesh,
        radius: i * 3.5, // staggered starting sizes
        speed: 2.4,
        maxRadius: 14
      });
    }

    // Orbiting communication/automation particles (white and navy)
    const orbitParticles: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
      yPos: number;
      tilt: number;
    }[] = [];

    const orbGeo = new THREE.SphereGeometry(0.16, 8, 8);
    const whiteOrbMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
    const navyOrbMat = new THREE.MeshBasicMaterial({ color: 0x0f3460, transparent: true });

    for (let i = 0; i < 55; i++) {
      const isWhite = Math.random() > 0.45;
      const mesh = new THREE.Mesh(orbGeo, isWhite ? whiteOrbMat : navyOrbMat);
      
      const r = 2.5 + Math.random() * 8.5;
      const speed = (0.35 + Math.random() * 0.75) * (Math.random() > 0.5 ? 1 : -1);
      const angle = Math.random() * Math.PI * 2;
      const yPos = (Math.random() - 0.5) * 5;
      const tilt = (Math.random() - 0.5) * 0.55;
      
      group3.add(mesh);
      orbitParticles.push({
        mesh,
        radius: r,
        speed,
        angle,
        yPos,
        tilt
      });
    }

    // =========================================================================
    // SLIDE 4: INFRASTRUCTURE YOU CONTROL (3D rotating cage & Control Knot)
    // =========================================================================
    // Torus knot geometry
    const torusKnotGeo = new THREE.TorusKnotGeometry(4.8, 1.35, 120, 16);
    const knotEdges = new THREE.EdgesGeometry(torusKnotGeo);

    // Structure 1: Navy blue control cage (#0f3460)
    const navyKnot = new THREE.LineSegments(
      knotEdges,
      new THREE.LineBasicMaterial({
        color: 0x0f3460,
        transparent: true,
        opacity: 0.8
      })
    );
    group4.add(navyKnot);

    // Structure 2: Electric orange glowing outlines (#ff6b35) (offset to prevent z-fighting)
    const orangeKnot = new THREE.LineSegments(
      knotEdges,
      new THREE.LineBasicMaterial({
        color: 0xff6b35,
        transparent: true,
        opacity: 0.35
      })
    );
    orangeKnot.scale.set(1.01, 1.01, 1.01);
    group4.add(orangeKnot);

    // Structure 3: Glowing highlight vertices on control nodes
    const knotNodesGroup = new THREE.Group();
    const nodeGeo4 = new THREE.SphereGeometry(0.12, 8, 8);
    const nodeMat4 = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true });
    
    const vertexPositions4 = torusKnotGeo.attributes.position;
    for (let i = 0; i < vertexPositions4.count; i += 10) {
      const mesh = new THREE.Mesh(nodeGeo4, nodeMat4);
      mesh.position.set(
        vertexPositions4.getX(i),
        vertexPositions4.getY(i),
        vertexPositions4.getZ(i)
      );
      knotNodesGroup.add(mesh);
    }
    group4.add(knotNodesGroup);

    // Outer orbiting coordinate grid box (faint wireframe icosahedron)
    const outerCageGeo = new THREE.IcosahedronGeometry(9.5, 2);
    const outerCageEdges = new THREE.EdgesGeometry(outerCageGeo);
    const outerCage = new THREE.LineSegments(
      outerCageEdges,
      new THREE.LineBasicMaterial({
        color: 0x0f3460,
        transparent: true,
        opacity: 0.15
      })
    );
    group4.add(outerCage);


    // =========================================================================
    // MOUSE PARALLAX & ANIMATION LOOP
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Scale coordinates from -1 to 1
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Mouse Parallax Lerp
      mouseX = THREE.MathUtils.lerp(mouseX, targetMouseX, 0.05);
      mouseY = THREE.MathUtils.lerp(mouseY, targetMouseY, 0.05);

      const currentActive = activeTabRef.current;

      // Update crossfading opacities towards targets
      for (let i = 0; i < 4; i++) {
        const target = currentActive === i ? 1.0 : 0.0;
        opacities[i] = THREE.MathUtils.lerp(opacities[i], target, 5 * delta); // smooth transition
      }

      // Hide inactive groups to save rendering resources
      group1.visible = opacities[0] > 0.005;
      group2.visible = opacities[1] > 0.005;
      group3.visible = opacities[2] > 0.005;
      group4.visible = opacities[3] > 0.005;

      // -----------------------------------------------------------------------
      // ANIMATE SLIDE 1: REAL ESTATE
      // -----------------------------------------------------------------------
      if (group1.visible) {
        group1.rotation.y = time * 0.04 + mouseX * 0.1;
        group1.rotation.x = mouseY * 0.08;

        buildings.forEach((b) => {
          b.yPos += b.speed * delta;
          
          // Loop building back below the grid
          if (b.yPos > 14) {
            b.yPos = -6 - b.height - Math.random() * 12;
            b.x = (Math.random() - 0.5) * 36;
            b.z = (Math.random() - 0.5) * 16 - 2;
            b.group.position.x = b.x;
            b.group.position.z = b.z;
          }
          b.group.position.y = b.yPos;

          // Apply smooth fade-in and fade-out based on its floating vertical level
          b.group.traverse((child) => {
            if (child instanceof THREE.LineSegments || child instanceof THREE.Line) {
              const material = child.material as THREE.LineBasicMaterial;
              const isOrange = material.color.getHex() === 0xff6b35;
              const baseOpacity = isOrange ? 0.9 : 0.6;
              
              let alpha = 1;
              if (b.yPos > 4) {
                alpha = Math.max(0, 1 - (b.yPos - 4) / 10);
              } else if (b.yPos < -6) {
                alpha = Math.max(0, 1 - (-6 - b.yPos) / b.height);
              }
              material.opacity = baseOpacity * alpha * opacities[0];
            }
          });
        });
      }

      // -----------------------------------------------------------------------
      // ANIMATE SLIDE 2: LEAD GENERATION
      // -----------------------------------------------------------------------
      if (group2.visible) {
        group2.rotation.y = time * 0.03 + mouseX * 0.08;
        group2.rotation.x = mouseY * 0.08;

        funnelParticles.forEach((p) => {
          p.yPos -= p.speed * delta;
          
          if (p.yPos < -8) {
            p.yPos = 8;
            p.angleOffset = Math.random() * Math.PI * 2;
          }

          // Spiral radius gets narrow at the bottom (funnel shape)
          const r = 1.2 + 7.5 * Math.pow((p.yPos + 10) / 18, 1.8);
          const angle = p.angleOffset + p.yPos * p.spiralSpeed * 0.35;

          p.mesh.position.set(
            Math.cos(angle) * r,
            p.yPos,
            Math.sin(angle) * r
          );

          // Smooth fade at the boundaries of the funnel
          let alpha = 1;
          if (p.yPos < -6) {
            alpha = Math.max(0, (p.yPos + 8) / 2);
          } else if (p.yPos > 6) {
            alpha = Math.max(0, (8 - p.yPos) / 2);
          }

          const mat = p.mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = alpha * opacities[1];
        });
      }

      // -----------------------------------------------------------------------
      // ANIMATE SLIDE 3: WHATSAPP AUTOMATION
      // -----------------------------------------------------------------------
      if (group3.visible) {
        group3.rotation.y = mouseX * 0.12;
        group3.rotation.x = mouseY * 0.12;

        signalRings.forEach((ring) => {
          ring.radius += ring.speed * delta;
          if (ring.radius > ring.maxRadius) {
            ring.radius = 0.5;
          }
          
          ring.mesh.scale.set(ring.radius, ring.radius, 1);
          
          // Compute opacity that rises quickly and fades slowly as the signal expands
          const ratio = ring.radius / ring.maxRadius;
          const opacity = Math.max(0, Math.sin(ratio * Math.PI) * 0.75);
          
          const mat = ring.mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = opacity * opacities[2];
        });

        orbitParticles.forEach((p) => {
          p.angle += p.speed * delta;
          
          const x = Math.cos(p.angle) * p.radius;
          const z = Math.sin(p.angle) * p.radius;
          const y = p.yPos + Math.sin(p.angle) * p.radius * p.tilt;
          
          p.mesh.position.set(x, y, z);
          
          const mat = p.mesh.material as THREE.MeshBasicMaterial;
          const baseOp = mat.color.getHex() === 0xffffff ? 0.8 : 0.45;
          mat.opacity = baseOp * opacities[2];
        });
      }

      // -----------------------------------------------------------------------
      // ANIMATE SLIDE 4: INFRASTRUCTURE YOU CONTROL
      // -----------------------------------------------------------------------
      if (group4.visible) {
        // Double-axis slow rotating knot
        const knotRotationY = time * 0.14 + mouseX * 0.1;
        const knotRotationX = time * 0.08 + mouseY * 0.08;

        navyKnot.rotation.y = knotRotationY;
        navyKnot.rotation.x = knotRotationX;

        orangeKnot.rotation.copy(navyKnot.rotation);
        knotNodesGroup.rotation.copy(navyKnot.rotation);

        // Spin outer ambient cage in reverse
        outerCage.rotation.y = -time * 0.04;
        outerCage.rotation.z = time * 0.02;

        // Apply opacities
        navyKnot.traverse((child: any) => {
          if (child.material) {
            child.material.opacity = 0.75 * opacities[3];
          }
        });

        orangeKnot.traverse((child: any) => {
          if (child.material) {
            // Slight organic breathing glow pulse
            const pulse = 0.35 + Math.sin(time * 2.5) * 0.15;
            child.material.opacity = pulse * opacities[3];
          }
        });

        knotNodesGroup.traverse((child: any) => {
          if (child instanceof THREE.Mesh && child.material) {
            const mat = child.material as THREE.MeshBasicMaterial;
            const pulse = 0.6 + Math.sin(time * 3 + child.position.x) * 0.4;
            mat.opacity = pulse * opacities[3];
          }
        });

        outerCage.traverse((child: any) => {
          if (child.material) {
            child.material.opacity = 0.15 * opacities[3];
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 4. Resize Handling with ResizeObserver for precise element sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    
    resizeObserver.observe(container);

    // 5. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose of geometries and materials to avoid memory leaks
      scene.traverse((node: any) => {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach((mat) => mat.dispose());
          } else {
            node.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 1 }}
    />
  );
}
