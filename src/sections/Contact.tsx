'use client';

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import Card from "@/components/Card";

const contactMethods = [
  {
    title: "Let's Chat",
    description: "Connect with me on WhatsApp for a quick discussion about your project",
    link: "https://wa.me/201111650444",
  },
  {
    title: "Send an Email",
    description: "Drop me a line for detailed inquiries and collaborations",
        link: "mailto:ali7aggag@gmail.com",
    },
  {
    title: "Professional Network",
    description: "Connect with me on LinkedIn to explore my professional journey",
    link: "https://linkedin.com/in/ali-haggag/",
  },
  {
    title: "Open Source",
    description: "Check out my contributions and projects on GitHub",
    link: "https://github.com/alihaggag11",
  }
];

export function ContactSection() {
  return (
    <section id="contact" className="py-16 pb-8 lg:py-24 lg:pb-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent pointer-events-none"></div>
      
      <div className="container relative">
        <SectionHeader 
          eyebrow="Get in Touch" 
          title="Let's Work Together" 
          description="Choose your preferred method of communication and I'll get back to you promptly." 
        />
        
        <div className="mt-12 lg:mt-20">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-transparent to-transparent"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 md:p-12 group hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                      {method.title}
                    </h3>
                    <motion.div
                      className="text-white/30 group-hover:text-white/60 transition-colors duration-300"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.div>
                  </div>
                  <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300 pr-12">
                    {method.description}
                  </p>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent"></div>
                  </div>
                </motion.a>
              ))}
            </div>
          </Card>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex flex-col items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/5">
            <p className="text-white/60">Based in Egypt • Available Worldwide</p>
            <div className="flex items-center gap-3 text-sm text-white/40">
              <div className="size-2 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400"></div>
              <span>GMT+2 (EET)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
