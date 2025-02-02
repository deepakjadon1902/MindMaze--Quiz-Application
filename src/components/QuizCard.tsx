import React from 'react';
import { Trophy, AlertCircle } from 'lucide-react';
import type { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
}: QuizCardProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber + 1}/{totalQuestions}
        </span>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-medium text-gray-700">{question.points} points</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              selectedAnswer === index
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            }`}
          >
            <span className="font-medium">{option}</span>
          </button>
        ))}
      </div>

      {question.explanation && selectedAnswer !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}