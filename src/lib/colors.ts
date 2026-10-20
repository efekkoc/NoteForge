export const COLOR_MAP: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    dot: string;
  }
> = {
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-800",
    badgeBg: "bg-indigo-100 dark:bg-indigo-900/60",
    badgeText: "text-indigo-800 dark:text-indigo-200",
    dot: "bg-indigo-500",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    badgeBg: "bg-emerald-100 dark:bg-emerald-900/60",
    badgeText: "text-emerald-800 dark:text-emerald-200",
    dot: "bg-emerald-500",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
    badgeBg: "bg-purple-100 dark:bg-purple-900/60",
    badgeText: "text-purple-800 dark:text-purple-200",
    dot: "bg-purple-500",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
    badgeBg: "bg-amber-100 dark:bg-amber-900/60",
    badgeText: "text-amber-800 dark:text-amber-200",
    dot: "bg-amber-500",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
    badgeBg: "bg-rose-100 dark:bg-rose-900/60",
    badgeText: "text-rose-800 dark:text-rose-200",
    dot: "bg-rose-500",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-200 dark:border-cyan-800",
    badgeBg: "bg-cyan-100 dark:bg-cyan-900/60",
    badgeText: "text-cyan-800 dark:text-cyan-200",
    dot: "bg-cyan-500",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
    badgeBg: "bg-blue-100 dark:bg-blue-900/60",
    badgeText: "text-blue-800 dark:text-blue-200",
    dot: "bg-blue-500",
  },
};

export function getCourseColor(colorName?: string) {
  if (!colorName || !COLOR_MAP[colorName]) {
    return COLOR_MAP.indigo;
  }
  return COLOR_MAP[colorName];
}
