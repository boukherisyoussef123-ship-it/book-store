"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center z-10">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center text-[#5B8DEF] tracking-tight"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Where Little Minds <br />
        Bloom Into Geniuses
      </motion.h1>

      <motion.p
        className="mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl text-center font-light"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        Premium digital books, interactive posters, and magical adventures.
        Instantly downloadable. Crafted for curious kids.
      </motion.p>

      <Link href="/library">
        <motion.button
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="mt-10 px-10 py-5 bg-[#FFB74D] text-white rounded-full text-lg font-semibold shadow-lg shadow-[#FFB74D]/50 hover:bg-[#5B8DEF] hover:shadow-[#5B8DEF]/50 transition-colors duration-500"
        >
          Explore the Library ✨
        </motion.button>
      </Link>
    </section>
  );
}