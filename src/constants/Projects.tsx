import onlineshop from "../assets/Online-shopping-07.gif";
import project3 from "../assets/projects/project-3.jpg";

import minichat from "../assets/minichat.png";
import landingpage from "../assets/landingpage.png";

export const PROJECTS = [
  {
    title: "MiniChat Website",
    image: minichat,
    appPreview: "https://fir-firstproject-71bad.web.app/",
    description:
      "A real-time chat application with user profiles, and emoji support. Built with React, TypeScript, and Firebase, it features seamless authentication and real-time messaging.",

    technologies: ["React", "TypeScript", "Firebase", "CSS"],
  },

  {
    title: "myPortfolio Website",
    image: project3,
    appPreview: "https://mystore-eight-delta.vercel.app/",
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",

    technologies: ["React", "TypeScript", "Taillwind"],
  },
  {
    title: "Cv Template Website",
    image: project3,
    appPreview: "https://cvtemplate-4b972.web.app/",
    description:
      "This CV template is a modern, responsive application created with React and TypeScript for enhanced type safety. Featuring a clean, professional layout styled with CSS, it allows users to effectively showcase their skills, experience, and education.",
    technologies: ["React", "TypeScript", "CSS"],
  },
  {
    title: "Online Store",
    image: onlineshop,
    appPreview: "https://mystore-eight-delta.vercel.app/",
    description:
      "A simple e-commerce platform created for testing UX/UI designs, featuring basic product showcasing and user navigation. This project emphasizes user experience and interface design, ensuring a responsive layout for optimal use on both desktop and mobile devices.",
    technologies: ["HTML", "CSS", "SCSS"],
  },
  {
    title: "Landing Page",
    image: landingpage,
    appPreview: "https://landing-page-virid-eta-39.vercel.app/",
    description:
      "A visually appealing landing page designed for testing UX/UI concepts, focusing on engaging user experiences and effective call-to-action elements. This project showcases a clean layout and responsive design, ensuring optimal functionality on both desktop and mobile devices.",
    technologies: ["HTML", "CSS", "SCSS"],
  },
];
