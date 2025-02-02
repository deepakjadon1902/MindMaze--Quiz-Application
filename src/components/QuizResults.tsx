import React from 'react';
import { Trophy, Award, BarChart, Star, Zap } from 'lucide-react';
import type { QuizQuestion, Achievement } from '../types';

interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: number[];
  score: number;
  onRestart: () => void;
  achievements: Achievement[];
}

export function QuizResults({ questions, answers, score, onRestart, achievements }: QuizResultsProps) {
  const totalPossibleScore = questions.reduce((acc, q) => acc + q.points, 0);
  const percentage = Math.round((score / totalPossibleScore) * 100);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return <Trophy />;
      case 'star': return <Star />;
      case 'zap': return <Zap />;
      default: return <Award />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
          <Trophy className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
        <p className="text-gray-600">Here's how you performed</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Award className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Score</p>
          <p className="text-xl font-bold text-gray-800">{score}/{totalPossibleScore}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <BarChart className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Percentage</p>
          <p className="text-xl font-bold text-gray-800">{percentage}%</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 ${
                achievement.unlocked
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${
                  achievement.unlocked ? 'text-green-500' : 'text-gray-400'
                }`}>
                  {getIconComponent(achievement.icon)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Review</h3>
        {questions.map((question, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-800 mb-2">{question.question}</p>
            <p className="text-sm text-gray-600">
              Your answer: {answers[index] === -1 ? "Time is up!" : question.options[answers[index]]}
            </p>
            <p className={`text-sm ${
              answers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'
            }`}>
              {answers[index] === question.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
            </p>
            {question.explanation && (
              <p className="text-sm text-blue-600 mt-2">{question.explanation}</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="w-full mt-8 bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}