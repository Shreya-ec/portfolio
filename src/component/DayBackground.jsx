import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export const DayBackground = () => {
  const [rays, setRays] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    generateRays();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = scrollY * 0.01; // control sensitivity

      gsap.to(containerRef.current, {
        rotation: rotation,
        transformOrigin: "100% 0%",
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generateRays = () => {
    const numberOfRays = 7;
    const newRays = [];

    for (let i = 0; i < numberOfRays; i++) {
      newRays.push({
        id: i,
        angle: Math.random() * 80,
        length: Math.random() * 120 + 120,
        spread: Math.random() * 8 + 6,
        opacity: Math.random() * 0.3 + 0.4
      });
    }

    setRays(newRays);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div ref={containerRef} className="absolute top-0 right-0 w-full h-full">
        <div className="light-source"></div>

        {rays.map((ray) => (
          <div
            key={ray.id}
            className="light-ray"
            style={{
              height: ray.length + "vh",
              width: ray.spread + "vw",
              transform: `rotate(${ray.angle}deg)`,
              opacity: ray.opacity
            }}
          />
        ))}
      </div>
    </div>
  );
};
