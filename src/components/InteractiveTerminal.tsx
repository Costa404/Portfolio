import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../constants/Projects";
import { CONTACT } from "../constants";
import { useSoundFX } from "../hooks/useSoundFX";
import { FaTerminal } from "react-icons/fa";
interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

const HELP_TEXT = `Available commands:
  about       — Who I am
  projects    — List flagship projects
  skills      — Tech stack overview
  contact     — Get in touch
  experience  — Career timeline
  goto <page> — Navigate (home, projects, experience, about, contact)
  theme       — Show current visual FX info
  clear       — Clear terminal
  exit        — Close terminal

Tip: Press ↑/↓ to navigate command history.`;

const ABOUT_OUTPUT = `┌─────────────────────────────────────────┐
│  NUNO COSTA                            │
│  Software Engineer                     │
│  Porto, Portugal 🇵🇹                    │
│                                        │
│  Driven by intense technical curiosity │
│  Focused on scalable web applications, │
│  3D graphics, AI pipelines, and        │
│  offline-first architectures.          │
└─────────────────────────────────────────┘`;

const SKILLS_OUTPUT = `┌─ Frontend & 3D ──────────────────────────┐
│ React · TypeScript · Angular · Three.js  │
│ Tailwind CSS · Framer Motion · Vite      │
├─ Backend & Systems ─────────────────────-┤
│ C# · .NET · C · NestJS · Node.js         │
│ Laravel · Python · REST · GraphQL        │
├─ Data & Infrastructure ─────────────────-┤
│ PostgreSQL · MongoDB · Docker · Supabase │
│ IndexedDB · WebAuthn · Firebase          │
└──────────────────────────────────────────┘`;

/**
 * InteractiveTerminal
 *
 * A hidden easter-egg terminal overlay activated by Ctrl+K or backtick.
 * Visitors can type commands to navigate and explore the portfolio.
 */
const InteractiveTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "Portfolio Terminal v1.0 — Type 'help' for commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [_historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { playPop, playTick, playConfirm } = useSoundFX();

  // Toggle with Ctrl+K or backtick
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "k") || (e.key === "`" && !isOpen)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = useCallback((type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { type, content }]);
  }, []);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const parts = trimmed.split(" ");
      const command = parts[0];
      const arg = parts.slice(1).join(" ");

      addLine("input", `> ${cmd}`);

      switch (command) {
        case "help":
          addLine("output", HELP_TEXT);
          break;

        case "about":
          addLine("output", ABOUT_OUTPUT);
          break;

        case "skills":
        case "tech":
        case "stack":
          addLine("output", SKILLS_OUTPUT);
          break;

        case "projects": {
          const projectList = PROJECTS.map(
            (p, i) => `  ${i + 1}. ${p.title} — ${p.badge}`
          ).join("\n");
          addLine(
            "output",
            `┌─ Flagship Projects ─────────────────────┐\n${projectList}\n└──────────────────────────────────────────┘`
          );
          break;
        }

        case "contact": {
          navigator.clipboard.writeText(CONTACT.email);
          playConfirm();
          addLine(
            "output",
            `📧 ${CONTACT.email} (copied to clipboard)\n🔗 GitHub: ${CONTACT.github}\n🔗 LinkedIn: ${CONTACT.linkedin}\n📍 ${CONTACT.address}`
          );
          break;
        }

        case "experience":
          addLine("output", "Navigating to /experience...");
          setTimeout(() => {
            navigate("/experience");
            setIsOpen(false);
          }, 500);
          break;

        case "goto":
        case "cd":
        case "nav": {
          const routes: Record<string, string> = {
            home: "/",
            projects: "/projects",
            experience: "/experience",
            about: "/about",
            contact: "/contact",
          };
          if (arg && routes[arg]) {
            addLine("system", `→ Navigating to /${arg}...`);
            setTimeout(() => {
              navigate(routes[arg]);
              setIsOpen(false);
            }, 400);
          } else {
            addLine(
              "error",
              `Unknown page: "${arg}". Available: ${Object.keys(routes).join(", ")}`
            );
          }
          break;
        }

        case "theme":
          addLine(
            "output",
            "Current visual: Swiss FX Canvas\nOpen the ⚙ HUD (bottom-right) to switch between Silk, Kinetic, Dust, and Horizon modes."
          );
          break;

        case "clear":
        case "cls":
          setLines([
            { type: "system", content: "Terminal cleared." },
          ]);
          return; // Skip the setLines append

        case "exit":
        case "quit":
        case "close":
          addLine("system", "Closing terminal...");
          setTimeout(() => setIsOpen(false), 300);
          break;

        case "sudo":
          addLine("error", "Nice try. 😏");
          break;

        case "ls":
          addLine("output", "home/  projects/  experience/  about/  contact/");
          break;

        case "whoami":
          addLine("output", "visitor@nuno-costa-portfolio");
          break;

        case "pwd":
          addLine("output", `/portfolio${window.location.pathname}`);
          break;

        case "date":
          addLine("output", new Date().toLocaleString());
          break;

        case "echo":
          addLine("output", arg || "");
          break;

        case "":
          break;

        default:
          addLine("error", `Command not found: ${command}. Type 'help' for available commands.`);
      }
    },
    [addLine, navigate, playConfirm]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playPop();
    setHistory((prev) => [input, ...prev]);
    setHistoryIndex(-1);
    processCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      playTick();
      setHistoryIndex((prev) => {
        const next = Math.min(prev + 1, history.length - 1);
        setInput(history[next] || "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      playTick();
      setHistoryIndex((prev) => {
        const next = Math.max(prev - 1, -1);
        setInput(next === -1 ? "" : history[next] || "");
        return next;
      });
    }
  };

  return (
    <>
      {/* Floating Terminal Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { playTick(); setIsOpen(true); }}
        aria-label="Open terminal"
        title="Open terminal (Ctrl+K)"
        className="fixed bottom-6 right-6 z-[9990] p-3 sm:p-4 rounded-full bg-[#0d1017] border border-white/10 text-emerald-400 hover:text-emerald-300 hover:bg-[#151a23] shadow-lg shadow-emerald-500/10 transition-colors group flex items-center justify-center"
      >
        <FaTerminal className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-400/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded pointer-events-none">
          Ctrl+K
        </span>
      </motion.button>

      <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl z-[9999] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10"
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1017] border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-zinc-500 font-mono ml-2">
                  visitor@nuno-costa ~ portfolio
                </span>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono">
                Ctrl+K to toggle
              </span>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              className="bg-[#080b12] p-4 h-[50vh] max-h-[400px] overflow-y-auto font-mono text-sm leading-relaxed"
            >
              {lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap mb-1">
                  {line.type === "input" && (
                    <span className="text-cyan-400">{line.content}</span>
                  )}
                  {line.type === "output" && (
                    <span className="text-zinc-300">{line.content}</span>
                  )}
                  {line.type === "error" && (
                    <span className="text-red-400">{line.content}</span>
                  )}
                  {line.type === "system" && (
                    <span className="text-indigo-400">{line.content}</span>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center mt-1">
                <span className="text-emerald-400 mr-2 shrink-0">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white outline-none caret-cyan-400 font-mono text-sm"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default InteractiveTerminal;
