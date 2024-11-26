'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import Card from "@/components/Card";
import { getCareers } from '@/lib/sanity.api';
import { Career } from "@/types/sanity";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";

export function CareersSection() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await getCareers();
        setCareers(data);
      } catch (err) {
        console.error('Error fetching careers:', err);
        setError('Failed to load career history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  if (isLoading) {
    return (
      <section id="careers" className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader 
            eyebrow="Career Journey" 
            title="Loading..." 
            description="Please wait while we fetch the career history." 
          />
          <div className="mt-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-300"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || careers.length === 0) {
    return (
      <section id="careers" className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader 
            eyebrow="Career Journey" 
            title="Professional Experience" 
            description={error || "Career history will be available soon."} 
          />
        </div>
      </section>
    );
  }

  return (
    <section id="careers" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader 
          eyebrow="Career Journey" 
          title="Professional Experience" 
          description="A timeline of my professional growth and achievements." 
        />
        
        <div className="mt-12 lg:mt-20 relative">
          {/* Timeline line with gradient and glow effect */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-300/50 via-sky-400/50 to-transparent">
            <div className="absolute inset-0 w-px blur-sm bg-gradient-to-b from-emerald-300/50 via-sky-400/50 to-transparent"></div>
          </div>
          
          <div className="space-y-16">
            {careers.map((career, index) => (
              <motion.div
                key={career._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 relative`}
              >
                {/* Timeline dot with pulse effect */}
                <div className="absolute left-[-4px] md:left-1/2 md:transform md:-translate-x-1/2 top-0 w-2 h-2 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 animate-ping opacity-75"></div>
                  <div className="absolute inset-0 rounded-full blur-sm bg-gradient-to-r from-emerald-300 to-sky-400"></div>
                </div>
                
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="p-6 md:p-8 hover:border-emerald-300/20 transition-all duration-300">
                      <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                        {career.period}
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl mt-2 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                        {career.position}
                      </h3>
                      <div className="text-white/60 mt-1">{career.company}</div>
                      <hr className="border-t border-white/5 my-4" />
                      <ul className="space-y-3">
                        {career.description.map((item, i) => (
                          <motion.li 
                            key={i} 
                            className="flex gap-2 text-sm text-white/50 items-start group"
                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                          >
                            <CheckCircleIcon className="size-5 flex-shrink-0 mt-0.5 text-emerald-300/50 group-hover:text-emerald-300 transition-colors duration-300" />
                            <span className="group-hover:text-white/70 transition-colors duration-300">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                </div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 