import { useEffect, useRef, useState } from 'react';
import projectsContent from './content/projects.json';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Braces, Check, ChevronRight,
  Code2, Command, Copy, Database, ExternalLink, Github,
  Instagram, Layers3, Mail, Menu, MonitorSmartphone, Network,
  ShieldCheck, Workflow, X,
} from 'lucide-react';

const EMAIL = 'pedrochiozza5@gmail.com';
const WHATSAPP = 'https://wa.me/5492241540585?text=' + encodeURIComponent('Hola, vi el portfolio de CZ TECNO y quisiera consultar por un proyecto.');
const LOGO_URL = `${import.meta.env.BASE_URL}logo-cztecno.svg`;
const imageSrc = (path: string) => path.startsWith('https://') || path.startsWith('http://') ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const INSTAGRAM = 'https://www.instagram.com/cz.tecno/';
const GITHUB = 'https://github.com/pedrochiozza5';

type Category = 'Web' | 'Sistemas' | 'Automatización' | 'Backend';
type Filter = 'Todos' | Category;
type Visual = 'sushi' | 'amargos' | 'coop' | 'teros' | 'contable' | 'turnero';
type Project = {
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
  visual: Visual;
  cover?: string;
  url?: string;
  urlLabel?: string;
};

const projects: Project[] = projectsContent as Project[];

const filters: Filter[] = ['Todos', 'Web', 'Sistemas', 'Automatización', 'Backend'];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <span className={`brand-lockup ${inverse ? 'brand-inverse' : ''}`}>
    <span className="brand-symbol" aria-hidden="true"><img src={LOGO_URL} alt="" /></span>
    <span className="brand-text">cz<span>.</span>tecno</span>
  </span>;
}

