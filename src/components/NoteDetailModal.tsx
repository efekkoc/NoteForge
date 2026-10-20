"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  Copy,
  Check,
  Download,
  Calendar,
  Trash2,
  Edit3,
  BookOpen,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Save,
  Tag,
  ExternalLink,
} from "lucide-react";
import { Note, Course } from "@/types";
import { getCourseColor } from "@/lib/colors";
import { Translations } from "@/lib/i18n";

interface NoteDetailModalProps {
  note: Note | null;
  courses: Course[];
  isOpen: boolean;
  t: Translations;
  onClose: () => void;
  onUpdateNote: (updatedNote: Note) => void;
  onDeleteNote: (noteId: string) => void;
  onToggleFavorite: (noteId: string) => void;
}

export const NoteDetailModal: React.FC<NoteDetailModalProps> = ({
  note,
  courses,
  isOpen,
  t,
  onClose,
  onUpdateNote,
  onDeleteNote,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<"summary" | "ocr" | "photo" | "edit">("summary");
  const [copied, setCopied] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editCourseId, setEditCourseId] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editRawText, setEditRawText] = useState("");
  const [editTags, setEditTags] = useState("");

  React.useEffect(() => {
    if (note) {
      setEditTitle(note.title);
      setEditCourseId(note.courseId);
      setEditSummary(note.summary);
      setEditRawText(note.rawText);
      setEditTags((note.tags || []).join(", "));
      setActiveTab("summary");
    }
  }, [note]);

  if (!isOpen || !note) return null;

  const course = courses.find((c) => c.id === note.courseId);
  const color = getCourseColor(course?.color);

  const handleCopyMarkdown = () => {
    const content = `# ${note.title}\n**Course:** ${course?.name || "General"} | **Date:** ${
      note.date
    }\n\n## Summary\n${note.summary}\n\n## Key Points\n${(note.keyPoints || [])
      .map((k) => `- ${k}`)
      .join("\n")}\n\n## Exam Tips\n${(note.examTips || [])
      .map((t) => `- ${t}`)
      .join("\n")}\n\n## Full Transcription\n${note.rawText}`;

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const content = `# ${note.title}\nCourse: ${course?.name || "General"}\nDate: ${
      note.date
    }\n\n## Summary\n${note.summary}\n\n## Key Points\n${(note.keyPoints || [])
      .map((k) => `- ${k}`)
      .join("\n")}\n\n## Exam Tips\n${(note.examTips || [])
      .map((t) => `- ${t}`)
      .join("\n")}\n\n## Full Transcription\n${note.rawText}`;

    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.title.replace(/[^a-zA-Z0-9ığüşöçİĞÜŞÖÇ_ -]/g, "")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveEdit = () => {
    const updated: Note = {
      ...note,
      title: editTitle.trim() || note.title,
      courseId: editCourseId,
      summary: editSummary.trim(),
      rawText: editRawText.trim(),
      tags: editTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      updatedAt: new Date().toISOString(),
    };
    onUpdateNote(updated);
    setActiveTab("summary");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[92vh] shadow-2xl flex flex-col relative my-auto overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="space-y-1.5 flex-1 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              {course && (
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${color.bg} ${color.text} ${color.border}`}
                >
                  {course.name}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <Calendar className="w-3.5 h-3.5" />
                {note.date}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {note.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleFavorite(note.id)}
              className="p-2 rounded-xl text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title="Star"
            >
              <Star
                className={`w-5 h-5 ${
                  note.isFavorite ? "fill-amber-500 text-amber-500" : ""
                }`}
              />
            </button>
            <button
              onClick={handleCopyMarkdown}
              className="p-2 rounded-xl text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title={t.copyMarkdown}
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="p-2 rounded-xl text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title={t.downloadMarkdown}
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (confirm(t.deleteConfirm)) {
                  onDeleteNote(note.id);
                  onClose();
                }
              }}
              className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
              title={t.deleteNote}
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 bg-white dark:bg-zinc-900 gap-2 sm:gap-4 overflow-x-auto">
            <button
            onClick={() => setActiveTab("summary")}
            className={`py-3 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === "summary"
                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.detailSummaryTab}</span>
          </button>
          <button
            onClick={() => setActiveTab("ocr")}
            className={`py-3 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === "ocr"
                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.detailOcrTab}</span>
          </button>
          {note.imageUrl && (
            <button
              onClick={() => setActiveTab("photo")}
              className={`py-3 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
                activeTab === "photo"
                  ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t.detailPhotoTab}</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab("edit")}
            className={`py-3 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition ml-auto ${
              activeTab === "edit"
                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{t.detailEditTab}</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === "summary" && (
            <div className="space-y-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-bold text-sm mb-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t.summaryTitle}</span>
                </div>
                <p className="text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {note.summary}
                </p>
              </div>

              {note.keyPoints && note.keyPoints.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{t.keyPointsTitle}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {note.keyPoints.map((point, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {note.examTips && note.examTips.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{t.examTipsTitle}</span>
                  </div>
                  <ul className="space-y-1.5 pl-5 list-disc text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                    {note.examTips.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <Tag className="w-3.5 h-3.5 text-zinc-400" />
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "ocr" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  {t.fullOcrDesc}
                </span>
                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.copyMarkdown}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-indigo-500 selection:text-white">
                {note.rawText || "No text available."}
              </div>
            </div>
          )}

          {activeTab === "photo" && note.imageUrl && (
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 flex items-center justify-center p-2">
                <img
                  src={note.imageUrl}
                  alt={note.title}
                  className="max-h-[60vh] w-auto object-contain rounded-xl"
                />
              </div>
              <a
                href={note.imageUrl}
                target="_blank"
                rel="noreferrer"
                download={`photo-${note.id}.jpg`}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                <span>{t.openOriginalPhoto}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {activeTab === "edit" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t.editTitleLabel}
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t.editCourseLabel}
                </label>
                <select
                  value={editCourseId}
                  onChange={(e) => setEditCourseId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t.editSummaryLabel}
                </label>
                <textarea
                  rows={4}
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t.editOcrLabel}
                </label>
                <textarea
                  rows={6}
                  value={editRawText}
                  onChange={(e) => setEditRawText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t.editTagsLabel}
                </label>
                <input
                  type="text"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("summary")}
                  className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 text-sm font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.saveChangesBtn}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
