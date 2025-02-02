import React, { useEffect, useState, useCallback } from 'react';
import { Loader2, AlertCircle, Trophy, Star, Zap, Timer } from 'lucide-react';
import type { QuizState, QuizQuestion, Achievement } from './types';
import { QuizCard } from './components/QuizCard';
import { QuizResults } from './components/QuizResults';

// Enhanced fallback questions with more variety and features
const FALLBACK_QUESTIONS = [
  {
    id: 1,
    question: "What is React's virtual DOM?",
    options: [
      "A complete copy of the real DOM",
      "A lightweight copy of the real DOM in memory",
      "A virtual reality interface for DOM manipulation",
      "A browser extension for React"
    ],
    correctAnswer: 1,
    points: 10,
    timeLimit: 30,
    explanation: "The virtual DOM is a lightweight JavaScript representation of the actual DOM in memory, which React uses to optimize rendering performance."
  },
  {
    id: 2,
    question: "Which hook is used for side effects in React?",
    options: [
      "useState",
      "useEffect",
      "useContext",
      "useReducer"
    ],
    correctAnswer: 1,
    points: 10,
    timeLimit: 20,
    explanation: "useEffect is the hook specifically designed for handling side effects in React components."
  },
  {
    id: 3,
    question: "What is the purpose of React's useCallback hook?",
    options: [
      "To create memoized callback functions",
      "To handle form submissions",
      "To manage component state",
      "To create DOM references"
    ],
    correctAnswer: 0,
    points: 15,
    timeLimit: 25,
    explanation: "useCallback returns a memoized version of a callback that only changes if one of its dependencies has changed."
  },
  {
    id: 4,
    question: "What is the key prop in React used for?",
    options: [
      "Styling components",
      "Unique identification of elements in lists",
      "State management",
      "Event handling"
    ],
    correctAnswer: 1,
    points: 10,
    timeLimit: 20,
    explanation: "The key prop helps React identify which items have changed, been added, or been removed in lists."
  },
  {
    id: 5,
    question: "What is React's StrictMode?",
    options: [
      "A tool for TypeScript integration",
      "A development mode for catching potential problems",
      "A production optimization feature",
      "A code formatting tool"
    ],
    correctAnswer: 1,
    points: 20,
    timeLimit: 30,
    explanation: "StrictMode is a development mode feature that helps identify potential problems in an application."
  },
  {
    "id": 6,
    "question": "What does JSX stand for in React?",
    "options": [
      "JavaScript XML",
      "JavaScript Extension",
      "JavaScript Execution",
      "Java Syntax Extension"
    ],
    "correctAnswer": 0,
    "points": 10,
    "timeLimit": 20,
    "explanation": "JSX stands for JavaScript XML, a syntax extension that allows writing HTML in JavaScript."
  },
  {
    "id": 7,
    "question": "Which hook is used to manage state in a functional component?",
    "options": [
      "useState",
      "useReducer",
      "useEffect",
      "useMemo"
    ],
    "correctAnswer": 0,
    "points": 10,
    "timeLimit": 20,
    "explanation": "useState is the primary hook for managing state in functional components."
  },
  {
    "id": 8,
    "question": "What is the purpose of useMemo in React?",
    "options": [
      "To memorize component state",
      "To optimize performance by memoizing values",
      "To handle side effects",
      "To create a reference to a DOM element"
    ],
    "correctAnswer": 1,
    "points": 15,
    "timeLimit": 25,
    "explanation": "useMemo is used to optimize performance by memoizing values to avoid unnecessary recalculations."
  },
  {
    "id": 9,
    "question": "Which lifecycle method is equivalent to useEffect with no dependencies?",
    "options": [
      "componentDidMount",
      "componentDidUpdate",
      "componentWillUnmount",
      "shouldComponentUpdate"
    ],
    "correctAnswer": 0,
    "points": 15,
    "timeLimit": 25,
    "explanation": "useEffect with an empty dependency array runs once when the component mounts, similar to componentDidMount."
  },
  {
    "id": 10,
    "question": "What is React Fragment used for?",
    "options": [
      "To group multiple elements without adding extra nodes to the DOM",
      "To format JSX code",
      "To manage component state",
      "To create virtual elements"
    ],
    "correctAnswer": 0,
    "points": 10,
    "timeLimit": 20,
    "explanation": "React.Fragment allows grouping multiple elements without adding extra nodes to the DOM."
  },
  {
    "id": 11,
    "question": "What does the Context API solve in React?",
    "options": [
      "Complex animations",
      "State management without prop drilling",
      "Global error handling",
      "Automatic performance optimization"
    ],
    "correctAnswer": 1,
    "points": 20,
    "timeLimit": 30,
    "explanation": "The Context API provides a way to manage global state without passing props manually at every level."
  },
  {
    "id": 12,
    "question": "Which method is used to update the state in a class component?",
    "options": [
      "setState",
      "useState",
      "updateState",
      "modifyState"
    ],
    "correctAnswer": 0,
    "points": 10,
    "timeLimit": 20,
    "explanation": "In class components, setState is used to update the state."
  },
  {
    "id": 13,
    "question": "What is the default behavior of useEffect?",
    "options": [
      "It runs only once when the component mounts",
      "It runs after every render",
      "It runs only when state changes",
      "It runs before the component renders"
    ],
    "correctAnswer": 1,
    "points": 15,
    "timeLimit": 25,
    "explanation": "By default, useEffect runs after every render unless dependencies are specified."
  },
  {
    "id": 14,
    "question": "Which of the following is NOT a built-in React hook?",
    "options": [
      "useRef",
      "useReducer",
      "useDispatch",
      "useMemo"
    ],
    "correctAnswer": 2,
    "points": 15,
    "timeLimit": 25,
    "explanation": "useDispatch is not a built-in React hook but is commonly used with Redux."
  },
  {
    "id": 15,
    "question": "What is React Suspense used for?",
    "options": [
      "To handle asynchronous data loading",
      "To replace setState",
      "To manage animations",
      "To delay component rendering"
    ],
    "correctAnswer": 0,
    "points": 20,
    "timeLimit": 30,
    "explanation": "React Suspense helps handle asynchronous operations like data fetching efficiently."
  },
  {
    "id": 16,
    "question": "What does the 'key' prop help React with?",
    "options": [
      "Performance optimization in lists",
      "Managing global state",
      "Handling asynchronous events",
      "Passing props between components"
    ],
    "correctAnswer": 0,
    "points": 10,
    "timeLimit": 20,
    "explanation": "The key prop helps React efficiently update and re-render list items."
  },
  {
    "id": 17,
    "question": "Which company developed React?",
    "options": [
      "Google",
      "Facebook (Meta)",
      "Microsoft",
      "Apple"
    ],
    "correctAnswer": 1,
    "points": 10,
    "timeLimit": 20,
    "explanation": "React was developed by Facebook (now Meta)."
  },
  {
    "id": 18,
    "question": "Which of the following is a valid way to conditionally render a component in React?",
    "options": [
      "Using if-else statements",
      "Using the ternary operator",
      "Using logical && operator",
      "All of the above"
    ],
    "correctAnswer": 3,
    "points": 15,
    "timeLimit": 25,
    "explanation": "React allows conditional rendering using if-else, the ternary operator, and the && logical operator."
  },
  {
    "id": 19,
    "question": "What is React Portal used for?",
    "options": [
      "To optimize rendering",
      "To render children into a different part of the DOM",
      "To create private routes",
      "To manage state"
    ],
    "correctAnswer": 1,
    "points": 20,
    "timeLimit": 30,
    "explanation": "React Portals allow rendering a component into a different DOM node outside of its parent hierarchy."
  },
  {
    "id": 20,
    "question": "Which of the following statements about React is true?",
    "options": [
      "React is a framework",
      "React only works on the frontend",
      "React is a library for building UI components",
      "React does not support server-side rendering"
    ],
    "correctAnswer": 2,
    "points": 10,
    "timeLimit": 20,
    "explanation": "React is a JavaScript library for building user interfaces."
  }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Score 100% on the quiz',
    unlocked: false,
    icon: 'trophy'
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Answer 3 questions with more than 50% time remaining',
    unlocked: false,
    icon: 'zap'
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Get a streak of 3 correct answers',
    unlocked: false,
    icon: 'star'
  }
];

