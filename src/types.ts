export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  timeLimit?: number; // Time limit in seconds
  explanation?: string; // Explanation for the correct answer
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: number[];
  isComplete: boolean;
  questions: QuizQuestion[];
  isLoading: boolean;
  error: string | null;
  streak: number; // Current streak of correct answers
  timeRemaining: number | null; // Time remaining for current question
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}