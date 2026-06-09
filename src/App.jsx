import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Minus, ChevronDown, ChevronRight, CheckCircle2, Terminal, Clock, Send, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Componentes Reutilizáveis ---

const MagneticButton = ({ children, className = '', href = '#demonstracao' }) => {
  return (
    <a href={href} className={`magnetic-button px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 group transition-all duration-300 ${className}`}>
      <span className="relative z-10 flex items-center gap-2 text-center">{children}</span>
    </a>
  );
};

const FadeUpText = ({ children, className = '' }) => {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from(ref.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
      }
    });
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
};

const FadeUpGroup = ({ children, className = '' }) => {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from(ref.current.children, {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
      }
    });
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
};

const NumberTicker = ({ end, prefix = '', suffix = '', className = '' }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useGSAP(() => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: end,
      duration: 2.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%'
      },
      onUpdate: () => setVal(Math.round(obj.value))
    });
  }, { scope: ref });

  return <span ref={ref} className={className}>{prefix}{val}{suffix}</span>;
};

// --- NAVBAR ---
const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      toggleClass: { className: 'glass-panel', targets: navRef.current },
      onEnter: () => gsap.to(navRef.current, { backgroundColor: 'rgba(20, 31, 40, 0.6)', border: '1px solid rgba(255,255,255,0.05)' }),
      onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: 'transparent', border: '1px solid transparent' })
    });
  }, []);

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-5">
      <nav ref={navRef} className="rounded-full px-5 md:px-8 py-3 md:py-4 flex items-center justify-between w-full max-w-6xl transition-colors duration-300">
        <div className="flex items-center h-6 md:h-8">
          <img src="logo.webp" alt="ARK" width="113" height="32" className="h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
          <div className="hidden font-bold text-xl md:text-2xl tracking-tighter text-white">ARK</div>
        </div>
        <MagneticButton className="bg-surface text-white py-2 px-6 text-[13px] md:text-sm hover:bg-surface/80 border border-white/10 hidden md:flex">
          Agendar uma demonstração
        </MagneticButton>
      </nav>
    </div>
  );
};

// --- 1. HERO SECTION (DARK BLUE) ---
const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.hero-anim',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative pt-32 md:pt-40 pb-10 px-5 md:px-12 xl:px-24 min-h-[85dvh] flex flex-col justify-center overflow-hidden bg-surface">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-surface to-surface"></div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        <div className="lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="hero-anim px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-[10px] md:text-xs font-semibold tracking-wide uppercase mb-6 md:mb-8">
            Exclusivo para Lucro Real e Presumido
          </div>

          <h1 className="hero-anim text-[48px] md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight-compressed md:leading-[1.1]">
            Quanto a Reforma vai tirar da sua margem?
          </h1>

          <p className="hero-anim text-lg md:text-xl text-primary mb-2">
            Se você não sabe responder, <span className="italic">esse é exatamente o problema.</span>
          </p>

          <p className="hero-anim text-[15px] md:text-lg text-secondary mb-10 leading-relaxed-body md:leading-relaxed max-w-xl mx-auto md:mx-0">
            A <strong className="text-white">LC 214/2025</strong> já foi aprovada. O ARK mostra o impacto real na sua operação com os dados da sua empresa, <strong className="text-white">em poucas horas.</strong>
          </p>

          <div className="hero-anim flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <MagneticButton className="bg-accent text-white w-full h-[52px] sm:px-12 text-[15px]">
              Agendar uma demonstração
            </MagneticButton>
            <span className="text-[11px] md:text-sm text-secondary text-center">Sem compromisso nos primeiros 30 dias</span>
          </div>

          <div className="hero-anim grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16 pt-8 border-t border-white/10 w-full">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl md:text-2xl font-bold text-white mb-1"><NumberTicker end={250} prefix="R$ " suffix="bi+" /></div>
              <div className="text-[9px] md:text-[10px] text-secondary uppercase tracking-wider leading-tight">Em NFe processadas pela plataforma</div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl md:text-2xl font-bold text-white mb-1"><NumberTicker end={400} suffix="+" /></div>
              <div className="text-[9px] md:text-[10px] text-secondary uppercase tracking-wider leading-tight">Empresas já usam o ARK</div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl md:text-2xl font-bold text-white mb-1"><NumberTicker end={2027} suffix="+" /></div>
              <div className="text-[9px] md:text-[10px] text-secondary uppercase tracking-wider leading-tight">Reforma em vigor a partir de</div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">LC 214</div>
              <div className="text-[9px] md:text-[10px] text-secondary uppercase tracking-wider leading-tight">Legislação já promulgada</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative hidden md:block">
          <div className="hero-anim relative aspect-[3/4] w-full max-w-md ml-auto rounded-3xl overflow-hidden glass-panel border border-white/10">
            <img
              src="adriano_subira.webp"
              alt="Adriano Subirá"
              width="600"
              height="800"
              loading="lazy"
              className="w-full h-full object-cover mix-blend-luminosity opacity-90"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-sm font-semibold text-white">Adriano Subirá</div>
              <div className="text-xs text-secondary">Presidente do Comitê Tributário Brasileiro</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-anim mt-24 border-y border-white/5 bg-surface/30 py-8 overflow-hidden relative hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>
        <div className="animate-marquee flex items-center gap-16 md:gap-32">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="text-secondary/50 font-bold tracking-widest text-xl opacity-50 uppercase whitespace-nowrap">LOGO</div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 2. VIDEO SECTION (WHITE BACKGROUND) ---
