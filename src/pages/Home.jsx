import { useState, useEffect } from "react";
import { Navbar } from "../component/Navbar";
import { StarBackground } from "../component/StarBackground";
import { DayBackground } from "../component/DayBackground";
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
        const syncTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        syncTheme();
        const observer = new MutationObserver(syncTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`min-h-screen text-foreground ${isDarkMode ? 'bg-background' : ''}`}>
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