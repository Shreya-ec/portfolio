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
import { useState } from "react";
import img from '../assets/working.png';


export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };
  return (
    <section id="contact" className="py-32 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-start">
              Get In <span className="text-primary"> Touch</span>
            </h2>
            <p className="text-start text-muted-foreground mb-12 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out.
              I'm always open to discussing new opportunities.
            </p>
            <div className="w-[200px] h-[200px]">
              <img src={img} alt="Contact" className="w-full h-full object-cover" />
            </div>
            <div className="pt-2 text-start">
              <h4 className="font-medium mb-4"> Connect With Me</h4>
              <div className="flex space-x-4 justify-start">
                <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors">
                  <a href="mailto:ecshreyasaraswat@gmail.com" target="_blank">
                    <Mail />
                  </a>
                </div>
                <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors">
                  <a href="https://www.linkedin.com/in/shreyasaraswat/" target="_blank">
                    <Linkedin />
                  </a>
                </div>
                <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors">
                  <a href="https://github.com/Shreya-ec" target="_blank">
                    <Github />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-card p-10 rounded-lg shadow-xs"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-semibold mb-16"> Send a Message</h3>

            <form className="space-y-6 gap-10">
              <div className="text-start">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Shreya Saraswat"
                />
              </div>

              <div className="text-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="shreya@gmail.com"
                />
              </div>

              <div className="text-start">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 mt-14"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section >
  );
};