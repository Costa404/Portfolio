import { motion } from "framer-motion";
import { EXPERIENCES, EDUCATION } from "../constants";
import { FaBriefcase, FaGraduationCap, FaHospitalUser, FaCertificate } from "react-icons/fa";

const ExperiencePage = () => {
  return (
    <div className="space-y-16 py-6">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3 mb-10"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Career & Qualifications
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white">
          Experience & Education
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
          Software engineering internships, freelance development, and academic certifications.
        </p>
      </motion.div>

      {/* =========================================================
          SECTION 1: PROFESSIONAL EXPERIENCE
      ========================================================= */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <FaBriefcase className="text-lg" />
          </span>
          <h2 className="font-heading text-2xl font-bold text-white">
            Professional Experience
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-2 h-5 w-5 rounded-full bg-indigo-500 border-4 border-[#08090c] group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-indigo-500/50 flex items-center justify-center">
                {index === 0 ? (
                  <FaHospitalUser className="text-[8px] text-white" />
                ) : (
                  <FaBriefcase className="text-[8px] text-white" />
                )}
              </div>

              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-indigo-400">
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {exp.year}
                  </span>
                </div>

                {exp.project && (
                  <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
                    🌟 Main Project: <span className="font-bold text-white">{exp.project}</span>
                  </div>
                )}

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================================================
          SECTION 2: EDUCATION & CERTIFICATIONS
      ========================================================= */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <FaGraduationCap className="text-lg" />
          </span>
          <h2 className="font-heading text-2xl font-bold text-white">
            Education & Certifications
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-2 h-5 w-5 rounded-full bg-purple-500 border-4 border-[#08090c] group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-purple-500/50 flex items-center justify-center">
                {index === 2 ? (
                  <FaCertificate className="text-[8px] text-white" />
                ) : (
                  <FaGraduationCap className="text-[8px] text-white" />
                )}
              </div>

              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-sm font-semibold text-purple-400">
                      {edu.institution}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {edu.year}
                  </span>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed">
                  {edu.description}
                </p>

                {edu.technologies && edu.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {edu.technologies.map((tech, tIndex) => (
                      <span
                        key={tIndex}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
