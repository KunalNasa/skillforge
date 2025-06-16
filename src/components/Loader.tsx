'use client'
import { motion } from "framer-motion";

export default function GenericLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#333",
            }}
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.2, // This creates the wave effect
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}