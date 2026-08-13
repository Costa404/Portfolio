import myGym from "../assets/myGym.png";
import myMovie from "../assets/myMovie.jpg";
import codeMentorImg from "../assets/codeMentorImg.jpg";
import awpImg from "../assets/awp.jpg";
import urbanShot from "../assets/game.mp4";
import myGymVid from "../assets/myGym.mp4";
import myMovieTracker from "../assets/myMovieTracker.mp4";
import codeMentor from "../assets/codeMentor.mp4";

export interface Project {
  title: string;
  image?: string;
  badge?: string;
  appPreview?: string;
  videoDemo?: string;
  gitHubRepository?: string;
  description: string;
  technicalDetails?: {
    title: string;
    description: string;
    backend?: string;
    frontend?: string;
    architecture?: string;
  };
  technologies: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "+MMAIS — Pediatric Oncology Platform",
    image: codeMentorImg,
    badge: "Professional Healthcare System @ Decskill",
    description:
      "Gamified health platform engineered for Hospital ULS São João (Pediatric Oncology) to promote physical activity among hospitalized children. Architected modular NestJS backends, dynamic React interfaces, and real-time Supabase sync.",
    technicalDetails: {
      title: "+MMAIS — Pediatric Oncology Exercise Platform (ULS São João)",
      description:
        "Developed during Software Engineer internship at Decskill. The platform gamifies physical exercise routines for hospitalized pediatric oncology patients, providing real-time progress monitoring for medical staff.",
      backend:
        "Architected modular microservices using NestJS (TypeScript) and Supabase for real-time data streaming, database listeners, and role-based access security.",
      frontend:
        "Built responsive, interactive gamified React interfaces tailored for young patients and healthcare practitioners.",
      architecture:
        "React Frontend <-> NestJS Modular API Gateway <-> Supabase (Real-Time Subscriptions & PostgreSQL Database).",
    },
    technologies: [
      "NestJS",
      "TypeScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "Real-Time Sync",
      "Tailwind CSS",
    ],
  },

  {
    title: "GymTracker",
    image: myGym,
    badge: "Personal Product (Fly.io)",
    appPreview: "https://gymtracker799.fly.dev/",
    videoDemo: myGymVid,
    gitHubRepository: "https://github.com/Costa404/myGymApp",
    description:
      "Full-stack PWA/SPA workout application with Offline-First IndexedDB (Dexie.js), bi-directional Push/Pull sync with Laravel 12 backend, WebAuthn biometric passkeys, Recharts analytics, and Fly.io Docker deployment.",
    technicalDetails: {
      title: "GymTracker — Offline-First & Biometric Authentication",
      description:
        "Engineered a resilient PWA workout application designed to function seamlessly without internet connectivity. Built to support daily fitness routines with bi-directional sync.",
      backend:
        "Laravel 12 and PHP 8.4 REST API with asynchronous queue reconciliation. WebAuthn passwordless authentication (Passkeys, Face ID, Touch ID). Containerized with Docker for deployment on Fly.io.",
      frontend:
        "React, TypeScript, Vite, and Tailwind CSS. IndexedDB store via Dexie.js and Recharts analytics visualization.",
      architecture:
        "PWA Service Worker + Dexie.js (Offline Store) <-> Async Sync Engine <-> Laravel 12 API + Docker Cloud Infra.",
    },
    technologies: [
      "React",
      "TypeScript",
      "Laravel 12",
      "PHP 8.4",
      "IndexedDB",
      "WebAuthn",
      "Docker",
      "Recharts",
      "Vite",
    ],
  },

  {
    title: "myMovie Tracker",
    image: myMovie,
    badge: "Full-Stack & Python NLP AI",
    appPreview: "https://mymovietracker.vercel.app/",
    videoDemo: myMovieTracker,
    gitHubRepository: "https://github.com/Costa404/myMovieTracker",
    description:
      "Full-stack movie discovery and review platform featuring user activity feeds, watchlists, JWT auth, TF-IDF cosine similarity recommendations in Python, VADER sentiment analysis, and a Llama3 Groq AI assistant.",
    technicalDetails: {
      title: "myMovie Tracker Architecture",
      description:
        "Social movie tracking app with algorithmic recommendation pipelines. Combines relational user data with Python NLP analysis to calculate custom ratings and personalized recommendations.",
      backend:
        "Node.js & Express REST API with PostgreSQL database, JWT authentication, and bcrypt password hashing. Microservices in Python calculate TF-IDF matrix similarities and VADER sentiment scores. Integrated Groq API (Llama3-70B) for instant AI movie search.",
      frontend:
        "React & TypeScript SPA built with Zustand state management, Framer Motion animations, and TMDB API integration.",
    },
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Python",
      "Zustand",
      "Groq AI",
      "TMDB API",
    ],
  },

  {
    title: "Code Mentor",
    image: codeMentorImg,
    badge: "AI & Compiler Tooling",
    appPreview: "https://github.com/Costa404/CodeMentor",
    videoDemo: codeMentor,
    gitHubRepository: "https://github.com/Costa404/CodeMentor",
    description:
      "Developer platform that navigates remote GitHub repositories, renders source files in Monaco Editor, and performs real-time AI code analysis and optimization recommendations using FastAPI and the Groq LLM API.",
    technicalDetails: {
      title: "Code Mentor AI Architecture",
      description:
        "Enables instant repository exploration and automated code review via AI. Users can view syntax-highlighted code in Monaco Editor or open an interactive assistant prompt.",
      backend:
        "FastAPI (Python) microservice consuming the Groq API for code analysis and refactoring recommendations.",
      frontend:
        "Angular application featuring GitHub tree navigation, Monaco Code Editor integration, and interactive chat interface.",
    },
    technologies: [
      "Angular",
      "Python",
      "FastAPI",
      "Groq API",
      "Monaco Editor",
      "GitHub API",
    ],
  },

  {
    title: "Urban Shot 3D",
    image: awpImg,
    badge: "3D Web Graphics & Physics",
    appPreview: "https://github.com/Costa404/UrbanShot3D",
    videoDemo: urbanShot,
    gitHubRepository: "https://github.com/Costa404/UrbanShot3D",
    description:
      "Immersive first-person 3D browser game built with React Three Fiber and Rapier physics. Features FPS weapon recoil animations, weapon switching, dynamic enemy path tracking, minimap overlay, and custom Blender models.",
    technicalDetails: {
      title: "Urban Shot 3D Game Engine",
      description:
        "High-performance 3D browser game leveraging React Three Fiber and Rapier physics.",
      frontend:
        "Built using React, Three.js, @react-three/fiber, and @react-three/rapier physics. State management handled via Zustand.",
    },
    technologies: [
      "React",
      "TypeScript",
      "Three.js",
      "R3F",
      "Rapier Physics",
      "Zustand",
      "Blender",
    ],
  },
];