const VideoSection = () => {
  const [showEmbed, setShowEmbed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShowEmbed(true); },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showEmbed && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [showEmbed]);

  const igEmbedHtml = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DUCDL1jjzrs/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DUCDL1jjzrs/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver essa foto no Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DUCDL1jjzrs/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Um post compartilhado por ARK (@ark.tributario)</a></p></div></blockquote>`;

  return (
    <section className="py-20 md:py-24 px-5 md:px-12 xl:px-24 bg-white relative z-10 flex flex-col items-center border-b border-slate-100">
      <FadeUpText className="text-center mb-10 md:mb-12 max-w-3xl">
        <h2 className="text-[32px] md:text-5xl font-bold text-slate-900 leading-tight-compressed md:leading-tight">
          O que a Misa Antonini <span className="text-slate-500 font-light italic">(CEO do G4 Educação)</span> tem a dizer sobre o ARK
        </h2>
      </FadeUpText>
      <div ref={sectionRef} className="w-full max-w-[540px] flex justify-center">
        <FadeUpText className="w-full flex justify-center">
          {showEmbed && <div dangerouslySetInnerHTML={{ __html: igEmbedHtml }} className="w-full" />}
        </FadeUpText>
      </div>
    </section>
  );
};

// --- 3. O QUE REALMENTE MUDOU (DARK BLUE) ---
const WhatChanged = () => {
  const items = [
    {
      title: "Apuração de créditos completamente reformulada",
      desc: "PIS e COFINS dão lugar ao CBS. ICMS e ISS ao IBS. A forma de calcular e apropriar créditos muda em cada fase da transição, afetando diretamente o caixa."
    },
    {
      title: "Precificação que funcionava pode estar errada",
      desc: "As margens calculadas hoje podem não refletir a realidade de 2027 em diante. Empresas que não reprecificarem a tempo perdem competitividade sem perceber."
    },
    {
      title: "Fornecedores do Simples Nacional reduzem seus créditos",
      desc: "No novo modelo, fornecedores do Simples geram créditos menores ou nulos para quem compra. Isso impacta diretamente a margem, sem que a maioria das empresas tenha calculado o quanto."
    },
    {
      title: "Fluxo de caixa impactado fase a fase até 2033",
      desc: "A transição é gradual, mas o impacto acumulado é significativo. Sem projeção, cada fase da Reforma chega como surpresa, prejudicando o planejamento financeiro."
    }
  ];

  return (
    <section className="py-20 md:py-24 px-5 md:px-12 xl:px-24 bg-surface">
      <div className="max-w-6xl mx-auto">
        <FadeUpText className="mb-12 md:mb-16 text-center md:text-left">
          <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-2">O que realmente mudou</h3>
          <h2 className="text-[32px] md:text-5xl font-bold text-white mb-6 leading-tight-compressed md:leading-tight">
            A Reforma não é só uma <span className="italic font-light text-primary">troca de nome de imposto.</span>
          </h2>
          <p className="text-[15px] md:text-lg text-secondary leading-relaxed-body md:leading-relaxed max-w-3xl mx-auto md:mx-0">
            Ela muda a forma como créditos são apurados, como fornecedores impactam sua margem, como sua precificação precisa ser ajustada e como seu fluxo de caixa vai se comportar até 2033. Para empresas no <strong className="text-white">Lucro Presumido e Lucro Real</strong>, o impacto é direto e progressivo.
          </p>
        </FadeUpText>

        <FadeUpGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="glass-panel p-6 md:p-8 rounded-[2rem] hover:bg-white/5 transition-colors border border-white/5">
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 leading-tight">{item.title}</h3>
              <p className="text-[14px] md:text-base text-secondary leading-relaxed-body md:leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </FadeUpGroup>
      </div>
    </section>
  );
};

// --- 4. O PROBLEMA REAL (WHITE BACKGROUND) ---
const TheProblem = () => {
  return (
    <section className="py-24 md:py-32 px-5 bg-white relative">
      <FadeUpText className="max-w-4xl mx-auto text-center">
        <p className="text-slate-500 mb-4 uppercase tracking-widest text-[10px] md:text-sm font-semibold">O problema real</p>
        <p className="text-xl md:text-4xl text-slate-700 font-medium mb-6">O problema não é a Reforma em si.</p>
        <h2 className="text-[32px] md:text-6xl font-bold text-slate-900 italic mb-10 md:mb-12 leading-tight-compressed md:leading-tight">
          É não saber o quanto ela afeta o seu negócio especificamente.
        </h2>
        <p className="text-[15px] md:text-lg text-slate-600 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed-body md:leading-relaxed">
          Estimativas genéricas não servem para tomar decisões reais. Só com os dados da sua operação é possível saber o impacto com precisão.
        </p>
        <div className="flex justify-center">
          <MagneticButton className="bg-slate-900 text-white hover:bg-slate-800 w-full sm:w-auto h-[52px] text-[15px]">Agendar uma demonstração</MagneticButton>
        </div>
      </FadeUpText>
    </section>
  );
};

// --- 5. COMO O ARK RESPONDE (DARK BLUE - SEÇÃO 5) ---
const HowArkResponds = () => {
  return (
    <section className="py-20 md:py-24 px-5 md:px-12 xl:px-24 bg-surface">
      <div className="max-w-6xl mx-auto">
        <FadeUpText className="mb-12 md:mb-16 text-center md:text-left">
          <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-2">Como o ARK responde</h3>
          <h2 className="text-[32px] md:text-5xl font-bold text-white leading-tight-compressed md:leading-tight">
            Não com estimativas de mercado.<br />
            <span className="italic font-light text-primary">Com os dados reais da sua operação.</span>
          </h2>
        </FadeUpText>

        <FadeUpText className="glass-panel rounded-[2rem] p-6 md:p-12 border border-white/5 flex flex-col md:flex-row gap-10 md:gap-12 items-center text-center md:text-left">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">Como funciona</h3>
            <p className="text-[15px] md:text-base text-secondary leading-relaxed-body md:leading-relaxed mb-8 md:mb-6">
              Notas e documentos fiscais da sua empresa são processados por um <strong className="text-white">motor de cálculo com a LC 214/2025 integrada.</strong> O resultado: uma visão clara de como cada fase da transição afeta sua margem, seu caixa e sua competitividade <strong className="text-white">mês a mês, até 2033.</strong>
            </p>
            <MagneticButton className="bg-white text-slate-900 hover:bg-slate-100 w-full sm:w-max h-[52px] text-[15px]">
              Agendar uma demonstração
            </MagneticButton>
          </div>

          <div className="flex-1 w-full bg-surface rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-white/5 z-10">
              <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center text-accent-light"><Terminal className="w-5 h-5" /></div>
              <div className="font-mono text-xs md:text-sm text-primary">SPEDs e XMLs</div>
            </div>
            <div className="w-px h-6 md:h-8 bg-accent/30 mx-auto z-10"></div>
            <div className="flex items-center gap-4 bg-accent p-4 rounded-xl shadow-[0_0_30px_rgba(30,100,186,0.3)] z-10">
              <div className="w-10 h-10 rounded bg-white/20 flex items-center justify-center text-white"><CheckCircle2 className="w-5 h-5" /></div>
              <div className="font-bold text-sm md:text-base text-white">Motor LC 214</div>
            </div>
            <div className="w-px h-6 md:h-8 bg-accent/30 mx-auto z-10"></div>
            <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-white/5 z-10">
              <div className="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center text-green-500"><Clock className="w-5 h-5" /></div>
              <div className="font-mono text-xs md:text-sm text-primary">Projeção até 2033</div>
            </div>
            <div className="absolute top-0 bottom-0 left-10 md:left-12 w-0.5 bg-accent/10"></div>
          </div>
        </FadeUpText>
      </div>
    </section>
  );
};

// --- 6. O ARK RESPONDE COM PRECISÃO (WHITE BACKGROUND) ---
const ArkPrecision = () => {
  const steps = [
    { num: "01", text: "Quanto você vai pagar a mais ou a menos de imposto em cada ano da transição" },
    { num: "02", text: "Quais fornecedores estão reduzindo seus créditos no novo modelo" },
    { num: "03", text: "Se sua precificação atual resiste à Reforma ou precisa ser revisada" },
    { num: "04", text: "Quais oportunidades tributárias ainda existem agora e vão desaparecer em breve", badge: "Janela com prazo limitado" },
    { num: "05", text: "Relatórios prontos para diretoria, investidores e auditorias" },
  ];

  return (
    <section className="py-20 md:py-24 px-5 md:px-12 xl:px-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeUpText>
          <h2 className="text-[32px] md:text-4xl font-bold text-slate-900 mb-12 md:mb-16 text-center leading-tight-compressed md:leading-tight">O ARK responde com precisão</h2>
        </FadeUpText>

        <FadeUpGroup className="flex flex-col gap-4 md:gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 md:gap-6 items-center bg-slate-50 p-5 md:p-6 rounded-[2rem] border border-slate-200 hover:border-slate-300 transition-colors group">
              <div className="text-accent font-mono text-lg md:text-2xl font-bold opacity-50 group-hover:opacity-100 transition-opacity shrink-0">
                - {step.num}
              </div>
              <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 text-left">
                <p className="text-[15px] md:text-lg text-slate-700 leading-tight-compressed md:leading-tight">{step.text}</p>
                {step.badge && (
                  <span className="bg-red-50 text-red-500 text-[10px] md:text-xs px-3 py-1 rounded-full w-max border border-red-200">
                    {step.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </FadeUpGroup>
      </div>
    </section>
  );
};

// --- 7. VALIDADO POR QUEM ENTENDE (DARK BLUE) ---
const ValidatedBy = () => {
  return (
    <section className="py-24 md:py-32 px-5 md:px-12 xl:px-24 bg-surface">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <FadeUpText className="text-center md:text-left">
          <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-2">Validado por quem entende</h3>
          <h2 className="text-[32px] md:text-5xl font-bold text-white mb-6 leading-tight-compressed md:leading-tight">
            Não é uma ferramenta qualquer. É a <span className="italic font-light text-primary">referência técnica da transição tributária.</span>
          </h2>

          <div className="mb-8">
            <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-snug">Recomendado pelo Comitê Tributário Brasileiro</h3>
            <p className="text-[15px] md:text-base text-secondary leading-relaxed-body md:leading-relaxed">
              O ARK foi avaliado pelo CTB, composto por <strong className="text-white">tributaristas, auditores e ex-auditores da Receita Federal</strong>, e é recomendado como tecnologia de referência para a transição da Reforma Tributária.
            </p>
          </div>

          <ul className="space-y-3 mb-10 inline-block text-left">
            {["Tributaristas", "Auditores", "Ex-auditores da Receita Federal", "LC 214/2025 nativa"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm md:text-base text-primary">
                <Check className="text-accent-light w-5 h-5 shrink-0" /> {item}
              </li>
            ))}
          </ul>

          <div className="pt-8 border-t border-white/10">
            <h3 className="text-base md:text-lg font-bold text-white mb-2">Parceria estratégica G4</h3>
            <p className="text-secondary text-xs md:text-sm">Utilizado e recomendado pelo G4 Educação para gestores e empresários. Tecnologia validada por quem vive o tributário por dentro.</p>
          </div>

          <div className="mt-8 flex justify-center md:justify-start">
            <MagneticButton className="bg-accent text-white w-full sm:w-auto h-[52px] text-[15px]">Agendar uma demonstração</MagneticButton>
          </div>
        </FadeUpText>

        <FadeUpText className="bg-surface p-8 md:p-12 rounded-[2rem] border border-white/5 relative text-center md:text-left">
          <div className="text-4xl md:text-6xl text-accent-light opacity-20 absolute top-4 md:top-6 left-4 md:left-6 font-serif">"</div>
          <p className="text-[18px] md:text-2xl text-primary font-medium italic leading-relaxed-body md:leading-relaxed mb-8 relative z-10 pt-4">
            O ARK é a ferramenta mais completa que existe para navegar a Reforma Tributária. Como presidente do Comitê Tributário Brasileiro, não conheço nada equivalente no mercado.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent-light font-bold border border-accent/30 shrink-0">
              AS
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-sm md:text-base">Adriano Subirá</div>
              <div className="text-[10px] md:text-sm text-secondary">Presidente do Comitê Tributário Brasileiro</div>
            </div>
          </div>
        </FadeUpText>
      </div>
    </section>
  );
};

// --- 8. POR QUE O ARK É DIFERENTE (WHITE BACKGROUND) ---
const Comparison = () => {
  const rows = [
    { text: "Usa os dados reais da sua operação (SPEDs e XMLs)" },
    { text: "Projeção mês a mês até 2033" },
    { text: "Motor de cálculo nativo com LC 214/2025 integrada" },
    { text: "Identifica fornecedores que reduzem seus créditos" },
    { text: "Relatórios prontos para diretoria e investidores" },
    { text: "Validado pelo Comitê Tributário Brasileiro" }
  ];

  return (
    <section className="py-20 md:py-24 px-5 md:px-12 xl:px-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUpText className="text-center mb-12 md:mb-16">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Por que o ARK é diferente</h3>
          <h2 className="text-[32px] md:text-5xl font-bold text-slate-900 mb-6 leading-tight-compressed md:leading-tight">
            Diferente de qualquer outro <span className="italic font-light text-slate-500">software tributário.</span>
          </h2>
          <p className="text-[15px] md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed-body md:leading-relaxed">
            A maioria das ferramentas trabalha com <strong className="text-slate-900">estimativas genéricas</strong> e leitura superficial da legislação. O ARK usa a base real de todos os documentos da sua operação, com <strong className="text-slate-900">modelagem técnica e projeções completas até 2033.</strong>
          </p>
        </FadeUpText>

        <FadeUpText className="overflow-x-auto pb-6 scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[340px] md:min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-4 px-2 md:px-6 text-slate-600 text-[11px] md:text-sm font-medium w-1/2">Capacidade</th>
                <th className="py-4 px-2 md:px-6 text-slate-600 text-[11px] md:text-sm font-medium text-center w-1/4">Outros</th>
                <th className="py-4 px-2 md:px-6 font-bold text-white text-[11px] md:text-sm text-center w-1/4 bg-slate-900 rounded-t-xl">ARK</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 md:py-5 px-2 md:px-6 text-[12px] md:text-base text-slate-800 leading-tight">{row.text}</td>
                  <td className="py-4 md:py-5 px-2 md:px-6 text-center text-slate-300"><Minus className="w-4 md:w-5 h-4 md:h-5 mx-auto" /></td>
                  <td className="py-4 md:py-5 px-2 md:px-6 text-center bg-slate-900 border-x border-slate-800"><Check className="w-4 md:w-5 h-4 md:h-5 text-accent-light mx-auto" /></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td><td></td>
                <td className="bg-slate-900 rounded-b-xl h-4 border-x border-b border-slate-800"></td>
              </tr>
            </tfoot>
          </table>
        </FadeUpText>

        <FadeUpText className="mt-10 md:mt-12 text-center max-w-2xl mx-auto">
          <p className="text-[18px] md:text-xl text-slate-900 mb-4 font-bold">Não é apuração. <span className="italic font-normal">É estratégia.</span></p>
          <p className="text-[14px] md:text-base text-slate-600 mb-8 leading-relaxed-body md:leading-relaxed">
            O ARK não te diz o que você pagou. Te diz o que você vai pagar, e o que você pode fazer para mudar esse número. Veja como o ARK analisa a sua operação especificamente.
          </p>
          <div className="flex justify-center">
            <MagneticButton className="bg-slate-900 text-white w-full sm:w-auto h-[52px] text-[15px]">Agendar uma demonstração</MagneticButton>
          </div>
        </FadeUpText>
      </div>
    </section>
  );
};

// --- 9. FAQ (DARK BLUE - SEÇÃO 9) ---
const FAQ = () => {
  const faqs = [
    {
      q: "Já tenho um sistema fiscal. Preciso trocar?",
      a: "Não. O ARK não substitui o seu ERP ou sistema fiscal atual. Ele atua como uma camada de inteligência estratégica sobre o que você já tem, consumindo os dados que sua operação já gera."
    },
    {
      q: "Não tenho time técnico para isso. Funciona assim mesmo?",
      a: "Sim. O ARK foi construído para ser operado por donos de empresa e gestores, não por times de TI. A plataforma oferece condução guiada e suporte com IA para auxiliar em cada etapa."
    },
    {
      q: "A Reforma ainda não entrou em vigor. Por que agir agora?",
      a: "Cada mês sem visibilidade é um mês tomando decisões erradas sobre fornecedores, preços e investimentos. As empresas que já entenderam o impacto estão renegociando contratos, ajustando margens e capturando créditos que vão desaparecer. Enquanto isso, quem espera chega atrasado numa corrida que já começou."
    },
    {
      q: "Qual o perfil de empresa que o ARK atende?",
      a: "Empresas no Lucro Presumido ou Lucro Real, com faturamento a partir de R$ 400 mil mensais. Indústrias, prestadores de serviço, comércio atacadista e empresas de tecnologia estão entre os perfis com maior aderência."
    }
  ];

  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="py-20 md:py-24 px-5 md:px-12 xl:px-24 bg-surface">
      <div className="max-w-3xl mx-auto">
        <FadeUpText className="mb-10 md:mb-12 text-center">
          <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-2">Tire suas dúvidas</h3>
          <h2 className="text-[32px] md:text-5xl font-bold text-white mb-4 leading-tight-compressed md:leading-tight">Perguntas <span className="italic font-light text-primary">frequentes</span></h2>
          <p className="text-[15px] md:text-base text-secondary leading-relaxed-body md:leading-relaxed">Respostas diretas para as dúvidas mais comuns de quem ainda está avaliando o ARK.</p>
        </FadeUpText>

        <FadeUpGroup className="flex flex-col gap-3 md:gap-4 mb-12">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border border-white/10 rounded-[1rem] md:rounded-2xl overflow-hidden transition-colors ${isOpen ? 'bg-[#0A0F14]' : 'bg-transparent'}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-[15px] md:text-base text-white pr-4 leading-tight">{faq.q}</span>
                  <ChevronDown className={`w-4 md:w-5 h-4 md:h-5 text-accent-light transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className="px-5 md:px-6 text-[14px] md:text-base text-secondary overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? '250px' : '0', paddingBottom: isOpen ? '1.25rem' : '0' }}
                >
                  <p className="leading-relaxed-body md:leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a.replace(/(não substitui o seu ERP ou sistema fiscal atual\.|donos de empresa e gestores|decisões erradas|Lucro Presumido ou Lucro Real)/g, '<strong class="text-white">$1</strong>') }}></p>
                </div>
              </div>
            );
          })}
        </FadeUpGroup>

        <FadeUpText className="flex justify-center">
          <MagneticButton className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-100 w-full sm:w-auto h-[52px] text-[15px]">Agendar uma demonstração</MagneticButton>
        </FadeUpText>
      </div>
    </section>
  );
};

