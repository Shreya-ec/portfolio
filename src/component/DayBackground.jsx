import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export const DayBackground = () => {
  const [rays, setRays] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    generateRays();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = scrollY * 0.002; // control sensitivity

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
    <div
      className="day-sky fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="day-orb day-orb-left" />
      <div className="day-orb day-orb-right" />

      <div ref={containerRef} className="absolute top-0 right-0 w-full h-full">
        <div className="light-source">
          <div className="sun-core" />
          <div className="sun-ring sun-ring-one" />
          <div className="sun-ring sun-ring-two" />
        </div>

        {rays.map((ray) => (
          <div
            key={ray.id}
            className="light-ray-origin"
            style={{
              transform: `rotate(${ray.angle}deg)`,
            }}
          >
            <div
              className="light-ray"
              style={{
                height: ray.length + "vh",
                width: ray.spread + "vw",
                opacity: ray.opacity,
              }}
            />
          </div>
        ))}
      </div>

      <div className="cloud cloud-one">
        <span /><span /><span />
      </div>
      <div className="cloud cloud-two">
        <span /><span /><span />
      </div>
      <div className="cloud cloud-three">
        <span /><span /><span />
      </div>
      <div className="day-haze" />
    </div>
  );
};
