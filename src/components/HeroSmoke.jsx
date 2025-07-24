import { motion as Motion } from "framer-motion";

const SmokeParticle = ({ delay }) => (
  <div>
    <Motion.div
      className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl"
      style={{ translateX: "-50%" }}
      initial={{ y: 0, opacity: 0.3, scale: 0.8 }}
      animate={{ y: -300, opacity: 0, scale: 1.5 }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    />
     <Motion.div
    className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl"
    style={{ translateX: "-50%" }}
    initial={{ y: 0, opacity: 0.3, scale: 0.8 }}
    animate={{ y: -300, opacity: 0, scale: 1.5 }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeOut",
    }}
  />
   <Motion.div
    className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl"
    style={{ translateX: "-50%" }}
    initial={{ y: 0, opacity: 0.3, scale: 0.8 }}
    animate={{ y: -300, opacity: 0, scale: 1.5 }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeOut",
    }}
  />
  </div>
  
);

export default function HeroSmoke() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <SmokeParticle key={i} delay={i * 1.2} />
      ))}
    </div>
  );
}
