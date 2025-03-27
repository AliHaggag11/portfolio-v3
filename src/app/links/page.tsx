'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaQrcode, FaTimes, FaCheck } from 'react-icons/fa';
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
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
  variable: '--font-afacad',
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
  showAnnouncement: boolean;
  announcement?: {
    text: string;
    link?: string;
    textColor: 'emerald' | 'sky' | 'white';
    icon: 'star' | 'sparkle' | 'none';
  };
}

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  name: string;
}

function ProfileImageModal({ isOpen, onClose, imageUrl, name }: ProfileImageModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative max-w-2xl w-full mx-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white/40 hover:text-white/60 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-sky-400/20 rounded-3xl"></div>
            <Image
              src={imageUrl}
              alt={name}
              className="w-full h-auto rounded-3xl object-cover"
              width={800}
              height={800}
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function QRModal({ isOpen, onClose }: QRModalProps) {
  if (!isOpen) return null;

  const [isCopied, setIsCopied] = useState(false);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'X',
      icon: XIcon,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`,
      gradient: 'from-gray-900 to-gray-800',
      hoverGradient: 'from-gray-800 to-gray-700'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
      gradient: 'from-[#0077B5] to-[#006399]',
      hoverGradient: 'from-[#0088CC] to-[#0077B5]'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      gradient: 'from-[#1877F2] to-[#166BE0]',
      hoverGradient: 'from-[#1988FF] to-[#1877F2]'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(pageUrl)}`,
      gradient: 'from-[#25D366] to-[#20BD5A]',
      hoverGradient: 'from-[#2AE374] to-[#25D366]'
    }
  ];

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
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-[#1a1f24] p-8 rounded-3xl relative max-w-md w-full mx-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white/60 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-medium text-white mb-2">Share Links Page</h3>
            <p className="text-[#8b95a1] text-lg">Share this page with your network</p>
          </div>

          {/* Social Share Buttons */}
          <div className="flex justify-center gap-3 mb-8">
            {shareLinks.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/10 to-sky-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <platform.icon className="relative w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>

          {/* QR Code */}
          <div className="bg-gradient-to-br from-white to-white/95 rounded-2xl mb-8 p-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            <div className="relative">
              <QRCodeSVG
                value={pageUrl}
                size={200}
                level="H"
                includeMargin={false}
                className="relative z-10"
              />
            </div>
          </div>

          {/* URL Copy Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 bg-gradient-to-br from-[#262b31] to-[#1e2227] rounded-xl p-3 text-[#8b95a1] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
              <span className="flex-1 font-mono text-sm truncate relative">{pageUrl}</span>
              <motion.button
                onClick={handleCopyLink}
                className="relative px-4 py-1.5 rounded-lg bg-gradient-to-br from-[#3f444a] to-[#363b41] text-[#8b95a1] hover:text-white transition-colors text-sm flex items-center gap-2 min-w-[80px] justify-center group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <AnimatePresence mode="wait">
                  {isCopied ? (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5 text-emerald-400 relative"
                    >
                      <FaCheck className="w-4 h-4" />
                      <span>Copied!</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
              >
                Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            <p className="text-center text-[#8b95a1] text-base">
              Or copy this link to share directly
            </p>
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
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);

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
        <div className="text-2xl text-white/50 font-afacad">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden font-afacad">
      {/* Background Effects */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${grainImage.src})`,
          }}
        ></div>
        
        {/* Orbital Elements */}
        <HeroOrbit size={600} rotation={-72} shouldOrbit orbitDuration="60s" shouldSpin spinDuration="15s">
          <StarIcon className="size-20 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={400} rotation={20} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="15s">
          <StarIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={450} rotation={98} shouldOrbit orbitDuration="45s" shouldSpin spinDuration="15s">
          <StarIcon className="size-6 text-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit size={300} rotation={-14} shouldOrbit orbitDuration="35s" shouldSpin spinDuration="8s">
          <SparkleIcon className="size-6 text-emerald-300/10" />
        </HeroOrbit>
        <HeroOrbit size={320} rotation={79} shouldOrbit orbitDuration="33s" shouldSpin spinDuration="8s">
          <SparkleIcon className="size-4 text-emerald-300/10" />
        </HeroOrbit>
      </div>

      <div className="h-full max-w-2xl mx-auto p-4 relative z-10 flex flex-col">
        {/* Announcement Banner */}
        {settings.showAnnouncement && settings.announcement && (
          <div className="relative w-full overflow-hidden mb-6 rounded-xl bg-gradient-to-r from-emerald-300/10 to-sky-400/10 border border-white/5">
            <motion.div
              animate={{
                x: ["-25%", "-50%"],
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
              }}
              className="py-1.5 whitespace-nowrap text-xs tracking-wider"
            >
              <span className="inline-flex items-center gap-6">
                {Array.from({ length: 4 }).map((_, i) => {
                  if (!settings.announcement) return null;
                  const { icon, textColor, link, text } = settings.announcement;
                  
                  return (
                    <span key={i} className="inline-flex items-center gap-2">
                      {icon === 'star' && (
                        <StarIcon className={`size-3 ${
                          textColor === 'emerald' 
                            ? 'text-emerald-300/70' 
                            : textColor === 'sky' 
                            ? 'text-sky-300/70'
                            : 'text-white/70'
                        }`} />
                      )}
                      {icon === 'sparkle' && (
                        <SparkleIcon className={`size-3 ${
                          textColor === 'emerald' 
                            ? 'text-emerald-300/70' 
                            : textColor === 'sky' 
                            ? 'text-sky-300/70'
                            : 'text-white/70'
                        }`} />
                      )}
                      {link ? (
                        <Link 
                          href={link}
                          className={`${
                            textColor === 'emerald' 
                              ? 'text-emerald-300/90 hover:text-emerald-300' 
                              : textColor === 'sky' 
                              ? 'text-sky-300/90 hover:text-sky-300'
                              : 'text-white/90 hover:text-white'
                          } transition-colors`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {text}
                        </Link>
                      ) : (
                        <span className={`${
                          textColor === 'emerald' 
                            ? 'text-emerald-300/90' 
                            : textColor === 'sky' 
                            ? 'text-sky-300/90'
                            : 'text-white/90'
                        }`}>
                          {text}
                        </span>
                      )}
                    </span>
                  );
                })}
              </span>
            </motion.div>
          </div>
        )}

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <motion.div 
            className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white/10 backdrop-blur-sm relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setIsProfileImageModalOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Image
              src={settings.profileImage ? urlForImage(settings.profileImage).url() : memojiImage}
              alt={settings.name}
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
          </motion.div>
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent tracking-wide">
            {settings.name}
          </h1>
          <p className="text-gray-300 mb-3 text-base tracking-wide">{settings.title}</p>
          <div className="flex items-center justify-center gap-3">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-white/60 tracking-wide text-sm">{settings.location}</p>
                {settings.showAvailabilityStatus && (
                  <div className="size-2 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400"></div>
                )}
            </motion.div>
            <motion.button
              onClick={() => setIsQRModalOpen(true)}
              className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <FaQrcode className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              <span className="relative text-white/70 group-hover:text-white text-sm tracking-wide">Share</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid gap-3 flex-1 overflow-y-auto pr-2">
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
                className="group relative flex items-center justify-between p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: `linear-gradient(to bottom right, ${gradient})` }}
                ></div>
                <div className="relative flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white/90 group-hover:text-white transition-colors tracking-wide text-sm">{link.title}</h3>
                    <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors tracking-wide">{link.description}</p>
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
          className="mt-4 text-center"
        >
          <Link href="/" className="inline-block">
            <motion.div
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <span className="relative text-white/90 group-hover:text-white tracking-wide text-sm">View Full Portfolio</span>
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
      <ProfileImageModal
        isOpen={isProfileImageModalOpen}
        onClose={() => setIsProfileImageModalOpen(false)}
        imageUrl={settings.profileImage ? urlForImage(settings.profileImage).url() : memojiImage}
        name={settings.name}
      />
    </div>
  );
} 