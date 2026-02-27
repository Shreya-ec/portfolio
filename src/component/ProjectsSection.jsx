import { useEffect, useRef } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import gsap from "gsap";
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";

const projects = [
  {
    id: 1,
    title: "Admin Dashboard",
    description: "An employee management system with authentication, advanced filtering, search optimization, and print-ready reporting.",
    image: project1,
    tags: ["React", "javaScript", "TailwindCSS"],
    demoUrl: "https://employee-management-dashboard-snowy.vercel.app/",
    githubUrl: "https://github.com/Shreya-ec/employee-management-dashboard",
  },
  {
    id: 2,
    title: "React Chatflow",
    description:
      "A visual chatbot-flow editor for creating and editing chatbot flows.",
    image: project2,
    tags: ["React", "React Flow", "javaScript"],
    demoUrl: "https://reactchatflo.netlify.app",
    githubUrl: "https://github.com/Shreya-ec/react-flo",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description:
      "A clean and responsive UI clone of the modern, animated, Awwward-winning website: TwoGoodCo.",
    image: project3,
    tags: ["React", "javaScript", "GSAP"],
    demoUrl: "https://awarded-clone-twogood.netlify.app/",
    githubUrl: "https://github.com/Shreya-ec/twogood.co_Clone",
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonRef = useRef(null);

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

            // Animate description
            gsap.fromTo(
              descriptionRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
            );

            // Animate project cards with stagger
            cardsRef.current.forEach((card, index) => {
              if (card) {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 50, scale: 0.9 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: 0.4 + index * 0.15,
                    ease: "back.out(1.7)",
                  }
                );
              }
            });

            // Animate button
            gsap.fromTo(
              buttonRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: "power2.out" }
            );
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
    <section ref={sectionRef} id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
        >
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p
          ref={descriptionRef}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              ref={(el) => (cardsRef.current[key] = el)}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover cursor-pointer"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  scale: 1.01,
                  duration: 0.3,
                  ease: "power2.out",
                });
                const img = e.currentTarget.querySelector('img');
                if (img) {
                  gsap.to(img, {
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
              }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-12">
                  {project.description}
                </p>
                <div className="flex space-x-3 absolute bottom-4 right-4">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            ref={buttonRef}
            className="cosmic-button w-fit flex items-center mx-auto gap-2 group"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Shreya-ec"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out",
              });
              const arrow = e.currentTarget.querySelector('svg');
              if (arrow) {
                gsap.to(arrow, {
                  x: 5,
                  duration: 0.2,
                  ease: "power2.out",
                });
              }
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
              });
              const arrow = e.currentTarget.querySelector('svg');
              if (arrow) {
                gsap.to(arrow, {
                  x: 0,
                  duration: 0.2,
                  ease: "power2.out",
                });
              }
            }}
          >
            Check More on Github <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};