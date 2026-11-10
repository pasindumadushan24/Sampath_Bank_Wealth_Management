import Link from 'next/link';

const categoryIcons = {
  'Fixed Deposits': '🏦',
  'Unit Trusts': '📈',
  'Bonds': '📋',
  'Savings Plans': '💰',
  'Equities': '📊',
  'Insurance': '🛡️',
  default: '💎',
};

export default function ProductCard({ product }) {
  const {
    title = 'Investment Product',
    slug = '#',
    shortDescription = 'A premium investment product tailored for your financial goals.',
    category = 'Fixed Deposits',
    minimumInvestment,
    currency = 'LKR',
    expectedReturns,
    tenurePeriod,
  } = product || {};

  const icon = categoryIcons[category] || categoryIcons.default;

  const formatCurrency = (amount) => {
    if (!amount) return 'On request';
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-transparent hover:border-[#C8961E] flex flex-col h-full">
      {/* Card Header */}
      <div className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] p-6">
        <div className="text-4xl mb-3">{icon}</div>
        <span className="inline-block bg-[#C8961E] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          {category}
        </span>
        <h3 className="text-white text-xl font-bold mt-3 leading-tight">{title}</h3>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {shortDescription}
        </p>

        {/* Key Metrics */}
        <div className="space-y-2 mb-6">
          {minimumInvestment && (
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Min. Investment</span>
              <span className="text-sm font-semibold text-[#1B2B5B]">{formatCurrency(minimumInvestment)}</span>
            </div>
          )}
          {expectedReturns && (
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Expected Returns</span>
              <span className="text-sm font-semibold text-green-600">{expectedReturns}% p.a.</span>
            </div>
          )}
          {tenurePeriod && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Tenure</span>
              <span className="text-sm font-semibold text-[#1B2B5B]">{tenurePeriod}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/products/${slug}`}
          className="block text-center bg-[#1B2B5B] hover:bg-[#C8961E] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 text-sm"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}
