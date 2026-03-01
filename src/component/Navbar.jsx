import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Stack", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (navRef.current) {
        // Don't hide navbar when mobile menu is open
        if (isMenuOpen) {
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          return;
        }

        // Determine scroll direction
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          // Scrolling down - hide navbar
          gsap.to(navRef.current, {
            y: -100,
            duration: 0.3,
            ease: "power2.out",
          });
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up - show navbar
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Set initial position
    if (navRef.current) {
      gsap.set(navRef.current, { y: 0 });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed w-full z-40 transition-all duration-300 py-3",
        isScrolled ? "bg-background/50 backdrop-blur-md shadow-xs" : ""
      )}
    >

      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-60">
            <span className="text-glow text-foreground"> Shreya's </span>{" "}
            Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8 me-20 xxl:me-0">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* mobile nav */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="p-2 text-foreground z-60"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "fixed top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-md z-50 flex flex-col items-center justify-center",
            "transition-all duration-300 transform",
            isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
          {/* Theme Toggle */}
          <ThemeToggle isNavbar={isMenuOpen} />
        </div>

      </div>
    </nav>
  );
};