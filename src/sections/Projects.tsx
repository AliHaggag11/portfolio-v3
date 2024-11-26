import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import Card from "@/components/Card";
import { getProjects } from '@/lib/sanity.api'
import { Project } from "@/types/sanity";

import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg";

export async function ProjectsSection() {
  try {
    console.log('Fetching projects...');
    const projects = await getProjects();
    console.log('Projects fetched:', projects);

    if (!projects || projects.length === 0) {
      console.log('No projects found');
      return (
        <section id="projects" className="py-16 lg:py-24">
          <div className="container">
            <SectionHeader 
              eyebrow="Real-world Results" 
              title="Featured Projects" 
              description="Projects will appear here soon." 
            />
          </div>
        </section>
      );
    }

    return (
      <section id="projects" className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader 
            eyebrow="Real-world Results" 
            title="Featured Projects" 
            description="See how I transformed concepts into engaging digital experiences." 
          />

          <div className="flex flex-col mt-10 md:mt-20 gap-20">
            {projects.map((project: Project, index: number) => (
              <Card
                key={project._id}
                className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
                style={{
                  top: `calc(64px + ${index * 40}px)`,
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
                      {project.results.map((result: string) => (
                        <li key={result} className="flex gap-2 text-sm md:text-base text-white/50">
                          <CheckCircleIcon className="size-5 md:size-6" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex justify-center items-center gap-2 mt-8">
                        <span>Visit Live Site</span>
                        <ArrowUpRight className="size-4" />
                      </button>
                    </a>
                  </div>
                  <div className="relative">
                    {project.image && (
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        width={800}
                        height={600}
                        className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none" 
                      />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return (
      <section id="projects" className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader 
            eyebrow="Error" 
            title="Could not load projects" 
            description="Please try again later." 
          />
        </div>
      </section>
    );
  }
}
