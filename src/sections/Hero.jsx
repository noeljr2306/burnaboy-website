import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = ({ triggerAnimation }) => {
  const heroRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    if (!triggerAnimation || !heroRef.current) return;
   
    gsap.set(heroRef.current, { opacity: 0, y: 30 });
    gsap.to(heroRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.2 });

    gsap.to(arrowRef.current, {
      y: 8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, [triggerAnimation]);

  return (
    <section
      ref={heroRef}
      className="flex flex-col items-center justify-center min-h-[90vh] xs:pt-20 sm:pt-32 md:pt-48 lg:pt-56 xl:pt-64 2xl:pt-72 text-white space-y-4 opacity-0 translate-y-7"
    >
      <div className="text-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-8 drop-shadow-2xl text-yellow-400 tracking-[0.2em]">
          BURNA BOY
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-yellow-600 text-center font-black drop-shadow-lg">
          GRAMMY AWARD WINNING ARTIST • THE AFRICAN GIANT
        </p>
      </div>
      <div className="absolute xs:bottom-12 bottom-4 w-full flex justify-center items-center">
        <a href="#about">
          <div className="border-none flex justify-center items-center p-2 mb-4">
            <div
              ref={arrowRef}
              className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[24px] border-l-transparent border-r-transparent border-t-yellow-500"
            />
          </div>
          <p className="text-sm text-gray-400">Click to scroll down</p>
        </a>
      </div>
    </section>
  );
};

export default Hero;
