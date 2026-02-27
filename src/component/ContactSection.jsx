import {
  Github,
  Linkedin,
  LocateIcon,
  Mail,
  Map,
  MapPin,
  Pin,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useForm } from '@formspree/react';


export const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialRef = useRef(null);
  const formRef = useRef(null);
  const formTitleRef = useRef(null);
  const formFieldsRef = useRef([]);
  const submitButtonRef = useRef(null);
  const [state, handleSubmit] = useForm("xbdawkpv");
  const refreshForm = useRef(null);

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

            // Animate social links
            if (socialRef.current) {
              const links = socialRef.current.querySelectorAll(".social-link");
              const details = sectionRef.current.querySelectorAll(".mapPin");

              const elements = [...links, ...details];
              gsap.fromTo(
                elements,
                { opacity: 0, scale: 0.8, y: 20 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.1,
                  delay: 0.6,
                  ease: "back.out(1.7)",
                }
              );
            }

            // Animate form
            gsap.fromTo(
              formRef.current,
              { opacity: 0, x: 30 },
              { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
            );

            // Animate form title
            gsap.fromTo(
              formTitleRef.current,
              { opacity: 0, y: -10 },
              { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out" }
            );

            // Animate form fields
            formFieldsRef.current.forEach((field, index) => {
              if (field) {
                gsap.fromTo(
                  field,
                  { opacity: 0, y: 20 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.7 + index * 0.1,
                    ease: "power2.out",
                  }
                );
              }
            });

            // Animate submit button
            gsap.fromTo(
              submitButtonRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, delay: 1.1, ease: "power2.out" }
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

  useEffect(() => {
    if (state?.succeeded) {
      refreshForm.current?.reset();
      setIsSubmitted(true);


      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

  }, [state?.succeeded]);

  return (
    <section ref={sectionRef} id="contact" className="py-22 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
        >
          Get In <span className="text-primary">Touch</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: headline, sentence, email, socials */}
          <div className="space-y-20">
            <p
              ref={descriptionRef}
              className="text-center text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed mt-10"
            >
              I’d love to hear about your ideas, projects, or challenges and explore how we can build something impactful together.
            </p>
            <div className="text-center opacity-0 animate-fade-in-delay-2">
              <h4 className="font-medium mb-2">Connect With Me</h4>
              <div
                ref={socialRef}
                className="flex justify-center gap-6"
              >
                <div
                  className="p-3 rounded-full bg-primary/10 text-primary transition-all duration-300
                           hover:bg-primary/20 hover:scale-110 hover:shadow-[0_0_18px_rgba(124,58,237,0.45)] cursor-pointer group"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      rotation: 360,
                      duration: 0.5,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      rotation: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                >
                  <a href="mailto:ecshreyasaraswat@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
                <div
                  className="p-3 rounded-full bg-primary/10 text-primary transition-all duration-300
                           hover:bg-primary/20 hover:scale-110 hover:shadow-[0_0_18px_rgba(124,58,237,0.45)] cursor-pointer group"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      rotation: 360,
                      duration: 0.5,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      rotation: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                >
                  <a href="https://www.linkedin.com/in/shreyasaraswat/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
                <div
                  className="p-3 rounded-full bg-primary/10 text-primary transition-all duration-300
                           hover:bg-primary/20 hover:scale-110 hover:shadow-[0_0_18px_rgba(124,58,237,0.45)] cursor-pointer group"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      rotation: 360,
                      duration: 0.5,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      rotation: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                >
                  <a href="https://github.com/Shreya-ec" target="_blank" rel="noopener noreferrer">
                    <Github className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className="relative flex items-center"
                onMouseEnter={(e) => {
                  const wrapper = e.currentTarget;
                  const text = wrapper.querySelector(".detail");

                  // Make visible first
                  gsap.set(text, { display: "block" });

                  // Animate in
                  gsap.fromTo(
                    text,
                    { opacity: 0, x: 10 },
                    { opacity: 1, x: 0, duration: 0.4, ease: "power2.in" }
                  );

                  gsap.to(wrapper, {
                    x: -20,
                    duration: 0.4,
                    ease: "power2.in",
                  });
                }}
                // onMouseLeave={(e) => {
                //   const wrapper = e.currentTarget;
                //   const text = wrapper.querySelector(".detail");

                //   gsap.to(text, {
                //     opacity: 0,
                //     x: 10,
                //     duration: 0.3,
                //     onComplete: () => {
                //       gsap.set(text, { display: "none" });
                //     },
                //   });

                //   gsap.to(wrapper, {
                //     x: 0,
                //     duration: 0.3,
                //   });
                // }}
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary cursor-pointer mapPin">
                  <MapPin />
                </div>

                <p className="detail ml-4 whitespace-nowrap hidden text-muted-foreground text-lg">
                  Gurugram, India
                </p>
              </div>
            </div>

          </div>

          {/* Right: compact form card */}
          <div
            ref={formRef}
            className="bg-card p-6 rounded-xl shadow-md max-w-md w-full mx-auto md:ml-auto border border-border/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <h3
              ref={formTitleRef}
              className="text-2xl font-semibold mb-6"
            >
              Send a Message
            </h3>

            <form className="space-y-6 gap-6" onSubmit={handleSubmit} ref={refreshForm}>
              <div
                ref={(el) => (formFieldsRef.current[0] = el)}
                className="text-start"
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background 
                           focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  placeholder="Hi..."
                  onFocus={(e) => {
                    gsap.to(e.target, {
                      scale: 1.02,
                      duration: 0.2,
                      ease: "power2.out",
                    });
                  }}
                  onBlur={(e) => {
                    gsap.to(e.target, {
                      scale: 1,
                      duration: 0.2,
                      ease: "power2.out",
                    });
                  }}
                />
              </div>

              <div
                ref={(el) => (formFieldsRef.current[1] = el)}
                className="text-start"
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background 
                           focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  placeholder="I reach you at..."
                  onFocus={(e) => {
                    gsap.to(e.target, {
                      scale: 1.02,
                      duration: 0.2,
                      ease: "power2.out",
                    });
                  }}
                  onBlur={(e) => {
                    gsap.to(e.target, {
                      scale: 1,
                      duration: 0.2,
                      ease: "power2.out",
                    });
                  }}
                />
              </div>

              <div
                ref={(el) => (formFieldsRef.current[2] = el)}
                className="text-start"
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background 
                           focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all duration-300"
                  placeholder="Hello, I'd like to talk about..."
                  onFocus={(e) => {
                    gsap.to(e.target, {
                      scale: 1.02,
                      duration: 0.2,
                      ease: "power2.out",
                    });
                  }}
                  onBlur={(e) => {
                    gsap.to(e.target, {
                      scale: 1,
                      duration: 0.2,
                      ease: "power2.out",
                    });
                  }}
                />
              </div>

              <button
                ref={submitButtonRef}
                type="submit"
                disabled={state.submitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 mt-7"
                )}
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
                {state?.submitting ? "Sending..." : "Send Message"}

                <Send size={16} className={state?.submitting ? "animate-spin" : ""} />
              </button>
              {state?.errors?.map((error) => (
                <div className=" bg-primary/20 rounded-md border border-primary/20 p-2 text-center">
                  <p key={error.id} className="text-red-500">
                    {error.message}
                  </p>
                </div>
              ))}
              {isSubmitted && <div className=" bg-primary/20 rounded-md border border-primary/20 p-2 text-center"><p className="text-sm text-muted-foreground">Thank you for your message. I'll get back to you soon!</p></div>}
            </form>
          </div>
        </div>

      </div>
    </section >
  );
};