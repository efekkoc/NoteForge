"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Camera,
  Upload,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Cpu,
  Layers,
} from "lucide-react";
import { Course, AnalysisResult, Note } from "@/types";
import { Language, Translations } from "@/lib/i18n";

interface CaptureModalProps {
  isOpen: boolean;
  courses: Course[];
  apiKey: string;
  lang: Language;
  t: Translations;
  onClose: () => void;
  onSaveNote: (note: Note, suggestedCourseName?: string) => void;
  onOpenSettings: () => void;
}

export const CaptureModal: React.FC<CaptureModalProps> = ({
  isOpen,
  courses,
  apiKey,
  lang,
  t,
  onClose,
  onSaveNote,
  onOpenSettings,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("auto");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage(t.invalidImageError);
      return;
    }

    setErrorMessage(null);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetCapture = () => {
    setImagePreview(null);
    setErrorMessage(null);
    setIsProcessing(false);
    setCurrentStep(0);
  };

  const handleStartAnalysis = async () => {
    if (!imagePreview) {
      setErrorMessage(t.invalidImageError);
      return;
    }

    if (!apiKey) {
      setErrorMessage(t.apiKeyMissingWarning);
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setCurrentStep(1);

    try {
      setTimeout(() => setCurrentStep(2), 1200);

      const courseNames = courses.map((c) => c.name);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType,
          courseNames,
          customPrompt,
          apiKey,
          lang, // pass selected language to backend prompt
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Analysis error");
      }

      setCurrentStep(3);

      const result: AnalysisResult = data.data;

      // Determine course
      let targetCourseId = selectedCourseId;
      if (selectedCourseId === "auto") {
        const found = courses.find(
          (c) =>
            c.name.toLowerCase() === result.courseName?.toLowerCase() ||
            (result.courseName && c.name.toLowerCase().includes(result.courseName.toLowerCase()))
        );
        targetCourseId = found ? found.id : courses[0]?.id || `course-${Date.now()}`;
      }

      const localeMap = { tr: "tr-TR", en: "en-US", es: "es-ES" };
      const dateStr = new Date().toLocaleDateString(localeMap[lang] || "tr-TR");

      const newNote: Note = {
        id: `note-${Date.now()}`,
        courseId: targetCourseId,
        title: result.title || "Note " + dateStr,
        date: dateStr,
        imageUrl: imagePreview,
        rawText: result.rawText || "",
        summary: result.summary || "",
        keyPoints: result.keyPoints || [],
        examTips: result.examTips || [],
        tags: result.tags || [],
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onSaveNote(newNote, selectedCourseId === "auto" ? result.courseName : undefined);
      resetCapture();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred.");
      setIsProcessing(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl p-5 sm:p-7 relative my-auto">
        {!isProcessing && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-md shadow-cyan-500/25">
            <Sparkles className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {t.captureModalTitle}
            </h3>
            <p className="text-xs text-zinc-500">
              {t.captureModalSubtitle}
            </p>
          </div>
        </div>

        {!apiKey && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-3 text-xs text-amber-800 dark:text-amber-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{t.apiKeyMissingWarning}</span>
            </div>
            <button
              onClick={onOpenSettings}
              className="px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-medium shrink-0"
            >
              {t.enterKeyBtn}
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        {!imagePreview ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="p-6 border-2 border-dashed border-indigo-300 dark:border-indigo-800/80 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 flex flex-col items-center justify-center text-center gap-3 transition group"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition">
                <Camera className="w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {t.cameraOptionTitle}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {t.cameraOptionDesc}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl hover:border-indigo-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 flex flex-col items-center justify-center text-center gap-3 transition group"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center group-hover:scale-110 transition">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {t.uploadOptionTitle}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {t.uploadOptionDesc}
                </p>
              </div>
            </button>
          </div>
        ) : (
          <div className="mb-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-950 max-h-72 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-72 w-auto object-contain"
              />

              {isProcessing && (
                <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute top-0 animate-[scan_2s_ease-in-out_infinite]" />
                  <div className="bg-black/70 border border-indigo-500/40 rounded-2xl px-5 py-4 flex flex-col items-center gap-3 text-white max-w-xs shadow-2xl">
                    <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
                    <div className="text-center">
                      <p className="font-bold text-sm">{t.processingBtn}</p>
                      <p className="text-xs text-zinc-300 mt-0.5">
                        {currentStep === 1 && t.analyzingStep1}
                        {currentStep === 2 && t.analyzingStep2}
                        {currentStep === 3 && t.analyzingStep3}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!isProcessing && (
                <button
                  type="button"
                  onClick={resetCapture}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-white text-xs font-medium backdrop-blur-md flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {t.retakePhoto}
                </button>
              )}
            </div>

            {!isProcessing && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    {t.courseCategoryLabel}
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="auto">{t.autoDetectCourse}</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} {course.code ? `(${course.code})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                    {t.customPromptLabel}
                  </label>
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder={t.customPromptPlaceholder}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 transition"
          >
            {t.cancelBtn}
          </button>
          <button
            type="button"
            onClick={handleStartAnalysis}
            disabled={!imagePreview || isProcessing}
            className="flex-[2] px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 hover:from-cyan-300 hover:to-teal-300 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>{t.processingBtn}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>{t.startAnalysisBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
