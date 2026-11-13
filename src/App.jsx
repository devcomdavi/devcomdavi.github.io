import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, MapPin, Smartphone, ChevronRight,
  Terminal, Coffee, FileCode, Cloud, Bot, Database,
  GitBranch, ImageIcon, Users, Target, MessageSquare,
  Zap, Handshake, Briefcase, GraduationCap, Utensils, Menu, X,
  Sun, Moon, Globe, RefreshCcw, Sparkles, GitMerge,
  Play, Workflow, ShieldCheck, Server, Award, Trophy, Webhook, BrainCircuit
} from 'lucide-react';
import { Typewriter } from './components/ui/typewriter-text';
import { ContainerScroll } from './components/ui/container-scroll-animation';

// Estilos globais para a animação flutuante dos ícones
const floatAnimationStyles = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float 8s ease-in-out infinite;
    animation-delay: 2s;
  }
`;

// ==========================================
// DADOS DOS PROJETOS (Escalável)
// ==========================================
const PROJECTS = [
  {
    id: 1,
    title: "Obra Manager",
    context: "EALI · Construtora Techne · em produção",
    description: "Sistema de gestão de obras usado por diretoria, engenharia, arquitetura, segurança do trabalho, equipamentos e financeiro: planejamento com Gantt e LOB, compras com dupla aprovação, estoque, diário de obra, FVS, medições e financeiro por obra. Assumi e evoluo o sistema com Claude Code (220+ commits).",
    stack: ["Next.js", "TypeScript", "Supabase", "Resend", "Claude Code"],
    video: "videos/obra-manager.mp4",
    poster: "videos/obra-manager.jpg",
    icon: 'building'
  },
  {
    id: 2,
    title: "Dashboard de atendimento",
    context: "EALI · Frade Imobiliária · ~15 corretores",
    description: "Painel em TV integrado ao CRM (GoHighLevel) por API e webhooks: fila round-robin, SLA com transferência automática do lead, ranking de corretores e uma \"piscina\" para resgatar leads parados pelo celular. Reduz leads perdidos e falhas de atendimento.",
    stack: ["Next.js", "Prisma", "GoHighLevel API", "Webhooks", "Docker", "PM2 · VPS"],
    video: "videos/dashboard-frade.mp4",
    poster: "videos/dashboard-frade.jpg",
    icon: 'webhook'
  },
  {
    id: 3,
    title: "Mix Manager",
    context: "SaaS para restaurantes · piloto no Mix Arretado",
    description: "Fichas técnicas com custo, margem e CMV calculados na hora, estoque, compras, produção, perdas e lista de compras automática. Multi-tenant com isolamento por RLS, documentado e auditado (segurança e LGPD) com as minhas skills.",
    stack: ["React PWA", "Supabase", "PostgreSQL · RLS", "Edge Functions", "Cloudflare"],
    video: "videos/mix-manager.mp4",
    poster: "videos/mix-manager.jpg",
    icon: 'utensils'
  },
  {
    id: 4,
    title: "OfficeMind",
    context: "Plugin do Obsidian · projeto pessoal",
    description: "O segundo cérebro como um escritório 2D: cada pasta vira uma sala e cada rotina vira um personagem. Usa o Claude Code em modo headless e o conector do Google Drive para ler planilhas (comparei modelos: Haiku em ~12 s e US$ 0,01 por leitura).",
    stack: ["TypeScript", "Canvas 2D", "Claude Code", "Google Drive", "Apps Script", "Vitest · CI"],
    video: "videos/officemind.mp4",
    poster: "videos/officemind.jpg",
    icon: 'brain'
  },
  {
    id: 5,
    title: "Skills open source para Claude Code",
    context: "Ferramentas de IA que uso em todo sistema",
    description: "skill-seguranca-lgpd (OWASP Top 10, OWASP LLM Top 10, LGPD e pentest com Strix) e skill-documentacao-sistema (requisitos, casos de uso e ADRs). Scripts Python que procuram segredos expostos, dependências vulneráveis e dados pessoais.",
    stack: ["Claude Code", "Python", "OWASP", "LGPD"],
    link: "https://github.com/devcomdavi/skill-seguranca-lgpd",
    linkText: "Ver no GitHub",
    link2: "https://github.com/devcomdavi/skill-documentacao-sistema",
    link2Text: "Skill de documentação",
    icon: 'shield'
  },
  {
    id: 6,
    title: "Agente de IA SDR no WhatsApp",
    context: "EALI · construtora",
    description: "Agente que atende leads 24h: engenharia de prompt, base de conhecimento por empreendimento, qualificação com gravação de campos no CRM, regras de passagem para o humano e gatilho de workflow para a roleta de corretores.",
    stack: ["GoHighLevel Conversation AI", "Prompt engineering", "Workflows"],
    icon: 'bot'
  },
  {
    id: 7,
    title: "Snapshot imobiliário no CRM",
    context: "EALI · Dynamus CRM (whitelabel do GoHighLevel)",
    description: "Subconta-modelo para imobiliárias e construtoras com pipelines, workflows e integração a sistemas de venda. Reduziu a implementação de um cliente de ~15 para ~3 dias. Usado em clientes como Realize-se Imóveis (4 subcontas) e Atacadão dos Eletros.",
    stack: ["GoHighLevel", "Workflows", "Webhooks"],
    icon: 'workflow'
  },
  {
    id: 8,
    title: "Bot RPA com BotCity",
    context: "Compass UOL · projeto final do estágio",
    description: "Bot que captura cotações e taxas e preenche automaticamente os sites dos Correios e da Jadlog. Na trilha também fiz uma automação que consome APIs públicas (cotações e Selic) e gera relatório em Excel.",
    stack: ["Python", "BotCity", "APIs REST", "openpyxl"],
    icon: 'cpu'
  }
];

// Helper para renderizar o ícone do projeto
const getProjectIcon = (iconName, className) => {
  const props = { size: 64, className };
  switch (iconName) {
    case 'utensils': return <Utensils {...props} />;
    case 'bot': return <Bot {...props} />;
    case 'github': return <Github {...props} />;
    case 'code': return <FileCode {...props} />;
    case 'building': return <Briefcase {...props} />;
    case 'webhook': return <Webhook {...props} />;
    case 'brain': return <BrainCircuit {...props} />;
    case 'shield': return <ShieldCheck {...props} />;
    case 'workflow': return <Workflow {...props} />;
    case 'cpu': return <Terminal {...props} />;
    default: return <Database {...props} />;
  }
};

// Logo do Claude (Simple Icons, CC0)
const ClaudeLogo = ({ size = 40, className = "" }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} className={className} fill="#D97757" xmlns="http://www.w3.org/2000/svg">
    <title>Claude</title>
    <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
  </svg>
);

// Painel "Na Prática": impacto e como eu construo com IA
const IMPACTO = [
  { valor: "4", rotulo: "sistemas em produção e piloto", detalhe: "gestão de obras, atendimento, restaurante, Obsidian" },
  { valor: "~15", rotulo: "corretores usam o painel", detalhe: "integrado ao CRM, com SLA e resgate de leads" },
  { valor: "15 → 3", rotulo: "dias por implementação", detalhe: "snapshot imobiliário no CRM" },
  { valor: "220+", rotulo: "commits no Obra Manager", detalhe: "evolução contínua com o cliente" },
];
const ETAPAS = [
  { titulo: "Entendo o problema", texto: "Conversa com o cliente, requisitos e casos de uso documentados", cmd: "/skill-documentacao-sistema" },
  { titulo: "Construo com o Claude Code", texto: "Eu decido e reviso; a IA acelera o código, os testes e a documentação", cmd: "claude" },
  { titulo: "Integro", texto: "CRM (GoHighLevel), webhooks, APIs, MCP, Google Drive", cmd: "webhooks · api · mcp" },
  { titulo: "Audito antes de publicar", texto: "OWASP, OWASP LLM e LGPD com a minha skill de segurança", cmd: "/skill-seguranca-lgpd" },
  { titulo: "Coloco no ar", texto: "VPS com Docker e PM2, Supabase, Cloudflare, Vercel", cmd: "deploy" },
];
const PainelNaPratica = () => (
  <div className="h-full w-full overflow-y-auto rounded-2xl bg-[#0b0b0f] text-left p-4 md:p-8 font-sans">
    <div className="flex items-center gap-3 mb-4 md:mb-6">
      <ClaudeLogo size={26} />
      <span className="font-mono text-xs md:text-sm text-zinc-400">davi@eali:~$ <span className="text-zinc-200">resultados --desde jan/2026</span></span>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-8">
      {IMPACTO.map((m) => (
        <div key={m.rotulo} className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 md:p-5">
          <div className="text-2xl md:text-4xl font-bold text-blue-500 tabular-nums">{m.valor}</div>
          <div className="text-zinc-100 text-xs md:text-sm font-semibold mt-1">{m.rotulo}</div>
          <div className="text-zinc-500 text-[11px] md:text-xs mt-1 hidden md:block">{m.detalhe}</div>
        </div>
      ))}
    </div>
    <div className="font-mono text-xs md:text-sm text-zinc-400 mb-3">davi@eali:~$ <span className="text-zinc-200">como-eu-construo</span></div>
    <ol className="space-y-2 md:space-y-3">
      {ETAPAS.map((e, i) => (
        <li key={e.titulo} className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 md:p-4">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-zinc-100 font-semibold text-sm md:text-base">{e.titulo}</span>
              <code className="text-[11px] md:text-xs text-orange-300 bg-black/60 border border-zinc-800 rounded px-2 py-0.5">{e.cmd}</code>
            </div>
            <p className="text-zinc-400 text-xs md:text-sm mt-1">{e.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

// Componente dos Ícones Flutuantes do Background
const FloatingBackgroundIcons = ({ isDarkMode }) => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20 md:opacity-30">
    <style>{floatAnimationStyles}</style>
    <div className="absolute top-[12%] left-[5%] animate-float">
      <Github size={60} color={isDarkMode ? "white" : "black"} />
    </div>
    <div className="absolute top-[8%] left-[30%] animate-float-delayed">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JS" className="w-16 h-16 transform -rotate-12 drop-shadow-sm" />
    </div>
    <div className="absolute top-[18%] right-[8%] animate-float">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="Postgres" className="w-20 h-20 transform rotate-12 drop-shadow-sm" />
    </div>
    <div className="absolute bottom-[20%] left-[8%] animate-float-delayed">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" className="w-16 h-16 transform -rotate-12 drop-shadow-sm" />
    </div>
    <div className="absolute bottom-[10%] left-[45%] animate-float">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" className="w-16 h-16 transform rotate-6 drop-shadow-sm" />
    </div>
    <div className="absolute bottom-[15%] right-[10%] animate-float-delayed hidden md:block">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-20 h-20 transform -rotate-12 drop-shadow-sm" />
    </div>
  </div>
);

// Componente para o efeito de Tilt (Inclinação 3D com o mouse)
const TiltElement = ({ children, className = "" }) => {
  const [style, setStyle] = useState({});
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
      zIndex: 10
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
      zIndex: 1
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} will-change-transform`}
      style={style}
    >
      {children}
    </div>
  );
};

