import { useState } from "react";
import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaCopy, FaCheck, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 border-t border-white/10">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden max-w-3xl mx-auto border border-white/10"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Let's Work Together
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mt-2 mb-4">
          Get In Touch
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-8">
          Interested in software engineering, 3D applications, or offline-first PWA projects? Feel free to reach out!
        </p>

        {/* Location Pill */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-xs font-medium text-zinc-300 border border-white/10">
            <FaMapMarkerAlt className="text-indigo-400" />
            {CONTACT.address}
          </div>
        </div>

        {/* Interactive Copy Email Action */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-zinc-900/80 p-2 sm:p-2.5 rounded-2xl border border-white/10 shadow-2xl mb-8">
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
          >
            <FaEnvelope className="text-indigo-400" />
            {CONTACT.email}
          </a>

          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-md cursor-pointer"
          >
            {copied ? (
              <>
                <FaCheck className="text-emerald-300" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FaCopy />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} Nuno Costa. All rights reserved.</span>
          <div className="flex items-center gap-4 text-base">
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
