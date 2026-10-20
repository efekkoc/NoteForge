"use client";

import React, { useState } from "react";
import { X, Plus, BookOpen } from "lucide-react";
import { Course } from "@/types";
import { COLOR_MAP } from "@/lib/colors";
import { Translations } from "@/lib/i18n";

interface NewCourseModalProps {
  isOpen: boolean;
  t: Translations;
  onClose: () => void;
  onAddCourse: (course: Course) => void;
}

export const NewCourseModal: React.FC<NewCourseModalProps> = ({
  isOpen,
  t,
  onClose,
  onAddCourse,
}) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState("indigo");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t.courseNameRequired);
      return;
    }

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      name: name.trim(),
      code: code.trim().toUpperCase() || undefined,
      color,
      description: description.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    onAddCourse(newCourse);
    setName("");
    setCode("");
    setColor("indigo");
    setDescription("");
    setError("");
    onClose();
  };

  const colors = [
    { key: "indigo", label: "Indigo" },
    { key: "emerald", label: "Emerald" },
    { key: "purple", label: "Purple" },
    { key: "amber", label: "Amber" },
    { key: "rose", label: "Rose" },
    { key: "cyan", label: "Cyan" },
    { key: "blue", label: "Blue" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {t.newCourseTitle}
            </h3>
            <p className="text-xs text-zinc-500">
              {t.newCourseSubtitle}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              {t.courseNameLabel}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder={t.courseNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              {t.courseCodeLabel}
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t.courseCodePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              {t.courseColorLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => {
                const colorDef = COLOR_MAP[c.key];
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setColor(c.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
                      color === c.key
                        ? `${colorDef.bg} ${colorDef.text} ring-2 ring-indigo-500 font-bold border-indigo-400`
                        : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${colorDef.dot}`} />
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              {t.courseDescLabel}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.courseDescPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.createCourseBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
