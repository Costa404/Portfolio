import React from "react";
import { RiReactjsLine } from "react-icons/ri";
import { TbBrandTypescript } from "react-icons/tb";
import { SiFirebase } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { motion, Variants } from "framer-motion";

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
    <div className="border-b border-neutral-800 pb-24">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </motion.h1>
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
          variants={iconVariants(4)} // Outra duração para este ícone
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <TbBrandTypescript className="text-7xl text-sky-700" />
        </motion.div>
        <motion.div
          variants={iconVariants(2)} // Outra duração para este ícone
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4 text-black"
        >
          <IoLogoJavascript className="text-7xl bg-yellow-400 " />
        </motion.div>
        <motion.div
          variants={iconVariants(4)} // Outra duração para este ícone
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <SiFirebase className="text-7xl text-orange-500" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Technologies;