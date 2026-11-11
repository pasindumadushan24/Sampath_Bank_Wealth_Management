'use client';
import { useState } from 'react';
import Link from 'next/link';
import { generateApplicationPdf } from '../lib/pdfGenerator';
import SectionHeading from '../components/SectionHeading';

const branches = [
  'Colombo - Head Office (110 Sir James Peiris Mw)',
  'Nugegoda Branch (High Level Rd)',
  'Kandy Branch (Peradeniya Rd)',
  'Galle Branch (Matara Rd)',
  'Negombo Branch (Rajapaksha Broadway)',
  'Batticaloa Branch (Bar Rd)',
  'Kurunegala Branch',
  'Matara Branch',
];

const products = [
  'Premium Fixed Deposit',
  'Sampath Growth Fund (Unit Trust)',
  'Government Securities & Treasury Bonds',
  'High-Yield Savings Plan',
  'Retirement & Estate Wealth Portfolio',
];

const sourceOfFundsList = [
  'Employment Income / Salary',
  'Business Profits',
  'Savings / Fixed Deposits',
  'Investment Returns / Dividends',
  'Property Sale / Inheritance',
];

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    nicOrPassport: '',
    dob: '',
    nationality: 'Sri Lankan',
    phone: '',
    email: '',
    address: '',
    productName: products[0],
    investmentAmount: '',
    preferredBranch: branches[0],
    sourceOfFunds: sourceOfFundsList[0],
    nomineeName: '',
    nomineeNic: '',
    nomineeRelationship: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [submittedRef, setSubmittedRef] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.nicOrPassport.trim()) errs.nicOrPassport = 'NIC or Passport Number is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Contact Number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) errs.address = 'Residential Address is required';
    if (!formData.investmentAmount || Number(formData.investmentAmount) <= 0) {
      errs.investmentAmount = 'Please enter a valid initial investment amount';
    }
    if (!formData.termsAccepted) {
      errs.termsAccepted = 'You must confirm the declaration to proceed';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setStatus('loading');

    // Simulate backend processing & generate official reference number
    setTimeout(() => {
      const ref = `SB-WM-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(ref);

      const submissionData = {
        ...formData,
        refNumber: ref,
      };

      // Generate & automatically download completed PDF document
      generateApplicationPdf(submissionData);

      setStatus('success');
    }, 600);
  };

const inputClass = (field) =>
  `w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
    errors[field]
      ? 'border-red-400 focus:ring-red-200 bg-red-50'
      : 'border-gray-200 focus:ring-[#C8961E]/30 focus:border-[#C8961E] bg-white'
  }`;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6">
            <Link href="/" className="text-gray-400 hover:text-[#C8961E]">
              Home
            </Link>
            {' / '}
            <span className="text-[#C8961E]">Digital Application</span>
          </nav>
          <div className="max-w-2xl">
            <span className="inline-block bg-[#C8961E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              Online Account Opening & Application
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Digital Wealth Application
            </h1>
            <p className="text-gray-300 text-lg">
              Open an account or apply for Sampath Wealth Management products online. Complete the form and instantly receive your generated PDF application document.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === 'success' ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-[#1B2B5B] mb-2">
                Application Submitted Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your application has been received and processed. Your official completed PDF application has been generated and downloaded.
              </p>

              <div className="bg-[#F8F9FA] rounded-xl p-5 mb-8 text-left border border-gray-200 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Application Reference:</span>
                  <span className="font-bold text-[#1B2B5B]">{submittedRef}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Applicant Name:</span>
                  <span className="font-bold text-gray-800">{formData.fullName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Selected Product:</span>
                  <span className="font-bold text-[#C8961E]">{formData.productName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Servicing Branch:</span>
                  <span className="font-bold text-gray-800">{formData.preferredBranch}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={() =>
                    generateApplicationPdf({
                      ...formData,
                      refNumber: submittedRef,
                    })
                  }
                  className="bg-[#C8961E] hover:bg-[#a07818] text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  📄 Download PDF Again
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      fullName: '',
                      nicOrPassport: '',
                      dob: '',
                      nationality: 'Sri Lankan',
                      phone: '',
                      email: '',
                      address: '',
                      productName: products[0],
                      investmentAmount: '',
                      preferredBranch: branches[0],
                      sourceOfFunds: sourceOfFundsList[0],
                      nomineeName: '',
                      nomineeNic: '',
                      nomineeRelationship: '',
                      termsAccepted: false,
                    });
                  }}
                  className="bg-[#1B2B5B] hover:bg-[#2a3f7a] text-white px-6 py-3.5 rounded-xl font-bold transition-all"
                >
                  Submit Another Application
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">
                A copy of this application slip can be submitted at your preferred Sampath Bank branch along with your original National Identity Card.
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
              <SectionHeading
                title="Account-Opening & Investment Application"
                subtitle="Please provide accurate information. A completed official PDF will be generated upon submission."
              />

              <form onSubmit={handleSubmit} className="space-y-10 mt-8">
                {/* 1. Personal Details */}
                <div>
                  <h3 className="text-lg font-bold text-[#1B2B5B] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#1B2B5B] text-white text-xs flex items-center justify-center">
                      1
                    </span>
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name (as per NIC / Passport) *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className={inputClass('fullName')}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        National Identity Card (NIC) / Passport No *
                      </label>
                      <input
                        type="text"
                        name="nicOrPassport"
                        value={formData.nicOrPassport}
                        onChange={handleChange}
                        placeholder="e.g. 199012345678 or N1234567"
                        className={inputClass('nicOrPassport')}
                      />
                      {errors.nicOrPassport && (
                        <p className="text-red-500 text-xs mt-1">{errors.nicOrPassport}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+94 77 123 4567"
                        className={inputClass('phone')}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={inputClass('email')}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={inputClass('dob')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nationality / Citizenship
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className={inputClass('nationality')}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Residential Address *
                      </label>
                      <textarea
                        rows="2"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter permanent residential address"
                        className={inputClass('address')}
                      ></textarea>
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Product & Investment Selection */}
                <div>
                  <h3 className="text-lg font-bold text-[#1B2B5B] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#1B2B5B] text-white text-xs flex items-center justify-center">
                      2
                    </span>
                    Product & Investment Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Wealth Product *
                      </label>
                      <select
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className={inputClass('productName')}
                      >
                        {products.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Initial Investment Amount (LKR) *
                      </label>
                      <input
                        type="number"
                        name="investmentAmount"
                        value={formData.investmentAmount}
                        onChange={handleChange}
                        placeholder="e.g. 250000"
                        className={inputClass('investmentAmount')}
                      />
                      {errors.investmentAmount && (
                        <p className="text-red-500 text-xs mt-1">{errors.investmentAmount}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Branch for Servicing *
                      </label>
                      <select
                        name="preferredBranch"
                        value={formData.preferredBranch}
                        onChange={handleChange}
                        className={inputClass('preferredBranch')}
                      >
                        {branches.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Source of Investment Funds
                      </label>
                      <select
                        name="sourceOfFunds"
                        value={formData.sourceOfFunds}
                        onChange={handleChange}
                        className={inputClass('sourceOfFunds')}
                      >
                        {sourceOfFundsList.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Nominee Details (Optional) */}
                <div>
                  <h3 className="text-lg font-bold text-[#1B2B5B] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#1B2B5B] text-white text-xs flex items-center justify-center">
                      3
                    </span>
                    Beneficiary / Nominee Details (Optional)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nominee Full Name
                      </label>
                      <input
                        type="text"
                        name="nomineeName"
                        value={formData.nomineeName}
                        onChange={handleChange}
                        placeholder="Nominee Name"
                        className={inputClass('nomineeName')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nominee NIC No
                      </label>
                      <input
                        type="text"
                        name="nomineeNic"
                        value={formData.nomineeNic}
                        onChange={handleChange}
                        placeholder="Nominee NIC"
                        className={inputClass('nomineeNic')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Relationship to Applicant
                      </label>
                      <input
                        type="text"
                        name="nomineeRelationship"
                        value={formData.nomineeRelationship}
                        onChange={handleChange}
                        placeholder="e.g. Spouse / Son / Daughter"
                        className={inputClass('nomineeRelationship')}
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Declaration */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-[#C8961E] rounded border-gray-300 focus:ring-[#C8961E]"
                    />
                    <label htmlFor="termsAccepted" className="text-xs text-amber-900 leading-relaxed">
                      I/We hereby declare that all information supplied in this digital application form is true, correct, and complete. I authorize Sampath Bank PLC to verify the authenticity of the information provided and agree to abide by the applicable rules, regulations, and terms of Sampath Bank Wealth Management.
                    </label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-red-500 text-xs mt-2 font-semibold">
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                  <Link
                    href="/products"
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold text-center hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-[#1B2B5B] hover:bg-[#C8961E] disabled:bg-gray-400 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Generating PDF Document...
                      </>
                    ) : (
                      <>
                        <span>Submit & Generate PDF Document</span>
                        <span>📄</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
