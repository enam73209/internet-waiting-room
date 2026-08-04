"use client";

import React, { useEffect, useState } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { useDoorTransition } from "@/hooks/useDoorTransition";
import achievementsData from "@/data/achievements.json";
import dailySet from "@/data/dailySet.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Wind,
  Hourglass,
  Compass,
  Feather,
  Volume2,
  Award,
  ArrowRight,
  RotateCcw,
  Share2,
  X,
  MessageCircle,
  Link2,
  Check,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Palette,
  Wind,
  Hourglass,
  Compass,
  Feather,
  Volume2,
  Award,
};

export default function CompletePage() {
  const {
    unlockedAchievements,
    completedRooms,
    resetStore,
    unlockAchievement,
  } = useRoomStore();
  const { transitionTo } = useDoorTransition();
  const [mounted, setMounted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [instagramToast, setInstagramToast] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (completedRooms.length >= dailySet.rooms.length) {
      unlockAchievement("achieve-complete");
    }
  }, [completedRooms, unlockAchievement]);

  if (!mounted) {
    return (
      <div className="min-h-[50vh] w-full flex items-center justify-center bg-[#FBF9F6]" />
    );
  }

  const handleReset = () => {
    resetStore();
    transitionTo("/");
  };

  const completedCount = completedRooms.length;
  const unlockedCount = unlockedAchievements.length;

  // Share content
  const shareText = `I just explored The Internet Waiting Room — ${completedCount} rooms, ${unlockedCount} badges earned. A quiet corner of the internet you didn't know you needed. 🚪`;
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://internetwaitingroom.com";

  const handleNativeShare = () => {
    // Only use native share on mobile (touch devices). Desktop browsers gate
    // navigator.share behind HTTPS + strict gesture requirements and fail silently.
    const isMobile = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
    if (isMobile && typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "The Internet Waiting Room",
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        // Share cancelled or failed — fall through to modal
        setShowShareModal(true);
      });
      return;
    }
    // Desktop: always show our custom modal
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setInstagramToast(true);
      setTimeout(() => setInstagramToast(false), 3000);
      window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
    } catch {}
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex-1 flex flex-col items-center py-10 select-none">
      <div className="max-w-2xl w-full flex flex-col items-center">
        {/* completion copy */}
        <div className="text-center mb-12">
          <span className="font-mono text-[9px] uppercase tracking-widest text-sage-500 font-semibold">
            Journey Completed
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 tracking-tight mt-3">
            You Have Left the Noise Behind
          </h2>
          <p className="font-serif text-sm italic text-charcoal-400 max-w-sm mx-auto mt-4 leading-relaxed">
            &ldquo;Within you there is a stillness and a sanctuary to which you
            can retreat at any time.&rdquo;
          </p>
        </div>

        {/* stats cards */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-md mb-12">
          <div className="bg-cream-50/50 border border-cream-200 p-6 rounded-lg text-center shadow-xs">
            <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 block mb-2">
              Doors Opened
            </span>
            <span className="font-mono text-3xl font-light text-charcoal-900">
              {completedCount}{" "}
              <span className="text-xs text-charcoal-400">
                / {dailySet.rooms.length}
              </span>
            </span>
          </div>
          <div className="bg-cream-50/50 border border-cream-200 p-6 rounded-lg text-center shadow-xs">
            <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 block mb-2">
              Badges Earned
            </span>
            <span className="font-mono text-3xl font-light text-charcoal-900">
              {unlockedCount}{" "}
              <span className="text-xs text-charcoal-400">
                / {achievementsData.length}
              </span>
            </span>
          </div>
        </div>

        {/* achievements checklist */}
        <div className="w-full bg-cream-50/30 border border-cream-200 rounded-lg p-6 md:p-8 shadow-xs mb-8">
          <h3 className="font-serif text-lg text-charcoal-900 mb-6 text-center">
            Earned Sanctuary Badges
          </h3>

          <div className="flex flex-col gap-4">
            {achievementsData.map((ach) => {
              const isUnlocked = unlockedAchievements.includes(ach.id);
              const IconComp = iconMap[ach.icon] || Award;

              return (
                <div
                  key={ach.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                    isUnlocked
                      ? "border-cream-300 bg-cream-50/70"
                      : "border-cream-200 bg-cream-50/10 opacity-30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      isUnlocked
                        ? "bg-gold-500/10 border-gold-500 text-gold-600"
                        : "bg-transparent border-cream-300 text-charcoal-400"
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-serif text-sm text-charcoal-900 font-medium">
                      {ach.title}
                    </h4>
                    <p className="font-sans text-[11px] text-charcoal-400 mt-0.5 leading-normal">
                      {ach.description}
                    </p>
                  </div>

                  {/* Share badge button (only if unlocked) */}
                  {isUnlocked && (
                    <button
                      onClick={handleNativeShare}
                      title="Share this badge"
                      className="w-8 h-8 rounded-full border border-cream-300 hover:border-charcoal-400 bg-cream-50 hover:bg-cream-100 flex items-center justify-center text-charcoal-400 hover:text-charcoal-900 transition-all cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Share Journey Banner */}
        <div className="w-full bg-gradient-to-r from-cream-100 to-cream-50 border border-cream-200 rounded-lg p-6 mb-8 text-center shadow-xs">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#A88145] font-semibold block mb-2">
            Share Your Journey
          </span>
          <p className="font-serif text-sm text-charcoal-600 italic mb-4 leading-relaxed">
            &ldquo;{completedCount} doors opened. {unlockedCount} badges earned.
            A quiet corner of the internet.&rdquo;
          </p>
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-charcoal-900 bg-charcoal-900 hover:bg-charcoal-600 text-[#FDFDFB] font-serif text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Your Badge
          </button>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => transitionTo("/vault")}
            className="px-6 py-3 rounded-full border border-charcoal-900 bg-charcoal-900 hover:bg-charcoal-600 text-cream-50 font-serif text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            Enter the Vault <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-full border border-cream-300 bg-cream-50 hover:bg-cream-200 text-charcoal-600 hover:text-charcoal-900 font-serif text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Sit Again
          </button>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal-900/20 backdrop-blur-xs z-50"
              onClick={() => setShowShareModal(false)}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-4 bottom-8 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-[#FBF9F6] border border-cream-300 rounded-xl shadow-2xl z-50 p-6"
            >
              <div className="text-center mb-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A88145] font-semibold">
                  Share Your Journey
                </span>
                <h3 className="font-serif text-lg text-charcoal-900 mt-1">
                  Tell a friend about it
                </h3>
                <p className="font-sans text-xs text-charcoal-400 mt-2 leading-relaxed italic">
                  "{shareText}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* X / Twitter */}
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-cream-200 hover:border-charcoal-900 bg-white hover:bg-cream-50/50 transition-all text-charcoal-900 cursor-pointer no-underline group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-charcoal-900 flex items-center justify-center text-white mb-2 shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <X className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-[11px] font-medium">X / Twitter</span>
                </a>

                {/* Facebook */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-cream-200 hover:border-[#1877F2] bg-white hover:bg-[#1877F2]/5 transition-all text-charcoal-900 cursor-pointer no-underline group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white mb-2 shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] font-medium">Facebook</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-cream-200 hover:border-[#25D366] bg-white hover:bg-[#25D366]/5 transition-all text-charcoal-900 cursor-pointer no-underline group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white mb-2 shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-[11px] font-medium">WhatsApp</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-cream-200 hover:border-[#0A66C2] bg-white hover:bg-[#0A66C2]/5 transition-all text-charcoal-900 cursor-pointer no-underline group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center text-white mb-2 shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] font-medium">LinkedIn</span>
                </a>

                {/* Instagram */}
                <button
                  onClick={handleInstagramShare}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-cream-200 hover:border-[#E1306C] bg-white hover:bg-[#E1306C]/5 transition-all text-charcoal-900 cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#C13584] flex items-center justify-center text-white mb-2 shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <span className="font-serif text-[11px] font-medium">
                    {instagramToast ? "Copied! Opening..." : "Instagram"}
                  </span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-cream-200 hover:border-gold-500 bg-white hover:bg-gold-500/5 transition-all text-charcoal-900 cursor-pointer group shadow-2xs hover:shadow-xs"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 shadow-xs group-hover:scale-110 transition-transform duration-300 ${copied ? "bg-sage-500" : "bg-gold-500"}`}>
                    {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
                  </div>
                  <span className="font-serif text-[11px] font-medium">
                    {copied ? "Copied!" : "Copy Link"}
                  </span>
                </button>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="mt-6 w-full text-center font-mono text-[10px] uppercase tracking-widest text-charcoal-400 hover:text-charcoal-900 transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
