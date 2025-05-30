import onlineshop from "../assets/Online-shopping-07.gif";
import project3 from "../assets/projects/project-3.jpg";
import instagramLogo from "../assets/Instagram_logo_2022.svg.webp";
import myMovie from "../assets/myMovie.jpg";
import minichat from "../assets/minichat.jpg";
import myGym from "../assets/myGym.png";
import landingpage from "../assets/landingpage.png";
import gameImg from "../assets/game.png";
import igClone from "../assets/IgClone.mp4";
import myGymVid from "../assets/myGym.mp4";
import myMovieTracker from "../assets/myMovieTracker.mp4";
import myChat from "../assets/mychat.mp4";
import cvTemplate from "../assets/cvTemplate.mp4";
import codeMentor from "../assets/codeMentor.mp4";
import codeMentorImg from "../assets/codeMentorImg.jpg";
import urbanShot from "../assets/game.mp4";
import awpImg from "../assets/awp.jpg";
export const PROJECTS = [
  {
    title: "Urban Shot 3D",
    image: awpImg,

    appPreview: "https://github.com/Costa404/UrbanShot3D",
    videoDemo: urbanShot,
    technicalDetails: {
      title: "Urban Shot 3D",
      description: `
A simple but immersive 3D shooter game built with React ThreeJS, react-three/fiber, and Rapier physics using TypeScript. The player moves through an  city, fighting off enemies that spawn throughout the map.

Features include a first-person view with weapon animation such as recoil and shooting logic. There are two different weapons available that can be switched. The game has an enemy tracking system and a mini-map showing player and enemy positions. It also includes a kill counter and a basic user interface. Physics-based interactions with walls, obstacles, and collisions are implemented.



I used Blender to create some objects in the game scene and to manipulate and adapt some assets I sourced from the PolyPizza website.

Technologies used are React/Threejs, react-three/fiber, react-three/drei, react-three/rapier, Rapier3D, Zustand for state management, React Icons, Bootstrap, TypeScript.



  `,
    },

    description:
      "A simple but immersive 3D shooter game built with React ThreeJS, react-three/fiber, and Rapier physics using TypeScript. The player moves through an  city, fighting off enemies that spawn throughout the map.",

    gitHubRepository: "https://github.com/Costa404/UrbanShot3D",
    technologies: [
      "React",
      "TypeScript",
      "ThreeJs",
      "Bootstrap",
      "Blender",
      "Zustand",
    ],
  },
  //   ============================================

  // NEW PROJECT

  //   ============================================
  {
    title: "Code Mentor",
    image: codeMentorImg,

    appPreview: "https://github.com/Costa404/CodeMentor",
    videoDemo: codeMentor,
    technicalDetails: {
      title: "codeMentor",
      description:
        "The app is designed to allow users to explore GitHub repositories, view their contents, and analyze code with AI-driven feedback. Using a GitHub-style navigation, users can search for and browse any repository. When a file is clicked, it opens in the Monaco Editor for easy viewing and editing. The code can then be analyzed by the FastAPI backend, which uses the Groq API to provide real-time suggestions and improvements based on the code's quality, performance, and best practices. Additionally, users can interact with a chat interface to input custom code for further analysis and feedback from the AI.",

      backend:
        "I built this FastAPI (Python) backend to provide real-time code analysis using the Groq API. It takes a code snippet from the frontend (POST /codeAnalysis), sends it to the Groq API for evaluation, and returns AI-generated feedback with optimizations, bug fixes, and best practices.",
      frontend:
        "In the frontend i built it using Angular with boostrap, with a GitHub-style navigation that lets users explore any repository by entering its name. I fetch repository data using the GitHub API, allowing users to browse directories. When a file is clicked, it opens in the Monaco Editor, where it can be analyzed with AI-powered feedback. Users can also open a chat interface and input their own code for analysis, getting AI-driven suggestions and improvements.",
    },

    description:
      "The app lets users explore GitHub repositories, view files in a Monaco Editor, and get AI-powered code analysis. It uses FastAPI to send code to the Groq API for suggestions and improvements. Users can also input their own code for analysis through a chat interface.",

    gitHubRepository: "https://github.com/Costa404/CodeMentor",
    technologies: ["Angular", "Python", "Bootstrap"],
  },
  {
    //   ============================================

    // NEW PROJECT

    //   ============================================
    title: "myMovie Tracker",
    image: myMovie,

    appPreview: "https://mymovietracker.vercel.app/",
    videoDemo: myMovieTracker,
    technicalDetails: {
      title: "MyMovieTracker",
      description:
        "A movie tracking app where users can write reviews, add friends, and have a personalized feed based on their friends activities. Users can also keep a watchlist and track their movie history. The app is designed to help users manage their movie preferences, share recommendations with friends, and stay updated on the latest films they've watched or want to watch.",

      backend:
        "Honestly, once I had the entire backend set up, things became much easier. The biggest challenge was definitely getting everything off the ground especially with setting up authentication, the database, and middlewares. But once that foundation was in place, everything else started to fall into place and became much more manageable. The backend runs on Node.js and Express, offering a REST API to handle requests. Data is stored in PostgreSQL, which provides a reliable and scalable solution for managing user information, and movie data. For authentication, I implemented JSON Web Tokens (JWT) paired with bcrypt for secure password hashing. Additionally, Python was integrated to introduce innovative features, such as a personalized movie recommendation system using TF-IDF and cosine similarity, graphs generated with Matplotlib based on vote count/average, and a 'fakeIMDB' score combining ratings with reviews using sentiment analysis via VADER.It also features an AI-powered chat assistant that processes movie-related queries using the Groq API. Leveraging the Llama3-70B-8192 model, this assistant delivers faster responses.",
      frontend:
        "The frontend was developed using React and TypeScript, ensuring a dynamic and type-safe user experience. Zustand is used for state management, making the data flow more efficient. For styling, I used Bootstrap, enabling fast and easy design implementation. The app is populated with fake data generated by the Faker library, and for the database, I used The Movie Database (TMDB) API. The app is deployed on Render and Vercel for smooth and fast hosting. I also integrated the Framer Motion library for animations, used Lazy Loading to optimize performance, and implemented React Router for smooth and scalable routing.",
    },

    description:
      "I developed the entire app, including both the front-end and back-end, as well as the complete state management. It’s a fully custom-built project that allows me to track the movies I watch and monitor my viewing history. The application is still a work in progress, and this is just the first, more basic version. See the technical details for further information. See the technical details for further information. ",

    gitHubRepository: "https://github.com/Costa404/myMovieTracker",
    technologies: [
      "React",
      "TypeScript",
      "Express",
      "NodeJs",
      "PostgreSQL",
      "Zustand",
      "Bootstrap",
      "Render",
      "Vercel",
    ],
  },
  //   ============================================

  // NEW PROJECT

  //   ============================================
  {
    title: "myGym Website",
    image: myGym,
    technicalDetails: {
      title: "Gym Tracker",
      description:
        "I made this app because I love the gym, so I mixed something useful with something I enjoy. It lets me track my workouts easily, add exercises, set reps, and see my progress. I built everything on the homepage with functional modals, except for the 'Workout History' section, which is a separate page. It's mobile-friendly, so it works anywhere. It keeps things simple and intuitive while still letting users track their workouts, add exercises, and leave comments all in one place.",
      backend:
        "For the backend, I used Node.js to set everything up. I connected it with Apollo Server for GraphQL, which helps manage data requests in a flexible way. The server runs on Express.js, making it easy to handle routes and middleware. The data is stored in MongoDB, which is a NoSQL database. I used Mongoose to make working with the database easier. For real-time features, I added Socket.IO to ensure that when a user adds a new set with an exercise, it updates instantly on the display. This way, the user gets immediate feedback on what was added. In short, the backend is built to be fast, flexible, and able to handle real-time communication.",
      frontend:
        "Setting up the frontend was a bit easier compared to the backend. I used React with TypeScript, which helped keep things organized and type-safe. For styling, I went with Bootstrap and some inline styling. I also added Zustand for state management, mainly to handle things like modals smoothly. Even though the app is small, I included lazy loading to optimize performance a bit.",
    },

    appPreview: "https://my-gym-app-client-costa404s-projects.vercel.app/",
    videoDemo: myGymVid,

    gitHubRepository: "https://github.com/Costa404/myGymApp",
    description:
      "I made this app because I love the gym, so I mixed something useful with something I enjoy. It lets me track my workouts easily, add exercises, set reps, and see my progress. The app is still in development, this is just the initial, simpler version. Check technical details for more info. ",

    technologies: [
      "React",
      "TypeScript",
      "MongoDB",
      "Express",
      "NodeJs",
      "GraphQL/ApolloServer",
      "SocketIO",
      "Zustand",
      "Bootstrap",
    ],
  },
  //   ============================================

  // NEW PROJECT

  //   ============================================
  {
    title: "Instagram Clone Unfinished",
    image: instagramLogo,

    appPreview: "https://mysocialnetwork-960dc.web.app/",
    videoDemo: igClone,
    technicalDetails: {
      title: "InstagramClone",
      description:
        "The main purpose behind building an Instagram clone was to test and refine my skills in full-stack development, with a primary focus on frontend technologies. This project allowed me to gain practical experience in React and TypeScript for building a dynamic and responsive user interface.",
      backend:
        "On the backend, I used Firebase for handling authentication, database management, and file storage. Since I didn’t have a strong background in backend development, I decided to start with something more approachable like Firebase. It allowed me to focus on learning the basics of backend integration without the complexity of managing a custom server, helping me build the necessary skills while focusing on both the frontend and backend aspects of the project.",
      frontend:
        "For frontend i used React and TypeScript to build a smooth and interactive user interface and mobile friendly. For styling, I kept it simple with Bootstrap, making sure it was responsive and looked modern. React Router helped me handle the navigation between pages, and I threw in Lazy Loading to make the app faster by only loading components when needed, so the user experience stays smooth. To add a bit of realism, I used the Faker library to generate fake users and some random data to test out the features.",
    },
    gitHubRepository: "https://github.com/Costa404/InstagramClone",
    description:
      "An Instagram clone that replicates core features, including authentication, user profiles, posts and more. Built with 𝐑𝐞𝐚𝐜𝐭, 𝐓𝐲𝐩𝐞𝐒𝐜𝐫𝐢𝐩𝐭, and 𝐅𝐢𝐫𝐞𝐛𝐚𝐬𝐞, it also integrates real-time chat for seamless communication between users.",

    technologies: ["React", "TypeScript", "Firebase", "Bootstrap"],
  },
  {
    title: "MiniChat Website",
    image: minichat,
    videoDemo: myChat,
    appPreview: "https://fir-firstproject-71bad.web.app/",
    gitHubRepository: "https://github.com/Costa404/myChat-Website",
    description:
      "A real-time chat application with user profiles, and emoji support. Built with 𝐑𝐞𝐚𝐜𝐭, 𝐓𝐲𝐩𝐞𝐒𝐜𝐫𝐢𝐩𝐭, and 𝐅𝐢𝐫𝐞𝐛𝐚𝐬𝐞, it features seamless authentication and real-time messaging.",

    technologies: ["React", "TypeScript", "Firebase", "CSS"],
  },

  {
    title: "Cv Template Website",
    image: project3,
    videoDemo: cvTemplate,
    appPreview: "https://cvtemplate-4b972.web.app/",
    gitHubRepository: "https://github.com/Costa404/React-Final-Project",
    description:
      "This CV template is a modern, responsive application created with 𝐑𝐞𝐚𝐜𝐭 and 𝐓𝐲𝐩𝐞𝐒𝐜𝐫𝐢𝐩𝐭 for enhanced type safety. Featuring a clean, professional layout styled with 𝐂𝐒𝐒, it allows users to effectively showcase their skills, experience, and education.",
    technologies: ["React", "TypeScript", "CSS"],
  },

  {
    title: "myPortfolio Website",
    image: project3,

    appPreview: "https://mystore-eight-delta.vercel.app/",
    gitHubRepository: "https://github.com/Costa404/Portfolio",
    description:
      "A personal portfolio website showcasing projects, skills, and contact information, enhanced with smooth animations and interactive elements powered by 𝐅𝐫𝐚𝐦𝐞𝐫 𝐌𝐨𝐭𝐢𝐨𝐧.",
    technologies: ["React", "TypeScript", "Taillwind"],
  },

  {
    title: "Tic Tac Toe Game",
    image: gameImg,

    appPreview: "https://tic-toc-toe-game-nine.vercel.app/",
    gitHubRepository: "https://github.com/Costa404/tic-toc-toe-game",
    description:
      "A classic Tic Tac Toe game built with 𝐉𝐚𝐯𝐚𝐒𝐜𝐫𝐢𝐩𝐭, 𝐇𝐓𝐌𝐋, and 𝐂𝐒𝐒. Though unfinished, it is fully functional, allowing players to take turns, place marks, and aim to align three in a row to win",
    technologies: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Online Store",
    image: onlineshop,

    appPreview: "https://mystore-eight-delta.vercel.app/",
    gitHubRepository: "https://github.com/Costa404/html-css-edit",
    description:
      "A simple e-commerce platform created for testing UX/UI designs, featuring basic product showcasing and user navigation. This project emphasizes user experience and interface design, ensuring a responsive layout for optimal use on both desktop and mobile devices.",
    technologies: ["HTML", "CSS", "SASS"],
  },
  {
    title: "Landing Page",
    image: landingpage,

    appPreview: "https://landing-page-virid-eta-39.vercel.app/",
    gitHubRepository: "https://github.com/Costa404/landingPage",
    description:
      "A visually appealing landing page designed for testing UX/UI concepts, focusing on engaging user experiences and effective call-to-action elements. This project showcases a clean layout and responsive design, ensuring optimal functionality on both desktop and mobile devices.",
    technologies: ["HTML", "CSS", "SASS"],
  },
];
