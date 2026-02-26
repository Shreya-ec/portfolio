import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

export const HeroSection = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const indicatorRef = useRef(null);
  const heroSectionRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Set initial position
    if (indicatorRef.current) {
      gsap.set(indicatorRef.current, { y: 0, opacity: 1 });
    }
  }, []);

  useEffect(() => {
    // Add bounce animation for arrow when indicator is visible
    if (showScrollIndicator && indicatorRef.current) {
      const arrow = indicatorRef.current.querySelector('svg');
      if (arrow) {
        // Kill any existing animation first
        gsap.killTweensOf(arrow);
        gsap.set(arrow, { y: 0 });
        gsap.to(arrow, {
          y: 8,
          duration: 1,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }
  }, [showScrollIndicator]);

  useEffect(() => {
    const handleScroll = () => {
      if (indicatorRef.current && heroSectionRef.current) {
        const currentScrollY = window.scrollY;
        const heroSection = heroSectionRef.current;
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;
        const heroBottom = heroTop + heroHeight;
        
        // Check if we're in the hero section
        const isInHeroSection = currentScrollY >= heroTop && currentScrollY < heroBottom;
        
        // Check scroll direction
        const isScrollingUp = currentScrollY < lastScrollY.current;
        
        if (isInHeroSection && (isScrollingUp || currentScrollY < 50)) {
          // Show indicator when in hero section and scrolling up or at top
          if (!showScrollIndicator) {
            setShowScrollIndicator(true);
            // Reset position before animating
            gsap.set(indicatorRef.current, { y: -50, opacity: 0 });
          }
          gsap.to(indicatorRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          // Hide indicator when scrolling down or outside hero section
          if (showScrollIndicator) {
            gsap.to(indicatorRef.current, {
              y: -50,
              opacity: 0,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                setShowScrollIndicator(false);
              },
            });
          }
        }
        
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScrollIndicator]);

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in heading"> Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1 heading">
              {" "}
              Shreya
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2 heading">
              {" "}
              Saraswat
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            A creative frontend developer building intuitive, responsive, and impactful web experiences with React and beyond.
          </p>
          <em className="block my-2 text-lg md:text-xl text-gray-500 max-2-2xl mx-auto opacity-0 animate-fade-in-delay-4">- "Build it fast. Make it smart. Keep it beautiful."</em>

          <div className="pt-5 opacity-0 animate-fade-in-delay-5">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      {showScrollIndicator && (
        <div
          ref={indicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>
      )}
    </section>
  );
};