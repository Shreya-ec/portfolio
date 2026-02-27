import { useEffect, useRef } from "react";
import { Briefcase, Code, Smartphone, Sparkles, Download, Mail } from "lucide-react";
import gsap from "gsap";

const expertise = [
  {
    icon: Code,
    title: "Web Development",
    description: "Building responsive and performant web applications",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Creating cross-platform mobile experiences",
  },
  {
    icon: Sparkles,
    title: "Clean UI",
    description: "Designing intuitive and beautiful interfaces",
  },
  {
    icon: Briefcase,
    title: "Project Management",
    description: "Leading projects from concept to deployment",
  },
];

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            gsap.fromTo(
              titleRef.current,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );

            // Animate content paragraphs
            const paragraphs = contentRef.current?.querySelectorAll("p");
            if (paragraphs) {
              gsap.fromTo(
                paragraphs,
                { opacity: 0, x: -20 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.6,
                  stagger: 0.2,
                  delay: 0.2,
                  ease: "power2.out",
                }
              );
            }

            // Animate buttons
            if (buttonsRef.current.length > 0) {
              gsap.fromTo(
                buttonsRef.current,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  delay: 0.6,
                  ease: "power2.out",
                }
              );
            }

            // Animate expertise cards
            cardsRef.current.forEach((card, index) => {
              if (card) {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 30, scale: 0.95 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    ease: "power2.out",
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

  return (
    <section ref={sectionRef} id="about" className="py-24 px-4 min-h-screen relative">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
        >
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="space-y-5">
              <p className="text-lg text-muted-foreground leading-relaxed">
                With about <span className="text-primary font-semibold">2+ years</span> of experience in web development, I specialize
                in creating responsive, accessible, and performant web
                applications using modern technologies.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm passionate about creating elegant solutions to complex
                problems. I mostly work with <span className="text-primary font-semibold">React</span>, but I'm always experimenting, 
                learning, and pushing my creative and technical limits. Right now, 
                I'm exploring fullstack development and building products that are as smart as they are beautiful.
              </p>
            </div>

            <div className="flex flex-col justify-center sm:flex-row gap-4 pt-6">
              <a 
                ref={(el) => (buttonsRef.current[0] = el)}
                href="#contact" 
                className="cosmic-button flex items-center justify-center gap-2 group"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out",
                  });
                }}
              >
                <Mail className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Get In Touch
              </a>

              <a
                ref={(el) => (buttonsRef.current[1] = el)}
                href="/Shreya_Saraswat_Resume_2026.pdf"
                download
                className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 
                         transition-all duration-300 flex items-center justify-center gap-2 group"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out",
                  });
                }}
              >
                <Download className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
                Download CV
              </a>
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid grid-cols-1 gap-4">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="gradient-border p-6 card-hover group relative overflow-hidden
                           transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -5,
                      scale: 1.02,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                    const icon = e.currentTarget.querySelector('.icon-wrapper');
                    if (icon) {
                      gsap.to(icon, {
                        rotation: 360,
                        scale: 1.1,
                        duration: 0.5,
                        ease: "power2.out",
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      scale: 1,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                    const icon = e.currentTarget.querySelector('.icon-wrapper');
                    if (icon) {
                      gsap.to(icon, {
                        rotation: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    }
                  }}
                >
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="icon-wrapper p-3 rounded-full bg-primary/10 
                                  group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1 group-hover:text-primary 
                                   transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};