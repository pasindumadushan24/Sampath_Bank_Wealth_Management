import Link from 'next/link';
import ArticleCard from '../components/ArticleCard';
import { getArticles } from '../lib/api';


export const instant = false;

export const metadata = {
  title: 'Market Insights',
  description: 'Stay informed with market analysis, investment tips, and economic news from Sampath Bank Wealth Management.',
};

const demoArticles = [
  { title: 'Sri Lanka Economic Outlook 2025: What Investors Need to Know', slug: 'sri-lanka-economic-outlook-2025', summary: 'As Sri Lanka navigates its economic recovery, investors are presented with unique opportunities across fixed income and equity markets. Our research team breaks down the key trends.', category: 'Market Insights', author: 'Sampath Research Team', publishedAt: '2025-10-15' },
  { title: 'The Power of Compounding: Why Starting Early Matters', slug: 'power-of-compounding', summary: 'Time is your greatest asset when it comes to investing. Discover how compound interest can multiply your wealth over decades with real examples.', category: 'Investment Tips', author: 'Wealth Advisory Desk', publishedAt: '2025-09-28' },
  { title: 'Fixed Deposits vs Unit Trusts: Which is Right for You?', slug: 'fixed-deposits-vs-unit-trusts', summary: 'A comprehensive comparison of two popular investment vehicles to help you make the right choice for your financial goals and risk tolerance.', category: 'Investment Tips', author: 'Sampath Wealth Team', publishedAt: '2025-09-10' },
  { title: 'Central Bank Rate Decision: Impact on Your Investments', slug: 'cbsl-rate-decision-impact', summary: 'The Central Bank\'s recent rate decision has significant implications for fixed income investors. Here is what you need to know and how to position your portfolio.', category: 'Economic News', author: 'Sampath Research Team', publishedAt: '2025-08-22' },
  { title: 'New Sampath Income Fund: Everything You Need to Know', slug: 'sampath-income-fund-launch', summary: 'We are excited to announce the launch of the Sampath Income Fund, a conservative unit trust designed for investors seeking stable monthly returns.', category: 'Product Updates', author: 'Sampath Wealth Team', publishedAt: '2025-08-05' },
  { title: 'Building a Diversified Portfolio: A Beginner\'s Guide', slug: 'diversified-portfolio-guide', summary: 'Diversification is the cornerstone of sound investing. This beginner\'s guide walks you through building a balanced portfolio that weathers market volatility.', category: 'Investment Tips', author: 'Wealth Advisory Desk', publishedAt: '2025-07-18' },
];

const categories = ['All', 'Market Insights', 'Investment Tips', 'Economic News', 'Product Updates'];

const categoryDisplayMap = {
  'market-insights': 'Market Insights',
  'investment-tips': 'Investment Tips',
  'economic-news': 'Economic News',
  'product-updates': 'Product Updates',
  'general': 'Market Insights',
  'Market Insights': 'Market Insights',
  'Investment Tips': 'Investment Tips',
  'Economic News': 'Economic News',
  'Product Updates': 'Product Updates',
};

function normalizeArticle(item) {
  if (!item) return null;
  const raw = item.attributes ? { ...item.attributes, id: item.id } : { ...item };
  return {
    ...raw,
    id: raw.id || raw.documentId,
    category: categoryDisplayMap[raw.category] || raw.category || 'Market Insights',
    publishedAt: raw.publishedDate || raw.publishedAt || raw.createdAt,
  };
}

export default async function InsightsPage({ searchParams }) {
  let articles = [];

  try {
    const data = await getArticles();
    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      articles = data.data.map(normalizeArticle).filter((a) => a && a.title);
    }
  } catch {
    // fall through
  }

  if (articles.length === 0) articles = demoArticles;

  const params = await searchParams;
  const selectedCategory = params?.category || 'All';
  const filtered = selectedCategory === 'All' ? articles : articles.filter((a) => a.category === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6">
            <Link href="/" className="text-gray-400 hover:text-[#C8961E]">Home</Link>
            {' / '}
            <span className="text-[#C8961E]">Market Insights</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Market Insights</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Expert analysis, investment tips, and economic news to help you make informed financial decisions.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === 'All' ? '/insights' : `/insights?category=${encodeURIComponent(cat)}`}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategory === cat ? 'bg-[#1B2B5B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#F5E6C0] hover:text-[#1B2B5B]'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📰</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500">Try a different category filter.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-8">
                {filtered.length} article{filtered.length !== 1 ? 's' : ''}{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((article) => (
                  <ArticleCard key={article.slug || article.title} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1B2B5B] mb-3">Stay Ahead of the Market</h2>
          <p className="text-gray-600 mb-8">Subscribe to our weekly market digest and never miss an investment opportunity.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8961E]/30 focus:border-[#C8961E]" />
            <button className="bg-[#C8961E] hover:bg-[#a07818] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm flex-shrink-0">Subscribe</button>
          </div>
          <p className="text-xs text-gray-400 mt-3">No spam, unsubscribe anytime.</p>
        </div>
      </section>
    </>
    
  );
}
