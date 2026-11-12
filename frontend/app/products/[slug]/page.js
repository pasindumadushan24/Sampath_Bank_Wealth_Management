import Link from 'next/link';
import { getProductBySlug, getProducts } from '../../lib/api';
import ProductCard from '../../components/ProductCard';

export const instant = false;

const demoProducts = {
  'premium-fixed-deposit': {
    title: 'Premium Fixed Deposit',
    slug: 'premium-fixed-deposit',
    shortDescription: 'Enjoy guaranteed returns with our Premium Fixed Deposit scheme.',
    description: `<p>The Sampath Bank Premium Fixed Deposit is designed for investors who prioritize capital security and guaranteed returns. With competitive interest rates and flexible tenure options, it's the cornerstone of any conservative investment portfolio.</p><h3>Key Benefits</h3><ul><li>Guaranteed returns at a fixed rate</li><li>CBSL-regulated and fully insured</li><li>Flexible tenure from 12 to 60 months</li><li>Auto-renewal option available</li><li>Premature withdrawal facility with minimal penalty</li></ul><p>Whether you're saving for a major purchase, building an emergency fund, or supplementing retirement income, the Premium Fixed Deposit offers peace of mind with reliable returns.</p>`,
    category: 'Fixed Deposits',
    minimumInvestment: 100000,
    currency: 'LKR',
    expectedReturns: '10.5',
    tenurePeriod: '12–60 months',
    keyFeatures: ['Guaranteed Returns', 'CBSL Regulated', 'Auto-renewal', 'Premature Withdrawal Facility', 'Monthly Interest Payout Option'],
    isActive: true,
  },
  'sampath-growth-fund': {
    title: 'Sampath Growth Fund',
    slug: 'sampath-growth-fund',
    shortDescription: 'A diversified unit trust fund for high-growth seekers.',
    description: `<p>The Sampath Growth Fund is an open-ended unit trust that seeks long-term capital appreciation by investing in a diversified portfolio of equities and fixed income securities listed on the Colombo Stock Exchange and Sri Lanka government securities.</p><h3>Investment Strategy</h3><p>The fund employs a bottom-up stock selection approach, focusing on companies with strong fundamentals, sustainable competitive advantages, and experienced management teams.</p><ul><li>60–80% allocated to equities</li><li>20–40% in fixed income for stability</li><li>Quarterly rebalancing</li><li>Managed by certified fund managers</li></ul>`,
    category: 'Unit Trusts',
    minimumInvestment: 10000,
    currency: 'LKR',
    expectedReturns: '14.2',
    tenurePeriod: 'Open-ended',
    keyFeatures: ['Professionally Managed', 'Diversified Portfolio', 'Daily NAV Reporting', 'SFC Regulated', 'Low Entry Point'],
    isActive: true,
  },
};

const relatedProducts = [
  { title: 'Super Saver Fixed Deposit', slug: 'super-saver-fd', shortDescription: 'Entry-level fixed deposit with attractive rates.', category: 'Fixed Deposits', minimumInvestment: 25000, expectedReturns: '9.75', tenurePeriod: '3–24 months' },
  { title: 'Sampath Income Fund', slug: 'sampath-income-fund', shortDescription: 'Conservative unit trust for steady income.', category: 'Unit Trusts', minimumInvestment: 5000, expectedReturns: '11.0', tenurePeriod: 'Open-ended' },
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const demo = demoProducts[slug];
  return {
    title: demo?.title || 'Investment Product',
    description: demo?.shortDescription || 'View product details',
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  let product = null;

  try {
    product = await getProductBySlug(slug);
    if (product) product = product.attributes || product;
  } catch {
    // fall through
  }

  if (!product) product = demoProducts[slug] || Object.values(demoProducts)[0];

  const formatCurrency = (amount) => {
    if (!amount) return 'On request';
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  const keyFeatures = product.keyFeatures || [];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6">
            <Link href="/" className="text-gray-400 hover:text-[#C8961E]">Home</Link>
            {' / '}
            <Link href="/products" className="text-gray-400 hover:text-[#C8961E]">Products</Link>
            {' / '}
            <span className="text-[#C8961E]">{product.title}</span>
          </nav>
          <span className="inline-block bg-[#C8961E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{product.shortDescription}</p>
        </div>
      </section>

      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Details */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#1B2B5B] mb-6">Product Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Minimum Investment', value: formatCurrency(product.minimumInvestment) },
                    { label: 'Expected Returns', value: product.expectedReturns ? `${product.expectedReturns}% p.a.` : 'Variable' },
                    { label: 'Tenure Period', value: product.tenurePeriod || 'Flexible' },
                    { label: 'Currency', value: product.currency || 'LKR' },
                    { label: 'Category', value: product.category },
                    { label: 'Status', value: product.isActive !== false ? '✅ Active' : '⏸ Inactive' },
                  ].map((item) => (
                    <div key={item.label} className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="font-bold text-[#1B2B5B]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold text-[#1B2B5B] mb-6">About this Product</h2>
                  <div
                    className="prose prose-sm max-w-none text-gray-700 [&_h3]:text-[#1B2B5B] [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_p]:mb-4"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              {/* Key Features */}
              {keyFeatures.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold text-[#1B2B5B] mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {keyFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-[#F5E6C0] rounded-xl">
                        <span className="text-[#C8961E] font-bold flex-shrink-0">✦</span>
                        <span className="text-[#1B2B5B] font-medium text-sm">{typeof feature === 'object' ? feature.feature : feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-2">Interested?</h3>
                <p className="text-gray-300 text-sm mb-6">Get in touch with our wealth advisors to get started with this product.</p>
                <div className="space-y-3">
                  <Link
                    href={`/apply`}
                    className="block text-center bg-[#C8961E] hover:bg-[#a07818] text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    Apply Online (Digital Form)
                  </Link>
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.title)}`}
                    className="block text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
                  >
                    Enquire Now
                  </Link>
                  <Link
                    href="/appointments"
                    className="block text-center bg-transparent border-2 border-white/40 hover:border-white text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
                  >
                    Book Appointment
                  </Link>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 space-y-2 text-sm text-gray-300">
                  <p>📞 +94 11 230 8308</p>
                  <p>✉️ wealth@sampath.lk</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1B2B5B] mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
