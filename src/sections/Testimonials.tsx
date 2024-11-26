"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import Card from "@/components/Card";
import { getTestimonials } from '@/lib/sanity.api';
import { Testimonial } from "@/types/sanity";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        console.log('Starting testimonials fetch in component...');
        const data = await getTestimonials();
        console.log('Component received testimonials:', data);
        
        if (!data || data.length === 0) {
          console.log('No testimonials data received');
          setError('No testimonials available');
        } else {
          console.log(`Received ${data.length} testimonials`);
          setTestimonials(data);
        }
      } catch (err) {
        console.error('Error in testimonials component:', err);
        setError(err instanceof Error ? err.message : 'Failed to load testimonials');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  console.log('Current state:', { isLoading, error, testimonialCount: testimonials.length });

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader 
            eyebrow="Happy Clients" 
            title="Loading..." 
            description="Please wait while we fetch the testimonials." 
          />
          <div className="mt-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-300"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader 
            eyebrow="Happy Clients" 
            title="What Clients Say" 
            description={error || "No testimonials available yet."} 
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader 
          eyebrow="Happy Clients" 
          title="What Clients Say about Me" 
          description="Don't just take my word for it. See what my clients have to say about my work." 
        />
        <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
          <div className="flex gap-8 flex-none animate-move-left [animation-duration:90s] pr-8 hover:[animation-play-state:paused]">
            {testimonials.map((testimonial) => (
              <Card 
                key={testimonial._id}
                className="max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-300 cursor-default"
              >
                <div className="flex gap-4 items-center">
                  <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden">
                    {testimonial.avatar && (
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        width={56} 
                        height={56}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-white/40">{testimonial.position}</div>
                  </div>
                </div>
                <p className="mt-4 md:mt-6 text-sm md:text-base text-white/70">{testimonial.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
