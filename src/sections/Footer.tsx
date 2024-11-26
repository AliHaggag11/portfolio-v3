'use client';

import { motion } from "framer-motion";
import { 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconBrandTwitter, 
  IconMail, 
  IconPhone,
  IconArrowUpRight,
  IconDownload
} from '@tabler/icons-react';
import { getCV } from '@/lib/sanity.api';
import { CV } from "@/types/sanity";
import { useState, useEffect } from 'react';

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/alihaggag11",
    icon: IconBrandGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ali-haggag/",
    icon: IconBrandLinkedin,
  },
  // {
  //   name: "Twitter",
  //   url: "https://twitter.com/yourhandle",
  //   icon: IconBrandTwitter,
  // },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Careers", href: "#careers" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const [cv, setCV] = useState<CV | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const data = await getCV();
        console.log('CV data:', data);
        setCV(data);
      } catch (error) {
        console.error('Error fetching CV:', error);
      }
    };

    fetchCV();
  }, []);

  return (
    <footer className="relative mt-12">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(16,185,129,0.15),transparent)]"></div>

      <div className="relative container">
        {/* CV Download Section */}
        {cv && (
          <motion.div
            className="mb-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={cv.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-br from-emerald-300/10 to-sky-400/10 hover:from-emerald-300/20 hover:to-sky-400/20 backdrop-blur-sm border border-white/5 px-8 py-4 rounded-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconDownload size={24} className="text-emerald-300 group-hover:scale-110 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Download My CV
                </span>
                <span className="text-sm text-white/40">
                  Last updated: {new Date(cv.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </motion.a>
          </motion.div>
        )}

        {/* Top wave decoration */}
        <div className="absolute left-0 right-0 -top-24 h-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-300/20 via-transparent to-transparent blur-2xl"></div>

        <div className="relative pt-24 pb-12">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand Section */}
            <motion.div 
              className="md:col-span-5 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Ali Haggag
              </h3>
              <p className="text-sm text-white/60 max-w-md">
                Building exceptional digital experiences with a focus on performance and user satisfaction.
              </p>
              <div className="pt-4 flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-10 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/5 flex items-center justify-center text-white/40 hover:text-white/70 transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={link.name}
                    >
                      <Icon size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="md:col-span-3 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a 
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/70 transition-all duration-300 inline-flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="size-1 rounded-full bg-emerald-300/50 group-hover:bg-emerald-300 transition-colors duration-300"></span>
                      <span>{link.name}</span>
                      <IconArrowUpRight 
                        size={14} 
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                      />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="md:col-span-4 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Get in Touch
              </h3>
              <div className="space-y-3">
                <a 
                  href="mailto:your@email.com" 
                  className="text-sm text-white/40 hover:text-white/70 transition-all duration-300 flex items-center gap-2 group"
                >
                  <IconMail size={16} className="group-hover:text-emerald-300 transition-colors duration-300" />
                  <span>ali7aggag@gmail.com</span>
                </a>
                <a 
                  href="tel:+201111650444" 
                  className="text-sm text-white/40 hover:text-white/70 transition-all duration-300 flex items-center gap-2 group"
                >
                  <IconPhone size={16} className="group-hover:text-emerald-300 transition-colors duration-300" />
                  <span>+20 111 165 0444</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div 
            className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p>© {currentYear} Ali Haggag. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400"></div>
              <span>Built with Next.js & Sanity</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
