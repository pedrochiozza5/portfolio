import { useEffect, useRef, useState } from 'react';
import projectsContent from './content/projects.json';
import ProjectEditor, { normalize as normalizeProjects } from './ProjectEditor';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Braces, Check, ChevronRight,
  Code2, Command, Copy, Database, ExternalLink, Github,
  Instagram, Layers3, Mail, Menu, MonitorSmartphone, Network,
  ShieldCheck, Workflow, X,
} from 'lucide-react';

const EMAIL = 'pedrochiozza5@gmail.com';
const WHATSAPP = 'https://wa.me/5492241540585?text=' + encodeURIComponent('Hola, vi el portfolio de CZ TECNO y quisiera consultar por un proyecto.');
const LOGO_URL = `${import.meta.env.BASE_URL}logo-cztecno.svg`;
const imageSrc = (path: string) => path.startsWith('https://') || path.startsWith('http://') || path.startsWith('data:image/') ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const INSTAGRAM = 'https://www.instagram.com/cz.tecno/';
const GITHUB = 'https://github.com/pedrochiozza5';
const BC_INSTAGRAM = 'https://www.instagram.com/bc.tecnologia_/';
const BC_CV = 'https://curriculum-bautista.vercel.app/';
const BC_LOGO_URL = `${import.meta.env.BASE_URL}bc-studio-logo.jpg`;

type Category = 'Web' | 'Sistemas' | 'Automatización' | 'Backend';
type Filter = 'Todos' | Category;
type Visual = 'sushi' | 'amargos' | 'coop' | 'teros' | 'contable' | 'turnero' | 'site';
export type Project = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: Category;
  kind: string;
  status: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  owner?: 'CZ TECNO' | 'BC STUDIO';
  visual: Visual;
  cover?: string;
  url?: string;
  urlLabel?: string;
};

const defaultProjects: Project[] = projectsContent as Project[];

const filters: Filter[] = ['Todos', 'Web', 'Sistemas', 'Automatización', 'Backend'];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <span className={`brand-lockup ${inverse ? 'brand-inverse' : ''}`}>
    <span className="brand-symbol" aria-hidden="true"><img src={LOGO_URL} alt="" /></span>
    <span className="brand-text">cz<span>.</span>tecno</span>
  </span>;
}

