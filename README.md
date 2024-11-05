📝 Project Overview

This portfolio is a central space to showcase my skills and projects, allowing potential employers and collaborators to learn more about my work. Built with modern technologies and smooth animations, the portfolio is designed to be visually engaging and user-friendly.
🚀 Live Demo

Check out the live version of this portfolio here: Portfolio Live Demo
💻 Features

    Projects Overview: Highlights featured projects with links to live demos and GitHub repositories.
    Smooth Animations: Page transitions and element animations using Framer Motion for an enhanced user experience.
    Responsive Design: Fully responsive layout with Tailwind CSS for compatibility across devices.
    Contact Links: Direct links to my LinkedIn and GitHub profiles for easy connection.

🛠 Technologies Used

    Frontend:
        React & TypeScript: Core technologies for UI components and app logic.
        Tailwind CSS: Utility-first CSS framework for efficient styling and responsiveness.
        Framer Motion: Library for smooth animations, enhancing user engagement.
    Deployment:
        Vercel: Platform for fast, reliable project deploymen







        <!-- ============================================= -->

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
