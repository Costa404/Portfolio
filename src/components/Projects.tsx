import { PROJECTS } from "../constants/Projects";
import { useModal } from "../pages/useModal";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaPlayCircle, FaInfoCircle } from "react-icons/fa";

const Projects = () => {
  const { setSelectedVideo, setModalOpen, setIsModalOpenDetails, setProjectData } = useModal();

  return (
    <div className="py-8">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3 mb-12"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Curated Engineering Portfolio
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
          Flagship Projects
        </h2>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto">
          High-impact full-stack applications, 3D web graphics, offline-first architectures, and AI integrations.
        </p>
      </motion.div>

      <div className="space-y-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-white/10 overflow-hidden relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Thumbnail / Image Preview */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 w-full max-w-[280px] lg:max-w-none h-48 sm:h-56 flex items-center justify-center">
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

                  {/* Play Video Overlay trigger if available */}
                  {project.videoDemo && (
                    <button
                      onClick={() => {
                        setSelectedVideo(project.videoDemo ?? null);
                        setModalOpen(true);
                      }}
                      className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-sm cursor-pointer"
                    >
                      <FaPlayCircle className="text-3xl text-indigo-400" />
                      <span>Watch Demo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Details & Actions */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Category / Badge */}
                  {project.badge && (
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                      {project.badge}
                    </span>
                  )}

                  <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies?.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                  {project.appPreview && (
                    <a
                      href={project.appPreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md shadow-indigo-600/20"
                    >
                      Live App
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  )}

                  {project.technicalDetails && (
                    <button
                      onClick={() => {
                        setProjectData(project.technicalDetails ?? null);
                        setIsModalOpenDetails(true);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg glass-card hover:bg-white/10 text-white transition-colors border border-white/10 cursor-pointer"
                    >
                      <FaInfoCircle className="text-indigo-400" />
                      Technical Details
                    </button>
                  )}

                  {project.videoDemo && (
                    <button
                      onClick={() => {
                        setSelectedVideo(project.videoDemo ?? null);
                        setModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg glass-card hover:bg-white/10 text-white transition-colors border border-white/10 cursor-pointer"
                    >
                      <FaPlayCircle className="text-indigo-400" />
                      Video Demo
                    </button>
                  )}

                  {project.gitHubRepository && (
                    <a
                      href={project.gitHubRepository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg glass-card hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/10"
                    >
                      <FaGithub />
                      GitHub Repo
                    </a>
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

export default Projects;
