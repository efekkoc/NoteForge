"use client";

import React from "react";
import { FolderOpen, Star, Plus } from "lucide-react";
import { Course } from "@/types";
import { getCourseColor } from "@/lib/colors";
import { Translations } from "@/lib/i18n";

interface CourseSidebarProps {
  courses: Course[];
  selectedCourseId: string | null;
  t: Translations;
  onSelectCourse: (id: string | null) => void;
  onOpenNewCourse: () => void;
  notesCounts: Record<string, number>;
  totalNotesCount: number;
  favoritesCount: number;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  courses,
  selectedCourseId,
  t,
  onSelectCourse,
  onOpenNewCourse,
  notesCounts,
  totalNotesCount,
  favoritesCount,
}) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0 space-y-6">
      {/* Overview Group */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 shadow-sm space-y-1">
        <button
          onClick={() => onSelectCourse(null)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
            selectedCourseId === null
              ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <FolderOpen className="w-4 h-4 text-indigo-500" />
            <span>{t.allNotes}</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">
            {totalNotesCount}
          </span>
        </button>

        <button
          onClick={() => onSelectCourse("favorites")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
            selectedCourseId === "favorites"
              ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-semibold"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{t.starredNotes}</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">
            {favoritesCount}
          </span>
        </button>
      </div>

      {/* Courses Group */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 shadow-sm space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {t.courseLibrary} ({courses.length})
          </span>
          <button
            onClick={onOpenNewCourse}
            className="p-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition"
            title={t.newCourseBtn}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {courses.length > 0 ? (
          <div className="space-y-1">
            {courses.map((course) => {
              const count = notesCounts[course.id] || 0;
              const isSelected = selectedCourseId === course.id;
              const color = getCourseColor(course.color);

              return (
                <button
                  key={course.id}
                  onClick={() => onSelectCourse(course.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition group text-left ${
                    isSelected
                      ? `${color.bg} ${color.text} font-semibold ring-1 ${color.border}`
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`w-2.5 h-2.5 rounded-full ${color.dot} shrink-0`} />
                    <div className="truncate">
                      <span className="block truncate leading-tight">{course.name}</span>
                      {course.code && (
                        <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-normal">
                          {course.code}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ml-2 ${
                      isSelected
                        ? `${color.badgeBg} ${color.badgeText}`
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-zinc-600 dark:text-zinc-400 px-2 italic py-1">
            {t.noCoursesYet}
          </p>
        )}

        <button
          onClick={onOpenNewCourse}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.newCourseBtn}</span>
        </button>
      </div>
    </aside>
  );
};
