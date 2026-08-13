import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  HiBars3,
  HiXMark,
  HiOutlineHome,
  HiOutlineFolder,
  HiOutlineBriefcase,
  HiOutlineUser,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "../constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: HiOutlineHome },
    { name: "Projects", path: "/projects", icon: HiOutlineFolder },
    { name: "Experience", path: "/experience", icon: HiOutlineBriefcase },
    { name: "About", path: "/about", icon: HiOutlineUser },
    { name: "Contact", path: "/contact", icon: HiOutlineEnvelope },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-4 sm:top-6 z-40 my-4 sm:my-6 flex items-center justify-between glass-nav rounded-full px-4 sm:px-6 py-3 shadow-2xl border border-white/10"
      >
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white font-heading font-bold text-sm shadow-md group-hover:scale-105 transition-transform duration-300">
            NC
          </span>
          <div className="flex flex-col">
            <span className="font-heading font-semibold tracking-tight text-white/90 text-sm group-hover:text-white transition-colors">
              Nuno Costa
            </span>
            <span className="text-[10px] text-indigo-400 font-mono hidden xs:inline-block sm:inline-block">
              Software Engineer
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav Links (md screens and up) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Social Links */}
        <div className="hidden md:flex items-center gap-2 text-base">
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button (md:hidden) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            className="relative p-2.5 rounded-full text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiXMark className="w-6 h-6 text-indigo-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiBars3 className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer / Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
            />

            {/* Floating Glass Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden glass-nav rounded-3xl p-5 border border-white/15 shadow-2xl overflow-hidden"
            >
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                              : "text-zinc-300 hover:text-white hover:bg-white/5 active:bg-white/10"
                          }`
                        }
                      >
                        <Icon className="w-5 h-5 opacity-80" />
                        <span>{link.name}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="my-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Social Links & Info in Mobile Drawer */}
              <div className="flex items-center justify-between px-2 pt-1">
                <div className="flex items-center gap-3">
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-300 bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:text-white transition-all"
                  >
                    <FaLinkedin className="w-4 h-4 text-indigo-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={CONTACT.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-300 bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:text-white transition-all"
                  >
                    <FaGithub className="w-4 h-4 text-indigo-400" />
                    <span>GitHub</span>
                  </a>
                </div>

                <span className="text-[11px] font-mono text-zinc-500">
                  Porto, PT
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