const QUIZ_API = 'https://api.npoint.io/7d16b5d0f6b5b7a5e1f7';

const initialState: QuizState = {
  currentQuestion: 0,
  score: 0,
  answers: [],
  isComplete: false,
  questions: [],
  isLoading: true,
  error: null,
  streak: 0,
  timeRemaining: null,
  achievements: INITIAL_ACHIEVEMENTS
};

function App() {
  const [state, setState] = useState<QuizState>(initialState);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (state.questions[state.currentQuestion]?.timeLimit && !state.isComplete) {
      const timer = startTimer(state.questions[state.currentQuestion].timeLimit!);
      return () => clearInterval(timer);
    }
  }, [state.currentQuestion, state.isComplete]);

  const startTimer = (timeLimit: number) => {
    setState(prev => ({ ...prev, timeRemaining: timeLimit }));
    return setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining === 1) {
          handleNextQuestion(true);
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining! - 1 };
      });
    }, 1000);
  };

  const fetchQuizData = async () => {
    try {
      const response = await fetch(QUIZ_API);
      if (!response.ok) throw new Error('Failed to fetch quiz data');
      const data = await response.json();
      
      const questions = Array.isArray(data) ? data : data?.questions;
      
      if (!Array.isArray(questions) || questions.length === 0) {
        console.warn('Using fallback questions due to invalid API response');
        setState(prev => ({ 
          ...prev, 
          questions: FALLBACK_QUESTIONS, 
          isLoading: false 
        }));
        return;
      }
      
      setState(prev => ({ 
        ...prev, 
        questions, 
        isLoading: false 
      }));
    } catch (error) {
      console.error('Quiz loading error:', error);
      console.warn('Using fallback questions due to API error');
      setState(prev => ({
        ...prev,
        questions: FALLBACK_QUESTIONS,
        isLoading: false
      }));
    }
  };

  const checkAchievements = useCallback((newScore: number, newStreak: number, timeRemaining: number | null) => {
    const totalPossibleScore = state.questions.reduce((acc, q) => acc + q.points, 0);
    const newAchievements = [...state.achievements];

    // Perfect Score Achievement
    if (newScore === totalPossibleScore && !newAchievements.find(a => a.id === 'perfect_score')?.unlocked) {
      newAchievements.find(a => a.id === 'perfect_score')!.unlocked = true;
    }

    // Streak Master Achievement
    if (newStreak >= 3 && !newAchievements.find(a => a.id === 'streak_master')?.unlocked) {
      newAchievements.find(a => a.id === 'streak_master')!.unlocked = true;
    }

    // Speed Demon Achievement
    const currentQuestion = state.questions[state.currentQuestion];
    if (timeRemaining && timeRemaining > currentQuestion.timeLimit! / 2) {
      const speedAnswers = state.answers.filter((_, i) => 
        state.questions[i].timeLimit! / 2 < (state.questions[i].timeLimit || 0)
      ).length;
      
      if (speedAnswers >= 2 && !newAchievements.find(a => a.id === 'speed_demon')?.unlocked) {
        newAchievements.find(a => a.id === 'speed_demon')!.unlocked = true;
      }
    }

    return newAchievements;
  }, [state.questions, state.currentQuestion, state.answers]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = (timeUp: boolean = false) => {
    if (timeUp && selectedAnswer === null) {
      const newAnswers = [...state.answers, -1];
      setState(prev => ({
        ...prev,
        streak: 0,
        answers: newAnswers,
        currentQuestion: prev.currentQuestion + 1,
        timeRemaining: null
      }));
      return;
    }

    const currentQuestion = state.questions[state.currentQuestion];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newScore = state.score + (isCorrect ? currentQuestion.points : 0);
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newAnswers = [...state.answers, selectedAnswer!];

    const newAchievements = checkAchievements(newScore, newStreak, state.timeRemaining);

    if (state.currentQuestion === state.questions.length - 1) {
      setState(prev => ({
        ...prev,
        score: newScore,
        streak: newStreak,
        answers: newAnswers,
        isComplete: true,
        achievements: newAchievements,
        timeRemaining: null
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        score: newScore,
        streak: newStreak,
        answers: newAnswers,
        achievements: newAchievements,
        timeRemaining: null
      }));
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: 0,
      score: 0,
      streak: 0,
      answers: [],
      isComplete: false,
      timeRemaining: null,
      achievements: INITIAL_ACHIEVEMENTS
    }));
    setSelectedAnswer(null);
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <span className="text-gray-600">Loading quiz...</span>
        </div>
      </div>
    );
  }

  if (state.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center gap-2 text-red-500 mb-4">
            <AlertCircle className="w-6 h-6" />
            <span className="font-medium">Error</span>
          </div>
          <p className="text-gray-600 mb-4">Failed to load quiz. Please try again later.</p>
          <button
            onClick={fetchQuizData}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.isComplete) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <QuizResults
          questions={state.questions}
          answers={state.answers}
          score={state.score}
          onRestart={handleRestart}
          achievements={state.achievements}
        />
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">{state.score} points</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Streak: {state.streak}</span>
            </div>
          </div>
          {state.timeRemaining !== null && (
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{state.timeRemaining}s</span>
            </div>
          )}
        </div>

        <QuizCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleAnswerSelect}
          questionNumber={state.currentQuestion}
          totalQuestions={state.questions.length}
        />
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => handleNextQuestion(false)}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedAnswer === null
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {state.currentQuestion === state.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;