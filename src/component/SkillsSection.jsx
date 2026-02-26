import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiReact, 
  SiBootstrap, 
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiFigma,
  SiGitlab,
  SiPostman,
  SiVercel,
  SiNetlify,
  
} from "react-icons/si";

const skills = [
  // Frontend
  { name: "HTML", icon: SiHtml5, category: "frontend" },
  { name: "CSS", icon: SiCss3, category: "frontend" },
  { name: "JavaScript", icon: SiJavascript, category: "frontend" },
  { name: "React", icon: SiReact, category: "frontend" },
  { name: "React Native", icon: SiReact, category: "frontend" },
  { name: "Bootstrap", icon: SiBootstrap, category: "frontend" },
  { name: "React Bootstrap", icon: SiBootstrap, category: "frontend" },
  { name: "Material UI", icon: null, category: "frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend" },
  { name: "GSAP", icon: null, category: "frontend" },

  // Tools
  { name: "Git", icon: SiGit, category: "tools" },
  { name: "GitHub", icon: SiGithub, category: "tools" },
  { name: "GitLab", icon: SiGitlab, category: "tools" },
  { name: "Postman", icon: SiPostman, category: "tools" },
  { name: "Figma", icon: SiFigma, category: "tools" },
  { name: "ChatGPT", icon: null, category: "tools" },
  { name: "VS Code", icon: null, category: "tools" },
  { name: "Cursor", icon: null, category: "tools" },
  { name: "Vercel", icon: SiVercel, category: "hosting" },
  { name: "Netlify", icon: SiNetlify, category: "hosting" },
];

const categories = ["all", "frontend", "tools", "hosting"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef([]);
  const cardsRef = useRef([]);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Initial scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            gsap.fromTo(
              titleRef.current,
              { opacity: 0, y: -30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );

            // Animate category buttons
            buttonsRef.current.forEach((btn, index) => {
              if (btn) {
                gsap.fromTo(
                  btn,
                  { opacity: 0, scale: 0.8 },
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                    ease: "back.out(1.7)",
                  }
                );
              }
            });

            // Animate cards
            cardsRef.current.forEach((card, index) => {
              if (card) {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 30, scale: 0.9 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: 0.4 + index * 0.05,
                    ease: "back.out(1.7)",
                  }
                );
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate cards when category changes
  useEffect(() => {
    // Reset refs array
    cardsRef.current = [];
    
    // Use setTimeout to ensure DOM is updated
    setTimeout(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.8, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.03,
              ease: "back.out(1.7)",
            }
          );
        }
      });
    }, 10);
  }, [activeCategory, filteredSkills]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <section ref={sectionRef} id="stack" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          My <span className="text-primary heading">Tech Stack</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              ref={(el) => (buttonsRef.current[key] = el)}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 capitalize cursor-pointer",
                activeCategory === category
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-secondary/70 text-forefround hover:bg-secondary hover:scale-105"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => {
            const Icon = skill.icon;
            const Icons = Array.isArray(skill.icon) ? skill.icon : null;
            
            return (
              <div
                key={`${skill.name}-${key}`}
                ref={(el) => (cardsRef.current[key] = el)}
                className="bg-card p-6 rounded-lg shadow-xs card-hover flex items-center gap-4 cursor-pointer"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                  const iconContainer = e.currentTarget.querySelector('.icon-container');
                  if (iconContainer) {
                    gsap.to(iconContainer, {
                      rotation: 360,
                      duration: 0.6,
                      ease: "power2.out",
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                  const iconContainer = e.currentTarget.querySelector('.icon-container');
                  if (iconContainer) {
                    gsap.to(iconContainer, {
                      rotation: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                }}
              >
                {Icons ? (
                  <div className="flex items-center gap-2 icon-container">
                    {Icons.map((IconComponent, idx) => (
                      <IconComponent key={idx} className="h-6 w-6 text-primary" />
                    ))}
                  </div>
                ) : Icon ? (
                  <div className="p-3 rounded-full bg-primary/10 icon-container">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                ) : null}
                <h3 className="font-semibold text-lg text-center">{skill.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};