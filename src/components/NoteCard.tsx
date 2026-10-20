"use client";

import React from "react";
import {
  Calendar,
  Star,
  Sparkles,
  ChevronRight,
  Trash2,
  Tag,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Note, Course } from "@/types";
import { getCourseColor } from "@/lib/colors";

interface NoteCardProps {
  note: Note;
  course?: Course;
  onSelect: (note: Note) => void;
  onToggleFavorite: (noteId: string, e: React.MouseEvent) => void;
  onDelete: (noteId: string, e: React.MouseEvent) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  course,
  onSelect,
  onToggleFavorite,
  onDelete,
}) => {
  const color = getCourseColor(course?.color);

  return (
    <div
      onClick={() => onSelect(note)}
      className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      <div>
        {/* Top Header: Course & Star & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 truncate">
            {course ? (
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${color.bg} ${color.text} ${color.border} truncate`}
              >
                {course.name}
              </span>
            ) : (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                Genel
              </span>
            )}

            <span className="flex items-center gap-1 text-[11px] text-zinc-500">
              <Calendar className="w-3 h-3" />
              {note.date}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Favorite Star */}
            <button
              onClick={(e) => onToggleFavorite(note.id, e)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title={note.isFavorite ? "Yıldızı Kaldır" : "Yıldızla"}
            >
              <Star
                className={`w-4 h-4 ${
                  note.isFavorite
                    ? "fill-amber-500 text-amber-500"
                    : "text-zinc-400 group-hover:text-zinc-500"
                }`}
              />
            </button>

            {/* Delete button */}
            <button
              onClick={(e) => onDelete(note.id, e)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 opacity-0 group-hover:opacity-100 transition"
              title="Notu Sil"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
          {note.title}
        </h4>

        {/* Thumbnail Preview if photo available */}
        {note.imageUrl && (
          <div className="mb-3 relative rounded-xl overflow-hidden h-24 bg-zinc-950/5 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <img
              src={note.imageUrl}
              alt={note.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 text-[10px] text-white backdrop-blur-sm flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> Orijinal Görsel
            </div>
          </div>
        )}

        {/* Summary Excerpt */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-3 leading-relaxed">
          {note.summary || note.rawText}
        </p>

        {/* Key Points snippet */}
        {note.keyPoints && note.keyPoints.length > 0 && (
          <div className="space-y-1 mb-3 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
            {note.keyPoints.slice(0, 2).map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 line-clamp-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span className="truncate">{point}</span>
              </div>
            ))}
            {note.keyPoints.length > 2 && (
              <span className="text-[11px] text-zinc-600 dark:text-zinc-400 block pl-5">
                +{note.keyPoints.length - 2} önemli madde daha
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer: Tags & Read Link */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-wrap gap-1 max-w-[70%] overflow-hidden h-6">
          {note.tags && note.tags.length > 0 ? (
            note.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium truncate"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Ders Notu
            </span>
          )}
        </div>

        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
          İncele <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
