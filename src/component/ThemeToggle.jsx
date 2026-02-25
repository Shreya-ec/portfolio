import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayIcon, setDisplayIcon] = useState('sun'); // Track displayed icon
    const toggleRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setIsDarkMode(true);
            setDisplayIcon('moon');
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            setDisplayIcon('sun');
            document.documentElement.classList.add("light");
        }
    }, [])

    const toggleTheme = () => {
        if (isAnimating) return; // Prevent multiple clicks during animation
        
        setIsAnimating(true);
        const newIsDarkMode = !isDarkMode;
        const targetX = newIsDarkMode ? 24 : 0; // 28px = translate-x-7 (7 * 4px = 28px)

        // Create timeline for smooth animation
        const tl = gsap.timeline({
            onComplete: () => {
                // Update state and theme after animation completes
                setIsDarkMode(newIsDarkMode);
                setIsAnimating(false);
                if (newIsDarkMode) {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                } else {
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("theme", "light");
                }
            }
        });

        // Animate translation and rotation simultaneously
        tl.to(toggleRef.current, {
            x: targetX,
            rotation: "+=360",
            duration: 0.6,
            ease: "power2.inOut"
        }, 0);

        // Fade out current icon
        tl.to(iconRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            ease: "power2.in"
        }, 0);

        // Change icon mid-animation (at the midpoint)
        tl.call(() => {
            setDisplayIcon(newIsDarkMode ? 'moon' : 'sun');
        }, null, 0.3);

        // Fade in new icon
        tl.to(iconRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        }, 0.3);
    };

    return (
        <button onClick={toggleTheme} className={cn(`max-md:hidden w-13 h-7 flex items-center ${isDarkMode ? 'outline-white-900 bg-violet-600/80' : 'outline-blue-500 bg-blue-200'} fixed max-sm:hidden top-3 right-5 z-50 p-1 rounded-full transition-colors duration-300`
        )}>
            <div
                ref={toggleRef}
                className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                style={{ transform: `translateX(${isDarkMode ? 24 : 0}px)` }}
            >
                <div ref={iconRef}>
                    {displayIcon === 'moon' ? (
                        <Moon className="h-4 w-4 text-blue-800" />
                    ) : (
                        <Sun className="h-4 w-4 text-orange-500" />
                    )}
                </div>
            </div>
        </button>
    )
}