function ProjectVisual({ variant, cover, title }: { variant: Visual; cover?: string; title?: string }) {
  if (cover) return <div className="visual project-cover"><img src={imageSrc(cover)} alt={`Imagen del proyecto ${title ?? 'CZ TECNO'}`} loading="lazy" /><span className="project-cover-mark">CZ TECNO / PROYECTO REAL</span></div>;
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
  const [filter, setFilter] = useState<Filter>('Todos');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shown = filter === 'Todos' ? projects : projects.filter(project => project.category === filter);

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
      if (event.key === 'Escape') { setActiveProject(null); setCommandOpen(false); setMenuOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject || commandOpen || menuOpen ? 'hidden' : '';
    if (activeProject) closeRef.current?.focus();
    return () => { document.body.style.overflow = ''; };
  }, [activeProject, commandOpen, menuOpen]);

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
      <a href="#inicio" className="logo-link" onClick={() => setMenuOpen(false)} aria-label="CZ TECNO, ir al inicio"><Brand /></a>
      <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegación principal">
        <a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos <span>01</span></a>
        <a href="#soluciones" onClick={() => setMenuOpen(false)}>Soluciones <span>02</span></a>
        <a href="#nosotros" onClick={() => setMenuOpen(false)}>Acerca de <span>03</span></a>
        <a href="#vision" onClick={() => setMenuOpen(false)}>Visión <span>04</span></a>
        <a className="mobile-contact" href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>WhatsApp <ArrowUpRight size={16}/></a>
      </nav>
      <div className="nav-actions"><button className="command-trigger" onClick={() => setCommandOpen(true)} title="Accesos rápidos (Ctrl+K)" aria-label="Abrir accesos rápidos"><Command size={15}/> <span>K</span></button><a href={WHATSAPP} target="_blank" rel="noreferrer" className="nav-cta">WhatsApp <ArrowUpRight size={16}/></a><button className="nav-toggle" type="button" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button></div>
    </div></header>

    <main>
      <section className="hero" id="inicio"><div className="hero-mesh" aria-hidden="true"/><div className="shell hero-content">
        <div className="hero-topline"><span className="status-dot"/><span>ESTUDIO INDEPENDIENTE · SOFTWARE & TECNOLOGÍA</span><span className="hero-topline-right">RANCHOS, ARGENTINA · 2026</span></div>
        <div className="hero-grid"><div className="hero-copy"><span className="overline hero-mini">HOLA, SOY PEDRO. ESTO ES CZ TECNO.</span>
          <h1>NO ES SOLO<br/><span>CODIGO.</span><br/><em>ES HACER</em><br/>QUE PASE<span className="headline-dot">.</span></h1>
          <div className="hero-bottom"><p>Transformo ideas, procesos y problemas reales en <strong>webs, sistemas, automatizaciones y soluciones IT</strong> que se pueden usar, mantener y hacer crecer.</p><div className="hero-links"><a className="button button-primary" href="#proyectos">Explorar proyectos <ArrowUpRight size={20}/></a><a className="button button-text" href="#nosotros">Conocé CZ TECNO <ArrowDown size={19}/></a></div></div>
        </div>
        <div className="hero-object" aria-label="Ilustración conceptual de un sistema digital">
          <div className="holo-grid" aria-hidden="true"/><div className="holo-ring ring-a"/><div className="holo-ring ring-b"/><img className="holo-brand" src={LOGO_URL} alt="" />
          <div className="floating-label float-top"><span className="tiny-indicator"/> SYSTEM ONLINE <span>● ● ●</span></div>
          <div className="floating-window"><div className="window-header"><div className="window-dots"><i/><i/><i/></div><span>cztecno / workspace</span><span>↗</span></div><div className="window-content"><small>BIENVENIDO AL PROCESO</small><strong>IDEA → <span>SOLUCIÓN</span></strong><div className="window-flow"><div><i>01</i><span>Entender</span><b>✓</b></div><div><i>02</i><span>Construir</span><b>✓</b></div><div><i>03</i><span>Evolucionar</span><b className="flow-active">↗</b></div></div></div><div className="window-bottom"><span>● READY TO BUILD</span><span>V 2.0</span></div></div>
          <div className="floating-label float-bottom">DESIGN <span>+</span> CODE <span>+</span> SYSTEMS</div>
          <span className="hero-vertical">DESIGNED TO SOLVE / BUILT TO LAST</span>
        </div></div>
        <div className="hero-foot"><a href="#proyectos" className="scroll-hint"><span className="scroll-arrow"><ArrowDown size={15}/></span> SCROLL PARA EXPLORAR</a><div className="hero-foot-links"><a href={GITHUB} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={14}/></a><a href={INSTAGRAM} target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={14}/></a></div><span>01 / PORTFOLIO DIGITAL</span></div>
      </div></section>

      <div className="ticker" aria-label="Áreas de trabajo"><div className="ticker-track" aria-hidden="true">{Array.from({ length: 4 }).map((_,i) => <span key={i}>DESARROLLO WEB <b>•</b> SISTEMAS A MEDIDA <b>•</b> AUTOMATIZACIONES <b>•</b> NETWORKING & IT <b>•</b> </span>)}</div></div>

      <section className="section projects-section" id="proyectos"><div className="shell"><div className="section-heading reveal"><span className="eyebrow"><b>01</b> / TRABAJO REAL</span><div className="heading-row"><h2>Proyectos que<br/><em>hablan por sí solos.</em></h2><p>No se trata solo de escribir código. Se trata de entender una necesidad y construir una herramienta que sirva.</p></div></div>
        <div className="filters reveal" role="group" aria-label="Filtrar proyectos">{filters.map(item => <button className={`filter ${filter===item?'selected':''}`} key={item} aria-pressed={filter===item} onClick={() => setFilter(item)}>{item}{item==='Todos' && <sup>{projects.length.toString().padStart(2,'0')}</sup>}</button>)}</div>
        <div className="project-grid">{shown.map((project,i) => <article className={`project-card reveal ${i<2?'project-featured':''}`} key={project.id}>
          <button className="project-art-action" type="button" onClick={() => setActiveProject(project)} aria-label={`Explorar el proyecto ${project.name}`}><ProjectVisual variant={project.visual} cover={project.cover} title={project.name}/><span className="art-open"><ArrowUpRight size={23}/></span></button>
          <div className="project-info"><div className="project-meta"><span>{project.number} / {project.kind}</span><span className="status-label"><i/>{project.status}</span></div><div className="project-title"><h3>{project.name}</h3><button onClick={() => setActiveProject(project)} aria-label={`Leer el caso de ${project.name}`} className="project-more"><ArrowUpRight size={23}/></button></div><p className="project-tagline">{project.tagline}</p><p className="project-description">{project.description}</p><div className="project-footer"><div>{project.stack.slice(0,3).map(item => <span key={item}>{item}</span>)}</div><button onClick={() => setActiveProject(project)} className="inline-link">Ver caso <ArrowRight size={17}/></button></div></div>
        </article>)}</div><div className="more-work reveal"><span>HAY MÁS IDEAS CONVIRTIÉNDOSE EN PROYECTOS.</span><a href={GITHUB} target="_blank" rel="noreferrer">Explorar mi GitHub <Github size={18}/><ArrowUpRight size={17}/></a></div>
      </div></section>

      <section className="manifesto-band"><div className="shell"><span>NO HAGO TECNOLOGÍA POR HACER TECNOLOGÍA.</span><p>LA HAGO PARA QUE <em>ALGO FUNCIONE MEJOR.</em></p><span className="band-asterisk">•</span></div></section>

      <section className="section solutions-section" id="soluciones"><div className="shell"><div className="section-heading reveal"><span className="eyebrow"><b>02</b> / SOLUCIONES</span><div className="heading-row"><h2>Un problema.<br/><em>Muchas formas de resolverlo.</em></h2><p>Mi diferencial es unir desarrollo, soporte e infraestructura en una misma mirada: lo que diseño también tiene que funcionar en la vida real.</p></div></div>
        <div className="solutions-list"><article className="solution reveal"><span className="solution-index">01 /</span><div className="solution-icon"><MonitorSmartphone size={30}/></div><div><h3>Webs & e-commerce</h3><p>Sitios con identidad, tiendas, catálogos y experiencias mobile-first que ayudan a mostrar y vender mejor.</p><span>REACT · UI/UX · TIENDAS</span></div><ArrowUpRight className="solution-arrow" size={24}/></article>
        <article className="solution reveal"><span className="solution-index">02 /</span><div className="solution-icon"><Database size={30}/></div><div><h3>Sistemas a medida</h3><p>Paneles administrativos, gestión de clientes, operaciones, stock, reservas, datos y APIs conectadas.</p><span>BACKEND · BASES DE DATOS · SAAS</span></div><ArrowUpRight className="solution-arrow" size={24}/></article>
        <article className="solution reveal"><span className="solution-index">03 /</span><div className="solution-icon"><Workflow size={30}/></div><div><h3>Bots & automatización</h3><p>Procesos que dejan de depender de copiar, pegar y repetir. Integraciones y flujos diseñados para ahorrar trabajo.</p><span>WHATSAPP · APIS · INTEGRACIONES</span></div><ArrowUpRight className="solution-arrow" size={24}/></article>
        <article className="solution reveal"><span className="solution-index">04 /</span><div className="solution-icon"><Network size={30}/></div><div><h3>Infraestructura & soporte IT</h3><p>Redes, servidores, conectividad, diagnóstico y mantenimiento. Tecnología sólida, también detrás de pantalla.</p><span>LINUX · MIKROTIK · REDES · SOPORTE</span></div><ArrowUpRight className="solution-arrow" size={24}/></article></div>
      </div></section>

      <section className="section about-section" id="nosotros"><div className="shell about-layout"><div className="about-head reveal"><span className="eyebrow"><b>03</b> / DETRÁS DEL CÓDIGO</span><h2>No soy una agencia gigante.<br/><em>Soy alguien que se involucra.</em></h2><div className="about-monogram"><span>CZ.</span><small>TECNO<br/>ESTUDIO INDEPENDIENTE</small></div></div><div className="about-story reveal"><span className="about-corner">ABOUT / 2026 ↗</span><p className="about-intro">Soy <strong>Pedro Chiozza</strong>, desarrollador full stack y técnico informático. CZ TECNO es el lugar donde junto lo que más me gusta: crear, conectar y resolver.</p><p>Mi trabajo va desde una interfaz que usa un cliente hasta la API, la base de datos, el servidor o la red que la sostiene. Me interesa entender el problema completo, no solamente una parte.</p><p>Trabajo en tecnología e infraestructura, tengo formación en programación de la UTN y desarrollo proyectos propios y para negocios reales. Lo que aprendo operando sistemas lo aplico al software que construyo.</p><div className="about-signature"><span>DESARROLLO <i>+</i> INFRAESTRUCTURA <i>+</i> CRITERIO</span><span>RANCHOS, BS. AS., ARGENTINA</span></div></div></div></section>

      <section className="section process-section"><div className="shell"><div className="section-heading reveal"><span className="eyebrow"><b>04</b> / FORMA DE TRABAJAR</span><div className="heading-row"><h2>De “tengo una idea”<br/><em>a “ya está funcionando”.</em></h2><p>Un proceso simple, sin vueltas ni promesas imposibles.</p></div></div><div className="process-grid"><div className="process-step reveal"><span>01 <span>→</span></span><h3>Escuchar</h3><p>Entender qué pasa hoy, qué no funciona y qué vale la pena mejorar.</p></div><div className="process-step reveal"><span>02 <span>→</span></span><h3>Diseñar</h3><p>Convertir esa necesidad en un flujo, una interfaz y una solución concreta.</p></div><div className="process-step reveal"><span>03 <span>→</span></span><h3>Construir</h3><p>Desarrollar, probar, integrar y poner en funcionamiento.</p></div><div className="process-step reveal"><span>04 <span>↗</span></span><h3>Evolucionar</h3><p>Medir lo que sirve, corregir lo que falta y seguir mejorando.</p></div></div></div></section>

      <section className="vision-section" id="vision"><div className="shell vision-layout"><div className="vision-copy reveal"><span className="eyebrow"><b>05</b> / LO QUE VIENE</span><h2>Hoy construyo soluciones.<br/><em>Mañana, productos que crezcan.</em></h2><p>Quiero llevar CZ TECNO de resolver necesidades puntuales a construir un estudio de software y automatización con productos propios, sistemas escalables y relaciones a largo plazo.</p><p>No se trata de hacer más por hacer más. Se trata de crear herramientas que le simplifiquen la vida a personas y negocios.</p><div className="vision-tags"><span>PRODUCTOS PROPIOS</span><span>SOFTWARE ÚTIL</span><span>CRECIMIENTO SOSTENIBLE</span></div></div><div className="vision-art reveal" aria-hidden="true"><div className="vision-orbit orbit-1"/><div className="vision-orbit orbit-2"/><span className="vision-star" aria-hidden="true">×</span><span className="vision-center">WHAT'S<br/><em>NEXT?</em></span><span className="vision-stamp">ALWAYS BUILDING / CZ TECNO</span></div></div></section>

      <section className="section stack-section"><div className="shell"><div className="section-heading reveal"><span className="eyebrow"><b>06</b> / TECNOLOGÍAS</span><div className="heading-row"><h2>El stack cambia.<br/><em>La intención, no.</em></h2><p>Elijo herramientas por lo que resuelven. Estas son algunas de las que uso en mis proyectos y en mi trabajo técnico.</p></div></div><div className="stack-rows reveal"><div><span><Code2 size={18}/> FRONTEND</span><p>React <i>•</i> TypeScript <i>•</i> JavaScript <i>•</i> HTML & CSS</p></div><div><span><Braces size={18}/> BACKEND</span><p>Node.js <i>•</i> Fastify <i>•</i> NestJS <i>•</i> PHP <i>•</i> Python</p></div><div><span><Layers3 size={18}/> DATOS & DEVOPS</span><p>MySQL <i>•</i> SQLite <i>•</i> Prisma <i>•</i> Docker <i>•</i> Git</p></div><div><span><ShieldCheck size={18}/> INFRAESTRUCTURA</span><p>Linux <i>•</i> Windows Server <i>•</i> MikroTik <i>•</i> Networking</p></div></div></div></section>

      <section className="contact-section" id="contacto"><div className="shell contact-shell"><span className="eyebrow"><b>07</b> / CONSTRUYAMOS ALGO</span><div className="contact-flex"><div><p>¿Tenés un problema que necesita una solución?</p><h2>CONTAME<br/><em>LA IDEA.</em><span>↗</span></h2></div><div className="contact-side"><p>Una web. Un sistema. Una automatización. O simplemente algo que no está funcionando como debería. Arranquemos por una charla.</p><a href={WHATSAPP} target="_blank" rel="noreferrer" className="button button-primary">Hablemos por WhatsApp <ArrowUpRight size={20}/></a><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="instagram-link"><Instagram size={19}/> También estoy en @cz.tecno <ArrowUpRight size={16}/></a></div></div><div className="contact-bar"><a className="contact-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp: +54 9 2241 540585 <ArrowUpRight size={17}/></a><button onClick={copyEmail} className="copy-mail" aria-label="Copiar correo electrónico"><Mail size={18}/><span>{EMAIL}</span>{copied ? <><Check size={17}/> COPIADO</> : <><Copy size={17}/> COPIAR</>}</button><span>HECHO CON CÓDIGO Y GANAS DE RESOLVER.</span></div></div></section>
    </main>

    <footer className="footer"><div className="shell footer-grid"><div><a href="#inicio" aria-label="Volver al inicio"><Brand inverse /></a><p>Software, soluciones IT y cosas que todavía no existen.</p></div><div><span>EXPLORAR</span><a href="#proyectos">Proyectos <ChevronRight size={14}/></a><a href="#soluciones">Soluciones <ChevronRight size={14}/></a><a href="#vision">Visión <ChevronRight size={14}/></a></div><div><span>CONECTAR</span><a href={GITHUB} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a><a href={`mailto:${EMAIL}`}>Email <ArrowUpRight size={14}/></a></div><div className="footer-last"><span>© {new Date().getFullYear()} CZ TECNO</span><span>DISEÑADO & DESARROLLADO EN ARGENTINA.</span><a href="#inicio">VOLVER ARRIBA ↑</a></div></div></footer>

    {activeProject && <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget) setActiveProject(null);}}><section className="case-modal" role="dialog" aria-modal="true" aria-label={`Proyecto ${activeProject.name}`}><div className="modal-bar"><span>PROYECTO / {activeProject.number} · CZ TECNO</span><button ref={closeRef} className="modal-close" onClick={() => setActiveProject(null)} aria-label="Cerrar detalle"><X size={22}/></button></div><div className="modal-scroll"><div className="modal-visual"><ProjectVisual variant={activeProject.visual} cover={activeProject.cover} title={activeProject.name}/></div><div className="modal-body"><span className="eyebrow"><b>{activeProject.number}</b> / {activeProject.kind}</span><h2>{activeProject.name}<span>.</span></h2><p className="modal-subtitle">{activeProject.tagline}</p><p className="modal-description">{activeProject.description}</p><div className="modal-case"><div><span>01 / EL DESAFÍO</span><p>{activeProject.problem}</p></div><div><span>02 / LA SOLUCIÓN</span><p>{activeProject.solution}</p></div><div><span>03 / EL RESULTADO</span><p>{activeProject.result}</p></div></div><div className="modal-stack">{activeProject.stack.map(s=><span key={s}>{s}</span>)}</div><div className="modal-actions">{activeProject.url ? <a href={activeProject.url} target="_blank" rel="noreferrer" className="button button-primary">{activeProject.urlLabel} <ExternalLink size={18}/></a> : <span className="private-note">Proyecto privado o interno. No se publica código ni información de clientes.</span>}<button onClick={() => setActiveProject(null)} className="button button-ghost">Volver a proyectos <ArrowRight size={17}/></button></div></div></div></section></div>}

    {commandOpen && <div className="overlay palette-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCommandOpen(false);}}><section className="command-palette" role="dialog" aria-modal="true" aria-label="Accesos rápidos"><div className="palette-head"><Command size={19}/><span>Navegar por CZ TECNO</span><button onClick={() => setCommandOpen(false)} aria-label="Cerrar"><X size={18}/></button></div>{[['proyectos','Proyectos','01'],['soluciones','Soluciones','02'],['nosotros','Quién está detrás','03'],['vision','La visión','04'],['contacto','Contacto','05']].map(([id,title,num])=><button key={id} onClick={()=>navigate(id)} className="palette-link"><span>{num}</span>{title}<ArrowUpRight size={17}/></button>)}<div className="palette-footer">CTRL + K PARA ABRIR · ESC PARA CERRAR</div></section></div>}
  </>;
}

export default App;