function ProjectVisual({ variant, cover, title }: { variant: Visual; cover?: string; title?: string }) {
  if (cover) return <div className="visual project-cover"><img src={imageSrc(cover)} alt={`Imagen del proyecto ${title ?? 'CZ TECNO'}`} loading="lazy" /><span className="project-cover-mark">PORTFOLIO / PROYECTO</span></div>;
  if (variant === 'site') return <div className="visual visual-site">
    <div className="v-top"><span>BC <span className="v-top-dot">/</span> STUDIO</span><span>WEB PROJECT</span></div>
    <div className="site-glow" aria-hidden="true"/><div className="site-frames" aria-hidden="true"><span/><span/><span/></div>
    <div className="site-preview-content"><span>DISEÑO / DESARROLLO WEB</span><strong>{title || 'PROYECTO WEB'}<i>.</i></strong><small>ESTUDIO DIGITAL · PRESENCIA ONLINE</small></div>
    <div className="v-caption">COMPOSICIÓN CONCEPTUAL / NO CAPTURA REAL</div>
  </div>;
  if (variant === 'sushi') return <div className="visual visual-sushi">
    <div className="v-top"><span>PUNTTO<span className="v-top-dot">●</span>SUSHI</span><span>ORDER SYSTEM / 01</span></div>
    <div className="sushi-glyph" aria-hidden="true"><span/><span/><span/></div>
    <div className="sushi-title">GOOD FOOD.<br/><em>SMART FLOW.</em></div>
    <div className="sushi-ticket"><small>ÚLTIMO PEDIDO</small><strong>#0258 <span>Confirmado</span></strong><div>Combo · 24 piezas <b>→</b></div><div>Retiro en local <b>✓</b></div></div>
    <div className="v-caption">REPRESENTACIÓN VISUAL / NO CAPTURA</div>
  </div>;
  if (variant === 'amargos') return <div className="visual visual-amargos">
    <div className="v-top"><span>bien amargos<span className="v-top-dot">.</span></span><span>TIENDA / COLECCIÓN</span></div>
    <div className="mate-halo" aria-hidden="true"><div className="mate-body"><div className="mate-top"/><div className="mate-straw"/></div></div>
    <div className="mate-headline">TU RITUAL.<br/><em>TU MOMENTO.</em></div>
    <div className="mate-tag">E-COMMERCE MULTIMARCA <ArrowUpRight size={13}/></div>
    <div className="v-caption">REPRESENTACIÓN VISUAL / NO CAPTURA</div>
  </div>;
  if (variant === 'coop') return <div className="visual visual-coop">
    <div className="v-top"><span>COOP<span className="v-top-dot">_</span>FLOW</span><span>OPERATIONS / SYSTEM</span></div>
    <div className="coop-frame"><div className="coop-frame-head"><span><i/> CONTROL CENTER</span><span>ACTIVE SESSION</span></div><div className="coop-metrics"><div><small>Procesos</small><strong>Automatizar</strong><span className="coop-line l1"/></div><div><small>Flujos</small><strong>Conectar</strong><span className="coop-line l2"/></div></div><div className="coop-steps"><div><i/> Entrada de información <b>01</b></div><div><i/> Validación y proceso <b>02</b></div><div><i/> Seguimiento y control <b>03</b></div></div></div>
    <div className="v-caption">INTERFAZ CONCEPTUAL / DATOS FICTICIOS</div>
  </div>;
  if (variant === 'teros') return <div className="visual visual-teros">
    <div className="v-top"><span>LOS TEROS <span className="v-top-dot">↗</span></span><span>RESERVAS / AUTOMATION</span></div>
    <div className="teros-court"><div className="court-mid"/><div className="court-circle"/></div>
    <div className="teros-widget"><span>TURNOS DISPONIBLES</span><div><b>15:00</b><b>16:00</b><b className="slot-active">17:00 <Check size={12}/></b></div><small>Reservá en segundos, desde WhatsApp.</small></div>
    <div className="v-caption">REPRESENTACIÓN VISUAL / NO CAPTURA</div>
  </div>;
  if (variant === 'contable') return <div className="visual visual-contable">
    <div className="v-top"><span>CZ<span className="v-top-dot">.</span>CONTABLE</span><span>FINANCE / OPERATIONS</span></div>
    <div className="finance-card"><small>GESTIÓN / VISIÓN GENERAL</small><strong>Todo más claro<span>.</span></strong><div className="finance-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="finance-bottom"><span>Ventas</span><span>Compras</span><span>Movimientos</span></div></div>
    <div className="v-caption">INTERFAZ CONCEPTUAL / DATOS FICTICIOS</div>
  </div>;
  return <div className="visual visual-turnero">
    <div className="v-top"><span>&gt; turnero_api<span className="v-top-dot">_</span></span><span>BACKEND / OPEN SOURCE</span></div>
    <div className="terminal-code"><div><span className="line-no">01</span><span className="code-purple">const</span> booking = <span className="code-yellow">await</span> api.create({'{'}</div><div><span className="line-no">02</span>&nbsp; &nbsp; date: <span className="code-green">'2026-11-12'</span>,</div><div><span className="line-no">03</span>&nbsp; &nbsp; status: <span className="code-green">'confirmed'</span></div><div><span className="line-no">04</span>{'}'});</div><div className="terminal-response"><span className="line-no">05</span>✓ 201 CREATED</div></div>
    <div className="terminal-note">TYPE SAFE <span>•</span> REST API <span>•</span> DATA FIRST</div>
    <div className="v-caption">EJEMPLO ILUSTRATIVO / NO CÓDIGO DEL REPO</div>
  </div>;
}

