'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowUp } from '@tabler/icons-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if we're on client side
    if (typeof window === 'undefined') return;

    // Check if we're on desktop and handle window resize
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px is Tailwind's md breakpoint
    };

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial checks
    checkIsDesktop();
    toggleVisibility();

    // Add event listeners
    window.addEventListener('resize', checkIsDesktop);
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsDesktop);
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Only render on client side and desktop
  if (typeof window === 'undefined' || !isDesktop) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 size-12 rounded-xl bg-gradient-to-br from-emerald-300/10 to-sky-400/10 hover:from-emerald-300/20 hover:to-sky-400/20 backdrop-blur-sm border border-white/5 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300 shadow-lg hidden md:flex"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <IconArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}; 