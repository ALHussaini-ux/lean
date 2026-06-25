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
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // Point light for subtle orange glow
    const orangeLight = new THREE.PointLight(0xff8c42, 2, 50);
    orangeLight.position.set(0, 0, 5);
    scene.add(orangeLight);

    // Groups for each scene
    const group1 = new THREE.Group(); // Lead Generation
    const group2 = new THREE.Group(); // Pipeline Automation
    const group3 = new THREE.Group(); // Performance Tracking
    const group4 = new THREE.Group(); // Growth Systems

    scene.add(group1);
    scene.add(group2);
    scene.add(group3);
    scene.add(group4);

    // Track current opacities for crossfading
    const opacities = [1, 0, 0, 0]; // Start with active tab's opacity

    // Helper to make materials transparent
    const makeTransparent = (obj: THREE.Object3D) => {
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments || child instanceof THREE.Points || child instanceof THREE.Line) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => {
              m.transparent = true;
              m.opacity = 0;
            });
          } else if (child.material) {
            child.material.transparent = true;
            child.material.opacity = 0;
          }
        }
      });
    };

    // ==========================================
    // SCENE 1: LEAD GENERATION (Particles converging)
    // ==========================================
    const particleCount = 1200;
    const pGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const pSpeeds = new Float32Array(particleCount);
    const pAngles = new Float32Array(particleCount);
    const pRadii = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Scattered randomly on a spherical outer shell or random torus
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 16 + Math.random() * 12; // Outer radius

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      pSpeeds[i] = 0.015 + Math.random() * 0.035;
      pAngles[i] = Math.random() * Math.PI * 2;
      pRadii[i] = r;
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create soft glowing circle sprite for premium look
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 140, 66, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 140, 66, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const pTexture = new THREE.CanvasTexture(canvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 0.45,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(pGeometry, pMaterial);
    group1.add(particleSystem);

    // Central glowing attractor point
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff8c42,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group1.add(coreMesh);

    // Smaller inner core
    const innerCoreGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    group1.add(innerCoreMesh);

    makeTransparent(group1);

    // ==========================================
    // SCENE 2: PIPELINE AUTOMATION (Nodes and flow lines)
    // ==========================================
    const nodeCount = 16;
    const nodes: { mesh: THREE.Mesh; connections: number[]; pulseTimer: number }[] = [];
    const nodePositions: THREE.Vector3[] = [];

    // Arrange nodes in a neat workflow flow (layered from left to right)
    for (let i = 0; i < nodeCount; i++) {
      // Calculate column and row position
      const col = Math.floor(i / 4); // 4 columns
      const row = i % 4;             // 4 rows per column
      
      const x = -15 + col * 10 + (Math.random() - 0.5) * 2.5;
      const y = -6 + row * 4 + (Math.random() - 0.5) * 1.5;
      const z = (Math.random() - 0.5) * 4;

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const nGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const nMat = new THREE.MeshStandardMaterial({
        color: 0xff8c42,
        emissive: 0xff8c42,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
      });
      const nMesh = new THREE.Mesh(nGeo, nMat);
      nMesh.position.copy(pos);
      group2.add(nMesh);

      nodes.push({
        mesh: nMesh,
        connections: [],
        pulseTimer: 0,
      });
    }

    // Connect nodes logically from left column to right column
    for (let i = 0; i < nodeCount; i++) {
      const col = Math.floor(i / 4);
      if (col < 3) {
        // Connect to 1 or 2 nodes in the next column
        const targetColStart = (col + 1) * 4;
        const target1 = targetColStart + (i % 4);
        const target2 = targetColStart + ((i + 1) % 4);
        
        nodes[i].connections.push(target1);
        if (Math.random() > 0.4) {
          nodes[i].connections.push(target2);
        }
      }
    }

    // Draw the connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });

    nodes.forEach((node, index) => {
      node.connections.forEach((targetIdx) => {
        const points = [nodePositions[index], nodePositions[targetIdx]];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeo, lineMaterial);
        group2.add(line);
      });
    });

    // Traveling signal dots
    const signalCount = 12;
    const signals: {
      mesh: THREE.Mesh;
      startNode: number;
      endNode: number;
      progress: number;
      speed: number;
    }[] = [];

    const sigGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const sigMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < signalCount; i++) {
      // Find a node that has connections
      let startNode = Math.floor(Math.random() * nodeCount);
      while (nodes[startNode].connections.length === 0) {
        startNode = Math.floor(Math.random() * nodeCount);
      }
      
      const conn = nodes[startNode].connections;
      const endNode = conn[Math.floor(Math.random() * conn.length)];

      const sMesh = new THREE.Mesh(sigGeo, sigMat.clone());
      sMesh.position.copy(nodePositions[startNode]);
      group2.add(sMesh);

      signals.push({
        mesh: sMesh,
        startNode,
        endNode,
        progress: Math.random(), // Stagger starts
        speed: 0.008 + Math.random() * 0.012,
      });
    }

    makeTransparent(group2);

    // ==========================================
    // SCENE 3: PERFORMANCE TRACKING (3D Bar Chart)
    // ==========================================
    const barCount = 10;
    const bars: { mesh: THREE.Mesh; targetHeight: number; currentHeight: number; glow: THREE.Mesh }[] = [];

    const barContainer = new THREE.Group();
    // Center the container
    barContainer.position.set(0, -4, 0);
    group3.add(barContainer);

    for (let i = 0; i < barCount; i++) {
      const targetHeight = 4 + Math.random() * 8;
      
      // BoxGeometry translated so anchor is at bottom (Y=0)
      const boxGeo = new THREE.BoxGeometry(1.6, 1, 1.6);
      boxGeo.translate(0, 0.5, 0); // Translate center to Y=0.5, so bottom is at Y=0

      const boxMat = new THREE.MeshStandardMaterial({
        color: 0x151b26,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0,
      });

      const barMesh = new THREE.Mesh(boxGeo, boxMat);
      
      // Position bars in two neat rows (Z = -2 and Z = 2) or linearly
      const col = i % 5;
      const row = Math.floor(i / 5);
      barMesh.position.set(-8 + col * 4, 0, -2 + row * 4);
      barMesh.scale.set(1, 0.01, 1); // Start small for animation

      // Soft glow plane or mini box at the top edge
      const glowGeo = new THREE.BoxGeometry(1.65, 0.15, 1.65);
      glowGeo.translate(0, 0.075, 0);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xff8c42,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.copy(barMesh.position);
      barContainer.add(barMesh);
      barContainer.add(glowMesh);

      bars.push({
        mesh: barMesh,
        targetHeight,
        currentHeight: 0.01,
        glow: glowMesh,
      });
    }

    // Ambient wireframe grid under the bars
    const gridGeo = new THREE.GridHelper(26, 13, 0x444444, 0x222222);
    gridGeo.position.y = -0.05;
    barContainer.add(gridGeo);

    makeTransparent(group3);

    // ==========================================
    // SCENE 4: GROWTH SYSTEMS (Interlocked rings & wire sphere)
    // ==========================================
    const sphereGeo = new THREE.IcosahedronGeometry(6, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireSphere = new THREE.Mesh(sphereGeo, sphereMat);
    group4.add(wireSphere);

    // Add nodes at sphere vertices
    const vertexPositions = sphereGeo.attributes.position;
    const vertexNodeGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const vertexNodeMat = new THREE.MeshBasicMaterial({ color: 0xff8c42 });
    const vertexGroup = new THREE.Group();
    
    for (let i = 0; i < vertexPositions.count; i++) {
      const vMesh = new THREE.Mesh(vertexNodeGeo, vertexNodeMat);
      vMesh.position.set(
        vertexPositions.getX(i),
        vertexPositions.getY(i),
        vertexPositions.getZ(i)
      );
      vertexGroup.add(vMesh);
    }
    group4.add(vertexGroup);

    // Torus Rings
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xff8c42,
      roughness: 0.1,
      metalness: 0.9,
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(7.2, 0.18, 16, 100), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(8.5, 0.1, 16, 100), ringMat2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(9.5, 0.08, 16, 100), ringMat1);

    ring1.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    ring3.rotation.z = Math.PI / 6;

    group4.add(ring1);
    group4.add(ring2);
    group4.add(ring3);

    makeTransparent(group4);

    // ==========================================
    // MOUSE PARALLAX & ANIMATION LOOP
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize between -1 and 1
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Mouse Parallax Lerping
      mouseX = THREE.MathUtils.lerp(mouseX, targetMouseX, 0.05);
      mouseY = THREE.MathUtils.lerp(mouseY, targetMouseY, 0.05);

      // Apply Parallax based on active tab
      const currentActive = activeTabRef.current;

      // Update crossfading opacities
      for (let i = 0; i < 4; i++) {
        const target = currentActive === i ? 1.0 : 0.0;
        opacities[i] = THREE.MathUtils.lerp(opacities[i], target, 4 * delta); // Smooth 600ms crossfade
      }

      // Apply dynamic visibility & material opacity updates to save draw calls
      const updateGroupOpacity = (group: THREE.Group, opacity: number) => {
        if (opacity < 0.005) {
          group.visible = false;
          return;
        }
        group.visible = true;
        group.traverse((child) => {
          if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments || child instanceof THREE.Points || child instanceof THREE.Line) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => {
                m.opacity = (m.userData.baseOpacity !== undefined ? m.userData.baseOpacity : 1) * opacity;
              });
            } else if (child.material) {
              const baseOp = child.userData.baseOpacity !== undefined ? child.userData.baseOpacity : 1;
              child.material.opacity = baseOp * opacity;
            }
          }
        });
      };

      // Set base opacities on setup if not stored
      const ensureBaseOpacities = (group: THREE.Group) => {
        group.traverse((child) => {
          if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments || child instanceof THREE.Points || child instanceof THREE.Line) {
            const m = child.material;
            if (m && !Array.isArray(m) && m.userData.baseOpacity === undefined) {
              m.userData.baseOpacity = m.opacity !== undefined && m.opacity !== 0 ? m.opacity : 1;
              // Specific adjustments for grids or wires
              if (child instanceof THREE.Line || child instanceof THREE.LineSegments) {
                m.userData.baseOpacity = 0.25;
              }
              if (m.color && m.color.getHex() === 0xffffff && !(child instanceof THREE.Points)) {
                m.userData.baseOpacity = 0.45;
              }
            }
          }
        });
      };

      ensureBaseOpacities(group1);
      ensureBaseOpacities(group2);
      ensureBaseOpacities(group3);
      ensureBaseOpacities(group4);

      updateGroupOpacity(group1, opacities[0]);
      updateGroupOpacity(group2, opacities[1]);
      updateGroupOpacity(group3, opacities[2]);
      updateGroupOpacity(group4, opacities[3]);

      // --- ANIMATE TAB 1: LEAD GENERATION ---
      if (group1.visible) {
        // Parallax rotation
        group1.rotation.y = time * 0.1 + mouseX * 0.15;
        group1.rotation.x = mouseY * 0.15;

        // Pulse central core
        const coreScale = 1.0 + Math.sin(time * 3) * 0.1;
        coreMesh.scale.set(coreScale, coreScale, coreScale);
        innerCoreMesh.scale.set(1.0 + Math.cos(time * 5) * 0.15, 1.0 + Math.cos(time * 5) * 0.15, 1.0 + Math.cos(time * 5) * 0.15);

        // Converge particles toward center
        const posAttr = pGeometry.getAttribute('position') as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const index = i * 3;
          let px = posArray[index];
          let py = posArray[index + 1];
          let pz = posArray[index + 2];

          // Calculate distance from center
          const dist = Math.sqrt(px * px + py * py + pz * pz);

          if (dist < 1.0) {
            // Respawn on outer shell
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 16 + Math.random() * 10;

            posArray[index] = r * Math.sin(phi) * Math.cos(theta);
            posArray[index + 1] = r * Math.sin(phi) * Math.sin(theta);
            posArray[index + 2] = r * Math.cos(phi);
          } else {
            // Pull in towards (0,0,0) + subtle spiral orbit
            const speed = pSpeeds[i];
            
            // Move inward along vector
            posArray[index] -= (px / dist) * speed * 2;
            posArray[index + 1] -= (py / dist) * speed * 2;
            posArray[index + 2] -= (pz / dist) * speed * 2;

            // Spiral orbit effect (rotate around Y axis slightly)
            const angle = 0.004;
            const rx = posArray[index] * Math.cos(angle) - posArray[index + 2] * Math.sin(angle);
            const rz = posArray[index] * Math.sin(angle) + posArray[index + 2] * Math.cos(angle);
            posArray[index] = rx;
            posArray[index + 2] = rz;
          }
        }
        posAttr.needsUpdate = true;
      }

      // --- ANIMATE TAB 2: PIPELINE AUTOMATION ---
      if (group2.visible) {
        group2.rotation.y = mouseX * 0.1;
        group2.rotation.x = mouseY * 0.1;

        // Update signals
        signals.forEach((sig) => {
          sig.progress += sig.speed;
          if (sig.progress >= 1.0) {
            sig.progress = 0;
            // Pulse the end node
            nodes[sig.endNode].pulseTimer = 1.0;

            // Pick a new connection or wrap around
            sig.startNode = sig.endNode;
            const conn = nodes[sig.startNode].connections;
            if (conn.length > 0) {
              sig.endNode = conn[Math.floor(Math.random() * conn.length)];
            } else {
              // Reset to a random left-column node
              sig.startNode = Math.floor(Math.random() * 4);
              sig.endNode = nodes[sig.startNode].connections[0] || 4;
            }
          }

          // Linearly interpolate position
          const startPos = nodePositions[sig.startNode];
          const endPos = nodePositions[sig.endNode];
          sig.mesh.position.lerpVectors(startPos, endPos, sig.progress);
        });

        // Update node pulses
        nodes.forEach((node) => {
          if (node.pulseTimer > 0) {
            node.pulseTimer -= delta * 3; // Fade out pulse quickly
            const scale = 1.0 + Math.sin(node.pulseTimer * Math.PI) * 0.7;
            node.mesh.scale.set(scale, scale, scale);
          } else {
            node.mesh.scale.set(1, 1, 1);
          }
        });
      }

      // --- ANIMATE TAB 3: PERFORMANCE TRACKING ---
      if (group3.visible) {
        // Slow orbit
        barContainer.rotation.y = time * 0.12 + mouseX * 0.1;

        // Scale bars up on entry
        bars.forEach((bar) => {
          if (currentActive === 2) {
            // Smoothly scale up to targetHeight
            bar.currentHeight = THREE.MathUtils.lerp(bar.currentHeight, bar.targetHeight, 3.5 * delta);
          } else {
            // Shrink down if inactive
            bar.currentHeight = THREE.MathUtils.lerp(bar.currentHeight, 0.01, 5 * delta);
          }
          
          bar.mesh.scale.y = bar.currentHeight;

          // Align the glow plane at the top of the bar
          bar.glow.position.copy(bar.mesh.position);
          bar.glow.position.y = bar.currentHeight;
        });
      }

      // --- ANIMATE TAB 4: GROWTH SYSTEMS ---
      if (group4.visible) {
        // Rotations at different speeds and axes
        wireSphere.rotation.y = time * 0.15 + mouseX * 0.12;
        wireSphere.rotation.x = time * 0.08 + mouseY * 0.12;
        
        vertexGroup.rotation.copy(wireSphere.rotation);

        ring1.rotation.z = time * 0.35;
        ring2.rotation.x = time * 0.25;
        ring3.rotation.y = -time * 0.3;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 4. Resize Handling with ResizeObserver for precise container alignment
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
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

      // Recursive disposal helper
      const disposeNode = (node: any) => {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach((mat) => mat.dispose());
          } else {
            node.material.dispose();
          }
        }
      };

      scene.traverse(disposeNode);
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
