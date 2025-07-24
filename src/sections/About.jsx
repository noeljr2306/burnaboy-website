import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const divRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const elements = document.querySelectorAll(".fade-text");
    elements.forEach((element) => {
      const text = new SplitType(element, { types: "chars" });

      const scrollConfig = {
        trigger: element,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        toggleActions: "play play reverse reverse",
      };

      gsap.fromTo(
        text.chars,
        { opacity: 0.4 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: scrollConfig,
        }
      );

      gsap.fromTo(
        element.querySelectorAll("span.char"),
        { color: "#000000" },
        {
          color: "#ff0000",
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: scrollConfig,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const elements = containerRef.current.children;

    
    gsap.set(elements, {
      y: 50,
      opacity: 0,
    });


    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    gsap.from(divRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="about-section px-6 py-16 max-w-6xl mx-auto text-yellow-400"
    >
      <div ref={divRef} className="mb-12">
        <h2 className="sm:text-7xl text-3xl font-bold mb-4">
          Damini “Burna Boy” Ebunoluwa Ogulu
        </h2>
        <p className="text-lg">
          <strong>Born July 2, 1991 — Port Harcourt, Nigeria</strong>
        </p>
        <p className="mb-4 text-lg">
          Grammy-winning icon widely celebrated as the{" "}
          <strong>African Giant</strong>.
        </p>
      </div>
      <p className="fade-text mb-8 sm:text-4xl  font-bold sm:leading-15">
        Burna Boy champions a genre he calls <strong>Afrofusion</strong>—a
        genre-bending blend of Afrobeat, reggae, dancehall, hip‑hop, R&amp;B,
        and pop. He created it because he refused to be boxed into a single
        sound, choosing instead to fuse cultures, rhythms, and traditions into
        something distinctively his own.
      </p>
      <blockquote className="italic border-l-4 border-white pl-4 mb-4 sm:text-xl">
        “All genres of music from Africa shouldn’t be labelled as Afrobeats,”
        Burna once said, critiquing how broad labeling often erases the
        continent’s sonic diversity. For him, <strong>Afrofusion</strong> is{" "}
        <em>“the bottle that holds the whole drink.”</em>
      </blockquote>
    </section>
  );
};

export default About;
