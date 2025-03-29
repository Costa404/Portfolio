import { RiReactjsLine } from "react-icons/ri";
import { TbBrandTypescript, TbSql } from "react-icons/tb";
import { SiFirebase, SiTailwindcss } from "react-icons/si";
import { IoLogoCss3, IoLogoHtml5, IoLogoJavascript } from "react-icons/io";
import { motion, Variants } from "framer-motion";
import { BsBootstrapFill } from "react-icons/bs";
import { FaAngular, FaNode, FaSass } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { GrGraphQl } from "react-icons/gr";

const iconVariants = (duration: number): Variants => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Technologies = () => {
  return (
    <div className="border-b border-neutral-800 pb-24 flex flex-col">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-10 text-center text-4xl"
      >
        Technologies
      </motion.h1>

      {/* =======================

      Frontend

      ======================= */}

      <motion.div>
        <motion.h3
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.5 }}
          className="my-10 text-center text-4xl"
        >
          Frontend
        </motion.h3>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div
            variants={iconVariants(2)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 p-4"
          >
            <RiReactjsLine className="text-7xl text-cyan-400" />
          </motion.div>
          <motion.div
            variants={iconVariants(3)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 p-4"
          >
            <FaAngular className="text-7xl text-red-700" />
          </motion.div>
          <motion.div
            variants={iconVariants(4)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 p-4"
          >
            <TbBrandTypescript className="text-7xl text-sky-700" />
          </motion.div>
          <motion.div
            variants={iconVariants(6)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 p-4 text-black"
          >
            <IoLogoJavascript className="text-7xl bg-yellow-400 " />
          </motion.div>
          <motion.div
            variants={iconVariants(4)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-4 border-neutral-800 p-4"
          >
            <IoLogoHtml5 className="text-7xl text-orange-500" />
          </motion.div>
        </motion.div>
        {/* =======================

      backend

      ======================= */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col flex-wrap items-center justify-center gap-4"
        >
          <motion.h3
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 1.5 }}
            className="my-10 text-center text-4xl"
          >
            Backend
          </motion.h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.div
              variants={iconVariants(2)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4 text-black"
            >
              <DiMongodb className="text-7xl text-green-400 " />
            </motion.div>
            <motion.div
              variants={iconVariants(4)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4"
            >
              <SiFirebase className="text-7xl text-orange-500" />
            </motion.div>
            <motion.div
              variants={iconVariants(6)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4"
            >
              <TbSql className="text-7xl text-blue-800" />
            </motion.div>
            <motion.div
              variants={iconVariants(4)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4"
            >
              <GrGraphQl className="text-7xl text-blue-800" />
            </motion.div>
            <motion.div
              variants={iconVariants(2)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4"
            >
              <FaNode className="text-7xl text-green-500" />
            </motion.div>
            <motion.div
              variants={iconVariants(6)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4"
            >
              <BiLogoPostgresql className="text-7xl text-blue-500" />
            </motion.div>
          </div>
        </motion.div>
        {/* =======================

      styling

      ======================= */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col flex-wrap items-center justify-center gap-4"
        >
          <motion.h3
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 1.5 }}
            className="my-10 text-center text-4xl"
          >
            Styling
          </motion.h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.div
              variants={iconVariants(2)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4"
            >
              <SiTailwindcss className="text-7xl text-sky-500" />
            </motion.div>
            <motion.div
              variants={iconVariants(4)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4"
            >
              <BsBootstrapFill className="text-7xl text-purple-500" />
            </motion.div>

            <motion.div
              variants={iconVariants(6)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4"
            >
              <FaSass className="text-7xl text-pink-500" />
            </motion.div>
            <motion.div
              variants={iconVariants(4)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-neutral-800 p-4"
            >
              <IoLogoCss3 className="text-7xl text-blue-500" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Technologies;
