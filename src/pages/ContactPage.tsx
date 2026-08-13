import { useState } from "react";
import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaCopy, FaCheck, FaLinkedin, FaGithub } from "react-icons/fa";

const ContactPage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden max-w-4xl mx-auto border border-white/10"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />

        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Get In Touch
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white mt-2 mb-4">
          Contact Me
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-8">
          Available for software engineering opportunities, full-stack projects, and technical collaborations.
        </p>

        {/* Location Pill */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-card text-xs sm:text-sm font-medium text-zinc-300 border border-white/10">
            <FaMapMarkerAlt className="text-indigo-400" />
            {CONTACT.address}
          </div>
        </div>

        {/* Copy Email Box */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/80 p-3 rounded-2xl border border-white/10 shadow-2xl mb-10">
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-3 px-4 py-2 text-sm sm:text-base font-semibold text-white hover:text-indigo-300 transition-colors"
          >
            <FaEnvelope className="text-indigo-400 text-lg" />
            {CONTACT.email}
          </a>

          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-all shadow-lg shadow-indigo-600/25 cursor-pointer"
          >
            {copied ? (
              <>
                <FaCheck className="text-emerald-300" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <FaCopy />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Socials & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} Nuno Costa. All rights reserved.</span>
          <div className="flex items-center gap-4 text-lg">
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

export default ContactPage;
