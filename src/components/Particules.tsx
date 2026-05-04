import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
}

const PARTICLE_COUNT = 60;

const Particles: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * 200 + 200, // Radio desde donde vienen
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div
      style={{
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginRight: "500px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "300px", // Ajusta el tamaño según tu diseño
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Anillo Arcoíris con máscara (Centro vacío) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            padding: "5px", // Grosor del halo
            // background:
            //   "conic-gradient(from 0deg, #ff0000, #ff00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)",
            // La máscara hace que solo se pinte el área del padding

            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            maskComposite: "exclude",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Glow sutil exterior (opcional, para realismo) */}
        {/* <motion.div
          style={{
            position: "absolute",
            inset: "-2px",
            borderRadius: "50%",
            border: "2px solid white",
            opacity: 0.2,
            filter: "blur(8px)",
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        /> */}
      </div>

      {/* Partículas fluyendo hacia el borde vacío */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
          }}
          initial={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            opacity: 0,
          }}
          animate={{
            x: Math.cos(p.angle) * 150, // Se detienen justo en el borde del radio (300px / 2)
            y: Math.sin(p.angle) * 150,
            opacity: [0, 1, 0],
            scale: [1, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeIn",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
