import { Course, Note } from "@/types";
import { Language } from "./i18n";

const STORAGE_KEYS = {
  COURSES: "ders_notu_courses_v2",
  NOTES: "ders_notu_notes_v2",
  API_KEY: "gemini_api_key",
  LANG: "ders_notu_language",
};

export function getCourses(): Course[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCourses(courses: Course[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
}

export function getNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
}

export function getStoredApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(STORAGE_KEYS.API_KEY) || "";
}

export function saveStoredApiKey(key: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
}

export function getStoredLang(): Language {
  if (typeof window === "undefined") return "tr";
  const val = localStorage.getItem(STORAGE_KEYS.LANG) as Language;
  if (val === "tr" || val === "en" || val === "es") return val;
  return "tr";
}

export function saveStoredLang(lang: Language) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.LANG, lang);
}
