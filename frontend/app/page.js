import Link from 'next/link';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import SectionHeading from './components/SectionHeading';
import ProductCard from './components/ProductCard';
import ArticleCard from './components/ArticleCard';
import CalculatorWidget from './components/CalculatorWidget';
import TestimonialCard from './components/TestimonialCard';


const demoProducts = [
  {
    title: 'Premium Fixed Deposit',
    slug: 'premium-fixed-deposit',
    shortDescription:
      'Enjoy guaranteed returns with our Premium Fixed Deposit scheme. Flexible tenures from 1 to 60 months with competitive interest rates.',
    category: 'Fixed Deposits',
    minimumInvestment: 100000,
    currency: 'LKR',
    expectedReturns: '10.5',
    tenurePeriod: '12–60 months',
  },
  {
    title: 'Sampath Growth Fund',
    slug: 'sampath-growth-fund',
    shortDescription:
      'A diversified unit trust fund investing in high-growth equity and fixed income instruments across Sri Lanka.',
    category: 'Unit Trusts',
    minimumInvestment: 10000,
    currency: 'LKR',
    expectedReturns: '14.2',
    tenurePeriod: 'Open-ended',
  },
  {
    title: 'Government Securities Bond',
    slug: 'government-securities-bond',
    shortDescription:
      'Invest in government-backed treasury bonds offering stable, risk-free returns. Ideal for conservative investors.',
    category: 'Bonds',
    minimumInvestment: 500000,
    currency: 'LKR',
    expectedReturns: '11.8',
    tenurePeriod: '2–10 years',
  },
];

const demoArticles = [
  {
    title: 'Sri Lanka Economic Outlook 2025: What Investors Need to Know',
    slug: 'sri-lanka-economic-outlook-2025',
    summary:
      'As Sri Lanka navigates its economic recovery, investors are presented with unique opportunities across fixed income and equity markets.',
    category: 'Market Insights',
    author: 'Sampath Research Team',
    publishedAt: '2025-10-15',
  },
  {
    title: 'The Power of Compounding: Why Starting Early Matters',
    slug: 'power-of-compounding',
    summary:
      'Time is your greatest asset when it comes to investing. Discover how compound interest can multiply your wealth over decades.',
    category: 'Investment Tips',
    author: 'Wealth Advisory Desk',
    publishedAt: '2025-09-28',
  },
  {
    title: 'Fixed Deposits vs Unit Trusts: Which is Right for You?',
    slug: 'fixed-deposits-vs-unit-trusts',
    summary:
      'A comprehensive comparison of two popular investment vehicles to help you make the right choice for your financial goals.',
    category: 'Investment Tips',
    author: 'Sampath Wealth Team',
    publishedAt: '2025-09-10',
  },
];

const demoTestimonials = [
  {
    name: 'Priyanka Perera',
    role: 'Business Owner, Colombo',
    content:
      'Sampath Wealth Management has been instrumental in growing my retirement portfolio. Their advisors truly understand my goals and have delivered exceptional results.',
    rating: 5,
  },
  {
    name: 'Rajith Fernando',
    role: 'Software Engineer',
    content:
      'I started investing in their unit trust fund three years ago and I am amazed by the returns. The online tools make it very easy to track my portfolio.',
    rating: 5,
  },
  {
    name: 'Kamala Silva',
    role: 'Retired Teacher',
    content:
      'The fixed deposit rates are the best I have found. The staff are professional and always available to answer my questions. Highly recommended!',
    rating: 4,
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Stats */}
      <StatsSection />

      {/* 3. Featured Products */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <SectionHeading
              title="Our Investment Products"
              subtitle="Discover a range of investment solutions tailored to your financial goals and risk appetite."
            />
            <Link
              href="/products"
              className="mt-4 md:mt-0 text-[#C8961E] hover:text-[#a07818] font-semibold text-sm flex items-center gap-1 flex-shrink-0"
            >
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Market Insights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <SectionHeading
              title="Market Insights"
              subtitle="Stay informed with the latest market analysis, investment tips, and economic news from our expert team."
            />
            <Link
              href="/insights"
              className="mt-4 md:mt-0 text-[#C8961E] hover:text-[#a07818] font-semibold text-sm flex items-center gap-1 flex-shrink-0"
            >
              View All Articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Calculator Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Plan Your Investment"
                subtitle="Use our interactive calculator to estimate your returns and plan your financial future with confidence."
              />
              <ul className="space-y-4 mb-8">
                {[
                  'Fixed Deposit maturity calculator',
                  'Compound returns estimator',
                  'Risk profiling questionnaire',
                  'Personalised product recommendations',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#C8961E] mt-0.5 flex-shrink-0">✦</span>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 text-[#1B2B5B] hover:text-[#C8961E] font-bold border-b-2 border-[#C8961E] pb-1 transition-colors"
              >
                Explore Full Calculators →
              </Link>
            </div>
            <div>
              <CalculatorWidget />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Book Appointment CTA */}
      <section className="py-20 bg-gradient-to-r from-[#C8961E] to-[#a07818]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Wealth Journey?
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Meet with one of our expert wealth advisors at a branch near you. 
            We will craft a personalised investment plan aligned with your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center bg-white text-[#C8961E] hover:bg-[#1B2B5B] hover:text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300"
            >
              Book Free Appointment 📅
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Hear from investors who have trusted Sampath Wealth Management with their financial futures."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {demoTestimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
