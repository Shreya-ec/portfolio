import { useEffect, useState } from "react";

// id, size, x, y, opacity, animationDuration
// id, size, x, y, delay, animationDuration

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 20000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      // 0 = far, 1 = mid, 2 = near
      const layerRandom = Math.random();
      const layer = layerRandom < 0.45 ? 0 : layerRandom < 0.8 ? 1 : 2;

      // Adjust properties based on depth layer for subtle parallax-like depth
      const baseSize = Math.random() + 1;
      const sizeMultiplier = layer === 0 ? 0.7 : layer === 1 ? 1 : 1.5;
      const size = baseSize * sizeMultiplier;

      const opacity =
        layer === 0
          ? Math.random() * 0.35 + 0.2 // far: softer
          : layer === 1
          ? Math.random() * 0.4 + 0.35 // mid
          : Math.random() * 0.3 + 0.6; // near: a bit brighter

      const animationDuration =
        layer === 0
          ? Math.random() * 5 + 4 // far: slower
          : layer === 1
          ? Math.random() * 4 + 2.5 // mid
          : Math.random() * 3 + 2; // near: a little faster

      newStars.push({
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity,
        animationDuration,
        layer,
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDuration: Math.random() * 3 + 2,
      });
    }

    setMeteors(newMeteors);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            // Subtle depth-based blur and glow variation
            filter:
              star.layer === 0
                ? "blur(1px)"
                : star.layer === 1
                ? "blur(0.5px)"
                : "none",
            boxShadow:
              star.layer === 0
                ? "0 0 6px 1px rgba(255, 255, 255, 0.25)"
                : star.layer === 1
                ? "0 0 10px 2px rgba(255, 255, 255, 0.35)"
                : "0 0 14px 3px rgba(255, 255, 255, 0.5)",
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 50 + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay,
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}
    </div>
  );
};