import React, { useState } from "react";
import Navbar from "./layouts/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Album from "./sections/Album";
import LoadingScreen from "./components/LoadingScreen";
import Tours from "./sections/Tours";
import Merch from "./sections/Merch";
import Footer from "./layouts/Footer";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [loadingVisible, setLoadingVisible] = useState(true);

  const handleLoadingFinish = () => {
    setTimeout(() => {
      setLoadingVisible(false);
    }, 500);
  };

  return (
    <>
      {loadingVisible && <LoadingScreen onFinish={handleLoadingFinish} />}
      {!loadingVisible && (
        <div
          className="bg-black relative opacity-0 transition-opacity duration-700"
          style={{ opacity: loadingVisible ? 0 : 1 }}
        >
          <div className="relative min-h-screen w-full bg-cover bg-center bg-[url('/hero.jpg')]">
            <Navbar triggerAnimation={!loadingVisible} />
            <Hero triggerAnimation={!loadingVisible} />
          </div>
          <About />
          <Album />
          <Tours />
          <Merch />
          <Footer />
          <MusicPlayer />
        </div>
      )}
    </>
  );
}

export default App;
