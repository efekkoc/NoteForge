"use client";

import React, { useState } from "react";
import {
  Camera,
  Plus,
  Settings,
  Sparkles,
  KeyRound,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { Language, Translations } from "@/lib/i18n";

interface NavbarProps {
  totalNotes: number;
  totalCourses: number;
  hasApiKey: boolean;
  lang: Language;
  t: Translations;
  onChangeLang: (lang: Language) => void;
  onOpenCapture: () => void;
  onOpenNewCourse: () => void;
  onOpenSettings: () => void;
  onOpenInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalNotes,
  totalCourses,
  hasApiKey,
  lang,
  t,
  onChangeLang,
  onOpenCapture,
  onOpenNewCourse,
  onOpenSettings,
  onOpenInfo,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        {/* Brand with AquaForge Signature Styling */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/30 shrink-0 bg-slate-950 flex items-center justify-center p-0.5 transition-transform hover:scale-105">
            <img
              src="/logo.jpg"
              alt="NoteForge AI Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 tracking-tight">
                {t.appName}
              </span>
              <span className="px-2 py-0.5 text-[11px] font-bold bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 rounded-md uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> {t.appBadge}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
              {t.totalCoursesCount(totalCourses)} &bull; {t.totalNotesCount(totalNotes)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5 transition"
            >
              <span>{currentLangObj.flag}</span>
              <span className="hidden sm:inline uppercase text-[11px] font-bold">
                {currentLangObj.code}
              </span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onChangeLang(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-xs flex items-center gap-2.5 transition text-left ${
                      lang === l.code
                        ? "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 font-bold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span className="text-sm">{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* How to use button */}
          <button
            onClick={onOpenInfo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            title={t.howToUse}
          >
            <HelpCircle className="w-4 h-4 text-cyan-500" />
            <span className="hidden md:inline">{t.howToUse}</span>
          </button>

          {/* API Key Status Pill */}
          <button
            onClick={onOpenSettings}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              hasApiKey
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
                : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 hover:bg-amber-100 animate-pulse"
            }`}
            title="Gemini API"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">
              {hasApiKey ? t.apiConnected : t.apiMissing}
            </span>
          </button>

          {/* New Course Button */}
          <button
            onClick={onOpenNewCourse}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addCourse}</span>
          </button>

          {/* Capture / Upload Note Main Action - AquaForge Cyan Gradient */}
          <button
            onClick={onOpenCapture}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 hover:from-cyan-300 hover:to-teal-400 shadow-md shadow-cyan-500/25 active:scale-95 transition-all"
          >
            <Camera className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden xs:inline">{t.captureNote}</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label={t.settings}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
