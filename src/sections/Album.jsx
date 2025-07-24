import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { albums } from "../Constant";
gsap.registerPlugin(ScrollTrigger);

const Album = () => {
  const containerRef = useRef(null);
  const playButtonsRef = useRef([]);
  const albumInfoRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const albumItems = container.querySelectorAll(".album-item");

    gsap.to(albumItems, {
      xPercent: -100 * (albumItems.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => "+=" + container.offsetWidth,
        invalidateOnRefresh: true,
      },
    });

    albumItems.forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: i * 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.set(albumInfoRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.95,
    });

    const albumMouseEnterHandlers = [];
    const albumMouseLeaveHandlers = [];
    albumItems.forEach((item, index) => {
      const onMouseEnter = () => {
        gsap.to(item, {
          scale: 1.05,
          y: -5,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(albumInfoRef.current[index], {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          pointerEvents: "auto",
        });
      };

      const onMouseLeave = () => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(albumInfoRef.current[index], {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in",
          pointerEvents: "none",
        });
      };

      albumMouseEnterHandlers[index] = onMouseEnter;
      albumMouseLeaveHandlers[index] = onMouseLeave;
      item.addEventListener("mouseenter", onMouseEnter);
      item.addEventListener("mouseleave", onMouseLeave);
    });

    const playMouseEnterHandlers = [];
    const playMouseLeaveHandlers = [];
    playButtonsRef.current.forEach((btn, index) => {
      const onMouseEnter = () => {
        gsap.to(btn, {
          scale: 1.3,
          rotation: 360,
          duration: 0.6,
          ease: "power2.inOut",
        });
      };
      const onMouseLeave = () => {
        gsap.to(btn, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
      };
      playMouseEnterHandlers[index] = onMouseEnter;
      playMouseLeaveHandlers[index] = onMouseLeave;
      btn.addEventListener("mouseenter", onMouseEnter);
      btn.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      albumItems.forEach((item, index) => {
        if (item) {
          item.removeEventListener(
            "mouseenter",
            albumMouseEnterHandlers[index]
          );
          item.removeEventListener(
            "mouseleave",
            albumMouseLeaveHandlers[index]
          );
        }
      });
      playButtonsRef.current.forEach((btn, index) => {
        if (btn) {
          btn.removeEventListener("mouseenter", playMouseEnterHandlers[index]);
          btn.removeEventListener("mouseleave", playMouseLeaveHandlers[index]);
        }
      });
    };
  }, []);

  return (
    <section
      id="album"
      className="w-full h-screen overflow-x-hidden py-8 text-white bg-zinc-800"
      ref={containerRef}
    >
      <h2 className="text-center text-7xl font-bold mb-12 text-yellow-400">
        Albums
      </h2>
      <div className="flex gap-8 cursor-grab select-none pl-8 will-change-transform">
        {albums.map((album, index) => (
          <a
            key={album.id}
            href={album.url}
            className="album-item relative flex flex-col items-center flex-shrink-0 w-[600px] rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative w-full h-[500px] rounded-t-lg overflow-hidden">
              <img
                src={album.image}
                alt={album.title}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none select-none"
              />

              <div
                className="album-info absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 pointer-events-none"
                ref={(el) => (albumInfoRef.current[index] = el)}
              >
                <div className="text-content">
                  <h3 className="text-2xl font-bold mb-2 text-yellow-400 drop-shadow-lg">
                    {album.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-1 drop-shadow">
                    Released: {album.year}
                  </p>
                  <p className="text-sm text-gray-200 mb-3 drop-shadow">
                    {album.tracks} Tracks • {album.genre}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-yellow-400 font-medium">
                      {album.streams} Streams
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="play-button absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer select-none transition-colors duration-300 hover:bg-white/90 z-10"
                ref={(el) => (playButtonsRef.current[index] = el)}
                aria-label={`Play ${album.title}`}
              >
                <div className="play-icon w-0 h-0 border-l-[14px] border-l-gray-900 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Album;
