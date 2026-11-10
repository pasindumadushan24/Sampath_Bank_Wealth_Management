'use client';
import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime;
    const isDecimal = target % 1 !== 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const stats = [
  {
    value: 25,
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Decades of trusted wealth management',
    icon: '🏆',
  },
  {
    value: 100,
    prefix: 'LKR ',
    suffix: 'Bn+',
    label: 'Assets Under Management',
    description: 'Managing substantial client portfolios',
    icon: '💼',
  },
  {
    value: 50,
    suffix: ',000+',
    label: 'Happy Clients',
    description: 'Investors who trust us with their wealth',
    icon: '👥',
  },
  {
    value: 4.8,
    suffix: '/5',
    label: 'Client Satisfaction',
    description: 'Average rating across all touchpoints',
    icon: '⭐',
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1B2B5B] to-[#121e3e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Sampath Wealth?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Numbers that reflect our commitment to your financial success
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-[#C8961E] mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <p className="text-white font-semibold mb-1">{stat.label}</p>
              <p className="text-gray-400 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
