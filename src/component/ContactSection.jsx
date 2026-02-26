import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";


export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialRef = useRef(null);
  const formRef = useRef(null);
  const formTitleRef = useRef(null);
  const formFieldsRef = useRef([]);
  const submitButtonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Animate button on submit
    if (submitButtonRef.current) {
      gsap.to(submitButtonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

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
              const socialLinks = socialRef.current.querySelectorAll('a');
              gsap.fromTo(
                socialLinks,
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
          <div className="space-y-6">
            <p 
              ref={descriptionRef}
              className="text-center md:text-left text-muted-foreground max-w-xl mx-auto md:mx-0 text-lg leading-relaxed"
            >
              I’d love to hear about your ideas, projects, or challenges and explore how we can build something impactful together.
            </p>
            <div className="bg-card p-6 rounded-xl shadow-md max-w-md w-full mx-auto md:ml-auto border border-border/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-start">
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-1">
                Email
              </p>
              <a
                href="mailto:ecshreyasaraswat@gmail.com"
                className="inline-flex items-center justify-center text-lg md:text-xl font-semibold text-primary underline-offset-4 hover:underline"
              >
                ecshreyasaraswat@gmail.com
              </a>
            </div>
          
            <div className="text-center opacity-0 animate-fade-in-delay-2 mt-15">
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

            <form className="space-y-6 gap-6" onSubmit={handleSubmit}>
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
                  placeholder="Shreya Saraswat"
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
                  placeholder="shreya@gmail.com"
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
                disabled={isSubmitting}
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
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} className={isSubmitting ? "animate-spin" : ""} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section >
  );
};