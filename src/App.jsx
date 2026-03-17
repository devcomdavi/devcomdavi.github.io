import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, MapPin, Smartphone, ChevronRight,
  Terminal, Coffee, FileCode, Cloud, Bot, Database,
  GitBranch, ImageIcon, Users, Target, MessageSquare,
  Zap, Handshake, Briefcase, GraduationCap, Utensils, Menu, X,
  Sun, Moon, Globe, RefreshCcw, Sparkles, GitMerge
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
    title: "Site para Restaurante",
    description: "Desenvolvimento de uma interface web para restaurante. Foco em usabilidade e apresentação de cardápio.",
    link: "https://mix-arretado.vercel.app/",
    linkText: "Ver Projeto",
    icon: 'utensils'
  },
  {
    id: 2,
    title: "Automação RPA - Botcity",
    description: "Criação de um Bot de automação utilizando o framework Botcity. Projeto final desenvolvido durante o estágio na Compass Uol.",
    link: "#",
    linkText: "Ver Código",
    icon: 'bot'
  },
  {
    id: 3,
    title: "Repositório de Estudos",
    description: "Coleção de projetos, exercícios e conteúdos que estou estudando ativamente para aprimorar minhas habilidades.",
    link: "https://github.com/devcomdavi",
    linkText: "Acessar GitHub",
    icon: 'github'
  },
  {
    id: 4,
    title: "Projeto de Exemplo (Em Breve)",
    description: "Espaço reservado para um futuro projeto. Adicionado apenas para demonstrar o funcionamento do botão 'Ver Mais'.",
    link: "#",
    linkText: "Aguarde",
    icon: 'code'
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
    default: return <Database {...props} />;
  }
};

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
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={(e) => window.scrollTo({top: 0, behavior: 'smooth'})}>
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
                  <span className="inline-block transform skew-x-12">Desenvolvedor de Software</span>
                </div>
                
                <p className={`${t.textMuted} max-w-2xl text-lg mt-2 mx-auto md:mx-0 transition-colors duration-500`}>
                  Aluno de Sistemas para Internet no IFPB. Transformando ideias em resultados práticos por meio da tecnologia e automação.
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
                Sou estudante de Sistemas para Internet e <strong className="text-blue-500">desenvolvedor de software</strong>, com experiência prática adquirida em projetos acadêmicos e durante meu estágio na Compass Uol.
              </p>
              <p className={`hover:${t.text} transition-colors`}>
                Busco oportunidades no mercado tech. Já desenvolvi soluções variadas: um site para restaurante, um sistema de agendamento focado em POO (herança e polimorfismo), e um bot em Python que automatiza validações de cadastro e solicitações de envio nos Correios.
              </p>
              <div className={`border-l-4 border-blue-600 pl-6 py-4 ${isDarkMode ? 'bg-zinc-900/80' : 'bg-white'} rounded-r-xl italic font-medium relative overflow-hidden group shadow-sm transition-colors duration-500`}>
                <div className="absolute inset-0 bg-blue-600/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                "Com uma base teórica sólida, busco transformar meu conhecimento em resultados práticos e agregar valor ao mercado de tecnologia."
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
            <img
              src="print_github.png"
              alt="Print do GitHub"
              className="mx-auto rounded-2xl object-cover h-full w-full object-center"
              draggable={false}
            />
          </ContainerScroll>
        </section>

        {/* Habilidades - Efeito 3D Hover */}
        <section id="habilidades" className={`py-16 ${t.bgSec} border-y ${t.borderSec} relative z-10 transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-12 group">
              <h2 className={`text-3xl font-bold ${t.text}`}>Hard Skills</h2>
              <div className={`h-1 flex-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'} rounded group-hover:bg-blue-600 transition-colors duration-500`}></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Python', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                { name: 'Java', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
                { name: 'JavaScript', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
                { name: 'AWS', imgSrc: 'https://img.icons8.com/color/144/amazon-web-services.png', desc: 'Cloud Practitioner' },
                { name: 'PostgreSQL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
                { name: 'Git', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
                { name: 'GitHub', icon: <Github size={40} className={t.text} /> },
                { name: 'Photoshop', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg' },
              ].map((skill, index) => (
                <TiltElement key={index}>
                  <div className={`${t.card} p-6 rounded-xl border ${t.border} hover:border-blue-600 hover:${isDarkMode ? 'bg-zinc-800/80' : 'bg-slate-50'} transition-colors duration-300 group text-center h-full flex flex-col justify-center items-center shadow-lg`}>
                    <div className="transition-all duration-300 mb-4 group-hover:scale-110 flex items-center justify-center h-12">
                      {skill.imgSrc ? (
                        <img src={skill.imgSrc} alt={`${skill.name} logo`} className="h-10 w-10 object-contain drop-shadow-md" />
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
                  <Terminal size={24} /> <span className="text-green-500 font-bold">➜</span> conhecimentos_adicionais
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
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
                  <p className={`${t.textMuted} text-sm my-3 font-mono ${t.pill} inline-block px-2 py-1 rounded border ${t.border}`}>4º Período</p>
                  <p className={t.textSec}>
                    Curso tecnológico focado no desenvolvimento de aplicações web, infraestrutura, banco de dados e metodologias modernas de engenharia de software.
                  </p>
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
                <MacWindow isDarkMode={isDarkMode} t={t} title="davi@macbook: ~/experiencia" bodyClassName="p-6" className={`hover:${isDarkMode ? 'border-zinc-700' : 'border-slate-300'} transition duration-300 shadow-sm`}>
                  <h4 className={`text-xl font-bold ${t.text}`}>Estágio em RPA</h4>
                  <p className="text-blue-500 font-medium mt-1">Compass Uol</p>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROJECTS.slice(0, showAllProjects ? PROJECTS.length : 3).map((project) => (
                <MacWindow 
                  key={project.id}
                  isDarkMode={isDarkMode} 
                  t={t} 
                  title={`~/projetos/${project.icon}`} 
                  bodyClassName="flex flex-col h-full p-0"
                  className={`hover:-translate-y-2 hover:border-blue-600 hover:${t.shadow} transition-all duration-300 group`}
                >
                  <div className={`h-48 ${t.pill} relative flex items-center justify-center overflow-hidden border-b ${t.border}`}>
                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
                    {getProjectIcon(project.icon, `${t.icon} group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500`)}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className={`text-xl font-bold mb-2 ${t.text}`}>{project.title}</h3>
                    <p className={`${t.textMuted} text-sm mb-6 flex-1`}>
                      {project.description}
                    </p>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-blue-500 font-semibold hover:text-blue-600 transition flex items-center gap-1 group/link w-max">
                      {project.linkText} <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </MacWindow>
              ))}
            </div>

            {PROJECTS.length > 3 && (
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