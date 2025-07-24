import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { merchItems } from "../Constant";

gsap.registerPlugin(ScrollTrigger);

const Merch = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const buttonRefs = useRef([]);
  const marqueeTween = useRef(null);

  const duplicatedItems = [...merchItems, ...merchItems];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.set(cardRefs.current, { opacity: 0, y: 100, rotationX: -15 });

      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      marqueeTween.current = gsap.to(scrollRef.current, {
        x: () => -scrollRef.current.scrollWidth / 2,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      cardRefs.current.forEach((card) => {
        if (card) {
          const image = card.querySelector(".merch-image");
          const content = card.querySelector(".card-content");
          const badge = card.querySelector(".badge");

          const onMouseEnter = () => {
            gsap.to(card, {
              scale: 1.08,
              y: -15,
              rotationY: 5,
              boxShadow: "0 25px 50px rgba(255, 215, 0, 0.3)",
              duration: 0.5,
              ease: "power2.out",
            });

            gsap.to(image, {
              scale: 1.1,
              duration: 0.5,
              ease: "power2.out",
            });

            gsap.to(content, {
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            });

            if (badge) {
              gsap.to(badge, {
                scale: 1.1,
                rotate: 5,
                duration: 0.3,
                ease: "back.out(1.7)",
              });
            }
          };

          const onMouseLeave = () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotationY: 0,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(image, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(content, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });

            if (badge) {
              gsap.to(badge, {
                scale: 1,
                rotate: 0,
                duration: 0.3,
                ease: "back.out(1.7)",
              });
            }
          };

          card.addEventListener("mouseenter", onMouseEnter);
          card.addEventListener("mouseleave", onMouseLeave);
        }
      });

      buttonRefs.current.forEach((btn) => {
        if (btn) {
          const onButtonClick = (e) => {
            e.preventDefault();

            const ripple = document.createElement("div");
            ripple.className =
              "absolute inset-0 bg-white opacity-30 rounded-full transform scale-0";
            btn.appendChild(ripple);

            gsap.to(ripple, {
              scale: 2,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => ripple.remove(),
            });

            gsap.fromTo(
              btn,
              { scale: 1 },
              {
                scale: 1.2,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                  const originalText = btn.textContent;
                  btn.textContent = "Added! ✓";
                  btn.style.backgroundColor = "#10b981";

                  setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = "";
                  }, 1500);
                },
              }
            );
          };

          btn.addEventListener("click", onButtonClick);
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (marqueeTween.current) {
        marqueeTween.current.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="merch"
      className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white py-20 overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-16 relative z-10">
        <h2
          ref={titleRef}
          className="text-6xl md:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 drop-shadow-2xl"
        >
          OFFICIAL MERCH
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Represent the African Giant with exclusive merchandise from Burna
          Boy's collection
        </p>
      </div>

      <div className="relative">
        <div className="flex gap-8 w-max will-change-transform" ref={scrollRef}>
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="merch-card relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl min-w-[300px] p-6 cursor-pointer border border-zinc-700/50 shadow-xl"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              {item.bestseller && (
                <div className="badge absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  BESTSELLER
                </div>
              )}
              {item.limited && (
                <div className="badge absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full z-10">
                  LIMITED
                </div>
              )}

              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="merch-image w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="card-content">
                <div className="mb-2">
                  <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white leading-tight">
                  {item.name}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-green-400">
                    {item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {item.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  className="relative w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:from-yellow-300 hover:to-yellow-400 overflow-hidden"
                  ref={(el) => (buttonRefs.current[index] = el)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12 opacity-60">
        <p className="text-sm text-gray-400">
          Continuous scroll • Hover to interact with items
        </p>
      </div>
    </section>
  );
};

export default Merch;
