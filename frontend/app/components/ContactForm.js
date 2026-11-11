'use client';
import { useState } from 'react';
import { submitEnquiry } from '@/app/lib/api';

const enquiryTypes = [
  'General Enquiry',
  'Investment Products',
  'Portfolio Management',
  'Fixed Deposits',
  'Unit Trusts',
  'Bonds',
  'Other',
];

export default function ContactForm({ prefilledProduct = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    enquiryType: 'General Enquiry',
    interestedProduct: prefilledProduct,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    try {
      await submitEnquiry(formData);
      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        enquiryType: 'General Enquiry',
        interestedProduct: '',
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Enquiry Submitted!</h3>
        <p className="text-green-700 mb-6">
          Thank you for reaching out. Our team will get back to you within 1–2 business days.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-[#1B2B5B] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#C8961E] transition-colors"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

const inputClass = (field) =>
  `w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
    errors[field]
      ? 'border-red-400 focus:ring-red-200 bg-red-50'
      : 'border-gray-200 focus:ring-[#C8961E]/30 focus:border-[#C8961E] bg-white'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          ⚠️ {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Perera"
            className={inputClass('fullName')}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={inputClass('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+94 71 234 5678"
            className={inputClass('phone')}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Enquiry Type</label>
          <select
           name="enquiryType"
value={formData.enquiryType}
onChange={handleChange}
className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C8961E]/30 focus:border-[#C8961E] bg-white"
          >
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Investment Portfolio Enquiry"
          className={inputClass('subject')}
        />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
      </div>

      {prefilledProduct && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Interested Product</label>
          <input
            type="text"
            name="interestedProduct"
            value={formData.interestedProduct}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us how we can help you..."
          className={inputClass('message')}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#1B2B5B] hover:bg-[#C8961E] disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 text-base flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Sending...
          </>
        ) : (
          <>Send Enquiry →</>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our Privacy Policy. Your data is handled securely.
      </p>
    </form>
  );
}
