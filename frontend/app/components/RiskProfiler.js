'use client';
import { useState } from 'react';
import Link from 'next/link';

const questions = [
  {
    id: 1,
    question: 'What is your primary investment goal?',
    options: [
      { label: 'Capital preservation — keeping my money safe', score: 1 },
      { label: 'Regular income with modest growth', score: 2 },
      { label: 'Balanced growth with some income', score: 3 },
      { label: 'Maximum long-term capital growth', score: 4 },
    ],
  },
  {
    id: 2,
    question: 'How long do you plan to keep your money invested?',
    options: [
      { label: 'Less than 1 year', score: 1 },
      { label: '1 to 3 years', score: 2 },
      { label: '3 to 7 years', score: 3 },
      { label: 'More than 7 years', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'If your investment fell by 20% in a year, you would:',
    options: [
      { label: 'Withdraw everything immediately', score: 1 },
      { label: 'Feel very uncomfortable and consider withdrawing', score: 2 },
      { label: 'Hold on and wait for recovery', score: 3 },
      { label: 'See it as a buying opportunity and invest more', score: 4 },
    ],
  },
  {
    id: 4,
    question: 'What percentage of your savings are you investing?',
    options: [
      { label: 'More than 75% — this is most of my savings', score: 1 },
      { label: '50–75% — a significant portion', score: 2 },
      { label: '25–50% — a moderate portion', score: 3 },
      { label: 'Less than 25% — a small portion', score: 4 },
    ],
  },
  {
    id: 5,
    question: 'Which best describes your investment experience?',
    options: [
      { label: 'I have little to no investment experience', score: 1 },
      { label: 'I have some experience with savings accounts and FDs', score: 2 },
      { label: 'I have experience with unit trusts and bonds', score: 3 },
      { label: 'I am experienced with equities and complex investments', score: 4 },
    ],
  },
];

const profiles = [
  {
    min: 5,
    max: 8,
    label: 'Conservative',
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    icon: '🛡️',
    description:
      'You prefer capital preservation and low-risk investments. Suitable products focus on stability and guaranteed returns.',
    products: ['Fixed Deposits', 'Government Securities', 'Money Market Funds'],
  },
  {
    min: 9,
    max: 12,
    label: 'Moderate',
    color: 'text-green-700',
    bg: 'bg-green-50 border-green-200',
    icon: '⚖️',
    description:
      'You seek a balance between security and growth, tolerating some risk for better returns.',
    products: ['Balanced Unit Trusts', 'Corporate Bonds', 'Fixed Deposits', 'Dividend Stocks'],
  },
  {
    min: 13,
    max: 16,
    label: 'Balanced',
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200',
    icon: '📈',
    description:
      'You are comfortable with moderate risk and seek growth over the medium to long term.',
    products: ['Equity Unit Trusts', 'Mixed Bonds', 'Blue-chip Equities'],
  },
  {
    min: 17,
    max: 20,
    label: 'Aggressive',
    color: 'text-orange-700',
    bg: 'bg-orange-50 border-orange-200',
    icon: '🚀',
    description:
      'You are prepared to accept high risk for the potential of maximum long-term capital growth.',
    products: ['Equity Portfolio', 'Growth Unit Trusts', 'Emerging Market Funds'],
  },
];

export default function RiskProfiler() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const totalQ = questions.length;
  const progress = ((currentQ) / totalQ) * 100;

  const handleSelect = (score) => setSelected(score);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    if (currentQ + 1 >= totalQ) {
      setAnswers(newAnswers);
      setFinished(true);
    } else {
      setAnswers(newAnswers);
      setCurrentQ((prev) => prev + 1);
      setSelected(null);
    }
  };

  const handleBack = () => {
    if (currentQ === 0) return;
    const newAnswers = answers.slice(0, -1);
    setAnswers(newAnswers);
    setCurrentQ((prev) => prev - 1);
    setSelected(newAnswers[newAnswers.length - 1] || null);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setFinished(false);
  };

  const getProfile = () => {
    const total = answers.reduce((a, b) => a + b, 0);
    return profiles.find((p) => total >= p.min && total <= p.max) || profiles[0];
  };

  if (finished) {
    const profile = getProfile();
    return (
      <div className={`rounded-2xl border-2 p-8 ${profile.bg}`}>
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{profile.icon}</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Risk Profile</h3>
          <div className={`text-3xl font-bold ${profile.color} mb-4`}>{profile.label} Investor</div>
          <p className="text-gray-700 max-w-lg mx-auto">{profile.description}</p>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6">
          <h4 className="font-bold text-gray-800 mb-3">Recommended Products for You:</h4>
          <ul className="space-y-2">
            {profile.products.map((p) => (
              <li key={p} className="flex items-center gap-2 text-gray-700">
                <span className="text-[#C8961E] font-bold">✓</span> {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/products"
            className="flex-1 bg-[#1B2B5B] hover:bg-[#C8961E] text-white font-bold py-3 px-6 rounded-xl text-center transition-colors"
          >
            View Matching Products
          </Link>
          <button
            onClick={handleRestart}
            className="flex-1 bg-white border-2 border-gray-200 hover:border-[#C8961E] text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white font-semibold text-sm">Question {currentQ + 1} of {totalQ}</span>
          <span className="text-[#C8961E] text-sm font-bold">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-[#C8961E] h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#1B2B5B] mb-6">{question.question}</h3>

        <div className="space-y-3 mb-6">
          {question.options.map((opt) => (
            <button
              key={opt.score}
              onClick={() => handleSelect(opt.score)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selected === opt.score
                  ? 'border-[#C8961E] bg-[#F5E6C0] text-[#1B2B5B] font-semibold'
                  : 'border-gray-200 hover:border-[#C8961E]/50 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className={`inline-block w-6 h-6 rounded-full border-2 mr-3 flex-shrink-0 transition-colors ${
                selected === opt.score ? 'border-[#C8961E] bg-[#C8961E]' : 'border-gray-300'
              }`}></span>
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          {currentQ > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="flex-1 bg-[#1B2B5B] hover:bg-[#C8961E] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
          >
            {currentQ + 1 >= totalQ ? 'See My Profile' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  );
}
