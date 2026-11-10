import Link from 'next/link';
import ArticleCard from '../../components/ArticleCard';
import { getArticleBySlug } from '../../lib/api';


const demoArticles = {
  'sri-lanka-economic-outlook-2025': {
    title: 'Sri Lanka Economic Outlook 2025: What Investors Need to Know',
    slug: 'sri-lanka-economic-outlook-2025',
    summary: 'As Sri Lanka navigates its economic recovery, investors are presented with unique opportunities across fixed income and equity markets.',
    content: `<p>Sri Lanka's economy is demonstrating remarkable resilience as it emerges from one of the most challenging periods in its history. The IMF-backed economic reform program has stabilised the macroeconomic environment, creating a foundation for sustainable growth.</p>
<h2>Key Economic Indicators</h2>
<p>Inflation has been brought under control from its peak of over 70% in 2022 to single digits in 2025. The Central Bank has begun a measured easing cycle, which is creating favourable conditions for both fixed income and equity investors.</p>
<h2>Investment Opportunities</h2>
<h3>Fixed Income</h3>
<p>Government Securities currently offer some of the highest real yields in the region. With inflation declining and rates expected to ease gradually, now may be an opportune time to lock in fixed deposit and Treasury Bond rates.</p>
<h3>Equity Markets</h3>
<p>The Colombo Stock Exchange is trading at historically low valuations. Select sectors — particularly consumer staples, banking, and exports — are well-positioned to benefit from economic normalisation.</p>
<h2>Our Recommendations</h2>
<p>For conservative investors, we recommend increasing allocation to Government Securities and high-grade Fixed Deposits. For balanced investors, a 60/40 split between fixed income and equity through unit trusts offers the best risk-adjusted return profile.</p>
<p>Speak with our wealth advisors to discuss how these trends impact your specific portfolio.</p>`,
    category: 'Market Insights',
    author: 'Sampath Research Team',
    publishedAt: '2025-10-15',
  },
  'power-of-compounding': {
    title: 'The Power of Compounding: Why Starting Early Matters',
    slug: 'power-of-compounding',
    summary: 'Time is your greatest asset when it comes to investing. Discover how compound interest can multiply your wealth over decades.',
    content: `<p>Albert Einstein reportedly called compound interest the "eighth wonder of the world." Whether or not he said it, the sentiment is accurate — compounding is one of the most powerful forces in personal finance.</p>
<h2>What is Compound Interest?</h2>
<p>Compound interest is interest calculated on both the initial principal and the interest accumulated over previous periods. Unlike simple interest, which is calculated only on the principal, compound interest grows exponentially over time.</p>
<h2>A Tale of Two Investors</h2>
<p>Consider two investors — Amal and Sunil. Amal begins investing LKR 10,000 per month at age 25, while Sunil waits until age 35 to start. Assuming a 12% annual return, by age 60:</p>
<ul>
<li>Amal's portfolio will be worth approximately LKR 349 million</li>
<li>Sunil's portfolio will be worth approximately LKR 95 million</li>
</ul>
<p>Despite investing for 10 fewer years, Amal ends up with more than 3.5 times more wealth — purely due to the power of compounding over time.</p>
<h2>Start Today</h2>
<p>The best time to start investing was yesterday. The second best time is today. Contact our wealth advisors to explore unit trust and savings plans that harness the power of compounding for your financial future.</p>`,
    category: 'Investment Tips',
    author: 'Wealth Advisory Desk',
    publishedAt: '2025-09-28',
  },
};

const relatedArticles = [
  { title: 'Fixed Deposits vs Unit Trusts: Which is Right for You?', slug: 'fixed-deposits-vs-unit-trusts', summary: 'A comprehensive comparison to help you make the right choice.', category: 'Investment Tips', author: 'Sampath Wealth Team', publishedAt: '2025-09-10' },
  { title: 'Building a Diversified Portfolio: A Beginner\'s Guide', slug: 'diversified-portfolio-guide', summary: 'Diversification is the cornerstone of sound investing.', category: 'Investment Tips', author: 'Wealth Advisory Desk', publishedAt: '2025-07-18' },
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const demo = demoArticles[slug];
  return {
    title: demo?.title || 'Market Insight',
    description: demo?.summary || 'Read the latest market insights from Sampath Bank Wealth Management.',
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  let article = null;

  try {
    article = await getArticleBySlug(slug);
    if (article) article = article.attributes || article;
  } catch {
    // fall through
  }

  if (!article) article = demoArticles[slug] || Object.values(demoArticles)[0];

  let formattedDate = 'Recently published';
  if (article.publishedAt) {
    try {
      formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
      }).format(new Date(article.publishedAt));
    } catch {
      formattedDate = article.publishedAt;
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6">
            <Link href="/" className="text-gray-400 hover:text-[#C8961E]">Home</Link>
            {' / '}
            <Link href="/insights" className="text-gray-400 hover:text-[#C8961E]">Market Insights</Link>
            {' / '}
            <span className="text-[#C8961E]">Article</span>
          </nav>
          <span className="inline-block bg-[#C8961E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <span>✍️ {article.author}</span>
            <span>•</span>
            <span>📅 {formattedDate}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Article Content */}
            <div className="lg:col-span-2">
              {/* Featured image placeholder */}
              <div className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] rounded-2xl h-64 flex items-center justify-center mb-8">
                <span className="text-6xl opacity-40">📰</span>
              </div>

              {/* Summary */}
              <div className="bg-[#F5E6C0] border-l-4 border-[#C8961E] rounded-r-xl p-5 mb-8">
                <p className="text-[#1B2B5B] font-medium italic">{article.summary}</p>
              </div>

              {/* Content */}
              <div
                className="bg-white rounded-2xl p-8 shadow-sm prose prose-lg max-w-none [&_h2]:text-[#1B2B5B] [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-[#1B2B5B] [&_h3]:font-bold [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_li]:text-gray-700"
                dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.summary}</p>` }}
              />

              {/* Share */}
              <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="font-bold text-[#1B2B5B] mb-4">Share this article:</h3>
                <div className="flex gap-3">
                  {['Facebook', 'LinkedIn', 'Twitter', 'WhatsApp'].map((s) => (
                    <button key={s} className="px-4 py-2 bg-gray-100 hover:bg-[#F5E6C0] text-gray-700 hover:text-[#1B2B5B] text-sm font-semibold rounded-xl transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Ready to Invest?</h3>
                <p className="text-gray-300 text-sm mb-4">Put your insights into action. Talk to a wealth advisor today.</p>
                <Link href="/appointments" className="block text-center bg-[#C8961E] hover:bg-[#a07818] text-white font-bold py-3 rounded-xl transition-colors text-sm">
                  Book Appointment
                </Link>
                <Link href="/products" className="block text-center bg-transparent border border-white/30 hover:border-white text-white font-semibold py-3 rounded-xl transition-colors text-sm mt-3">
                  Explore Products
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#1B2B5B] mb-2">About the Author</h3>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] flex items-center justify-center text-white font-bold">S</div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{article.author}</p>
                    <p className="text-gray-500 text-xs">Sampath Bank Wealth Management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1B2B5B] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
