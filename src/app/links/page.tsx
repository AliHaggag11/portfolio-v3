'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaQrcode, FaTimes } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import memojiImage from "@/assets/images/memoji-computer.png";
import grainImage from "@/assets/images/grain.jpg";
import { HeroOrbit } from "@/components/HeroOrbit";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import { getSocialLinks, getLinksPageSettings } from '@/lib/sanity.api';
import { SocialLink } from '@/types/sanity';
import { urlForImage } from '@/lib/sanity.image';
import { Afacad } from 'next/font/google';

const afacad = Afacad({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const iconMap: Record<SocialLink['icon'], IconType> = {
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
  linkedin: FaLinkedin,
  github: FaGithub,
  twitter: FaTwitter,
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
};

interface LinksPageSettings {
  profileImage: any;
  name: string;
  title: string;
  location: string;
  timezone: string;
  showAvailabilityStatus: boolean;
}

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function QRModal({ isOpen, onClose }: QRModalProps) {
  if (!isOpen) return null;

  // Get the current URL of the links page
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800/90 p-6 rounded-2xl border border-white/10 relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          <div className="text-center mb-4">
            <h3 className="text-xl font-medium text-white/90 mb-1">Links Page QR Code</h3>
            <p className="text-sm text-white/50">Scan to visit this page</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <QRCodeSVG
              value={pageUrl}
              size={250}
              level="H"
              includeMargin={true}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function LinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [settings, setSettings] = useState<LinksPageSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [linksData, settingsData] = await Promise.all([
          getSocialLinks(),
          getLinksPageSettings()
        ]);
        setLinks(linksData);
        setSettings(settingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !settings) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className={`text-2xl text-white/50 ${afacad.className}`}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden ${afacad.className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${grainImage.src})`,
          }}
        ></div>
        
        {/* Orbital Elements */}
        <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration="60s" shouldSpin spinDuration="15s">
          <StarIcon className="size-28 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="15s">
          <StarIcon className="size-12 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="45s" shouldSpin spinDuration="15s">
          <StarIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="35s" shouldSpin spinDuration="8s">
          <SparkleIcon className="size-8 text-emerald-300/10" />
        </HeroOrbit>
        <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="33s" shouldSpin spinDuration="8s">
          <SparkleIcon className="size-5 text-emerald-300/10" />
        </HeroOrbit>
      </div>

      <div className="max-w-2xl mx-auto p-4 relative z-10">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/10 backdrop-blur-sm relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Image
              src={settings.profileImage ? urlForImage(settings.profileImage).url() : memojiImage}
              alt={settings.name}
              className="w-full h-full object-cover"
              width={128}
              height={128}
            />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent tracking-wide">
            {settings.name}
          </h1>
          <p className="text-gray-300 mb-4 text-lg tracking-wide">{settings.title}</p>
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              className="inline-flex flex-col items-center gap-2 px-6 py-3 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-white/60 tracking-wide">{settings.location}</p>
              <div className="flex items-center gap-2 text-sm text-white/40">
                {settings.showAvailabilityStatus && (
                  <div className="size-2 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400"></div>
                )}
                <span className="tracking-wide">{settings.timezone}</span>
              </div>
            </motion.div>
            <motion.button
              onClick={() => setIsQRModalOpen(true)}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <FaQrcode className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              <span className="relative text-white/70 group-hover:text-white text-sm tracking-wide">Share via QR Code</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid gap-4">
          {links.map((link, index) => {
            const Icon = iconMap[link.icon];
            const gradient = `${link.gradient.from} ${link.gradient.to}`;
            
            return (
              <motion.a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 300 }}
                className="group relative flex items-center justify-between p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: `linear-gradient(to bottom right, ${gradient})` }}
                ></div>
                <div className="relative flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white/90 group-hover:text-white transition-colors tracking-wide">{link.title}</h3>
                    <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors tracking-wide">{link.description}</p>
                  </div>
                </div>
                <motion.div
                  className="relative text-white/30 group-hover:text-white/60 transition-colors duration-300"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* Portfolio Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link href="/" className="inline-block">
            <motion.div
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <span className="relative text-white/90 group-hover:text-white tracking-wide">View Full Portfolio</span>
              <motion.div
                className="relative text-white/30 group-hover:text-white/60 transition-colors duration-300"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                →
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
} 