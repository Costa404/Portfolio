import { ABOUT_TEXT } from "../constants";
import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaCube, FaBrain } from "react-icons/fa";

const About = () => {
  const highlights = [
    {
      icon: <FaCode className="text-indigo-400 text-xl" />,
      title: "Full-Stack Web Engineering",
      desc: "React, TypeScript, Angular, Laravel, Node.js & REST/GraphQL APIs.",
    },
    {
      icon: <FaDatabase className="text-emerald-400 text-xl" />,
      title: "Offline-First & Databases",
      desc: "IndexedDB (Dexie.js), PostgreSQL, MongoDB, WebAuthn Passkeys & Push/Pull sync.",
    },
    {
      icon: <FaCube className="text-purple-400 text-xl" />,
      title: "3D & Interactive Graphics",
      desc: "Three.js, React Three Fiber, Rapier Physics & Blender asset modeling.",
    },
    {
      icon: <FaBrain className="text-cyan-400 text-xl" />,
      title: "AI Integration & Tooling",
      desc: "FastAPI, Groq API (LLMs), Monaco Editor & Sentiment Analysis pipelines.",
    },
  ];

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
          Background & Engineering Focus
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
          About Me
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Text Card */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold text-white">
              Passionate Developer & Problem Solver
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {ABOUT_TEXT}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs text-zinc-400">
            <span>Core Philosophy</span>
            <span className="text-indigo-300 font-medium">Clean Code & High Impact</span>
          </div>
        </motion.div>

        {/* Highlights Matrix Grid */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {highlights.map((item, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between space-y-3 border border-white/10"
            >
              <div className="p-2.5 rounded-xl bg-white/5 w-fit border border-white/10">
                {item.icon}
              </div>
              <div>
                <h4 className="font-heading text-base font-semibold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