// --- 10. FINAL CTA (WHITE) ---
const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 px-5 md:px-12 xl:px-24 bg-white">
      <FadeUpText className="max-w-5xl mx-auto bg-slate-50 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 relative overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50">

        <div className="text-center relative z-10 mb-10 md:mb-12">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">Janela de oportunidade aberta</h3>
          <h2 className="text-[32px] md:text-5xl font-bold text-slate-900 mb-6 leading-tight-compressed md:leading-tight">
            A janela para se preparar existe.<br />Mas ela não fica <span className="italic text-accent">aberta para sempre.</span>
          </h2>
          <p className="text-[15px] md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed-body md:leading-relaxed">
            Algumas oportunidades tributárias da fase de transição já estão ativas. <strong className="text-slate-900">Créditos que existem hoje podem desaparecer nos próximos meses.</strong> Quanto antes sua empresa tiver visibilidade, mais tempo tem para agir com estratégia, e não com pressa.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 relative z-10 text-center shadow-sm">
          <h3 className="text-[20px] md:text-3xl font-bold text-slate-900 mb-8 leading-snug">
            Veja o impacto da Reforma na sua empresa <span className="italic font-light text-slate-500">em até 2 horas.</span>
          </h3>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mb-10 text-[11px] md:text-sm text-slate-700">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 md:w-5 h-4 md:h-5 text-accent" /> Dados reais</div>
            <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 md:w-5 h-4 md:h-5 text-accent" /> Resultados precisos</div>
            <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 md:w-5 h-4 md:h-5 text-accent" /> Sem compromisso</div>
          </div>

          <MagneticButton className="bg-accent text-white px-8 md:px-12 py-4 md:py-5 h-[52px] text-[15px] md:text-lg mx-auto w-full sm:w-max">
            Agendar uma demonstração
          </MagneticButton>
        </div>
      </FadeUpText>
    </section>
  );
};

