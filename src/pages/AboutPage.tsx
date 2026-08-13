import { motion } from "framer-motion";
import Technologies from "../components/Technologies";
import { FaCode, FaDatabase, FaCube, FaBrain } from "react-icons/fa";

const AboutPage = () => {
  const highlights = [
    {
      icon: <FaCode className="text-indigo-400 text-2xl" />,
      title: "Full-Stack Web Engineering",
      desc: "React, TypeScript, Angular, NestJS, Node.js & REST/GraphQL APIs.",
    },
    {
      icon: <FaDatabase className="text-emerald-400 text-2xl" />,
      title: "Healthcare & Offline-First Systems",
      desc: "Supabase, Real-Time Subscriptions, IndexedDB (Dexie.js), PostgreSQL & WebAuthn Biometrics.",
    },
    {
      icon: <FaCube className="text-purple-400 text-2xl" />,
      title: "3D & Interactive Graphics",
      desc: "Three.js, React Three Fiber, Rapier Physics & Blender asset pipelines.",
    },
    {
      icon: <FaBrain className="text-cyan-400 text-2xl" />,
      title: "AI Integration & Compiler Tooling",
      desc: "FastAPI, Groq API (LLMs), Monaco Editor & Sentiment Analysis pipelines.",
    },
  ];

  return (
    <div className="space-y-16 py-6">
      {/* Intro & Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3 mb-8"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Engineering Background
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white">
          About Me
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Passionate Software Engineer based in Porto, Portugal. Focused on clean architecture, resilient web systems, and high-impact software.
        </p>
      </motion.div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card glass-card-hover rounded-3xl p-6 border border-white/10 space-y-4 flex flex-col justify-between"
          >
            <div className="p-3 rounded-2xl bg-white/5 w-fit border border-white/10">
              {item.icon}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Categorized Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pt-6"
      >
        <Technologies />
      </motion.div>
    </div>
  );
};

export default AboutPage;
