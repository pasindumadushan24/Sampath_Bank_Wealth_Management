import ContactForm from '../components/ContactForm';
import SectionHeading from '../components/SectionHeading';
import Link from 'next/link';


export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sampath Bank Wealth Management. Send an enquiry or find our contact details.',
};

const contactDetails = [
  { icon: '📞', label: 'Phone', value: '+94 11 230 8308', sub: 'Mon–Fri, 8:30 AM – 5:00 PM' },
  { icon: '✉️', label: 'Email', value: 'wealth@sampath.lk', sub: 'We respond within 1–2 business days' },
  { icon: '📍', label: 'Head Office', value: '110 Sir James Peiris Mw, Colombo 02', sub: 'Sampath Bank PLC, Wealth Management Division' },
  { icon: '🕐', label: 'Working Hours', value: 'Monday to Friday', sub: '8:30 AM – 5:00 PM (closed on public holidays)' },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6">
            <Link href="/" className="text-gray-400 hover:text-[#C8961E]">Home</Link>
            {' / '}
            <span className="text-[#C8961E]">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Our wealth advisory team is ready to assist you. Send us an enquiry or visit your nearest Sampath branch.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <SectionHeading title="Send an Enquiry" subtitle="Fill in the form and we will get back to you shortly." />
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <SectionHeading title="Get in Touch" subtitle="Multiple ways to reach our wealth management team." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactDetails.map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="font-bold text-[#1B2B5B] text-sm">{item.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] rounded-2xl h-48 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="font-semibold">110 Sir James Peiris Mw</p>
                  <p className="text-gray-300 text-sm">Colombo 02, Sri Lanka</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-[#C8961E] text-sm hover:underline mt-2 inline-block">
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Appointment CTA */}
              <div className="bg-gradient-to-r from-[#C8961E] to-[#a07818] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Prefer a Face-to-Face Meeting?</h3>
                <p className="text-white/90 text-sm mb-4">Book an appointment with one of our wealth advisors at your nearest Sampath branch.</p>
                <Link href="/appointments" className="inline-block bg-white text-[#C8961E] hover:bg-[#1B2B5B] hover:text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm">
                  Book Appointment 📅
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