// --- 11. CONTACT FORM SECTION (DARK BLUE) ---
// --- 11. CONTACT FORM SECTION (DARK BLUE) ---
const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    companyName: ''
  });
  const [taxRegime, setTaxRegime] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone' && value.length > 11) return;
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taxRegime || !employeeCount) {
      alert('Por favor, selecione o regime tributário e o número de funcionários.');
      return;
    }

    if (taxRegime === 'Simples Nacional' || employeeCount === 'até 10') {
      setStatus('disqualified');
      return;
    }

    setStatus('loading');

    // Dados para o RD Station via API v2
    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "lp-ark-google",
        name: formData.fullName,
        email: formData.email,
        mobile_phone: formData.phone,
        company_name: formData.companyName,
        cf_nome_da_empresa: formData.companyName,
        cf_qual_o_regime_tributario_da_sua_empresa: taxRegime,
        cf_quantos_funcionarios_sua_empresa_possui: employeeCount,
        cf_url_da_pagina: window.location.href, // Enviando a URL como campo personalizado
        page_title: document.title,
        page_url: window.location.href
      }
    };

    try {
      console.log('Enviando conversão para RD Station...', payload);

      // Tentativa 1: API Direta (Mais confiável em SPAs)
      const response = await fetch('https://api.rd.services/platform/conversions?api_key=5ea9cecb70c7e3c3c4855778cc9e081a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Se a API responder erro de CORS, ainda pode ter funcionado (no-cors)
      if (response.ok || response.status === 201) {
        console.log('Sucesso: Lead enviado via API!');
      } else {
        console.warn('Erro na resposta da API, tentando fallback no-cors...');
        fetch('https://api.rd.services/platform/conversions?api_key=5ea9cecb70c7e3c3c4855778cc9e081a', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      // Tentativa 2: SDK do RD (Para garantir que apareça em "formulários capturados")
      if (window.RdIntegration) {
        const sdkData = [
          { name: 'conversion_identifier', value: 'lp-ark-google' },
          { name: 'email', value: formData.email },
          { name: 'name', value: formData.fullName },
          { name: 'page_url', value: window.location.href }
        ];
        window.RdIntegration.post(sdkData);
      }

      // Dispara conversão no Google apenas para leads qualificados
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'conversion_qualified' });

      setStatus('success');

    } catch (error) {
      console.error('Erro na integração:', error);
      // Fallback final no-cors para garantir o envio
      fetch('https://api.rd.services/platform/conversions?api_key=5ea9cecb70c7e3c3c4855778cc9e081a', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setStatus('success');
    }
  };

  return (
    <section id="demonstracao" className="py-20 md:py-24 px-5 md:px-12 xl:px-24 bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <FadeUpText className="text-center md:text-left">
          <h2 className="text-[36px] md:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight-compressed md:leading-tight">
            Pronto para ver o <span className="text-accent-light italic">impacto real</span> na sua empresa?
          </h2>
          <p className="text-[15px] md:text-xl text-secondary mb-10 md:mb-12 leading-relaxed-body md:leading-relaxed">
            Preencha o formulário e nossa equipe técnica entrará em contato para agendar sua demonstração personalizada do ARK.
          </p>

          <div className="space-y-6 inline-block text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent-light shrink-0"><Check className="w-5 h-5" /></div>
              <div>
                <div className="text-white font-bold text-sm md:text-base">Diagnóstico em tempo real</div>
                <div className="text-secondary text-xs md:text-sm">Usamos seus dados para mostrar a realidade.</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent-light shrink-0"><Check className="w-5 h-5" /></div>
              <div>
                <div className="text-white font-bold text-sm md:text-base">Equipe Especializada</div>
                <div className="text-secondary text-xs md:text-sm">Fale com quem entende de tributário e tecnologia.</div>
              </div>
            </div>
          </div>
        </FadeUpText>

        <FadeUpText className="bg-surface p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-accent-light" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Recebemos seu contato!</h3>
              <p className="text-secondary mb-8 max-w-sm">
                Nossa equipe técnica já foi notificada e entrará em contato em breve para agendar sua demonstração.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-accent-light hover:underline font-medium"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : status === 'disqualified' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <CheckCircle2 className="w-10 h-10 text-white/60" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Obrigado pelo interesse!</h3>
              <p className="text-secondary mb-8 max-w-md leading-relaxed text-sm md:text-base">
                O ARK é desenvolvido para empresas em Lucro Presumido ou Lucro Real. Se tiver dúvidas, entre em contato com nossa equipe.
              </p>
              <button
                onClick={() => {
                  setFormData({ fullName: '', phone: '', email: '', companyName: '' });
                  setTaxRegime('');
                  setEmployeeCount('');
                  setStatus('idle');
                }}
                className="text-accent-light hover:underline font-medium"
              >
                Voltar ao formulário
              </button>
            </div>
          ) : (
            <form id="lp-form-vocare" onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info Group */}
              <div className="space-y-4">
                <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider">Informações para contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-white/80">Nome Completo</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-white/50"
                      placeholder="Como podemos te chamar?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-white/80">Telefone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      maxLength={11}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-white/50"
                      placeholder="Somente números (11 dígitos)"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">E-mail Corporativo</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-white/50"
                    placeholder="seu@email.com.br"
                  />
                </div>
              </div>

              {/* Tax Regime Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Qual o Regime Tributário da sua empresa?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Simples Nacional', 'Lucro Presumido', 'Lucro Real'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTaxRegime(option)}
                      className={`px-4 py-3 rounded-xl border text-sm transition-all text-center ${taxRegime === option
                          ? 'bg-accent border-accent text-white font-semibold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Employee Count Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Qual o número de funcionários da sua empresa?</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {['até 10', '10 a 20', '20 a 50', '50 a 100', 'acima de 100'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setEmployeeCount(option)}
                      className={`px-3 py-3 rounded-xl border text-xs transition-all text-center ${employeeCount === option
                          ? 'bg-accent border-accent text-white font-semibold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Info Group */}
              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium text-white/80">Nome da Empresa</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-white/50"
                  placeholder="Razão social ou nome fantasia"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full h-[52px] bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 group"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    Agendar uma demonstração
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-xs text-center mt-2">Ocorreu um erro ao enviar. Por favor, tente novamente.</p>
              )}
              <p className="text-[10px] text-center text-secondary/60">Ao enviar, você concorda com nossos Termos de Uso e Política de Privacidade.</p>
            </form>
          )}
        </FadeUpText>
      </div>
    </section>
  );
};

// --- 12. FOOTER (DARK BLUE) ---
const Footer = () => {
  return (
    <footer className="bg-surface pt-20 pb-12 px-5 md:px-12 xl:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <img src="logo.webp" alt="ARK" width="113" height="32" className="h-8 md:h-10 mb-4 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
        <div className="hidden font-bold text-3xl md:text-4xl tracking-tighter text-white mb-4">ARK</div>
        <p className="text-[14px] md:text-base text-secondary max-w-sm mb-12 leading-relaxed-body md:leading-relaxed">
          Descubra o impacto real na sua empresa.<br />Preencha os dados para simular quanto a Reforma Tributária pode aumentar ou reduzir sua carga.
        </p>

        <div className="border-t border-white/10 pt-8 w-full flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs text-secondary/60 gap-4">
          <p>© {new Date().getFullYear()} Vocare. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="https://policies.google.com/privacy" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="https://policies.google.com/terms" className="hover:text-white transition-colors">Termos de Serviço</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <VideoSection />
      <WhatChanged />
      <TheProblem />
      <HowArkResponds />
      <ArkPrecision />
      <ValidatedBy />
      <Comparison />
      <FAQ />
      <FinalCTA />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
