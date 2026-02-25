import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    // <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-end items-center">
    <footer className="relative ">
      <a
        href="#hero"
        className="absolute bottom-10 right-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 hover:scale-110 text-primary transition-colors"
      >
        <ArrowUp size={25} />
      </a>
      <div className="text-center p-5">
        <p className="text-sm text-muted-foreground text-gray-500">
          &copy; {new Date().getFullYear()} Shreya Saraswat. All rights reserved.
        </p>
      </div>
    </footer>
  );
};