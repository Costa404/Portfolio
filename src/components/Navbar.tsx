import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { CONTACT } from "../constants";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-6 z-40 my-6 flex items-center justify-between glass-nav rounded-full px-6 py-3 shadow-2xl border border-white/10"
    >
      {/* Brand Logo */}
      <NavLink to="/" className="flex items-center gap-2 group">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-heading font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
          NC
        </span>
        <div className="hidden sm:flex flex-col">
          <span className="font-heading font-semibold tracking-tight text-white/90 text-sm group-hover:text-white transition-colors">
            Nuno Costa
          </span>
          <span className="text-[10px] text-indigo-400 font-mono">Software Engineer</span>
        </div>
      </NavLink>

      {/* Nav Links */}
      <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Social Links */}
      <div className="hidden md:flex items-center gap-2 text-base">
        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <FaLinkedin />
        </a>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <FaGithub />
        </a>
      </div>
    </motion.header>
  );
};

export default Navbar;
