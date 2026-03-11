# Meu Portfólio

Este é o repositório do meu portfólio pessoal. O objetivo deste projeto é exibir minhas habilidades, projetos anteriores e fornecer uma forma de contato para oportunidades profissionais. 

Desenvolvido utilizando tecnologias modernas para garantir alta performance, acessibilidade e uma ótima experiência de usuário.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **[React 19](https://react.dev/)**: Biblioteca JavaScript para criar interfaces de usuário.
- **[Vite](https://vitejs.dev/)**: Bundler rápido para desenvolvimento moderno.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first para estilização rápida e responsiva.
- **[Lucide React](https://lucide.dev/)**: Conjunto de ícones consistentes e customizáveis.
- **[ESLint](https://eslint.org/)**: Para manter a qualidade e padronização do código.

## 📦 Estrutura do Projeto

A estrutura base do projeto segue a arquitetura padrão do Vite para React:

```text
meu-portfolio/
├── public/             # Arquivos públicos e assets estáticos (ex: favicon)
├── src/                # Código-fonte principal
│   ├── assets/         # Imagens globais e estilos base
│   ├── App.jsx         # Componente principal da aplicação
│   ├── main.jsx        # Ponto de entrada do React
│   └── index.css       # Estilos globais (incluindo diretivas do Tailwind)
├── eslint.config.js    # Configuração do ESLint
├── tailwind.config.js  # Configuração de temas e utilitários do Tailwind
├── vite.config.js      # Configurações do empacotador Vite
└── package.json        # Dependências e scripts do projeto
```

## 🛠️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o projeto na sua máquina:

### 1. Pré-requisitos
Certifique-se de ter o **[Node.js](https://nodejs.org/)** instalado na sua máquina.

### 2. Instalação das dependências

No terminal, acesse a pasta do projeto (`meu-portfolio`) e rode:

```bash
npm install
```
*(ou `yarn install` / `pnpm install` caso prefira outro gerenciador)*

### 3. Rodando o servidor de desenvolvimento

Inicie o servidor localmente com:

```bash
npm run dev
```

Abra o seu navegador no endereço indicado (geralmente `http://localhost:5173`) para visualizar o portfólio em tempo real.

## ⚙️ Comandos Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento local com Hot Module Replacement (HMR).
- `npm run build`: Compila o projeto para produção na pasta `/dist`, otimizando os arquivos.
- `npm run lint`: Inspeciona o código em busca de problemas de padronização através do ESLint.
- `npm run preview`: Serve os arquivos compilados (da pasta `dist`) para testar a versão final localmente.

## 🎨 Funcionalidades

*(Adicione aqui as funcionalidades principais do seu portfólio à medida que for construindo. Exemplo: Seção de Projetos, Contato, Modo Escuro/Claro, Animações, etc.)*