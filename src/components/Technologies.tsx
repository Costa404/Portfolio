import { RiReactjsLine } from "react-icons/ri";
import { TbBrandTypescript, TbSql } from "react-icons/tb";
import { SiFirebase, SiTailwindcss, SiLaravel, SiDocker, SiPython, SiThreedotjs } from "react-icons/si";
import { IoLogoCss3, IoLogoJavascript } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaAngular, FaNode } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { GrGraphQl } from "react-icons/gr";

const Technologies = () => {
  const categories = [
    {
      name: "Frontend & 3D Tech",
      items: [
        { name: "React", icon: <RiReactjsLine className="text-4xl text-cyan-400" /> },
        { name: "TypeScript", icon: <TbBrandTypescript className="text-4xl text-sky-400" /> },
        { name: "Angular", icon: <FaAngular className="text-4xl text-red-500" /> },
        { name: "JavaScript", icon: <IoLogoJavascript className="text-4xl text-amber-400" /> },
        { name: "Three.js / R3F", icon: <SiThreedotjs className="text-4xl text-zinc-100" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-4xl text-cyan-300" /> },
        { name: "CSS3", icon: <IoLogoCss3 className="text-4xl text-blue-400" /> },
      ],
    },
    {
      name: "Backend, APIs & Architecture",
      items: [
        { name: "Laravel 12", icon: <SiLaravel className="text-4xl text-rose-500" /> },
        { name: "Node.js", icon: <FaNode className="text-4xl text-emerald-500" /> },
        { name: "Python", icon: <SiPython className="text-4xl text-yellow-400" /> },
        { name: "GraphQL", icon: <GrGraphQl className="text-4xl text-pink-500" /> },
        { name: "PostgreSQL", icon: <BiLogoPostgresql className="text-4xl text-blue-400" /> },
        { name: "MongoDB", icon: <DiMongodb className="text-4xl text-emerald-400" /> },
        { name: "Firebase", icon: <SiFirebase className="text-4xl text-amber-500" /> },
        { name: "SQL", icon: <TbSql className="text-4xl text-indigo-400" /> },
      ],
    },
    {
      name: "DevOps, Security & Tooling",
      items: [
        { name: "Docker", icon: <SiDocker className="text-4xl text-sky-400" /> },
        { name: "IndexedDB / Dexie", icon: <TbSql className="text-4xl text-emerald-300" /> },
        { name: "WebAuthn / Passkeys", icon: <TbBrandTypescript className="text-4xl text-purple-400" /> },
      ],
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
          Core Competencies & Stack
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
          Technologies & Tools
        </h2>
      </motion.div>

      <div className="space-y-10">
        {categories.map((cat, catIndex) => (
          <motion.div
            key={catIndex}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-heading text-lg font-semibold text-zinc-300 border-l-2 border-indigo-500 pl-3">
              {cat.name}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {cat.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="glass-card glass-card-hover rounded-xl p-4 flex flex-col items-center justify-center space-y-2 group text-center"
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Technologies;