// ==========================================
// NOVO: Componente Janela Estilo Terminal do Mac
// ==========================================
const MacWindow = ({ children, className = "", isDarkMode, t, title = "", bodyClassName = "p-8" }) => (
  <div className={`${t.cardAlt} rounded-2xl border ${t.border} shadow-xl overflow-hidden transition-colors duration-500 flex flex-col ${className}`}>
    {/* Header do Mac (Bolinhas Coloridas) */}
    <div className={`px-4 py-3 border-b ${t.border} flex items-center ${isDarkMode ? 'bg-zinc-950/80' : 'bg-slate-200/80'} backdrop-blur-sm z-10`}>
      <div className="flex gap-2 w-16">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm border border-black/10"></div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm border border-black/10"></div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm border border-black/10"></div>
      </div>
      {/* Título do Terminal Centralizado */}
      {title && (
        <div className="flex-1 text-center pr-16 flex justify-center">
          <span className={`text-xs font-mono ${t.textMuted} truncate max-w-[200px] md:max-w-full`}>{title}</span>
        </div>
      )}
    </div>
    {/* Corpo da Janela */}
    <div className={`flex-1 ${bodyClassName}`}>
      {children}
    </div>
  </div>
);

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const t = isDarkMode ? {
    bg: 'bg-black',
    bgSec: 'bg-[#0a0a0a]',
    card: 'bg-zinc-900',
    cardAlt: 'bg-zinc-900/80',
    text: 'text-white',
    textSec: 'text-zinc-300',
    textMuted: 'text-zinc-400',
    border: 'border-zinc-800',
    borderSec: 'border-zinc-900',
    nav: 'bg-black/80',
    pill: 'bg-black',
    shadow: 'shadow-[0_10px_30px_rgba(37,99,235,0.15)]',
    icon: 'text-zinc-700',
    logoBg: 'bg-white',
    logoText: 'text-black'
  } : {
    bg: 'bg-slate-50',
    bgSec: 'bg-slate-100',
    card: 'bg-white',
    cardAlt: 'bg-white/80',
    text: 'text-slate-900',
    textSec: 'text-slate-600',
    textMuted: 'text-slate-500',
    border: 'border-slate-200',
    borderSec: 'border-slate-300',
    nav: 'bg-white/90',
    pill: 'bg-slate-100',
    shadow: 'shadow-[0_10px_30px_rgba(37,99,235,0.1)]',
    icon: 'text-slate-300',
    logoBg: 'bg-slate-900',
    logoText: 'text-white'
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-600 selection:text-white relative ${t.bg} ${t.text} transition-colors duration-500`}>
      
      {/* Luz interativa de fundo que segue o cursor */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, ${isDarkMode ? '0.1' : '0.05'}), transparent 40%)`
        }}
      />

      <FloatingBackgroundIcons isDarkMode={isDarkMode} />

      {/* Navbar */}
      <nav className={`fixed w-full z-50 top-0 ${t.nav} backdrop-blur-md border-b ${t.border} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className={`text-xl font-bold ${t.logoBg} ${t.logoText} px-3 py-1 rounded shadow-lg hover:scale-105 transition-transform`}>
                DevcomDavi
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className={`${t.textSec} hover:text-blue-500 transition-colors font-medium`}>Sobre</a>
              <a href="#habilidades" onClick={(e) => scrollToSection(e, 'habilidades')} className={`${t.textSec} hover:text-blue-500 transition-colors font-medium`}>Habilidades</a>
              <a href="#trajetoria" onClick={(e) => scrollToSection(e, 'trajetoria')} className={`${t.textSec} hover:text-blue-500 transition-colors font-medium`}>Trajetória</a>
              <a href="#projetos" onClick={(e) => scrollToSection(e, 'projetos')} className={`${t.textSec} hover:text-blue-500 transition-colors font-medium`}>Projetos</a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-300 hover:text-white' : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'} transition-colors`}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`${t.textSec} hover:${t.text} focus:outline-none`}
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden ${t.card} border-b ${t.border} relative z-50`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className={`block px-3 py-2 rounded-md text-base font-medium ${t.textSec} hover:${t.text} hover:${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>Sobre</a>
              <a href="#habilidades" onClick={(e) => scrollToSection(e, 'habilidades')} className={`block px-3 py-2 rounded-md text-base font-medium ${t.textSec} hover:${t.text} hover:${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>Habilidades</a>
              <a href="#trajetoria" onClick={(e) => scrollToSection(e, 'trajetoria')} className={`block px-3 py-2 rounded-md text-base font-medium ${t.textSec} hover:${t.text} hover:${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>Trajetória</a>
              <a href="#projetos" onClick={(e) => scrollToSection(e, 'projetos')} className={`block px-3 py-2 rounded-md text-base font-medium ${t.textSec} hover:${t.text} hover:${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>Projetos</a>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10 pt-16">
        
        {/* Hero Section */}
        <section className="w-full mb-20">
          <div className="w-full h-48 md:h-72 overflow-hidden relative">
            <img 
              src={isDarkMode ? "bannerPreto.png" : "bannerBranco.png"} 
              alt="Banner Desenvolvedor" 
              className="w-full h-full object-cover object-center transition-opacity duration-500"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80' }}
            />
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isDarkMode ? 'to-black' : 'to-slate-50'}`}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative -mt-20 md:-mt-28">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
              <TiltElement className="flex-shrink-0">
                <img 
                  src="img_davi.jpeg" 
                  alt="Davi Holanda" 
                  className={`w-40 h-40 md:w-56 md:h-56 rounded-full border-4 ${isDarkMode ? 'border-black' : 'border-slate-50'} shadow-2xl object-cover cursor-pointer transition-colors duration-500`}
                  onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Davi+Holanda&size=300&background=2563eb&color=fff' }}
                />
              </TiltElement>

              <div className="flex-1 text-center md:text-left pb-4 space-y-3">
                <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${t.text}`}>
                  <Typewriter
                    text={["Davi Holanda", "DevcomDavi"]}
                    speed={100}
                    loop={true}
                    deleteSpeed={50}
                    delay={2000}
                  />
                </h1>

                <div className="inline-block bg-blue-600 text-white px-4 py-1.5 font-bold tracking-wider transform -skew-x-12">
                  <span className="inline-block transform skew-x-12">Desenvolvedor de Software · Sistemas e Automações com IA</span>
                </div>
                
                <p className={`${t.textMuted} max-w-2xl text-lg mt-2 mx-auto md:mx-0 transition-colors duration-500`}>
                  Estudante de Sistemas para Internet no IFPB. Construo com IA sistemas em produção, integrações com CRM, agentes de atendimento e automações, do pedido do cliente ao deploy.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3">
                  <a href="https://www.linkedin.com/in/davihmn/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm bg-[#0077b5] hover:bg-[#005e93] text-white px-4 py-2 rounded-md transition duration-300 shadow-md">
                    <Linkedin size={18} /> LinkedIn
                  </a>
                  <a href="https://github.com/devcomdavi" target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-sm ${t.card} hover:${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'} border ${t.border} ${t.text} px-4 py-2 rounded-md transition duration-300 shadow-sm`}>
                    <Github size={18} /> GitHub
                  </a>
                  <div className={`flex items-center gap-4 ${t.textMuted} text-sm ml-2`}>
                    <span className="flex items-center gap-1 hover:text-blue-500 transition cursor-default"><MapPin size={16}/> João Pessoa, PB</span>
                    <span className="flex items-center gap-1 hover:text-green-500 transition cursor-default"><Smartphone size={16}/> (83) 99958-1407</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Sobre */}
        <section id="sobre" className="py-16 pt-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-10 group">
            <h2 className={`text-3xl font-bold ${t.text}`}>Sobre Mim</h2>
            <div className={`h-1 flex-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'} rounded group-hover:bg-blue-600 transition-colors duration-500`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${t.textSec} leading-relaxed text-lg`}>
              <p className={`hover:${t.text} transition-colors`}>
                Sou estudante de Sistemas para Internet no IFPB e trabalho na área tech da <strong className="text-blue-500">EALI Marketing</strong>, onde uso IA como ferramenta principal: <strong className="text-blue-500">Claude Code, API da Anthropic e MCP</strong>.
              </p>
              <p className={`hover:${t.text} transition-colors`}>
                Coloco em produção sistemas para clientes, dashboards integrados ao CRM (GoHighLevel), agentes de atendimento no WhatsApp e automações, e cuido da infraestrutura em VPS. Também crio minhas próprias ferramentas de IA: skills open source que documentam e auditam (segurança e LGPD) tudo o que construo.
              </p>
              <div className={`border-l-4 border-blue-600 pl-6 py-4 ${isDarkMode ? 'bg-zinc-900/80' : 'bg-white'} rounded-r-xl italic font-medium relative overflow-hidden group shadow-sm transition-colors duration-500`}>
                <div className="absolute inset-0 bg-blue-600/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                "Não preciso saber tudo de cabeça: sei o que pedir à IA, reviso o que ela entrega e transformo isso em produto que as pessoas usam."
              </div>
            </div>
            
            {/* Soft Skills Cards - ESTILO TERMINAL MAC */}
            <MacWindow isDarkMode={isDarkMode} t={t} title="davi@macbook: ~/soft-skills" className="h-full">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-500 font-mono">
                <Target size={24} /> <span className="text-green-500 font-bold">➜</span> competências
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Users size={16}/>, text: "trabalho_em_equipe" },
                  { icon: <Briefcase size={16}/>, text: "metódico" },
                  { icon: <Handshake size={16}/>, text: "experiência_cliente" },
                  { icon: <Zap size={16}/>, text: "aprendizado_rápido" },
                  { icon: <MessageSquare size={16}/>, text: "bom_relacionamento" }
                ].map((skill, idx) => (
                  <span key={idx} className={`px-4 py-2 ${t.pill} border ${t.border} rounded-full text-sm font-mono ${t.textSec} flex items-center gap-2 hover:border-blue-600 hover:text-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300 cursor-default`}>
                    {skill.icon} {skill.text}
                  </span>
                ))}
              </div>
            </MacWindow>
          </div>
        </section>

        {/* Scroll Animation Section */}
        <section className="relative z-10">
          <ContainerScroll
            titleComponent={
              <div className="flex flex-col items-center">
                <h2 className={`text-4xl font-semibold ${t.text} mb-2`}>
                  Conheça meu trabalho
                </h2>
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-blue-500">
                  Na Prática
                </span>
              </div>
            }
          >
            <PainelNaPratica />
          </ContainerScroll>
        </section>

        {/* Habilidades - Efeito 3D Hover */}
        <section id="habilidades" className={`py-16 ${t.bgSec} border-y ${t.borderSec} relative z-10 transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-12 group">
              <h2 className={`text-3xl font-bold ${t.text}`}>Tecnologias</h2>
              <div className={`h-1 flex-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'} rounded group-hover:bg-blue-600 transition-colors duration-500`}></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Claude Code', icon: <ClaudeLogo size={40} />, desc: 'API Anthropic · MCP' },
                { name: 'Python', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                { name: 'Java', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
                { name: 'JavaScript', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
                { name: 'AWS', imgSrc: 'https://img.icons8.com/color/144/amazon-web-services.png', desc: 'Cloud Practitioner' },
                { name: 'PostgreSQL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
                { name: 'Git', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
                { name: 'TypeScript', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
                { name: 'React', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
                { name: 'Next.js', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true },
                { name: 'Supabase', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
                { name: 'Docker', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
              ].map((skill, index) => (
                <TiltElement key={index}>
                  <div className={`${t.card} p-6 rounded-xl border ${t.border} hover:border-blue-600 hover:${isDarkMode ? 'bg-zinc-800/80' : 'bg-slate-50'} transition-colors duration-300 group text-center h-full flex flex-col justify-center items-center shadow-lg`}>
                    <div className="transition-all duration-300 mb-4 group-hover:scale-110 flex items-center justify-center h-12">
                      {skill.imgSrc ? (
                        <img src={skill.imgSrc} alt={`${skill.name} logo`} className={`h-10 w-10 object-contain drop-shadow-md ${skill.invert && isDarkMode ? "invert" : ""}`} />
                      ) : (
                        skill.icon
                      )}
                    </div>
                    <h3 className={`font-semibold text-lg ${t.text}`}>{skill.name}</h3>
                    {skill.desc && <p className={`text-xs ${t.textMuted} mt-2`}>{skill.desc}</p>}
                  </div>
                </TiltElement>
              ))}
            </div>

            {/* Outras Skills - ESTILO TERMINAL MAC */}
            <div className="mt-12">
              <MacWindow isDarkMode={isDarkMode} t={t} title="davi@macbook: ~/outras-skills" bodyClassName="p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-500 font-mono">
                  <Terminal size={24} /> <span className="text-green-500 font-bold">➜</span> ia_e_automação
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: <ClaudeLogo size={16}/>, text: "claude_code" },
                    { icon: <BrainCircuit size={16}/>, text: "prompt_engineering" },
                    { icon: <Bot size={16}/>, text: "agentes_de_ia" },
                    { icon: <Webhook size={16}/>, text: "mcp_e_apis" },
                    { icon: <Workflow size={16}/>, text: "gohighlevel_crm" },
                    { icon: <Server size={16}/>, text: "vps_linux" },
                    { icon: <ShieldCheck size={16}/>, text: "segurança_e_lgpd" },
                    { icon: <Globe size={16}/>, text: "inglês_intermediário" },
                    { icon: <RefreshCcw size={16}/>, text: "ágil_com_scrum" },
                    { icon: <Sparkles size={16}/>, text: "clean_code" },
                    { icon: <GitMerge size={16}/>, text: "git_flow" }
                  ].map((skill, idx) => (
                    <span key={idx} className={`px-4 py-2 ${t.pill} border ${t.border} rounded-full text-sm font-mono ${t.textSec} flex items-center gap-2 hover:border-blue-600 hover:text-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300 cursor-default`}>
                      {skill.icon} {skill.text}
                    </span>
                  ))}
                </div>
              </MacWindow>
            </div>

          </div>
        </section>

        {/* Trajetória - ESTILO TERMINAL MAC */}
        <section id="trajetoria" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-12 group">
            <h2 className={`text-3xl font-bold ${t.text}`}>Trajetória</h2>
            <div className={`h-1 flex-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'} rounded group-hover:bg-blue-600 transition-colors duration-500`}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Formação */}
            <div className="group">
              <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${t.text}`}>
                <GraduationCap className="text-blue-600 group-hover:rotate-12 transition-transform duration-300" size={28} /> 
                Formação Acadêmica
              </h3>
              <div className={`relative pl-8 border-l-2 ${t.border} hover:border-blue-600 transition-colors duration-500`}>
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
                <MacWindow isDarkMode={isDarkMode} t={t} title="davi@macbook: ~/educacao" bodyClassName="p-6" className={`hover:${isDarkMode ? 'border-zinc-700' : 'border-slate-300'} transition duration-300 shadow-sm`}>
                  <h4 className={`text-xl font-bold ${t.text}`}>Sistemas para Internet</h4>
                  <p className="text-blue-500 font-medium mt-1">IFPB (Instituto Federal da Paraíba)</p>
                  <p className={`${t.textMuted} text-sm my-3 font-mono ${t.pill} inline-block px-2 py-1 rounded border ${t.border}`}>5º período · ago/2024 – dez/2027</p>
                  <p className={t.textSec}>
                    Curso tecnológico focado no desenvolvimento de aplicações web, infraestrutura, banco de dados e metodologias modernas de engenharia de software.
                  </p>
                </MacWindow>
                <div className="h-6"></div>
                <MacWindow isDarkMode={isDarkMode} t={t} title="davi@macbook: ~/certificacoes" bodyClassName="p-6" className="shadow-sm">
                  <h4 className={`text-lg font-bold flex items-center gap-2 ${t.text}`}><Award size={20} className="text-orange-400" /> AWS Certified Cloud Practitioner</h4>
                  <p className="text-blue-500 font-medium mt-1">Amazon Web Services · out/2025</p>
                  <h4 className={`text-lg font-bold flex items-center gap-2 mt-5 ${t.text}`}><Trophy size={20} className="text-yellow-400" /> 2 hackathons</h4>
                  <p className={`${t.textSec} mt-1`}>Entre eles o IFTECH 2026 (IFPB).</p>
                </MacWindow>
              </div>
            </div>

            {/* Experiência */}
            <div className="group">
              <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${t.text}`}>
                <Briefcase className="text-blue-600 group-hover:-rotate-12 transition-transform duration-300" size={28} /> 
                Experiência Profissional
              </h3>
              <div className={`relative pl-8 border-l-2 ${t.border} hover:border-blue-600 transition-colors duration-500`}>
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
                <MacWindow isDarkMode={isDarkMode} t={t} title="davi@macbook: ~/experiencia/atual" bodyClassName="p-6" className={`hover:${isDarkMode ? 'border-zinc-700' : 'border-slate-300'} transition duration-300 shadow-sm`}>
                  <h4 className={`text-xl font-bold ${t.text}`}>Desenvolvedor de Automações e Sistemas</h4>
                  <p className="text-blue-500 font-medium mt-1">EALI Marketing · área tech</p>
                  <p className={`${t.textMuted} text-sm my-3 font-mono ${t.pill} inline-block px-2 py-1 rounded border ${t.border}`}>jan/2026 – atual</p>
                  <ul className={`${t.textSec} space-y-2 list-disc pl-5 leading-relaxed`}>
                    <li>Sistema de gestão de obras em produção para uma construtora.</li>
                    <li>Dashboard integrado ao CRM usado por ~15 corretores, com SLA e resgate de leads.</li>
                    <li>Agente de IA SDR no WhatsApp e implementações do CRM Dynamus (GoHighLevel).</li>
                    <li>Snapshot imobiliário que reduziu a implementação de ~15 para ~3 dias.</li>
                    <li>Infraestrutura em VPS da empresa e de clientes.</li>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className={`text-xs ${t.pill} border ${t.border} text-blue-500 px-3 py-1 rounded-full font-mono`}>claude_code</span>
                    <span className={`text-xs ${t.pill} border ${t.border} text-blue-500 px-3 py-1 rounded-full font-mono`}>gohighlevel</span>
                    <span className={`text-xs ${t.pill} border ${t.border} text-blue-500 px-3 py-1 rounded-full font-mono`}>next.js</span>
                    <span className={`text-xs ${t.pill} border ${t.border} text-blue-500 px-3 py-1 rounded-full font-mono`}>supabase</span>
                  </div>
                </MacWindow>
                <div className="h-6"></div>
                <MacWindow isDarkMode={isDarkMode} t={t} title="davi@macbook: ~/experiencia/compass" bodyClassName="p-6" className={`hover:${isDarkMode ? 'border-zinc-700' : 'border-slate-300'} transition duration-300 shadow-sm`}>
                  <h4 className={`text-xl font-bold ${t.text}`}>Estágio na Trilha de RPA</h4>
                  <p className="text-blue-500 font-medium mt-1">Compass UOL</p>
                  <p className={`${t.textMuted} text-sm my-3 font-mono ${t.pill} inline-block px-2 py-1 rounded border ${t.border}`}>mai/2025 – set/2025</p>
                  <p className={`${t.textSec} mt-4 leading-relaxed`}>
                    Trilha de estudos englobando diversos conteúdos do mundo empresarial e da programação, com forte <strong>foco em RPA (Robotic Process Automation)</strong>.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className={`text-xs ${t.pill} border ${t.border} text-blue-500 px-3 py-1 rounded-full font-mono`}>./botcity.sh</span>
                    <span className={`text-xs ${t.pill} border ${t.border} text-blue-500 px-3 py-1 rounded-full font-mono`}>./automacao.sh</span>
                  </div>
                </MacWindow>
              </div>
            </div>

          </div>
        </section>

        {/* Projetos - ESTILO TERMINAL MAC */}
        <section id="projetos" className={`py-16 ${t.bgSec} border-t ${t.borderSec} relative z-10 transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-12 group">
              <h2 className={`text-3xl font-bold ${t.text}`}>Projetos em Destaque</h2>
              <div className={`h-1 flex-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'} rounded group-hover:bg-blue-600 transition-colors duration-500`}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.slice(0, showAllProjects ? PROJECTS.length : 4).map((project) => (
                <MacWindow 
                  key={project.id}
                  isDarkMode={isDarkMode} 
                  t={t} 
                  title={`~/projetos/${project.title.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-')}`} 
                  bodyClassName="flex flex-col h-full p-0"
                  className={`hover:-translate-y-2 hover:border-blue-600 hover:${t.shadow} transition-all duration-300 group`}
                >
                  {project.video ? (
                    <div className={`aspect-video bg-black relative overflow-hidden border-b ${t.border}`}>
                      <video
                        poster={project.poster}
                        controls
                        preload="none"
                        playsInline
                        className="w-full h-full object-cover"
                        aria-label={`Demonstração em vídeo: ${project.title}`}
                      >
                        <source src={project.video.replace(/\.mp4$/, '.webm')} type="video/webm" />
                        <source src={project.video} type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    <div className={`aspect-video ${t.pill} relative flex items-center justify-center overflow-hidden border-b ${t.border}`}>
                      <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
                      {getProjectIcon(project.icon, `${t.icon} group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500`)}
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className={`text-xl font-bold ${t.text}`}>{project.title}</h3>
                    <p className="text-blue-500 text-xs font-mono mt-1 mb-3">{project.context}</p>
                    <p className={`${t.textMuted} text-sm mb-4 flex-1 leading-relaxed`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.map((tech) => (
                        <span key={tech} className={`text-[11px] ${t.pill} border ${t.border} ${t.textSec} px-2 py-0.5 rounded-full font-mono`}>{tech}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {project.video && (
                        <span className={`${t.textMuted} text-xs flex items-center gap-1`}><Play size={14} /> Demo com dados fictícios</span>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="text-blue-500 font-semibold hover:text-blue-600 transition flex items-center gap-1 group/link w-max">
                          {project.linkText} <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}
                      {project.link2 && (
                        <a href={project.link2} target="_blank" rel="noreferrer" className="text-blue-500 font-semibold hover:text-blue-600 transition flex items-center gap-1 group/link w-max">
                          {project.link2Text} <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </MacWindow>
              ))}
            </div>

            {PROJECTS.length > 4 && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className={`px-8 py-3 rounded-full border ${t.border} ${t.textSec} hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 font-medium flex items-center gap-2`}
                >
                  {showAllProjects ? "Ocultar Projetos" : `Ver Todos os ${PROJECTS.length} Projetos`}
                </button>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-black' : 'bg-white'} border-t ${t.borderSec} py-12 text-center relative z-10 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-2xl font-bold mb-8 ${t.text}`}>Vamos trabalhar juntos?</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href="mailto:davihmn6@gmail.com" className={`${t.card} border ${t.border} p-4 rounded-full ${t.textMuted} hover:text-white hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300 shadow-lg`}>
              <Mail size={24} />
            </a>
            <a href="https://www.linkedin.com/in/davihmn/" target="_blank" rel="noreferrer" className={`${t.card} border ${t.border} p-4 rounded-full ${t.textMuted} hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-110 transition-all duration-300 shadow-lg`}>
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/devcomdavi" target="_blank" rel="noreferrer" className={`${t.card} border ${t.border} p-4 rounded-full ${t.textMuted} hover:text-white hover:bg-blue-600 hover:border-blue-600 hover:scale-110 transition-all duration-300 shadow-lg`}>
              <Github size={24} />
            </a>
            <a href="https://wa.me/5583999581407" target="_blank" rel="noreferrer" className={`${t.card} border ${t.border} p-4 rounded-full ${t.textMuted} hover:text-white hover:bg-[#25D366] hover:border-[#25D366] hover:scale-110 transition-all duration-300 shadow-lg`}>
              <Smartphone size={24} />
            </a>
          </div>
          <p className={`${t.textMuted} text-sm`}>
            &copy; 2026 Davi Holanda. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}