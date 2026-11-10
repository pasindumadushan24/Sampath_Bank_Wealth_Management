import Link from 'next/link';

const footerLinks = {
  about: [
    { label: 'Our Story', href: '/about' },
    { label: 'Mission & Vision', href: '/about#mission' },
    { label: 'Management Team', href: '/about#team' },
    { label: 'Awards', href: '/about#awards' },
    { label: 'Regulatory Info', href: '/about#regulatory' },
  ],
  products: [
    { label: 'Fixed Deposits', href: '/products?category=Fixed+Deposits' },
    { label: 'Unit Trusts', href: '/products?category=Unit+Trusts' },
    { label: 'Bonds', href: '/products?category=Bonds' },
    { label: 'Savings Plans', href: '/products?category=Savings+Plans' },
    { label: 'All Products', href: '/products' },
  ],
  resources: [
    { label: 'Market Insights', href: '/insights' },
    { label: 'Investment Calculator', href: '/calculators' },
    { label: 'Risk Profiler', href: '/calculators#risk' },
    { label: 'FAQs', href: '/contact#faqs' },
    { label: 'Download Forms', href: '#' },
  ],
};

const socialLinks = [
  { label: 'Facebook', icon: 'f', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'Twitter', icon: '𝕏', href: '#' },
  { label: 'YouTube', icon: '▶', href: '#' },
  
];

export default function Footer() {
  return (
    <footer className="bg-[#1B2B5B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#C8961E] flex items-center justify-center">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <div>
                <span className="font-bold text-lg block leading-tight">Sampath Bank</span>
                <span className="text-[#C8961E] text-xs font-semibold uppercase tracking-wider block">Wealth Management</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Sri Lanka's trusted partner in wealth management. 
              We help you grow, protect, and transfer wealth across generations.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-[#C8961E] hover:bg-[#C8961E] flex items-center justify-center text-xs font-bold transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-[#C8961E] font-bold uppercase tracking-wider text-xs mb-5">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#C8961E] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-[#C8961E] font-bold uppercase tracking-wider text-xs mb-5">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#C8961E] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-[#C8961E] font-bold uppercase tracking-wider text-xs mb-5">Contact</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#C8961E] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-sm text-gray-400">
              <p>📞 +94 11 230 8308</p>
              <p>✉️ wealth@sampath.lk</p>
              <p>📍 Colombo 03, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © 2024 Sampath Bank PLC. All rights reserved. Wealth Management Division.
            </p>
            <p className="text-gray-600 text-xs text-center max-w-xl">
              <span className="text-gray-500">Disclaimer: </span>
              Investments are subject to market risks. Past performance does not guarantee future results. 
              Please read all scheme-related documents carefully before investing.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-[#C8961E] text-xs transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-500 hover:text-[#C8961E] text-xs transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
