import CalculatorWidget from '../components/CalculatorWidget';
import RiskProfiler from '../components/RiskProfiler';
import SectionHeading from '../components/SectionHeading';
import Link from 'next/link';


export const metadata = {
  title: 'Investment Calculators & Risk Profiler',
  description: 'Use our investment calculators to estimate returns and discover your risk profile with Sampath Bank Wealth Management.',
};

export default function CalculatorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6">
            <Link href="/" className="text-gray-400 hover:text-[#C8961E]">Home</Link>
            {' / '}
            <span className="text-[#C8961E]">Calculators</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Investment Tools</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Plan smarter with our interactive calculators and discover your investor profile.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                title="Investment Calculator"
                subtitle="Estimate your Fixed Deposit maturity value or calculate compound annual returns."
              />
              <div className="space-y-4 mt-8">
                {[
                  { icon: '🏦', title: 'Fixed Deposit Calculator', desc: 'Calculate your FD maturity amount using simple interest over your chosen tenure.' },
                  { icon: '📈', title: 'Returns Calculator', desc: 'See how compound annual returns grow your investment over time.' },
                  { icon: '💡', title: 'Instant Results', desc: 'Get a clear breakdown of principal, interest, and total maturity value.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-[#1B2B5B] text-sm">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <CalculatorWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Risk Profiler Section */}
      <section id="risk" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <RiskProfiler />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading
                title="Know Your Risk Profile"
                subtitle="Answer 5 simple questions to discover what type of investor you are and get personalised product recommendations."
              />
              <div className="space-y-4 mt-8">
                {[
                  { icon: '🛡️', label: 'Conservative', desc: 'Capital preservation, guaranteed returns' },
                  { icon: '⚖️', label: 'Moderate', desc: 'Balanced growth with income' },
                  { icon: '📈', label: 'Balanced', desc: 'Medium-high growth potential' },
                  { icon: '🚀', label: 'Aggressive', desc: 'Maximum long-term capital growth' },
                ].map((profile) => (
                  <div key={profile.label} className="flex items-center gap-4 p-4 bg-[#F8F9FA] rounded-xl">
                    <span className="text-2xl">{profile.icon}</span>
                    <div>
                      <span className="font-bold text-[#1B2B5B] text-sm">{profile.label}</span>
                      <span className="text-gray-500 text-sm ml-2">— {profile.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-bold text-amber-800 mb-2">⚠️ Important Disclaimer</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              All calculations provided are for illustrative and educational purposes only. 
              Actual returns, interest rates, and investment outcomes may vary based on market conditions, 
              applicable regulations, and individual product terms. Past performance does not guarantee 
              future results. Please consult with a qualified Sampath Bank Wealth Advisor before making 
              any investment decisions.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/appointments" className="bg-[#C8961E] hover:bg-[#a07818] text-white font-bold py-3 px-8 rounded-xl transition-colors inline-block">
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
