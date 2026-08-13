import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HERO_CONTENT, CONTACT } from "../constants";
import { PROJECTS } from "../constants/Projects";
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope, FaLightbulb, FaRocket } from "react-icons/fa";

const HomePage = () => {
  const featuredProjects = PROJECTS.slice(0, 3); // Decskill +MMAIS, GymTracker, Code Mentor

  return (
    <div className="space-y-16 py-6">
      {/* Hero Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Software Engineer Intern @ Decskill
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              Nuno Costa
            </h1>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold gradient-text">
              Full-Stack Software Engineer
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl"
          >
            {HERO_CONTENT}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 group"
            >
              Explore Projects
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/10"
            >
              <FaEnvelope className="text-zinc-400" />
              Contact Me
            </Link>

            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-card hover:bg-white/10 text-zinc-300 hover:text-white transition-all border border-white/10"
              aria-label="GitHub"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-card hover:bg-white/10 text-zinc-300 hover:text-white transition-all border border-white/10"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Sleek Self-Taught & Engineering Mindset Card (Replacing Profile Image) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group w-full max-w-md"
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-card border border-white/15 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <FaLightbulb className="text-xl" />
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300">
                  Self-Taught & Driven
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                  <FaRocket className="text-indigo-400 text-base" />
                  Autodidata & Persistent Learner
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Driven by intense technical curiosity. My engineering journey began with exploring how complex software operates under the hood — mastering modern full-stack development, 3D web engines (Three.js/Rapier), AI pipelines (FastAPI/Groq API), NestJS microservices, and offline-first PWA architectures through hands-on practice.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400">Philosophy</span>
                  <p className="text-xs font-semibold text-white">Continuous Growth</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400">Location</span>
                  <p className="text-xs font-semibold text-white">Porto, Portugal 🇵🇹</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Projects Teaser Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6 pt-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Featured Flagships
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Highlight Work
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View All Projects ({PROJECTS.length})
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((proj, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-6 border border-white/10 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 inline-block">
                  {proj.badge || "Featured"}
                </span>
                <h3 className="font-heading font-bold text-xl text-white">
                  {proj.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to="/projects"
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  Details <FaArrowRight className="text-[9px]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
