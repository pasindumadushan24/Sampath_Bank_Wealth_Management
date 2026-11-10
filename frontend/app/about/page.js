import Link from 'next/link';
import SectionHeading from '../components/SectionHeading';


export const metadata = {
  title: 'About Us',
  description: 'Learn about Sampath Bank Wealth Management — our story, mission, vision, and commitment to your financial success.',
};

const milestones = [
  { year: '1987', event: 'Sampath Bank founded in Sri Lanka' },
  { year: '1995', event: 'Established dedicated Wealth Management Division' },
  { year: '2002', event: 'Launched first unit trust fund for retail investors' },
  { year: '2010', event: 'AUM crossed LKR 10 Billion milestone' },
  { year: '2015', event: 'Expanded to digital wealth management platform' },
  { year: '2020', event: 'AUM reached LKR 50 Billion — 50,000+ clients served' },
  { year: '2025', event: 'AUM exceeds LKR 100 Billion — Premier Wealth Manager in Sri Lanka' },
];

const team = [
  { name: 'Nimal Jayawardena', role: 'Head of Wealth Management', initials: 'NJ' },
  { name: 'Priya Mendis', role: 'Chief Investment Officer', initials: 'PM' },
  { name: 'Rohan Silva', role: 'Director — Private Banking', initials: 'RS' },
  { name: 'Amali Fernando', role: 'Head of Research & Analytics', initials: 'AF' },
  { name: 'Dhanuka Perera', role: 'Head of Client Relations', initials: 'DP' },
  { name: 'Shirani Rathnayake', role: 'Senior Fund Manager', initials: 'SR' },
];

const awards = [
  { award: 'Best Wealth Management Bank', org: 'Asiamoney Awards 2024', icon: '🏆' },
  { award: 'Excellence in Customer Service', org: 'SLIM — CIMA Marketing Excellence Awards 2024', icon: '⭐' },
  { award: 'Best Fixed Income Manager', org: 'CFA Society Sri Lanka Awards 2023', icon: '🥇' },
  { award: 'Most Trusted Financial Institution', org: 'Reader\'s Digest Sri Lanka 2024', icon: '🛡️' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6">
            <Link href="/" className="text-gray-400 hover:text-[#C8961E]">Home</Link>
            {' / '}
            <span className="text-[#C8961E]">About</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About Sampath<br />
              <span className="text-[#C8961E]">Wealth Management</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              For over 25 years, Sampath Bank Wealth Management has been Sri Lanka's most trusted partner in building and preserving financial legacies. We combine deep local expertise with global investment thinking to deliver outcomes that matter to our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="Our Story" subtitle="From a small savings bank to Sri Lanka's premier wealth manager." />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 1987, Sampath Bank began with a simple mission: to provide accessible, innovative banking services to Sri Lankans. As the bank grew, so did our ambition and our clients' wealth management needs.
                </p>
                <p>
                  In 1995, recognising the growing demand for sophisticated investment solutions, we established a dedicated Wealth Management Division. What started as a small team of advisors has grown into a full-service wealth management operation, serving over 50,000 clients across Sri Lanka.
                </p>
                <p>
                  Today, Sampath Bank Wealth Management manages over LKR 100 Billion in assets, offering a comprehensive suite of investment products from Fixed Deposits and Unit Trusts to Bonds and Structured Products.
                </p>
              </div>
            </div>
            <div className="bg-[#F8F9FA] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#1B2B5B] mb-6">Our Journey</h3>
              <div className="space-y-4">
                {milestones.map((m) => (
                  <div key={m.year} className="flex items-start gap-4">
                    <div className="w-16 flex-shrink-0">
                      <span className="text-[#C8961E] font-bold text-sm">{m.year}</span>
                    </div>
                    <div className="flex-1 pb-4 border-b border-gray-100">
                      <p className="text-gray-700 text-sm">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20 bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To empower Sri Lankans to achieve their financial aspirations through personalised wealth management solutions, expert guidance, and innovative investment products that deliver consistent, risk-adjusted returns.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To be the most trusted and respected wealth management institution in Sri Lanka — the first choice for every Sri Lankan seeking to grow, protect, and transfer their wealth across generations.
              </p>
            </div>
          </div>
          <div className="mt-8 bg-[#C8961E]/20 border border-[#C8961E]/40 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Our Values</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '🤝', value: 'Trust', desc: 'We earn it every day' },
                { icon: '💡', value: 'Innovation', desc: 'Leading-edge solutions' },
                { icon: '🛡️', value: 'Integrity', desc: 'Transparent and fair' },
                { icon: '🎯', value: 'Excellence', desc: 'Never settling for less' },
              ].map((v) => (
                <div key={v.value} className="text-center">
                  <div className="text-3xl mb-2">{v.icon}</div>
                  <p className="font-bold text-[#C8961E]">{v.value}</p>
                  <p className="text-gray-300 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section id="team" className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Leadership Team" subtitle="Experienced professionals dedicated to your financial success." centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-[#C8961E] transition-all duration-200">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {member.initials}
                </div>
                <h3 className="font-bold text-[#1B2B5B] text-lg">{member.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section id="awards" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Awards & Recognition" subtitle="Industry recognition of our commitment to excellence." centered />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((a) => (
              <div key={a.award} className="flex items-center gap-6 bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100">
                <div className="text-5xl flex-shrink-0">{a.icon}</div>
                <div>
                  <h3 className="font-bold text-[#1B2B5B]">{a.award}</h3>
                  <p className="text-gray-500 text-sm mt-1">{a.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory */}
      <section id="regulatory" className="py-16 bg-[#F8F9FA] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading title="Regulatory Information" centered />
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-left">
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                <strong className="text-[#1B2B5B]">Sampath Bank PLC</strong> is a licensed commercial bank regulated by the Central Bank of Sri Lanka (CBSL) under the Banking Act No. 30 of 1988.
              </p>
              <p>
                Sampath Bank's wealth management and unit trust operations are conducted under the Securities and Exchange Commission of Sri Lanka (SEC) regulatory framework. All unit trusts are registered with the SEC.
              </p>
              <p>
                Deposits at Sampath Bank are covered under the Sri Lanka Deposit Insurance and Liquidity Support Scheme (SLDIS) administered by the CBSL, up to LKR 1,100,000 per depositor.
              </p>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-700 text-xs">
                  <strong>Disclaimer:</strong> Investments in unit trusts and other market-linked products are subject to market risks. 
                  Past performance does not guarantee future results. Please read all scheme-related documents carefully and consult 
                  a qualified financial advisor before investing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
