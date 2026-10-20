"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Camera,
  Plus,
  Zap,
  Sparkles,
  FileQuestion,
  HelpCircle,
} from "lucide-react";
import { Course, Note } from "@/types";
import {
  getCourses,
  saveCourses,
  getNotes,
  saveNotes,
  getStoredApiKey,
  saveStoredApiKey,
  getStoredLang,
  saveStoredLang,
} from "@/lib/storage";
import { Language, TRANSLATIONS } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { CourseSidebar } from "@/components/CourseSidebar";
import { NoteCard } from "@/components/NoteCard";
import { CaptureModal } from "@/components/CaptureModal";
import { NoteDetailModal } from "@/components/NoteDetailModal";
import { NewCourseModal } from "@/components/NewCourseModal";
import { SettingsModal } from "@/components/SettingsModal";
import { InfoModal } from "@/components/InfoModal";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [apiKey, setApiKey] = useState<string>("");
  const [lang, setLang] = useState<Language>("tr");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const [isNewCourseOpen, setIsNewCourseOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS.tr, [lang]);

  useEffect(() => {
    setCourses(getCourses());
    setNotes(getNotes());
    setApiKey(getStoredApiKey());
    setLang(getStoredLang());
  }, []);

  const handleChangeLang = (newLang: Language) => {
    setLang(newLang);
    saveStoredLang(newLang);
  };

  const handleSaveCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    saveCourses(newCourses);
  };

  const handleSaveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    saveNotes(newNotes);
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    saveStoredApiKey(key);
  };

  const handleAddCourse = (course: Course) => {
    const updated = [...courses, course];
    handleSaveCourses(updated);
    setSelectedCourseId(course.id);
  };

  const handleSaveNewNote = (newNote: Note, suggestedCourseName?: string) => {
    let targetNote = { ...newNote };

    if (suggestedCourseName) {
      const existing = courses.find(
        (c) => c.name.toLowerCase() === suggestedCourseName.toLowerCase()
      );
      if (!existing) {
        const newCourse: Course = {
          id: `course-${Date.now()}`,
          name: suggestedCourseName,
          color: "cyan",
          description: "AI auto-generated course",
          createdAt: new Date().toISOString(),
        };
        const updatedCourses = [...courses, newCourse];
        handleSaveCourses(updatedCourses);
        targetNote.courseId = newCourse.id;
      } else {
        targetNote.courseId = existing.id;
      }
    }

    const updatedNotes = [targetNote, ...notes];
    handleSaveNotes(updatedNotes);
    setActiveNote(targetNote);
  };

  const handleToggleFavorite = (noteId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = notes.map((n) =>
      n.id === noteId ? { ...n, isFavorite: !n.isFavorite } : n
    );
    handleSaveNotes(updated);
    if (activeNote && activeNote.id === noteId) {
      setActiveNote({ ...activeNote, isFavorite: !activeNote.isFavorite });
    }
  };

  const handleDeleteNote = (noteId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm(t.deleteConfirm)) {
      const updated = notes.filter((n) => n.id !== noteId);
      handleSaveNotes(updated);
      if (activeNote?.id === noteId) {
        setActiveNote(null);
      }
    }
  };

  const handleUpdateNote = (updatedNote: Note) => {
    const updated = notes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
    handleSaveNotes(updated);
    setActiveNote(updatedNote);
  };

  const notesCounts = useMemo(() => {
    const map: Record<string, number> = {};
    notes.forEach((n) => {
      map[n.courseId] = (map[n.courseId] || 0) + 1;
    });
    return map;
  }, [notes]);

  const favoritesCount = useMemo(() => {
    return notes.filter((n) => n.isFavorite).length;
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (selectedCourseId === "favorites") {
        if (!note.isFavorite) return false;
      } else if (selectedCourseId !== null) {
        if (note.courseId !== selectedCourseId) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const course = courses.find((c) => c.id === note.courseId);
        const matchesTitle = note.title.toLowerCase().includes(query);
        const matchesSummary = note.summary?.toLowerCase().includes(query);
        const matchesRaw = note.rawText?.toLowerCase().includes(query);
        const matchesCourse = course?.name.toLowerCase().includes(query);
        const matchesTags = note.tags?.some((t) => t.toLowerCase().includes(query));

        return matchesTitle || matchesSummary || matchesRaw || matchesCourse || matchesTags;
      }

      return true;
    });
  }, [notes, selectedCourseId, searchQuery, courses]);

  const activeCourseObj = courses.find((c) => c.id === selectedCourseId);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      <Navbar
        totalNotes={notes.length}
        totalCourses={courses.length}
        hasApiKey={Boolean(apiKey)}
        lang={lang}
        t={t}
        onChangeLang={handleChangeLang}
        onOpenCapture={() => setIsCaptureOpen(true)}
        onOpenNewCourse={() => setIsNewCourseOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        {/* AquaForge Signature Banner: Embedded NoteForgeArkaPlan.mp4 Video Background */}
        <div className="mb-8 p-6 sm:p-10 lg:p-12 rounded-3xl border border-cyan-500/30 text-white shadow-2xl shadow-cyan-950/40 relative overflow-hidden bg-slate-950 min-h-[300px] sm:min-h-[340px] flex items-center">
          {/* Full Background Looping Animation (GIF - eliminates browser play/pause icons) */}
          <img
            src="/NoteForgeArkaPlan.gif"
            alt="NoteForge Animation"
            className="absolute inset-0 w-full h-full object-cover object-right md:object-center pointer-events-none select-none"
          />

          {/* Dark Glass & Gradient Overlay to make text 100% crisp while video plays in the background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30 pointer-events-none" />
          <div className="absolute inset-0 bg-cyan-950/10 pointer-events-none backdrop-blur-[0.5px]" />

          {/* Foreground Text & Action Buttons */}
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-md inline-flex items-center gap-1.5 text-cyan-300 shadow-sm shadow-cyan-500/20">
              <Zap className="w-3.5 h-3.5 fill-cyan-400 stroke-cyan-400" />
              {t.heroTag}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight drop-shadow-md">
              {t.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed max-w-xl drop-shadow">
              {t.heroSubtitle}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setIsCaptureOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-cyan-400/30 transition active:scale-95"
              >
                <Camera className="w-4 h-4 stroke-[2.5]" />
                <span>{t.heroBtnCapture}</span>
              </button>
              <button
                onClick={() => setIsNewCourseOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-cyan-500/40 text-cyan-200 font-semibold text-sm flex items-center gap-2 backdrop-blur-md transition shadow-md"
              >
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>{t.heroBtnCourse}</span>
              </button>
              <button
                onClick={() => setIsInfoOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/20 text-zinc-200 font-semibold text-sm flex items-center gap-2 backdrop-blur-md transition shadow-md"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>{t.heroBtnInfo}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          <CourseSidebar
            courses={courses}
            selectedCourseId={selectedCourseId}
            t={t}
            onSelectCourse={setSelectedCourseId}
            onOpenNewCourse={() => setIsNewCourseOpen(true)}
            notesCounts={notesCounts}
            totalNotesCount={notes.length}
            favoritesCount={favoritesCount}
          />

          <div className="flex-1 w-full space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500 w-full sm:w-auto justify-between sm:justify-end">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {selectedCourseId === "favorites"
                    ? `⭐ ${t.starredNotes}`
                    : activeCourseObj
                    ? activeCourseObj.name
                    : t.allNotes}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold">
                  {t.notesCountBadge(filteredNotes.length)}
                </span>
              </div>
            </div>

            {filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
                {filteredNotes.map((note) => {
                  const course = courses.find((c) => c.id === note.courseId);
                  return (
                    <NoteCard
                      key={note.id}
                      note={note}
                      course={course}
                      onSelect={(n) => setActiveNote(n)}
                      onToggleFavorite={handleToggleFavorite}
                      onDelete={handleDeleteNote}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                  <Zap className="w-8 h-8 fill-cyan-500/30 stroke-cyan-500" />
                </div>
                <div className="max-w-sm space-y-1">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {t.noNotesFoundTitle}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {searchQuery
                      ? t.searchPlaceholder
                      : t.noNotesFoundSubtitle}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCaptureOpen(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 flex items-center gap-1.5 shadow-md shadow-cyan-400/20 transition"
                  >
                    <Camera className="w-4 h-4 stroke-[2.5]" />
                    <span>{t.firstNoteBtn}</span>
                  </button>
                  <button
                    onClick={() => setIsInfoOpen(true)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition"
                  >
                    <HelpCircle className="w-4 h-4 text-cyan-500" />
                    <span>{t.howToUse}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <CaptureModal
        isOpen={isCaptureOpen}
        courses={courses}
        apiKey={apiKey}
        lang={lang}
        t={t}
        onClose={() => setIsCaptureOpen(false)}
        onSaveNote={handleSaveNewNote}
        onOpenSettings={() => {
          setIsCaptureOpen(false);
          setIsSettingsOpen(true);
        }}
      />

      <NoteDetailModal
        note={activeNote}
        courses={courses}
        isOpen={Boolean(activeNote)}
        t={t}
        onClose={() => setActiveNote(null)}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
        onToggleFavorite={handleToggleFavorite}
      />

      <NewCourseModal
        isOpen={isNewCourseOpen}
        t={t}
        onClose={() => setIsNewCourseOpen(false)}
        onAddCourse={handleAddCourse}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        apiKey={apiKey}
        t={t}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveApiKey}
      />

      <InfoModal
        isOpen={isInfoOpen}
        t={t}
        onClose={() => setIsInfoOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenCapture={() => setIsCaptureOpen(true)}
      />
    </div>
  );
}
