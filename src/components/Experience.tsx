import { motion } from "framer-motion";
import { EXPERIENCES } from "../constants";

const Experience = () => {
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
          Career Journey & Milestones
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
          Experience
        </h2>
      </motion.div>

      <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Node Point */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-indigo-500 border-4 border-[#08090c] group-hover:scale-125 transition-transform duration-300 shadow-md shadow-indigo-500/50" />

            <div className="glass-card glass-card-hover rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-medium text-indigo-400">
                    {exp.company}
                  </span>
                </div>
                <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  {exp.year}
                </span>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {exp.technologies.map((tech, tIndex) => (
                  <span
                    key={tIndex}
                    className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
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
  );
};

export default Experience;
