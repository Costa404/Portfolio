import { HERO_CONTENT } from "../constants";
import me from "../assets/449848053_1150348466200881_2175802495937372994_n.jpg";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub, FaEnvelope } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="pt-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Bio */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          
          {/* Availability Status Badge */}
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
            Available for Software Engineering Roles
          </motion.div>

          {/* Name & Title */}
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

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl font-normal"
          >
            {HERO_CONTENT}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 group"
            >
              View Flagship Projects
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/10"
            >
              <FaEnvelope className="text-zinc-400" />
              Contact
            </a>

            <a
              href="https://github.com/Costa404"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/10"
            >
              <FaGithub className="text-zinc-400" />
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Right Column: Sleek Glowing Profile Display */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group"
          >
            {/* Soft Ambient Halo behind Profile */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative overflow-hidden rounded-3xl p-2 glass-card border border-white/15">
              <img
                src={me}
                alt="Nuno Costa"
                className="w-72 h-80 sm:w-80 sm:h-96 object-cover rounded-2xl filter brightness-95 group-hover:scale-[1.02] transition-transform duration-500"
              />
              
              {/* Subtle Overlay Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-3 rounded-xl glass-card backdrop-blur-md border border-white/10 text-xs font-medium text-zinc-300 flex items-center justify-between">
                <span className="text-white font-semibold">Porto, Portugal 🇵🇹</span>
                <span className="text-indigo-400 font-mono text-[11px]">2026 Edition</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
