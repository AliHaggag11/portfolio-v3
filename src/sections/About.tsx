"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { ToolboxItems } from "@/components/ToolboxItems";

import bookImage from "@/assets/images/book-cover.png";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CSSIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";

const toolboxItems = [
  {
    title: "Javascript",
    iconType: JavascriptIcon,
  },
  {
    title: "HTML5",
    iconType: HTMLIcon,
  },
  {
    title: "CSS3",
    iconType: CSSIcon,
  },
  {
    title: "React",
    iconType: ReactIcon,
  },
  {
    title: "Chrome",
    iconType: ChromeIcon,
  },
  {
    title: "Github",
    iconType: GithubIcon,
  },
];

const hobbies = [
  
  {
    title: "Photography",
    emoji: "📸",
    left: "50%",
    top: "5%",
  },
 
  {
    title: "Gaming",
    emoji: "🎮",
    left: "10%",
    top: "-5%",
  },
  {
    title: "House Music",
    emoji: "🎵",
    left: "70%",
    top: "45%",
  },
  {
    title: "Calisthenics",
    emoji: "🏋️",
    left: "5%",
    top: "65%",
  },
  {
    title: "Reading",
    emoji: "📖",
    left: "45%",
    top: "70%",
  },
];

export const AboutSection = () => {
  const constraintRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader eyebrow="About Me" title="A Glimpse Into My World" description="Learn more about who I am, what I do, and what inspires me." />

        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <Card.Header title="My Reads" description="Explore the books shaping my perspectives." />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book cover" />
              </div>
            </Card>

            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <Card.Header title="My Toolbox" description="Explore the technologies and tools I use to craft exception digital experiences." />
              <ToolboxItems items={toolboxItems} itemsWrapperClassName="animate-move-left [animation-duration:30s]" />
              <ToolboxItems items={toolboxItems} className="mt-6" itemsWrapperClassName="animate-move-right [animation-duration:15s]" />
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
            <Card className="h-[320px] flex flex-col md:col-span-3 lg:col-span-2">
              <Card.Header title="Beyond the Code" description="Explore my interests and hobbies beyond the digital realm." className="px-6 py-6" />
              <div ref={constraintRef} className="relative flex-1">
                {hobbies.map(({ title, emoji, top, left }) => (
                  <motion.div
                    key={title}
                    className="inline-flex items-center gap-2 py-1.5 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full absolute"
                    style={{
                      top,
                      left,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">{title}</span>
                    <span>{emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="h-[320px] relative md:col-span-2 lg:col-span-1">
              <Image src={mapImage} alt="map" className="h-full w-full object-cover object-left-top" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                <Image src={smileMemoji} alt="smiling emoji" className="size-20" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
