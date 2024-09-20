import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import Card from "@/components/Card";

import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import xoraLP from "@/assets/images/xora-landing-page.png";
import metaversus from "@/assets/images/metaversus.png";
import apexLP from "@/assets/images/apex-lp.png";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg";

const portfolioProjects = [

  {
    company: "Xora AI",
    year: "2024",
    title: "AI Startup Landing Page",
    results: [
      { title: "Redesigned user interface to enhance user experience by 40%" },
      { title: "Optimized page load speed by 50% for faster site performance" },
      { title: "Implemented mobile-first responsive design, increasing mobile traffic by 60%" },
    ],
    link: "https://xora-ai.vercel.app/",
    image: xoraLP,
  },
  {
    company: "Apex Studios",
    year: "2023",
    title: "Software Startup Landing Page",
    results: [
      { title: "Created a user-centric design to enhance user experience by 40%" },
      { title: "Improved site performance by optimizing page load speed by 50%" },
      { title: "Developed a mobile-responsive layout to increase mobile traffic by 55%" },
    ],
    link: "https://apex-studios.vercel.app/",
    image: apexLP,
  },
  {
    company: "Apex Studios",
    year: "2023",
    title: "Dark Saas Landing Page",
    results: [
      { title: "Designed a visually appealing user interface to enhance user experience by 40%" },
      { title: "Optimized backend processes to improve site speed by 50%" },
      { title: "Implemented responsive design to increase mobile traffic by 35%" },
    ],
    link: "https://saas-fm.vercel.app/",
    image: darkSaasLandingPage,
  },
  {
    company: "Metaversus",
    year: "2022",
    title: "Explore the Metaverse",
    results: [
      { title: "Developed interactive UI elements to boost sales by 20%" },
      { title: "Implemented SEO-optimized content to expand customer reach by 35%" },
      { title: "Created visually engaging social media campaigns to increase brand awareness by 15%" },
    ],
    link: "https://metaversus-ai.vercel.app/",
    image: metaversus,
  },
  {
    company: "Upscale DA",
    year: "2021",
    title: "Digital Solutions Agency Website",
    results: [
      { title: "Designed and deployed a user-friendly interface to boost sales by 20%" },
      { title: "Integrated CRM tool to expand customer reach by 25%" },
      { title: "Developed a comprehensive content strategy to increase brand awareness by 15%" },
    ],
    link: "https://upscale-da.netlify.app/",
    image: lightSaasLandingPage,
  }

];


export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader eyebrow="Real-world Results" title="Featured Projects" description="See how I transformed concepts into engaging digital experiences." />

        <div className="flex flex-col mt-10 md:mt-20 gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{
                top: `calc(64px + ${projectIndex * 40}px)`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-4xl mt-2 md:mt-5">{project.title}</h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li key={result.title} className="flex gap-2 text-sm md:text-base text-white/50">
                        <CheckCircleIcon className="size-5 md:size-6" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={project.link}>
                    <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex justify-center items-center gap-2 mt-8">
                      <span>Visit Live Site</span>
                      <ArrowUpRight className="size-4" />
                    </button>
                  </a>
                </div>
                <div className="relative">
                  <Image src={project.image} alt={project.title} className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
