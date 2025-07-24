import React, { useEffect, useState } from "react";

const LoadingScreen = ({ onFinish }) => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
      if (onFinish) onFinish();
    }, 7000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 h-[70vh] flex flex-col items-center justify-center bg-black z-50 transition-opacity duration-700 ${
        loadingComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src="/logo.png"
        alt="Burna Boy Logo"
        className="w-48 h-auto mt-10"
      />
      <div className="w-64 h-1 bg-yellow-400 overflow-hidden relative rounded mt-4">
        <div className="absolute top-0 left-0 h-1 bg-yellow-200 animate-loading-bar"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
