export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 gold-underline ${
          centered ? 'gold-underline-center' : ''
        } ${light ? 'text-white' : 'text-[#1B2B5B]'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg mt-6 max-w-2xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
