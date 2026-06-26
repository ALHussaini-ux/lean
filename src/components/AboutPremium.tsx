import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Target, 
  AppWindow, 
  MessageSquare, 
  Database, 
  LineChart, 
  ArrowRight, 
  Check, 
  Sparkles,
  Layers,
  Activity,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Eye,
  Smartphone,
  Info
} from 'lucide-react';
import * as THREE from 'three';

// Define Prop Types for AboutPremium
interface AboutPremiumProps {
  setCurrentPage: (page: 'home' | 'services' | 'about' | 'get-started') => void;
}

export default function AboutPremium({ setCurrentPage }: AboutPremiumProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const isIntroInView = useInView(introRef, { once: true, amount: 0.15 });

  const philosophyRef = useRef<HTMLDivElement>(null);
  const isPhilosophyInView = useInView(philosophyRef, { once: true, amount: 0.15 });

  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineSectionRef, { once: true, amount: 0.1 });

  const actionsRef = useRef<HTMLDivElement>(null);
  const isActionsInView = useInView(actionsRef, { once: true, amount: 0.15 });

  const principlesRef = useRef<HTMLDivElement>(null);
  const isPrinciplesInView = useInView(principlesRef, { once: true, amount: 0.15 });

  const whyRef = useRef<HTMLDivElement>(null);
  const isWhyInView = useInView(whyRef, { once: true, amount: 0.15 });

  const closingRef = useRef<HTMLDivElement>(null);
  const isClosingInView = useInView(closingRef, { once: true, amount: 0.15 });

  // Hovered node state for the 3D Network (Section 02)
  const [hoveredNodeName, setHoveredNodeName] = useState<string | null>(null);

  // Selected cube state for the 3D Showcase (Section 08)
  const [selectedCube, setSelectedCube] = useState<{
    id: string;
    title: string;
    desc: string;
    details: string[];
  } | null>(null);

  /* ==================== 3D CANVAS HERO (SECTION 02) ==================== */
  const canvasRef1 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef1.current) return;

    const container = canvasRef1.current.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = 450;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef1.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff6b00, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Nodes definition
    const nodeData = [
      { name: 'Ads', pos: new THREE.Vector3(-3.5, 1.5, 0), label: 'Google & Meta Ads' },
      { name: 'Landing Pages', pos: new THREE.Vector3(-1.2, -1.0, 1), label: 'Landing Pages' },
      { name: 'WhatsApp', pos: new THREE.Vector3(1.2, 1.8, -1), label: 'WhatsApp Automation' },
      { name: 'CRM', pos: new THREE.Vector3(3.5, -0.8, 0), label: 'CRM & Tracking' },
      { name: 'Reporting', pos: new THREE.Vector3(0, 0.2, 2), label: 'Performance Analytics' }
    ];

    const spheres: THREE.Mesh[] = [];
    const sphereGroup = new THREE.Group();

    nodeData.forEach((data) => {
      // Outer glow/glass ring
      const ringGeo = new THREE.RingGeometry(0.55, 0.6, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff6b00,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(data.pos);

      // Core sphere
      const geo = new THREE.SphereGeometry(0.35, 32, 32);
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xff6b00,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.6,
        thickness: 0.5,
        transparent: true,
        opacity: 0.85
      });
      const sphere = new THREE.Mesh(geo, mat);
      sphere.position.copy(data.pos);
      sphere.userData = { name: data.name, ring, label: data.label };

      sphere.add(ring);
      sphereGroup.add(sphere);
      spheres.push(sphere);
    });

    scene.add(sphereGroup);

    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.25
    });

    const activeLineMaterial = new THREE.LineBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.8
    });

    const lines: THREE.Line[] = [];

    // Connect nodes sequentially & cross-link
    for (let i = 0; i < nodeData.length; i++) {
      for (let j = i + 1; j < nodeData.length; j++) {
        const points = [nodeData[i].pos, nodeData[j].pos];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeo, lineMaterial);
        scene.add(line);
        lines.push(line);
      }
    }

    // Interactive Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Subtle camera parallax
      camera.position.x = mouse.x * 1.5;
      camera.position.y = mouse.y * 1.5;
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation
      sphereGroup.children.forEach((child, idx) => {
        const s = child as THREE.Mesh;
        s.position.y = nodeData[idx].pos.y + Math.sin(elapsedTime + idx) * 0.15;
        
        // Spin the outer ring
        if (s.children[0]) {
          s.children[0].rotation.z += 0.01;
        }
      });

      // Raycasting check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(spheres);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const name = hit.userData.name;
        setHoveredNodeName(hit.userData.label);

        // Animate selection scales
        spheres.forEach((s) => {
          if (s.userData.name === name) {
            s.scale.setScalar(THREE.MathUtils.lerp(s.scale.x, 1.4, 0.15));
            const ring = s.children[0] as THREE.Mesh;
            if (ring) {
              (ring.material as THREE.MeshBasicMaterial).opacity = 0.5;
            }
          } else {
            s.scale.setScalar(THREE.MathUtils.lerp(s.scale.x, 0.9, 0.15));
          }
        });
      } else {
        setHoveredNodeName(null);
        spheres.forEach((s) => {
          s.scale.setScalar(THREE.MathUtils.lerp(s.scale.x, 1.0, 0.1));
          const ring = s.children[0] as THREE.Mesh;
          if (ring) {
            (ring.material as THREE.MeshBasicMaterial).opacity = 0.15;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);


  /* ==================== 3D SHOWCASE (SECTION 08) ==================== */
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  const cubesData = [
    {
      id: 'ads',
      title: 'Google & Meta Ads',
      desc: 'Highly targeted high-intent lead acquisition.',
      details: ['Targeted demographics', 'A/B tested copywriting', 'ROAS calculation systems']
    },
    {
      id: 'pages',
      title: 'Landing Pages',
      desc: 'High-speed, conversion-optimized project portals.',
      details: ['Lighthouse score 95+', 'Mobile-first interfaces', 'Optimized booking hooks']
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Automation',
      desc: 'Instant auto-responses, scheduling, & brochures.',
      details: ['Sub-60s brochure dispatch', 'Site visit scheduling bots', '24/7 lead nurturing']
    },
    {
      id: 'crm',
      title: 'CRM Integration',
      desc: 'Pipeline transparency from search to booking.',
      details: ['Centralized buyer boards', 'Activity logs mapping', 'Instant sales dispatch']
    },
    {
      id: 'reporting',
      title: 'Performance Reporting',
      desc: 'Data transparency and channel efficiency analytics.',
      details: ['Weekly CPL breakdowns', 'Live campaign health monitors', 'Actionable marketing audits']
    }
  ];

  useEffect(() => {
    if (!canvasRef2.current) return;

    const container = canvasRef2.current.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = 400;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef2.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xff6b00, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Floating Glass Cubes
    const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide
    });

    const cubes: THREE.Mesh[] = [];
    const cubeGroup = new THREE.Group();

    const positions = [
      new THREE.Vector3(-3.0, 1.0, 0),
      new THREE.Vector3(-1.2, -0.8, 1),
      new THREE.Vector3(0.5, 1.2, -1),
      new THREE.Vector3(2.2, -1.0, 0),
      new THREE.Vector3(3.2, 0.8, 0.5)
    ];

    cubesData.forEach((data, index) => {
      const cube = new THREE.Mesh(geometry, material.clone());
      // Tint the cubes slightly towards brand orange on index
      (cube.material as THREE.MeshPhysicalMaterial).color.setHex(index % 2 === 0 ? 0xffffff : 0xffeae0);
      cube.position.copy(positions[index]);
      cube.userData = { id: data.id, index, originPos: positions[index].clone() };
      cubeGroup.add(cube);
      cubes.push(cube);

      // Simple inner wireframe
      const wireGeo = new THREE.BoxGeometry(1.05, 1.05, 1.05);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xff6b00,
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      cube.add(wire);
    });

    scene.add(cubeGroup);

    // Raycast Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = (event: MouseEvent) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const id = hit.userData.id;
        const match = cubesData.find(c => c.id === id);
        if (match) {
          setSelectedCube(match);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      cubes.forEach((cube) => {
        const origin = cube.userData.originPos as THREE.Vector3;
        cube.position.y = origin.y + Math.sin(t + cube.userData.index) * 0.15;
        cube.rotation.x += 0.006;
        cube.rotation.y += 0.009;
      });

      // Hover glow logic
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        cubes.forEach(c => {
          if (c === hit) {
            c.scale.setScalar(THREE.MathUtils.lerp(c.scale.x, 1.25, 0.15));
            const wire = c.children[0] as THREE.Mesh;
            if (wire) {
              (wire.material as THREE.MeshBasicMaterial).opacity = 0.6;
            }
          } else {
            c.scale.setScalar(THREE.MathUtils.lerp(c.scale.x, 0.9, 0.15));
          }
        });
      } else {
        cubes.forEach(c => {
          c.scale.setScalar(THREE.MathUtils.lerp(c.scale.x, 1.0, 0.1));
          const wire = c.children[0] as THREE.Mesh;
          if (wire) {
            (wire.material as THREE.MeshBasicMaterial).opacity = 0.15;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);


  return (
    <div className="space-y-32 pb-24 font-sans bg-brand-light">

      {/* SECTION 01: ABOUT EDITORIAL HEADER */}
      <section 
        id="about-intro" 
        ref={introRef}
        className="pt-28 md:pt-36 max-w-7xl mx-auto px-6"
      >
        <div className="max-w-4xl space-y-8">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="text-[#FF6B00] text-xs tracking-[0.2em] font-black uppercase inline-block border-b-2 border-[#FF6B00] pb-2 mb-2"
          >
            ABOUT
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight leading-tight"
          >
            We Build Systems That Help Real Estate Teams Capture More Opportunities.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-neutral-500 text-base md:text-lg max-w-2xl leading-relaxed"
          >
            Lean System designs and implements modern lead generation systems using landing pages, advertising, WhatsApp automation, and performance tracking. Our goal is to create a simple, organized process that helps businesses manage enquiries more efficiently.
          </motion.p>
        </div>
      </section>


      {/* SECTION 02: INTERACTIVE 3D HERO (NODE NETWORK) */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="rounded-[32px] overflow-hidden bg-white/10 backdrop-blur-[24px] border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.03),inset_0_1.5px_3px_rgba(255,255,255,0.45)] relative p-8">
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-orange-500/5 blur-[80px] pointer-events-none" />

          {/* Interactive instruction banner */}
          <div className="absolute top-6 left-8 flex items-center gap-2 text-xs font-sans font-bold text-neutral-400 select-none">
            <Activity className="w-4 h-4 text-[#FF6B00] animate-pulse" />
            <span>Interactive Node Ecosystem • Hover nodes to explore connections</span>
          </div>

          {/* Dynamic Floating Tooltip */}
          <AnimatePresence>
            {hoveredNodeName && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-8 left-8 bg-brand-dark/95 backdrop-blur-md text-white py-3 px-5 rounded-xl text-xs font-sans font-black border border-neutral-800 shadow-xl flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                <span>SYSTEM ELEMENT: {hoveredNodeName.toUpperCase()}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ThreeJS Canvas wrapper */}
          <div className="w-full relative h-[450px]">
            <canvas ref={canvasRef1} className="w-full h-full block cursor-grab active:cursor-grabbing" />
          </div>
        </div>
      </section>


      {/* SECTION 03: OUR PHILOSOPHY */}
      <section 
        id="about-philosophy" 
        ref={philosophyRef}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-sans font-black tracking-widest text-[#FF6B00] uppercase block">
              OUR FRAMEWORK
            </span>
            <h2 className="text-4xl font-sans font-black text-brand-dark tracking-tight leading-none">
              Technology Should Simplify Growth.
            </h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Column 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="w-10 h-10 rounded-[12px] bg-white border border-neutral-200/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center font-sans font-black text-xs text-neutral-400 select-none">
                01
              </div>
              <h3 className="text-lg font-sans font-black text-brand-dark">Clarity</h3>
              <p className="font-body text-neutral-500 text-sm leading-relaxed">
                Every project starts with understanding the business before choosing the tools.
              </p>
            </motion.div>

            {/* Column 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="w-10 h-10 rounded-[12px] bg-white border border-neutral-200/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center font-sans font-black text-xs text-neutral-400 select-none">
                02
              </div>
              <h3 className="text-lg font-sans font-black text-brand-dark">Transparency</h3>
              <p className="font-body text-neutral-500 text-sm leading-relaxed">
                We explain what we're doing, why we're doing it, and what the data tells us.
              </p>
            </motion.div>

            {/* Column 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-4"
            >
              <div className="w-10 h-10 rounded-[12px] bg-white border border-neutral-200/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center font-sans font-black text-xs text-neutral-400 select-none">
                03
              </div>
              <h3 className="text-lg font-sans font-black text-brand-dark">Continuous Improvement</h3>
              <p className="font-body text-neutral-500 text-sm leading-relaxed">
                Digital marketing is never finished. We continuously analyze and refine based on performance.
              </p>
            </motion.div>

          </div>
        </div>
      </section>


      {/* SECTION 04: INTERACTIVE HORIZONTAL TIMELINE */}
      <section 
        id="about-timeline" 
        ref={timelineSectionRef}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-sans font-black tracking-widest text-[#FF6B00] uppercase block">
              OUR PATHWAY
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-black text-brand-dark tracking-tight leading-none">
              How We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Discover', step: 'PHASE 01', desc: 'Understand the business, goals, audience, and current challenges.' },
              { title: 'Build', step: 'PHASE 02', desc: 'Develop landing pages, campaigns, automation, and tracking.' },
              { title: 'Launch', step: 'PHASE 03', desc: 'Deploy the system and monitor its performance.' },
              { title: 'Improve', step: 'PHASE 04', desc: 'Use real campaign data to optimize over time.' }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="p-7 rounded-[22px] bg-white/10 backdrop-blur-[24px] border border-white/20 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.03),inset_0_1.5px_3px_rgba(255,255,255,0.45)] flex flex-col justify-between h-48 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-sans font-black tracking-widest text-neutral-400 uppercase block">
                    {t.step}
                  </span>
                  <h3 className="text-xl font-sans font-black text-brand-dark group-hover:text-[#FF6B00] transition-colors duration-200">
                    {t.title}
                  </h3>
                  <p className="text-xs font-body text-neutral-500 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="flex justify-end pt-2">
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#FF6B00] group-hover:translate-x-1.5 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 05: WHAT WE ACTUALLY DO (FLOATING LIQUID GLASS CARDS) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-sans font-black tracking-widest text-[#FF6B00] uppercase block">
              ECOSYSTEM MODULES
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-black text-brand-dark tracking-tight leading-none">
              Ecosystem Components
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Google & Meta Ads', icon: <Target className="w-5 h-5 text-[#FF6B00]" />, desc: 'High-intent search keyword targeting.' },
              { title: 'Landing Pages', icon: <AppWindow className="w-5 h-5 text-[#FF6B00]" />, desc: 'Engineered conversion portals.' },
              { title: 'WhatsApp Automation', icon: <MessageSquare className="w-5 h-5 text-[#FF6B00]" />, desc: 'Sub-60s response pipelines.' },
              { title: 'CRM Integration', icon: <Database className="w-5 h-5 text-[#FF6B00]" />, desc: 'Consolidated enquiry pipelines.' },
              { title: 'Performance Reporting', icon: <LineChart className="w-5 h-5 text-[#FF6B00]" />, desc: 'Actionable performance audits.' }
            ].map((srv, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="p-6 rounded-[24px] bg-white/10 backdrop-blur-[24px] border border-white/20 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.45),0_10px_35px_-10px_rgba(0,0,0,0.03)] hover:bg-white/18 hover:shadow-[0_20px_45px_rgba(255,107,0,0.06),inset_0_1.5px_3px_rgba(255,255,255,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div className="space-y-6">
                  <div className="w-10 h-10 rounded-[12px] bg-white border border-white/70 shadow-[0_4px_12px_rgba(0,0,0,0.02),inset_0_1px_2px_rgba(255,255,255,0.8)] flex items-center justify-center group-hover:rotate-[5deg] group-hover:scale-105 transition-all duration-300">
                    {srv.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-sans font-black text-brand-dark leading-snug group-hover:text-[#FF6B00] transition-colors duration-200">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-body text-neutral-500 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 06: OUR PRINCIPLES (PREMIUM EDITORIAL STATEMENTS) */}
      <section 
        id="about-principles" 
        ref={principlesRef}
        className="max-w-5xl mx-auto px-6 py-12 border-y border-neutral-200/50"
      >
        <div className="space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#FF6B00] text-xs tracking-[0.2em] font-black uppercase inline-block border-b-2 border-[#FF6B00] pb-2 mb-2">
              OUR STANDARDS
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-black text-brand-dark tracking-tight leading-none">
              A Transparent Commitment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { statement: 'No fake metrics.', subtitle: 'We report on actual leads and client interactions, not vanity impressions or ambiguous impressions.' },
              { statement: 'No unrealistic guarantees.', subtitle: 'Real marketing relies on structural testing, continuous analysis, and data-driven decision making.' },
              { statement: 'No shortcuts.', subtitle: 'We configure thorough campaigns, structured databases, and complete webhook routing boards.' },
              { statement: 'No unnecessary complexity.', subtitle: 'Every recommendation is backed by a clear strategy and actionable performance feedback.' }
            ].map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={isPrinciplesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#FF6B00]" strokeWidth={3} />
                </div>
                <div className="space-y-1.5">
                  <span className="text-lg font-sans font-black text-brand-dark block">{p.statement}</span>
                  <p className="text-xs font-body text-neutral-500 leading-relaxed">{p.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 07: WHY LEAN */}
      <section 
        id="about-why" 
        ref={whyRef}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-sans font-black tracking-widest text-[#FF6B00] uppercase block">
              OUR VALUE
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-black text-brand-dark tracking-tight leading-none">
              The Lean System Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Focused', desc: 'We specialize exclusively in lead generation systems for real estate builders and property developers.' },
              { title: 'Practical', desc: 'Every feature and tracking step we deploy has a clear purpose and direct utility.' },
              { title: 'Transparent', desc: 'Clear documentation, open ad accounts, and straightforward analytics reporting.' },
              { title: 'Built to Scale', desc: 'Systems designed with robust APIs and standard webhooks that can grow with you.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isWhyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="p-8 rounded-[24px] bg-white border border-neutral-200/50 hover:border-[#FF6B00]/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 space-y-4 cursor-default"
              >
                <span className="text-xs font-sans font-black tracking-widest text-[#FF6B00] uppercase block">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-sans font-black text-brand-dark">
                  {item.title}
                </h3>
                <p className="text-xs font-body text-neutral-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 08: INTERACTIVE 3D SHOWCASE (FLOATING GLASS CUBES) */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Interactive ThreeJS Canvas Container */}
          <div className="lg:col-span-7 rounded-[32px] overflow-hidden bg-white/10 backdrop-blur-[24px] border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.02),inset_0_1.5px_3px_rgba(255,255,255,0.45)] relative p-6 flex flex-col justify-between">
            
            <div className="flex items-center gap-2 text-xs font-sans font-bold text-neutral-400 select-none">
              <Sparkles className="w-4 h-4 text-[#FF6B00]" />
              <span>3D Service Ecosystem • Click a cube to view information</span>
            </div>

            <div className="w-full relative h-[400px]">
              <canvas ref={canvasRef2} className="w-full h-full block cursor-pointer" />
            </div>

          </div>

          {/* Right: Selected Cube Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selectedCube ? (
                <motion.div
                  key={selectedCube.id}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="p-8 md:p-10 rounded-[28px] bg-white border border-neutral-200 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-6 flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#FF6B00] uppercase block">Ecosystem Node Active</span>
                    <h3 className="text-3xl font-sans font-black text-brand-dark">{selectedCube.title}</h3>
                    <p className="font-body text-neutral-500 text-sm leading-relaxed">{selectedCube.desc}</p>
                    
                    <ul className="space-y-3 pt-4 border-t border-neutral-100">
                      {selectedCube.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-3 text-xs font-sans font-bold text-neutral-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <button 
                      onClick={() => setCurrentPage('services')} 
                      className="text-xs font-sans font-black text-[#FF6B00] tracking-wider uppercase flex items-center gap-1.5 group/btn"
                    >
                      <span>Explore details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setSelectedCube(null)} 
                      className="text-[11px] font-sans font-bold text-neutral-400 hover:text-neutral-600 uppercase"
                    >
                      Reset Ecosystem
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 md:p-10 rounded-[28px] border border-dashed border-neutral-300 flex flex-col items-center justify-center text-center space-y-4 h-full"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <Info className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-black text-brand-dark text-lg">Ecosystem Showcase</h4>
                    <p className="font-body text-xs text-neutral-400 max-w-xs leading-relaxed">
                      Click any floating service node on the interactive map to inspect our system implementation strategy.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedCube(cubesData[0])}
                    className="text-xs font-sans font-black text-[#FF6B00] border border-[#FF6B00]/20 rounded-full px-4 py-1.5 bg-orange-50/50 hover:bg-orange-50 transition-colors"
                  >
                    Load Ad Modules
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>


      {/* SECTION 09: CLOSING EDITORIAL */}
      <section 
        id="about-closing" 
        ref={closingRef}
        className="max-w-4xl mx-auto px-6 text-center space-y-8"
      >
        <motion.h3 
          initial={{ opacity: 0, y: 25 }}
          animate={isClosingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-sans font-black text-brand-dark tracking-tight leading-tight"
        >
          Good systems create consistency.
        </motion.h3>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isClosingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-body text-neutral-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Our role is to build a reliable digital foundation that helps businesses capture, organize, and manage opportunities more effectively.
        </motion.p>
      </section>


      {/* CALL TO ACTION (CTA) SECTION */}
      <section 
        id="about-cta" 
        ref={actionsRef}
        className="max-w-5xl mx-auto px-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={isActionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.8 }}
          className="rounded-[32px] bg-brand-dark text-white p-10 md:p-14 text-center relative overflow-hidden shadow-2xl space-y-8"
        >
          {/* Subtle light leak for cosmic flare look */}
          <div className="absolute top-0 left-1/4 w-80 h-32 bg-[#FF6B00]/10 blur-[80px] pointer-events-none" />

          <div className="space-y-3">
            <span className="text-[#FF6B00] text-xs font-sans font-black tracking-widest uppercase block">READY TO START</span>
            <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight leading-tight">
              Let's Build Something That Works.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('get-started')}
              className="w-full sm:w-auto px-8 py-4 bg-[#FF6B00] hover:bg-orange-600 font-sans font-black text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_10px_25px_rgba(255,107,0,0.25)] flex items-center justify-center gap-2 group/btn"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
            </button>
            <button 
              onClick={() => setCurrentPage('services')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 font-sans font-black text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>View Our Services</span>
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
