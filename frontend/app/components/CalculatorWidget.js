'use client';
import { useState, useCallback } from 'react';

const MODES = [
  { key: 'fd', label: 'Fixed Deposit' },
  { key: 'returns', label: 'Returns Calculator' },
];

function formatLKR(amount) {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function CalculatorWidget() {
  const [mode, setMode] = useState('fd');
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const errs = {};
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(tenure);
    if (!principal || isNaN(p) || p <= 0) errs.principal = 'Enter a valid principal amount';
    if (!rate || isNaN(r) || r <= 0 || r > 50) errs.rate = 'Enter a valid interest rate (0–50%)';
    if (!tenure || isNaN(t) || t <= 0 || t > 360) errs.tenure = 'Enter tenure in months (1–360)';
    return errs;
  }, [principal, rate, tenure]);

  const calculate = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); setResult(null); return; }
    setErrors({});
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(tenure);

    if (mode === 'fd') {
      // Simple FD interest
      const interest = (p * r * t) / (12 * 100);
      const maturity = p + interest;
      setResult({ principal: p, interest, maturity, rate: r, tenure: t });
    } else {
      // Compound annual returns
      const years = t / 12;
      const maturity = p * Math.pow(1 + r / 100, years);
      const interest = maturity - p;
      setResult({ principal: p, interest, maturity, rate: r, tenure: t });
    }
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTenure('');
    setResult(null);
    setErrors({});
  };

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:ring-red-200'
        : 'border-gray-200 focus:ring-[#C8961E]/30 focus:border-[#C8961E] bg-white'
    }`;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Mode Tabs */}
      <div className="flex border-b border-gray-200">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); reset(); }}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              mode === m.key
                ? 'bg-[#1B2B5B] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-500 mb-6">
          {mode === 'fd'
            ? 'Calculate your Fixed Deposit maturity value using simple interest.'
            : 'Calculate compound annual returns on your investment.'}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Principal Amount (LKR)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => { setPrincipal(e.target.value); setErrors((p) => ({ ...p, principal: '' })); }}
              placeholder="e.g. 1,000,000"
              min="0"
              className={inputClass('principal')}
            />
            {errors.principal && <p className="text-red-500 text-xs mt-1">{errors.principal}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => { setRate(e.target.value); setErrors((p) => ({ ...p, rate: '' })); }}
              placeholder="e.g. 10.5"
              min="0"
              max="50"
              step="0.1"
              className={inputClass('rate')}
            />
            {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tenure (months)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => { setTenure(e.target.value); setErrors((p) => ({ ...p, tenure: '' })); }}
              placeholder="e.g. 12"
              min="1"
              max="360"
              className={inputClass('tenure')}
            />
            {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculate}
            className="flex-1 bg-[#1B2B5B] hover:bg-[#C8961E] text-white font-bold py-3 rounded-xl transition-colors duration-300"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] rounded-xl p-6 text-white">
            <h4 className="font-bold text-lg mb-4 text-[#C8961E]">Calculation Results</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="text-gray-300 text-sm">Principal Amount</span>
                <span className="font-semibold">{formatLKR(result.principal)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="text-gray-300 text-sm">
                  {mode === 'fd' ? 'Simple Interest' : 'Compound Returns'}
                </span>
                <span className="font-semibold text-green-400">{formatLKR(result.interest)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Maturity Value</span>
                <span className="font-bold text-xl text-[#C8961E]">{formatLKR(result.maturity)}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs text-gray-300">
                📊 Based on {result.rate}% p.a. for {result.tenure} month{result.tenure !== 1 ? 's' : ''} 
                using {mode === 'fd' ? 'simple' : 'compound annual'} interest calculation.
              </p>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-xs text-amber-700">
            ⚠️ <strong>Disclaimer:</strong> This calculator is for illustrative purposes only. 
            Actual returns may vary based on applicable rates and terms. Contact our advisors for personalised advice.
          </p>
        </div>
      </div>
    </div>
  );
}
