import { useState } from "react";
import { motion } from "framer-motion";
import me from "../assets/449848053_1150348466200881_2175802495937372994_n.jpg";
import { HERO_CONTENT, EXPERIENCES, CONTACT } from "../constants";
import { PROJECTS } from "../constants/Projects";
import { useModal } from "../pages/useModal";
import {
  FaLinkedin,
  FaGithub,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaPlayCircle,
  FaInfoCircle,
  FaBriefcase,
  FaCube,
  FaServer,
  FaHospitalUser,
} from "react-icons/fa";
import { SiNestjs, SiReact, SiSupabase, SiTypescript, SiLaravel, SiDocker, SiPostgresql, SiPython } from "react-icons/si";

const BentoDashboard = () => {
  const [copied, setCopied] = useState(false);
  const [activeExpTab, setActiveExpTab] = useState(0);
  const [activeSideProject, setActiveSideProject] = useState(0);

  const { setSelectedVideo, setModalOpen, setIsModalOpenDetails, setProjectData } = useModal();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mmaisProject = PROJECTS[0]; // Decskill +MMAIS
  const gymTrackerProject = PROJECTS[1]; // GymTracker
  const sideProjects = [PROJECTS[2], PROJECTS[3]]; // Code Mentor AI & Urban Shot 3D

  return (
    <div className="space-y-6 pt-4 pb-12">
      {/* =========================================================
          TOP HERO BENTO HEADER
      ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden"
      >
        {/* Soft Background Glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Avatar + Title + Impact Tagline */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-40 blur-md group-hover:opacity-70 transition-opacity" />
              <img
                src={me}
                alt="Nuno Costa"
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-white/20 shadow-xl"
              />
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Software Engineer Intern @ Decskill
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Nuno Costa
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm font-medium">
                Full-Stack Software Engineer • Porto, Portugal 🇵🇹
              </p>
            </div>
          </div>

          {/* Right: Quick Punchline & Social CTAs */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-3">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card hover:bg-white/10 text-zinc-300 hover:text-white transition-all border border-white/10"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card hover:bg-white/10 text-zinc-300 hover:text-white transition-all border border-white/10"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </a>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                {copied ? <FaCheck className="text-emerald-300" /> : <FaCopy />}
                <span>{copied ? "Email Copied!" : "Copy Email"}</span>
              </button>
            </div>

            <p className="text-zinc-400 text-xs text-center md:text-right max-w-md hidden sm:block">
              {HERO_CONTENT}
            </p>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          BENTO GRID SYSTEM (Zero Scroll Fatigue)
      ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* ---------------------------------------------------------
            CARD 1: PRIMARY PROFESSIONAL FLAGSHIP (+MMAIS @ Decskill)
        --------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-7 glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6 relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">
                <FaHospitalUser className="text-rose-400" />
                Hospital ULS São João Project
              </span>
              <span className="text-xs font-mono text-zinc-400">Decskill Intern</span>
            </div>

            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {mmaisProject.title}
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-2">
                {mmaisProject.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {mmaisProject.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">
              NestJS + React + Supabase Architecture
            </span>

            <button
              onClick={() => {
                setProjectData(mmaisProject.technicalDetails ?? null);
                setIsModalOpenDetails(true);
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
            >
              <FaInfoCircle />
              Technical Specs
            </button>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------
            CARD 2: PERSONAL PRODUCT (GymTracker PWA)
        --------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-5 glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <FaServer />
                Deployed Product (Fly.io)
              </span>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
                {gymTrackerProject.title}
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mt-2">
                {gymTrackerProject.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {gymTrackerProject.technologies.slice(0, 6).map((tech, index) => (
                <span
                  key={index}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
            {gymTrackerProject.appPreview && (
              <a
                href={gymTrackerProject.appPreview}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Live App <FaExternalLinkAlt className="text-[10px]" />
              </a>
            )}

            {gymTrackerProject.videoDemo && (
              <button
                onClick={() => {
                  setSelectedVideo(gymTrackerProject.videoDemo ?? null);
                  setModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg glass-card hover:bg-white/10 text-white transition-colors border border-white/10 cursor-pointer"
              >
                <FaPlayCircle className="text-indigo-400" /> Demo
              </button>
            )}

            <button
              onClick={() => {
                setProjectData(gymTrackerProject.technicalDetails ?? null);
                setIsModalOpenDetails(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg glass-card hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/10 cursor-pointer"
            >
              <FaInfoCircle /> Specs
            </button>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------
            CARD 3: EXPERIENCE & EDUCATION TABBED CARD (Span 6)
        --------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-6 glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 font-heading font-semibold text-white text-base">
              <FaBriefcase className="text-indigo-400" />
              <span>Career & Qualifications</span>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-medium">
              {EXPERIENCES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveExpTab(idx)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeExpTab === idx
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {idx === 0 ? "Decskill" : idx === 1 ? "Freelance" : idx === 2 ? "Cesae" : "EDIT"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-3 min-h-[160px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-white">
                  {EXPERIENCES[activeExpTab].role}
                </h3>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 text-indigo-300 border border-white/10">
                  {EXPERIENCES[activeExpTab].year}
                </span>
              </div>
              <p className="text-xs font-semibold text-indigo-400">
                {EXPERIENCES[activeExpTab].company}
              </p>
              <p className="text-zinc-300 text-xs leading-relaxed">
                {EXPERIENCES[activeExpTab].description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {EXPERIENCES[activeExpTab].technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------
            CARD 4: AI & 3D WEB INNOVATION SWITCHER (Span 6)
        --------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-6 glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 font-heading font-semibold text-white text-base">
              <FaCube className="text-purple-400" />
              <span>AI & 3D Engineering</span>
            </div>

            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-medium">
              <button
                onClick={() => setActiveSideProject(0)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeSideProject === 0
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Code Mentor AI
              </button>
              <button
                onClick={() => setActiveSideProject(1)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeSideProject === 1
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Urban Shot 3D
              </button>
            </div>
          </div>

          {/* Active Side Project Data */}
          {(() => {
            const proj = sideProjects[activeSideProject];
            return (
              <div className="space-y-3 min-h-[160px] flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {proj.badge}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {proj.videoDemo && (
                      <button
                        onClick={() => {
                          setSelectedVideo(proj.videoDemo ?? null);
                          setModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg glass-card hover:bg-white/10 text-white transition-colors border border-white/10 cursor-pointer"
                      >
                        <FaPlayCircle className="text-indigo-400" /> Demo
                      </button>
                    )}
                    {proj.gitHubRepository && (
                      <a
                        href={proj.gitHubRepository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass-card hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/10"
                      >
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>

        {/* ---------------------------------------------------------
            CARD 5: CORE TECH STACK MATRIX (Span 12)
        --------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="md:col-span-12 glass-card glass-card-hover rounded-3xl p-6 border border-white/10 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Core Technical Stack & Engineering Skills
            </span>
            <span className="text-xs text-zinc-500 font-mono">NestJS • React • Supabase • Laravel • TypeScript</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 pt-1">
            <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5 border border-white/10">
              <SiNestjs className="text-xl text-rose-500" />
              <span className="text-xs font-semibold text-white">NestJS</span>
            </div>
            <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5 border border-white/10">
              <SiReact className="text-xl text-cyan-400" />
              <span className="text-xs font-semibold text-white">React</span>
            </div>
            <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5 border border-white/10">
              <SiSupabase className="text-xl text-emerald-400" />
              <span className="text-xs font-semibold text-white">Supabase</span>
            </div>
            <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5 border border-white/10">
              <SiTypescript className="text-xl text-sky-400" />
              <span className="text-xs font-semibold text-white">TypeScript</span>
            </div>
            <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5 border border-white/10">
              <SiLaravel className="text-xl text-rose-400" />
              <span className="text-xs font-semibold text-white">Laravel</span>
            </div>
            <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5 border border-white/10">
              <SiPostgresql className="text-xl text-blue-400" />
              <span className="text-xs font-semibold text-white">PostgreSQL</span>
            </div>
            <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5 border border-white/10">
              <SiDocker className="text-xl text-sky-400" />
              <span className="text-xs font-semibold text-white">Docker</span>
            </div>
            <div className="p-3 rounded-2xl glass-card flex items-center gap-2.5 border border-white/10">
              <SiPython className="text-xl text-yellow-400" />
              <span className="text-xs font-semibold text-white">Python/AI</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default BentoDashboard;
