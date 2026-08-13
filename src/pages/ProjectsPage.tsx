import { PROJECTS } from "../constants/Projects";
import { useModal } from "./useModal";
import { motion } from "framer-motion";
import { FaInfoCircle, FaPlayCircle } from "react-icons/fa";

const ProjectsPage = () => {
  const { setSelectedVideo, setModalOpen, setIsModalOpenDetails, setProjectData } = useModal();

  return (
    <div className="space-y-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3 mb-8"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Software Engineering Showcase
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white">
          Projects & Architecture
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Explore healthcare platforms, offline-first PWAs, AI code analysis engines, and 3D web physics engines.
        </p>
      </motion.div>

      <div className="space-y-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 overflow-hidden relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Thumbnail Preview */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 w-full max-w-[320px] lg:max-w-none h-52 sm:h-60 flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-zinc-600 font-heading font-semibold text-xl">
                      {project.title}
                    </div>
                  )}

                  {/* Video Play Overlay */}
                  {project.videoDemo && (
                    <button
                      onClick={() => {
                        setSelectedVideo(project.videoDemo ?? null);
                        setModalOpen(true);
                      }}
                      className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-sm cursor-pointer"
                    >
                      <FaPlayCircle className="text-4xl text-indigo-400" />
                      <span>Watch Video Demo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Project Info & Controls */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  {project.badge && (
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                      {project.badge}
                    </span>
                  )}

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {project.title}
                  </h2>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies?.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons: Technical Details & Video Demo */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                  {project.technicalDetails && (
                    <button
                      onClick={() => {
                        setProjectData(project.technicalDetails ?? null);
                        setIsModalOpenDetails(true);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
                    >
                      <FaInfoCircle className="text-indigo-200" />
                      Technical Details
                    </button>
                  )}

                  {project.videoDemo && (
                    <button
                      onClick={() => {
                        setSelectedVideo(project.videoDemo ?? null);
                        setModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl glass-card hover:bg-white/10 text-white transition-colors border border-white/10 cursor-pointer"
                    >
                      <FaPlayCircle className="text-indigo-400" />
                      Video Demo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
