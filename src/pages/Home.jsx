import { useState, useEffect } from "react";
import { Navbar } from "../component/Navbar";
import { StarBackground } from "../component/StarBackground";
import { DayBackground } from "../component/DayBackground";
import { ThemeToggle } from "../component/ThemeToggle";
import { HeroSection } from "../component/HeroSection";
import { AboutSection } from "../component/AboutSection";
import { SkillsSection } from "../component/SkillsSection";
import { ProjectsSection } from "../component/ProjectsSection";
import { ContactSection } from "../component/ContactSection";
import { Footer } from "../component/Footer";

export const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.documentElement.classList.contains('dark');
    });

    useEffect(() => {
        const checkTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        
        checkTheme();
        // Check periodically for theme changes
        const interval = setInterval(checkTheme, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`min-h-screen text-foreground overflow-x-hidden ${isDarkMode ? 'bg-background' : ''}`}>
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Background Effect */}
           {isDarkMode ? <StarBackground /> : <DayBackground />}
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <main>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            {/* Footer */}
            <Footer />
        </div>
    );
}