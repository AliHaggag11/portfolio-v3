'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroOrbit } from "@/components/HeroOrbit";
import memojiImage from "@/assets/images/memoji-computer.png";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import { getSiteSettings } from "@/lib/sanity.api";
import { SiteSettings } from "@/types/sanity";
import { twMerge } from "tailwind-merge";

export const HeroSection = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        console.log('Fetching site settings...');
        const data = await getSiteSettings();
        console.log('Received site settings:', data);
        setSettings(data);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  console.log('Current settings state:', settings);

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 overflow-x-clip pt-20">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${grainImage.src})`,
          }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>
        <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration="60s" shouldSpin spinDuration="15s">
          <StarIcon className="size-28 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="15s">
          <StarIcon className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="45s" shouldSpin spinDuration="15s">
          <StarIcon className="size-8 text-emerald-300" />
        </HeroOrbit>

        <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="35s" shouldSpin spinDuration="8s">
          <SparkleIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="33s" shouldSpin spinDuration="8s">
          <SparkleIcon className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="8s">
          <SparkleIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration="55s" shouldSpin spinDuration="8s">
          <SparkleIcon className="size-14 text-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="58s">
          <div className="size-3 bg-emerald-300/20 rounded-full"></div>
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="42s">
          <div className="size-2 bg-emerald-300/20 rounded-full"></div>
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="50s">
          <div className="size-2 bg-emerald-300/20 rounded-full"></div>
        </HeroOrbit>
      </div>

      <div className="container relative z-20">
        {!isLoading && settings !== null && (
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className={twMerge(
                "backdrop-blur-sm border border-white/10 px-5 py-2 inline-flex items-center gap-4 rounded-full shadow-lg",
                settings.availableForWork ? "bg-gray-800/50" : "bg-gray-800/80"
              )}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className={twMerge(
                "size-2.5 rounded-full relative",
                settings.availableForWork 
                  ? "bg-gradient-to-r from-emerald-300 to-sky-400" 
                  : "bg-gradient-to-r from-orange-300 to-red-400"
              )}>
                <div className={twMerge(
                  "absolute inset-0 rounded-full animate-ping-large",
                  settings.availableForWork 
                    ? "bg-gradient-to-r from-emerald-300 to-sky-400" 
                    : "bg-gradient-to-r from-orange-300 to-red-400"
                )}></div>
              </div>
              <div className="text-sm font-medium text-white/90">
                {settings.availableForWork 
                  ? "Available for new projects"
                  : "Currently working on exciting projects"
                }
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          className="max-w-2xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl text-center tracking-wide bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
            Building Exceptional User Experiences
          </h1>
          <p className="mt-6 text-center text-white/60 text-lg md:text-xl leading-relaxed">
            I specialize in transforming designs into functional, high-performing web applications. Let&apos;s discuss your next project.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col md:flex-row justify-center items-center mt-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.a
            href="#projects"
            className="group relative inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-white/10 px-6 h-12 rounded-full hover:bg-gray-800/70 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium text-white/90 group-hover:text-white">Explore My Work</span>
            <ArrowDown className="size-4 text-white/70 group-hover:text-white transition-colors" />
          </motion.a>

          <motion.a
            href="https://wa.me/201111650444"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-emerald-300 to-sky-400 px-6 h-12 rounded-full hover:opacity-90 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🤝</span>
            <span className="font-medium text-gray-900">Let's Connect</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};
