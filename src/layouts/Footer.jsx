import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const logoRef = useRef(null);
  const socialRef = useRef([]);
  const copyrightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.set(socialRef.current, { scale: 0, rotation: 180 });

      gsap.to(socialRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5,
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 1,
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-zinc-900 text-white py-12 px-6 text-center">
      <div ref={logoRef} className="mb-4">
        <img src="/logo.png" alt="Burna Boy Logo" className="mx-auto w-25 h-25" />
        <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">
          The African Giant
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {[
          {
            name: "Instagram",
            icon: "📷",
            url: "https://instagram.com/burnaboygram",
          },
          {
            name: "Twitter",
            icon: "🐦",
            url: "https://twitter.com/burnaboy",
          },
          {
            name: "Spotify",
            icon: "🎵",
            url: "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa",
          },
          {
            name: "YouTube",
            icon: "📺",
            url: "https://youtube.com/burnaboy",
          },
          {
            name: "TikTok",
            icon: "🎬",
            url: "https://tiktok.com/@burnaboy",
          },
        ].map((social, index) => (
          <a
            key={social.name}
            ref={(el) => (socialRef.current[index] = el)}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-zinc-800 hover:bg-yellow-400 rounded-full flex items-center justify-center text-xl transition-colors duration-300 border border-zinc-700 hover:border-yellow-400"
            title={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>

      <div ref={copyrightRef} className="text-gray-500 text-sm">
        <p>© 2025 Burna Boy. All rights reserved.</p>
        <p>Specially Made for the African Giant</p>
      </div>
    </footer>
  );
};

export default Footer;
