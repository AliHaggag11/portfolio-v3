import { Suspense } from "react";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { CareersSection } from "@/sections/Careers";
import { BlogSection } from "@/sections/Blog";

export default function Home() {
  return (
    <div>
      <section id="home">
        <Header />
        <HeroSection />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <TapeSection />
      </Suspense>
      <Suspense fallback={<div>Loading projects...</div>}>
        <section id="projects">
          <ProjectsSection />
        </section>
      </Suspense>
      <Suspense fallback={<div>Loading careers...</div>}>
        <CareersSection />
      </Suspense>
      <Suspense fallback={<div>Loading testimonials...</div>}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<div>Loading about...</div>}>
        <section id="about">
          <AboutSection />
        </section>
      </Suspense>
      <Suspense fallback={<div>Loading blog...</div>}>
        <section id="blog">
          <BlogSection />
        </section>
      </Suspense>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </div>
  );
}
