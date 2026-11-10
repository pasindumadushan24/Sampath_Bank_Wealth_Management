export default function TestimonialCard({ testimonial }) {
  const {
    name = 'Valued Client',
    role = 'Investor',
    content = 'Sampath Wealth Management has transformed how I approach my finances.',
    rating = 5,
    initials,
  } = testimonial || {};

  const displayInitials =
    initials ||
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col h-full border border-gray-100 hover:border-[#C8961E] hover:shadow-lg transition-all duration-300">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? 'text-[#C8961E]' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <div className="mb-6 flex-grow">
        <span className="text-5xl text-[#C8961E] font-serif leading-none">"</span>
        <p className="text-gray-700 leading-relaxed -mt-3 italic">{content}</p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {displayInitials}
        </div>
        <div>
          <p className="font-bold text-[#1B2B5B] text-sm">{name}</p>
          <p className="text-gray-500 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}
