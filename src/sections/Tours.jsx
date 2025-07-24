import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tourDates } from "../Constant";

gsap.registerPlugin(ScrollTrigger);

const Tours = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tourCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.set(tourCardsRef.current, { opacity: 0, y: 80, rotationX: -15 });

      gsap.to(tourCardsRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tour-cards-container",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tourCardsRef.current.forEach((card) => {
        if (card) {
          const onMouseEnter = () => {
            gsap.to(card, {
              scale: 1.03,
              y: -10,
              rotationY: 5,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const onMouseLeave = () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotationY: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseenter", onMouseEnter);
          card.addEventListener("mouseleave", onMouseLeave);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: date.getDate(),
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "sold-out":
        return "text-red-400 border-red-400";
      case "few-left":
        return "text-yellow-400 border-yellow-400";
      default:
        return "text-green-400 border-green-400";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "sold-out":
        return "SOLD OUT";
      case "few-left":
        return "FEW LEFT";
      default:
        return "AVAILABLE";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="tour"
      className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white py-16 px-4"
    >
      <div className="text-center mb-16">
        <h2
          ref={titleRef}
          className="text-7xl md:text-9xl font-black mb-4 text-yellow-400 drop-shadow-2xl"
        >
          NO SIGN OF WEAKNESS TOUR
        </h2>
        <p className="text-xl text-gray-300">
          The African Giant Live Around The Globe
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12">
        <h1 className="text-4xl mb-8 text-center">Upcoming Events</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourDates.map((show) => {
            const { month, day } = formatDate(show.date);
            return (
              <div
                key={show.id}
                className="flex flex-col p-4 bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-700/50"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 text-black rounded-full flex flex-col items-center justify-center font-bold mb-4">
                  <span className="text-xs">{month}</span>
                  <span className="text-lg">{day}</span>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-1">
                    {show.city}, {show.country}
                  </h4>
                  <p className="text-gray-400 mb-2">{show.venue}</p>
                </div>

                <div
                  className={`px-3 py-1 border rounded-full text-xs font-bold w-max ${getStatusColor(
                    show.status
                  )}`}
                >
                  {getStatusText(show.status)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="tour-cards-container max-w-7xl mx-auto mt-16">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Get Your Tickets
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourDates.map((show, index) => {
            const { month, day } = formatDate(show.date);
            return (
              <div
                key={show.id}
                ref={(el) => (tourCardsRef.current[index] = el)}
                className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-6 border border-zinc-700/50 cursor-pointer hover:border-yellow-400/50 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-yellow-400">
                    <div className="text-2xl font-bold">{day}</div>
                    <div className="text-sm">{month}</div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(
                      show.status
                    )}`}
                  >
                    {getStatusText(show.status)}
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-1">{show.city}</h4>
                <p className="text-gray-400 text-sm mb-3">{show.venue}</p>

                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    show.status === "sold-out"
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-105"
                  }`}
                  disabled={show.status === "sold-out"}
                >
                  {show.status === "sold-out" ? "SOLD OUT" : "GET TICKETS"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tours;
