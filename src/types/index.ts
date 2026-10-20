export interface Course {
  id: string;
  name: string;
  code?: string;
  color: string; // Tailwind color name like 'indigo', 'emerald', 'amber', 'rose', 'purple', 'cyan'
  icon?: string;
  description?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  courseId: string;
  title: string;
  date: string;
  imageUrl?: string;
  rawText: string;
  summary: string;
  keyPoints: string[];
  examTips?: string[];
  tags: string[];
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AnalysisResult {
  title: string;
  courseName?: string;
  rawText: string;
  summary: string;
  keyPoints: string[];
  examTips: string[];
  tags: string[];
}
