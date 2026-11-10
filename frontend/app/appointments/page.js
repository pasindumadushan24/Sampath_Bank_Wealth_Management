import AppointmentForm from '../components/AppointmentForm';
import SectionHeading from '../components/SectionHeading';
import Link from 'next/link';


export const metadata = {
  title: 'Book an Appointment',
  description: 'Schedule a free consultation with a Sampath Bank Wealth Management advisor at a branch near you.',
};

const steps = [
  { step: '01', title: 'Select Your Branch', desc: 'Choose from any of our 10+ wealth management enabled branches across Sri Lanka.' },
  { step: '02', title: 'Pick a Date & Time', desc: 'Select a date and preferred time slot that works for your schedule.' },
  { step: '03', title: 'We Confirm', desc: 'Our team will confirm your appointment within 24 hours via email or phone.' },
  { step: '04', title: 'Meet Your Advisor', desc: 'Arrive at the branch and meet your dedicated wealth advisor for a personalised consultation.' },
];

const branches = [
  { name: 'Colombo - Head Office', address: '110 Sir James Peiris Mw, Colombo 02', phone: '+94 11 230 8308' },
  { name: 'Nugegoda Branch', address: '76 High Level Road, Nugegoda', phone: '+94 11 282 1234' },
  { name: 'Kandy Branch', address: '37 Peradeniya Road, Kandy', phone: '+94 81 220 5678' },
  { name: 'Galle Branch', address: '54 Matara Road, Galle', phone: '+94 91 222 3456' },
  { name: 'Negombo Branch', address: '15 Rajapaksha Broadway, Negombo', phone: '+94 31 222 7890' },
  { name: 'Batticaloa Branch', address: '32 Bar Road, Batticaloa', phone: '+94 65 222 1234' },
];

export default function AppointmentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6">
            <Link href="/" className="text-gray-400 hover:text-[#C8961E]">Home</Link>
            {' / '}
            <span className="text-[#C8961E]">Appointments</span>
          </nav>
          <div className="max-w-2xl">
            <span className="inline-block bg-[#C8961E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              Free Consultation
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book an Appointment</h1>
            <p className="text-gray-300 text-lg">
              Meet with a dedicated Sampath Wealth Advisor. We will help you craft a personalised investment strategy tailored to your goals.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="How It Works" subtitle="Booking your wealth consultation is simple and straightforward." centered />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C8961E] font-bold text-lg">{s.step}</span>
                </div>
                <h3 className="font-bold text-[#1B2B5B] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <SectionHeading title="Request Appointment" subtitle="Fill in your details and we will be in touch to confirm." />
              <AppointmentForm />
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* What to Expect */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-[#1B2B5B] mb-5">What to Expect</h3>
                <ul className="space-y-4">
                  {[
                    { icon: '💬', title: '45-Minute Session', desc: 'A focused conversation about your financial goals and current situation.' },
                    { icon: '📊', title: 'Portfolio Assessment', desc: 'We review your existing investments and identify opportunities.' },
                    { icon: '🎯', title: 'Personalised Plan', desc: 'Receive tailored product recommendations aligned with your risk profile.' },
                    { icon: '📋', title: 'No Obligation', desc: 'The consultation is completely free with no pressure to commit.' },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="font-bold text-[#1B2B5B] text-sm">{item.title}</p>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bring Along */}
              <div className="bg-[#F5E6C0] border border-[#C8961E]/30 rounded-2xl p-6">
                <h3 className="font-bold text-[#1B2B5B] mb-3">📌 Please Bring Along</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {['National ID Card or Passport', 'Recent bank statements (last 3 months)', 'Details of existing investments (if any)', 'Your financial goals and timeline'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#C8961E] flex-shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Branches" subtitle="Wealth management services are available at all major Sampath Bank branches." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <div key={branch.name} className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-100 hover:border-[#C8961E] hover:shadow-md transition-all duration-200">
                <h4 className="font-bold text-[#1B2B5B] mb-2">{branch.name}</h4>
                <p className="text-gray-500 text-sm mb-1">📍 {branch.address}</p>
                <p className="text-gray-500 text-sm">📞 {branch.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
