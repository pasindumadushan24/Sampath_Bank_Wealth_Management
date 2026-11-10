import Link from 'next/link';

const categoryColors = {
  'Market Insights': 'bg-blue-100 text-blue-800',
  'Investment Tips': 'bg-green-100 text-green-800',
  'Economic News': 'bg-purple-100 text-purple-800',
  'Product Updates': 'bg-orange-100 text-orange-800',
  default: 'bg-gray-100 text-gray-700',
};

const categoryGradients = {
  'Market Insights': 'from-blue-400 to-blue-600',
  'Investment Tips': 'from-green-400 to-green-600',
  'Economic News': 'from-purple-400 to-purple-600',
  'Product Updates': 'from-orange-400 to-orange-600',
  default: 'from-[#1B2B5B] to-[#2a3f7a]',
};

export default function ArticleCard({ article }) {
  const {
    title = 'Market Insight Article',
    slug = '#',
    summary = 'Read about the latest market trends and investment opportunities.',
    category = 'Market Insights',
    author = 'Sampath Wealth Team',
    publishedAt,
    createdAt,
  } = article || {};

  const dateStr = publishedAt || createdAt;
  let formattedDate = 'Recently published';
  if (dateStr) {
    try {
      formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(dateStr));
    } catch {
      formattedDate = dateStr;
    }
  }

  const colorClass = categoryColors[category] || categoryColors.default;
  const gradientClass = categoryGradients[category] || categoryGradients.default;

  return (
    <article className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-transparent hover:border-[#C8961E]">
      {/* Image Placeholder */}
      <div className={`bg-gradient-to-br ${gradientClass} h-48 relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="text-8xl">📰</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${colorClass}`}>
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-[#1B2B5B] text-lg font-bold leading-tight mb-3 group-hover:text-[#C8961E] transition-colors duration-200 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {summary}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs font-semibold text-[#1B2B5B]">{author}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
          <Link
            href={`/insights/${slug}`}
            className="text-[#C8961E] hover:text-[#a07818] font-semibold text-sm flex items-center gap-1 transition-colors"
          >
            Read More <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
