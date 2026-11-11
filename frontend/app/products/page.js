import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { getProducts } from '../lib/api';


export const instant = false;

export const metadata = {
  title: 'Investment Products',
  description: 'Explore Sampath Bank Wealth Management investment products including Fixed Deposits, Unit Trusts, Bonds and more.',
};

const demoProducts = [
  { title: 'Premium Fixed Deposit', slug: 'premium-fixed-deposit', shortDescription: 'Enjoy guaranteed returns with our Premium Fixed Deposit scheme. Flexible tenures from 1 to 60 months with competitive interest rates.', category: 'Fixed Deposits', minimumInvestment: 100000, expectedReturns: '10.5', tenurePeriod: '12–60 months' },
  { title: 'Super Saver Fixed Deposit', slug: 'super-saver-fd', shortDescription: 'Our entry-level fixed deposit with attractive rates and no penalties for premature withdrawal after 3 months.', category: 'Fixed Deposits', minimumInvestment: 25000, expectedReturns: '9.75', tenurePeriod: '3–24 months' },
  { title: 'Sampath Growth Fund', slug: 'sampath-growth-fund', shortDescription: 'A diversified unit trust fund investing in high-growth equity and fixed income instruments across Sri Lanka.', category: 'Unit Trusts', minimumInvestment: 10000, expectedReturns: '14.2', tenurePeriod: 'Open-ended' },
  { title: 'Sampath Income Fund', slug: 'sampath-income-fund', shortDescription: 'A conservative unit trust focused on steady income through investments in Treasury Bills and Bonds.', category: 'Unit Trusts', minimumInvestment: 5000, expectedReturns: '11.0', tenurePeriod: 'Open-ended' },
  { title: 'Government Securities Bond', slug: 'government-securities-bond', shortDescription: 'Invest in government-backed treasury bonds offering stable, risk-free returns. Ideal for conservative investors.', category: 'Bonds', minimumInvestment: 500000, expectedReturns: '11.8', tenurePeriod: '2–10 years' },
  { title: 'Corporate Bond Portfolio', slug: 'corporate-bond-portfolio', shortDescription: 'A curated selection of high-grade corporate bonds offering above-market returns with manageable risk.', category: 'Bonds', minimumInvestment: 1000000, expectedReturns: '13.5', tenurePeriod: '1–5 years' },
  { title: 'Wealth Builder Savings Plan', slug: 'wealth-builder-savings', shortDescription: 'A systematic savings plan that helps you build wealth through regular monthly contributions with bonus interest.', category: 'Savings Plans', minimumInvestment: 2500, expectedReturns: '10.0', tenurePeriod: '24–60 months' },
  { title: 'Children Education Plan', slug: 'children-education-plan', shortDescription: 'Secure your child\'s future with a dedicated savings plan offering bonus returns at education milestones.', category: 'Savings Plans', minimumInvestment: 1000, expectedReturns: '10.5', tenurePeriod: '5–18 years' },
  { title: 'Retirement Nest Egg Plan', slug: 'retirement-nest-egg', shortDescription: 'Build a comfortable retirement corpus through disciplined long-term investments with tax benefits.', category: 'Savings Plans', minimumInvestment: 5000, expectedReturns: '12.0', tenurePeriod: '10–30 years' },
];

const categories = ['All', 'Fixed Deposits', 'Unit Trusts', 'Bonds', 'Savings Plans'];

export default async function ProductsPage({ searchParams }) {
  let products = [];

  try {
    const data = await getProducts();
    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      products = data.data.map((p) => {
        const raw = p.attributes ? { ...p.attributes, id: p.id } : { ...p };
        return {
          ...raw,
          id: raw.id || raw.documentId,
        };
      }).filter((p) => p && p.title);
    }
  } catch {
    // fall through to demo
  }

  if (products.length === 0) products = demoProducts;

  const params = await searchParams;
  const selectedCategory = params?.category || 'All';
  const filtered =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6">
            <span className="text-gray-400">
              <Link href="/" className="hover:text-[#C8961E] transition-colors">Home</Link>
              {' '}/{' '}
              <span className="text-[#C8961E]">Products</span>
            </span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Investment Products</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Choose from a comprehensive range of investment solutions designed to match every financial goal and risk appetite.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1B2B5B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#F5E6C0] hover:text-[#1B2B5B]'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try a different category filter.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-8">
                Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((product) => (
                  <ProductCard key={product.slug || product.title} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2B5B] mb-4">
            Not Sure Which Product is Right for You?
          </h2>
          <p className="text-gray-600 mb-8">
            Take our Risk Profiler quiz or speak with a wealth advisor to find the perfect investment match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculators#risk" className="bg-[#1B2B5B] hover:bg-[#C8961E] text-white font-bold py-3 px-8 rounded-xl transition-colors">
              Take Risk Profile Quiz
            </Link>
            <Link href="/appointments" className="bg-[#C8961E] hover:bg-[#a07818] text-white font-bold py-3 px-8 rounded-xl transition-colors">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