function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem('cztecno.portfolio.projects.v1');
      if (!stored) return defaultProjects;
      const drafts = normalizeProjects(JSON.parse(stored));
      // Mantener las fotos y textos editados mientras se incorporan los proyectos nuevos.
      const ids = new Set(drafts.map(p=>p.id));
      return [...drafts, ...defaultProjects.filter(p=>!ids.has(p.id))].map((p,i)=>({...p,number:String(i+1).padStart(2,'0')}));
    } catch { return defaultProjects; }
  });
  const [editorOpen,setEditorOpen] = useState(() => new URLSearchParams(window.location.search).has('editar'));
  const [saveFailed,setSaveFailed] = useState(false);
  const [filter, setFilter] = useState<Filter>('Todos');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shown = filter === 'Todos' ? projects : projects.filter(project => project.category === filter);

  useEffect(() => {
    try { localStorage.setItem('cztecno.portfolio.projects.v1', JSON.stringify(projects)); setSaveFailed(false); }
    catch { setSaveFailed(true); }
  }, [projects]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max * 100 : 0);
      document.body.classList.toggle('is-scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
    }, { rootMargin: '0px 0px -35px 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal:not(.in-view)').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setCommandOpen(v => !v); }
      if (event.key === 'Escape') { setActiveProject(null); setCommandOpen(false); setMenuOpen(false); setEditorOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject || commandOpen || menuOpen || editorOpen ? 'hidden' : '';
    if (activeProject) closeRef.current?.focus();
    return () => { document.body.style.overflow = ''; };
  }, [activeProject, commandOpen, menuOpen, editorOpen]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') {
        document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); window.setTimeout(() => setCopied(false), 2300); }
    catch { window.location.href = `mailto:${EMAIL}`; }
  }
  const navigate = (id: string) => { setMenuOpen(false); setCommandOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return <>
    <div className="page-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
    <header className="site-header"><div className="shell nav-shell">
      <a href="#inicio" className="logo-link" onClick={() => setMenuOpen(false)} aria-label="CZ TECNO, ir al inicio"><Brand /></a><span className="brand-partner" aria-label="En alianza con BC Studio"><span>×</span><img src={BC_LOGO_URL} className="brand-partner-logo" alt="" /> BC STUDIO</span>
      <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegación principal">
        <a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos <span>01</span></a>
        <a href="#soluciones" onClick={() => setMenuOpen(false)}>Soluciones <span>02</span></a>
        <a href="#equipo" onClick={() => setMenuOpen(false)}>Equipo <span>03</span></a>
        <a href="#vision" onClick={() => setMenuOpen(false)}>Visión <span>04</span></a>
        <a className="mobile-contact" href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>WhatsApp <ArrowUpRight size={16}/></a>
      </nav>
      <div className="nav-actions"><button className="command-trigger" onClick={() => setCommandOpen(true)} title="Accesos rápidos (Ctrl+K)" aria-label="Abrir accesos rápidos"><Command size={15}/> <span>K</span></button><a href={WHATSAPP} target="_blank" rel="noreferrer" className="nav-cta">WhatsApp <ArrowUpRight size={16}/></a><button className="nav-toggle" type="button" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button></div>
    </div></header>

    <main>
      <section className="hero" id="inicio"><div className="hero-mesh" aria-hidden="true"/><div className="shell hero-content">
        <div className="hero-topline"><span className="status-dot"/><span>DOS MARCAS, UN EQUIPO · SOFTWARE & TECNOLOGÍA</span><span className="hero-topline-right">RANCHOS, ARGENTINA · 2026</span></div>
        <div className="hero-grid"><div className="hero-copy"><span className="overline hero-mini">DOS HERMANOS · CZ TECNO × BC STUDIO</span><div className="hero-team-badge"><img src={LOGO_URL} alt="CZ TECNO"/><span>×</span><img src={BC_LOGO_URL} alt="BC Studio"/><strong>UN SOLO EQUIPO DIGITAL</strong></div>
          <h1>ENTRAR.<br/><span>CONFIAR.</span><br/><em>HACER QUE</em><br/>PASE<span className="headline-dot">.</span></h1>
          <div className="hero-bottom"><p>Somos Pedro y Bautista Chiozza. Unimos <strong>diseño que inspira confianza</strong> con <strong>software que resuelve</strong>. Creamos webs, sistemas y automatizaciones pensados para que cada proyecto se vea profesional y funcione de verdad.</p><div className="hero-links"><a className="button button-primary" href="#proyectos">Explorar proyectos <ArrowUpRight size={20}/></a><a className="button button-text" href={WHATSAPP} target="_blank" rel="noreferrer">Contanos tu idea <ArrowUpRight size={19}/></a></div></div>
        </div>
        <div className="hero-object" aria-label="Ilustración conceptual de un sistema digital">
          <div className="holo-grid" aria-hidden="true"/><div className="holo-ring ring-a"/><div className="holo-ring ring-b"/><img className="holo-brand" src={LOGO_URL} alt="" />
          <div className="floating-label float-top"><span className="tiny-indicator"/> SYSTEM ONLINE <span>● ● ●</span></div>
          <div className="floating-window"><div className="window-header"><div className="window-dots"><i/><i/><i/></div><span>cztecno + bc / workspace</span><span>↗</span></div><div className="window-content"><small>CONFIANZA / DISEÑO / CÓDIGO</small><strong>IDEA → <span>RESULTADO</span></strong><div className="window-flow"><div><i>01</i><span>Entender</span><b>✓</b></div><div><i>02</i><span>Construir</span><b>✓</b></div><div><i>03</i><span>Evolucionar</span><b className="flow-active">↗</b></div></div></div><div className="window-bottom"><span>● READY TO BUILD</span><span>CZ × BC / 2026</span></div></div>
          <div className="floating-label float-bottom">DESIGN <span>+</span> CODE <span>+</span> SYSTEMS</div>
          <span className="hero-vertical">DESIGNED TO SOLVE / BUILT TO LAST</span>
        </div></div>
        <div className="hero-foot"><a href="#proyectos" className="scroll-hint"><span className="scroll-arrow"><ArrowDown size={15}/></span> SCROLL PARA EXPLORAR</a><div className="hero-foot-links"><a href={GITHUB} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={14}/></a><a href={INSTAGRAM} target="_blank" rel="noreferrer">CZ TECNO <ArrowUpRight size={14}/></a><a href={BC_INSTAGRAM} target="_blank" rel="noreferrer">BC STUDIO <ArrowUpRight size={14}/></a></div><span>01 / PORTFOLIO DIGITAL</span></div>
      </div></section>

      <section className="credibility-strip" aria-label="Nuestra forma de trabajar"><div className="shell credibility-strip-inner"><span><Check size={15}/> Trabajo real y visible</span><span><Check size={15}/> Diseño responsive de calidad</span><span><Check size={15}/> Contacto directo con el equipo</span><span><Check size={15}/> Software preparado para evolucionar</span></div></section>

      <div className="ticker" aria-label="Áreas de trabajo"><div className="ticker-track" aria-hidden="true">{Array.from({ length: 4 }).map((_,i) => <span key={i}>DESARROLLO WEB <b>•</b> SISTEMAS A MEDIDA <b>•</b> AUTOMATIZACIONES <b>•</b> NETWORKING & IT <b>•</b> </span>)}</div></div>

      <section className="section projects-section" id="proyectos"><div className="shell"><div className="section-heading reveal"><span className="eyebrow"><b>01</b> / TRABAJO REAL</span><div className="heading-row"><h2>Proyectos que<br/><em>hablan por sí solos.</em></h2><p>Una selección de proyectos de Pedro y Bautista. Cada marca aporta su recorrido, sus casos y su manera de resolver.</p></div></div>
        <div className="filters reveal" role="group" aria-label="Filtrar proyectos">{filters.map(item => <button className={`filter ${filter===item?'selected':''}`} key={item} aria-pressed={filter===item} onClick={() => setFilter(item)}>{item}{item==='Todos' && <sup>{projects.length.toString().padStart(2,'0')}</sup>}</button>)}</div>
        <div className="project-grid">{shown.map((project,i) => <article className={`project-card reveal ${i<2?'project-featured':''}`} key={project.id}>
          <button className="project-art-action" type="button" onClick={() => setActiveProject(project)} aria-label={`Explorar el proyecto ${project.name}`}><ProjectVisual variant={project.visual} cover={project.cover} title={project.name}/><span className="art-open"><ArrowUpRight size={23}/></span></button>
          <div className="project-info"><div className="project-meta"><span>{project.number} / {project.kind} <b className="project-owner">{project.owner || 'CZ TECNO'}</b></span><span className="status-label"><i/>{project.status}</span></div><div className="project-title"><h3>{project.name}</h3><button onClick={() => setActiveProject(project)} aria-label={`Leer el caso de ${project.name}`} className="project-more"><ArrowUpRight size={23}/></button></div><p className="project-tagline">{project.tagline}</p><p className="project-description">{project.description}</p><div className="project-footer"><div>{project.stack.slice(0,3).map(item => <span key={item}>{item}</span>)}</div><button onClick={() => setActiveProject(project)} className="inline-link">Ver caso <ArrowRight size={17}/></button></div></div>
        </article>)}</div><div className="more-work reveal"><span>HAY MÁS IDEAS CONVIRTIÉNDOSE EN PROYECTOS.</span><a href={GITHUB} target="_blank" rel="noreferrer">Explorar mi GitHub <Github size={18}/><ArrowUpRight size={17}/></a></div>
      </div></section>

      <section className="trust-section" id="confianza"><div className="shell">
        <div className="trust-intro reveal"><span className="eyebrow"><b>01B</b> / POR QUÉ CONFIAR</span><h2>La primera impresión importa.<br/><em>Lo que hay detrás, mucho más.</em></h2><p>Un buen diseño no reemplaza la calidad técnica. La hace visible. Nuestro trabajo une experiencia, estética y ejecución para que tu proyecto transmita el nivel que merece.</p></div>
        <div className="trust-grid">
          <article className="trust-tile reveal"><span>01 /</span><div className="trust-glyph"><MonitorSmartphone size={27}/></div><h3>Diseño con intención</h3><p>No armamos pantallas al azar: claridad, jerarquía visual y experiencia móvil desde el primer momento.</p></article>
          <article className="trust-tile reveal"><span>02 /</span><div className="trust-glyph"><Code2 size={27}/></div><h3>Trabajo demostrable</h3><p>Proyectos reales que se pueden recorrer, comprender y evaluar. Sin números inventados ni promesas vacías.</p></article>
          <article className="trust-tile reveal"><span>03 /</span><div className="trust-glyph"><Network size={27}/></div><h3>Mirada integral</h3><p>Del diseño a la base de datos y la infraestructura que sostiene el producto. Todo conectado.</p></article>
          <article className="trust-tile reveal"><span>04 /</span><div className="trust-glyph"><ArrowUpRight size={27}/></div><h3>Relación directa</h3><p>Hablás con quienes diseñan y desarrollan. Menos intermediarios, más claridad y seguimiento.</p></article>
        </div>
      </div></section>

      <section className="manifesto-band"><div className="shell"><span>NO HACEMOS TECNOLOGÍA POR HACER TECNOLOGÍA.</span><p>LA HACEMOS PARA QUE <em>ALGO FUNCIONE MEJOR.</em></p><span className="band-asterisk">•</span></div></section>

      <section className="section solutions-section" id="soluciones"><div className="shell"><div className="section-heading reveal"><span className="eyebrow"><b>02</b> / SOLUCIONES</span><div className="heading-row"><h2>Un problema.<br/><em>Muchas formas de resolverlo.</em></h2><p>Nuestro diferencial es combinar diseño, desarrollo, soporte e infraestructura: lo que se ve bien también tiene que funcionar en la vida real.</p></div></div>
        <div className="solutions-list"><article className="solution reveal"><span className="solution-index">01 /</span><div className="solution-icon"><MonitorSmartphone size={30}/></div><div><h3>Webs & e-commerce</h3><p>Sitios con identidad, tiendas, catálogos y experiencias mobile-first que ayudan a mostrar y vender mejor.</p><span>REACT · UI/UX · TIENDAS</span></div><ArrowUpRight className="solution-arrow" size={24}/></article>
        <article className="solution reveal"><span className="solution-index">02 /</span><div className="solution-icon"><Database size={30}/></div><div><h3>Sistemas a medida</h3><p>Paneles administrativos, gestión de clientes, operaciones, stock, reservas, datos y APIs conectadas.</p><span>BACKEND · BASES DE DATOS · SAAS</span></div><ArrowUpRight className="solution-arrow" size={24}/></article>
        <article className="solution reveal"><span className="solution-index">03 /</span><div className="solution-icon"><Workflow size={30}/></div><div><h3>Bots & automatización</h3><p>Procesos que dejan de depender de copiar, pegar y repetir. Integraciones y flujos diseñados para ahorrar trabajo.</p><span>WHATSAPP · APIS · INTEGRACIONES</span></div><ArrowUpRight className="solution-arrow" size={24}/></article>
        <article className="solution reveal"><span className="solution-index">04 /</span><div className="solution-icon"><Network size={30}/></div><div><h3>Infraestructura & soporte IT</h3><p>Redes, servidores, conectividad, diagnóstico y mantenimiento. Tecnología sólida, también detrás de pantalla.</p><span>LINUX · MIKROTIK · REDES · SOPORTE</span></div><ArrowUpRight className="solution-arrow" size={24}/></article></div>
      </div></section>

      <section className="section about-section" id="nosotros"><div className="shell about-layout"><div className="about-head reveal"><span className="eyebrow"><b>03</b> / DETRÁS DEL CÓDIGO</span><h2>Dos caminos.<br/><em>Una misma forma de crear.</em></h2><div className="about-monogram"><span>CZ<span className="monogram-plus">+</span>BC</span><small>DOS HERMANOS<br/>UN EQUIPO DIGITAL</small></div></div><div className="about-story reveal"><span className="about-corner">OUR STORY / 2026 ↗</span><p className="about-intro">Somos <strong>Pedro y Bautista Chiozza</strong>. Nos une la tecnología y la idea de que una buena solución se mide por lo que aporta a la vida real.</p><p>Desde CZ TECNO, Pedro aporta desarrollo full stack, sistemas, automatización e infraestructura. Desde BC Studio, Bautista suma proyectos de diseño y desarrollo web para negocios.</p><p>Estamos construyendo una agencia juntos. Conservamos nuestras identidades y combinamos experiencia, criterio y ganas de crear productos digitales útiles, claros y con futuro.</p><div className="about-signature"><span>WEB <i>+</i> SISTEMAS <i>+</i> AUTOMATIZACIÓN <i>+</i> IT</span><span>BUENOS AIRES, ARGENTINA</span></div></div></div></section>


      <section className="section team-section" id="equipo"><div className="shell">
        <div className="section-heading reveal"><span className="eyebrow"><b>04</b> / LAS PERSONAS DETRÁS</span><div className="heading-row"><h2>Dos hermanos.<br/><em>Una visión compartida.</em></h2><p>Unimos lo que hacemos en CZ TECNO y BC Studio para acompañar proyectos desde la primera idea hasta su puesta en marcha.</p></div></div>
        <div className="team-grid">
          <article className="team-card reveal"><div className="team-card-top"><span className="team-mark team-mark-cz"><img src={LOGO_URL} alt="Logo de CZ TECNO"/></span><span className="team-number">01 / SOFTWARE & SISTEMAS</span></div><div><span className="team-identity">CZ TECNO</span><h3>Pedro Chiozza<span>.</span></h3><p>Desarrollador full stack y técnico informático. Backend, software a medida, automatización, infraestructura, redes y soporte IT.</p></div><a href={INSTAGRAM} target="_blank" rel="noreferrer">Conocer CZ TECNO <ArrowUpRight size={18}/></a></article>
          <article className="team-card reveal"><div className="team-card-top"><span className="team-mark team-mark-bc" aria-label="Logo de BC Studio"><img src={BC_LOGO_URL} alt="Logo original de BC Studio"/></span><span className="team-number">02 / DESARROLLO WEB</span></div><div><span className="team-identity">BC STUDIO</span><h3>Bautista Chiozza<span>.</span></h3><p>Desarrollo web para negocios, diseño de experiencias digitales y soluciones orientadas a simplificar procesos, con proyectos propios para distintas marcas.</p></div><div className="team-links"><a href={BC_INSTAGRAM} target="_blank" rel="noreferrer">Instagram de BC Studio <ArrowUpRight size={18}/></a><a href={BC_CV} target="_blank" rel="noreferrer">Ver portfolio personal <ArrowUpRight size={18}/></a></div></article>
        </div><p className="team-footnote">CZ TECNO + BC Studio es nuestra identidad de trabajo mientras definimos la marca definitiva de la agencia.</p>
      </div></section>

      <section className="section process-section"><div className="shell"><div className="section-heading reveal"><span className="eyebrow"><b>05</b> / FORMA DE TRABAJAR</span><div className="heading-row"><h2>De “tengo una idea”<br/><em>a “ya está funcionando”.</em></h2><p>Un proceso simple, sin vueltas ni promesas imposibles.</p></div></div><div className="process-grid"><div className="process-step reveal"><span>01 <span>→</span></span><h3>Escuchar</h3><p>Entender qué pasa hoy, qué no funciona y qué vale la pena mejorar.</p></div><div className="process-step reveal"><span>02 <span>→</span></span><h3>Diseñar</h3><p>Convertir esa necesidad en un flujo, una interfaz y una solución concreta.</p></div><div className="process-step reveal"><span>03 <span>→</span></span><h3>Construir</h3><p>Desarrollar, probar, integrar y poner en funcionamiento.</p></div><div className="process-step reveal"><span>04 <span>↗</span></span><h3>Evolucionar</h3><p>Medir lo que sirve, corregir lo que falta y seguir mejorando.</p></div></div></div></section>

      <section className="vision-section" id="vision"><div className="shell vision-layout"><div className="vision-copy reveal"><span className="eyebrow"><b>06</b> / LO QUE VIENE</span><h2>Hoy construimos soluciones.<br/><em>Mañana, productos que crezcan.</em></h2><p>Queremos llevar nuestro trabajo conjunto hacia una agencia de software y desarrollo web que construya productos propios, sistemas escalables y relaciones a largo plazo.</p><p>No se trata de hacer más por hacer más. Se trata de crear herramientas que le simplifiquen la vida a personas y negocios.</p><div className="vision-tags"><span>PRODUCTOS PROPIOS</span><span>SOFTWARE ÚTIL</span><span>CRECIMIENTO SOSTENIBLE</span></div></div><div className="vision-art reveal" aria-hidden="true"><div className="vision-orbit orbit-1"/><div className="vision-orbit orbit-2"/><span className="vision-star" aria-hidden="true">×</span><span className="vision-center">WHAT'S<br/><em>NEXT?</em></span><span className="vision-stamp">BUILDING TOGETHER / CZ + BC</span></div></div></section>

      <section className="section stack-section"><div className="shell"><div className="section-heading reveal"><span className="eyebrow"><b>07</b> / TECNOLOGÍAS</span><div className="heading-row"><h2>El stack cambia.<br/><em>La intención, no.</em></h2><p>Elegimos herramientas por lo que resuelven. Este es parte del stack que usamos en nuestros proyectos de desarrollo y trabajo técnico.</p></div></div><div className="stack-rows reveal"><div><span><Code2 size={18}/> FRONTEND</span><p>React <i>•</i> TypeScript <i>•</i> JavaScript <i>•</i> HTML & CSS</p></div><div><span><Braces size={18}/> BACKEND</span><p>Node.js <i>•</i> Fastify <i>•</i> NestJS <i>•</i> PHP <i>•</i> Python</p></div><div><span><Layers3 size={18}/> DATOS & DEVOPS</span><p>MySQL <i>•</i> SQLite <i>•</i> Prisma <i>•</i> Docker <i>•</i> Git</p></div><div><span><ShieldCheck size={18}/> INFRAESTRUCTURA</span><p>Linux <i>•</i> Windows Server <i>•</i> MikroTik <i>•</i> Networking</p></div></div></div></section>

      <section className="contact-section" id="contacto"><div className="shell contact-shell"><span className="eyebrow"><b>08</b> / CONSTRUYAMOS ALGO</span><div className="contact-flex"><div><p>¿Tenés un problema que necesita una solución?</p><h2>CONTAME<br/><em>LA IDEA.</em><span>↗</span></h2></div><div className="contact-side"><p>Una web. Un sistema. Una automatización. O simplemente algo que no está funcionando como debería. Arranquemos por una charla.</p><a href={WHATSAPP} target="_blank" rel="noreferrer" className="button button-primary">Hablemos por WhatsApp <ArrowUpRight size={20}/></a><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="instagram-link"><Instagram size={19}/> CZ TECNO en Instagram <ArrowUpRight size={16}/></a><a href={BC_INSTAGRAM} target="_blank" rel="noreferrer" className="instagram-link"><Instagram size={19}/> BC Studio en Instagram <ArrowUpRight size={16}/></a></div></div><div className="contact-bar"><a className="contact-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp: +54 9 2241 540585 <ArrowUpRight size={17}/></a><button onClick={copyEmail} className="copy-mail" aria-label="Copiar correo electrónico"><Mail size={18}/><span>{EMAIL}</span>{copied ? <><Check size={17}/> COPIADO</> : <><Copy size={17}/> COPIAR</>}</button><span>DOS HERMANOS, UNA MISMA PASIÓN POR CREAR.</span></div></div></section>
    </main>

    <footer className="footer"><div className="shell footer-grid"><div><a href="#inicio" aria-label="Volver al inicio"><Brand inverse /></a><p>Dos marcas, un equipo. Software, diseño y soluciones digitales.</p></div><div><span>EXPLORAR</span><a href="#proyectos">Proyectos <ChevronRight size={14}/></a><a href="#soluciones">Soluciones <ChevronRight size={14}/></a><a href="#equipo">Equipo <ChevronRight size={14}/></a><a href="#vision">Visión <ChevronRight size={14}/></a></div><div><span>CONECTAR</span><a href={GITHUB} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><a href={INSTAGRAM} target="_blank" rel="noreferrer">CZ TECNO <ArrowUpRight size={14}/></a><a href={BC_INSTAGRAM} target="_blank" rel="noreferrer">BC Studio <ArrowUpRight size={14}/></a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a><a href={`mailto:${EMAIL}`}>Email <ArrowUpRight size={14}/></a></div><div className="footer-last"><span>© {new Date().getFullYear()} CZ TECNO × BC Studio</span><span>DISEÑADO & DESARROLLADO EN ARGENTINA.</span><a href="#inicio">VOLVER ARRIBA ↑</a><button className="footer-editor-link" type="button" onClick={() => setEditorOpen(true)}>Editar portfolio</button></div></div></footer>

    {activeProject && <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget) setActiveProject(null);}}><section className="case-modal" role="dialog" aria-modal="true" aria-label={`Proyecto ${activeProject.name}`}><div className="modal-bar"><span>PROYECTO / {activeProject.number} · {activeProject.owner || 'CZ TECNO'}</span><button ref={closeRef} className="modal-close" onClick={() => setActiveProject(null)} aria-label="Cerrar detalle"><X size={22}/></button></div><div className="modal-scroll"><div className="modal-visual"><ProjectVisual variant={activeProject.visual} cover={activeProject.cover} title={activeProject.name}/></div><div className="modal-body"><span className="eyebrow"><b>{activeProject.number}</b> / {activeProject.kind} · {activeProject.owner || 'CZ TECNO'}</span><h2>{activeProject.name}<span>.</span></h2><p className="modal-subtitle">{activeProject.tagline}</p><p className="modal-description">{activeProject.description}</p><div className="modal-case"><div><span>01 / EL DESAFÍO</span><p>{activeProject.problem}</p></div><div><span>02 / LA SOLUCIÓN</span><p>{activeProject.solution}</p></div><div><span>03 / EL RESULTADO</span><p>{activeProject.result}</p></div></div><div className="modal-stack">{activeProject.stack.map(s=><span key={s}>{s}</span>)}</div><div className="modal-actions">{activeProject.url ? <a href={activeProject.url} target="_blank" rel="noreferrer" className="button button-primary">{activeProject.urlLabel} <ExternalLink size={18}/></a> : <span className="private-note">Proyecto privado o interno. No se publica código ni información de clientes.</span>}<button onClick={() => setActiveProject(null)} className="button button-ghost">Volver a proyectos <ArrowRight size={17}/></button></div></div></div></section></div>}

    {commandOpen && <div className="overlay palette-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCommandOpen(false);}}><section className="command-palette" role="dialog" aria-modal="true" aria-label="Accesos rápidos"><div className="palette-head"><Command size={19}/><span>Navegar por CZ TECNO</span><button onClick={() => setCommandOpen(false)} aria-label="Cerrar"><X size={18}/></button></div>{[['proyectos','Proyectos','01'],['soluciones','Soluciones','02'],['nosotros','Nuestra historia','03'],['equipo','El equipo','04'],['vision','La visión','05'],['contacto','Contacto','06']].map(([id,title,num])=><button key={id} onClick={()=>navigate(id)} className="palette-link"><span>{num}</span>{title}<ArrowUpRight size={17}/></button>)}<div className="palette-footer">CTRL + K PARA ABRIR · ESC PARA CERRAR</div></section></div>}
    {editorOpen && <ProjectEditor projects={projects} setProjects={setProjects} saveFailed={saveFailed} onReset={() => {
      try { localStorage.removeItem('cztecno.portfolio.projects.v1'); } catch { /* Browser storage unavailable */ }
      setProjects(defaultProjects);
    }} onClose={() => {
      setEditorOpen(false);
      const url=new URL(window.location.href);
      url.searchParams.delete('editar');
      window.history.replaceState({},'',url.pathname+url.search+url.hash);
    }} />}
  </>;
}

export default App;
