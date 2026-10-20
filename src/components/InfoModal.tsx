"use client";

import React from "react";
import {
  X,
  Key,
  Camera,
  Cpu,
  FolderOpen,
  Download,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Translations } from "@/lib/i18n";

interface InfoModalProps {
  isOpen: boolean;
  t: Translations;
  onClose: () => void;
  onOpenSettings: () => void;
  onOpenCapture: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  t,
  onClose,
  onOpenSettings,
  onOpenCapture,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: <Key className="w-5 h-5 text-indigo-500" />,
      badgeBg: "bg-indigo-50 dark:bg-indigo-950/60",
      title: t.infoStep1Title,
      desc: t.infoStep1Desc,
      action: {
        label: t.enterKeyBtn,
        onClick: () => {
          onClose();
          onOpenSettings();
        },
      },
    },
    {
      icon: <Camera className="w-5 h-5 text-emerald-500" />,
      badgeBg: "bg-emerald-50 dark:bg-emerald-950/60",
      title: t.infoStep2Title,
      desc: t.infoStep2Desc,
      action: {
        label: t.captureNote,
        onClick: () => {
          onClose();
          onOpenCapture();
        },
      },
    },
    {
      icon: <Cpu className="w-5 h-5 text-violet-500" />,
      badgeBg: "bg-violet-50 dark:bg-violet-950/60",
      title: t.infoStep3Title,
      desc: t.infoStep3Desc,
    },
    {
      icon: <FolderOpen className="w-5 h-5 text-amber-500" />,
      badgeBg: "bg-amber-50 dark:bg-amber-950/60",
      title: t.infoStep4Title,
      desc: t.infoStep4Desc,
    },
    {
      icon: <Download className="w-5 h-5 text-cyan-500" />,
      badgeBg: "bg-cyan-50 dark:bg-cyan-950/60",
      title: t.infoStep5Title,
      desc: t.infoStep5Desc,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Sparkles className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {t.infoModalTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
              {t.infoModalSubtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 flex items-start gap-4 transition hover:border-indigo-300 dark:hover:border-indigo-700"
            >
              <div
                className={`w-10 h-10 rounded-xl ${step.badgeBg} flex items-center justify-center shrink-0 mt-0.5`}
              >
                {step.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
                {step.action && (
                  <button
                    onClick={step.action.onClick}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
                  >
                    <span>{step.action.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 transition flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 stroke-[2.5]" />
            <span>{t.infoCloseBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
