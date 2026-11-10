'use client';
import { useState } from 'react';
import { submitAppointment } from '@/app/lib/api';
import { generateAppointmentPdf } from '@/app/lib/pdfGenerator';

const branches = [
  'Colombo - Head Office',
  'Nugegoda Branch',
  'Kandy Branch',
  'Galle Branch',
  'Negombo Branch',
  'Batticaloa Branch',
  'Jaffna Branch',
  'Kurunegala Branch',
  'Matara Branch',
  'Ratnapura Branch',
];

const topics = [
  'Fixed Deposit Investment',
  'Unit Trust Portfolio',
  'Bond Investments',
  'Savings Plans',
  'Retirement Planning',
  'Estate Planning',
  'Portfolio Review',
  'General Wealth Planning',
];

const timeSlots = [
  { value: 'morning', label: 'Morning (9:00 AM – 12:00 PM)' },
  { value: 'afternoon', label: 'Afternoon (1:00 PM – 4:00 PM)' },
  { value: 'any', label: 'Any Time Available' },
];

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredBranch: branches[0],
    preferredDate: '',
    preferredTime: 'morning',
    topicOfInterest: topics[0],
    additionalNotes: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    } else if (formData.preferredDate < today) {
      newErrors.preferredDate = 'Date cannot be in the past';
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
      await submitAppointment(formData);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Appointment Requested!</h3>
        <p className="text-green-700 mb-2">
          Thank you, {formData.fullName}! Your appointment request has been received.
        </p>
        <p className="text-green-600 text-sm mb-6">
          Our team will confirm your appointment at <strong>{formData.preferredBranch}</strong> within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => generateAppointmentPdf(formData)}
            className="bg-[#C8961E] hover:bg-[#a07818] text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            📄 Download Appointment Slip (PDF)
          </button>
          <button
            type="button"
            onClick={() => { setStatus('idle'); setFormData({ fullName: '', email: '', phone: '', preferredBranch: branches[0], preferredDate: '', preferredTime: 'morning', topicOfInterest: topics[0], additionalNotes: '' }); }}
            className="bg-[#1B2B5B] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#C8961E] transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
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
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Perera" className={inputClass('fullName')} />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={inputClass('email')} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+94 71 234 5678" className={inputClass('phone')} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Branch</label>
          <select name="preferredBranch" value={formData.preferredBranch} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8961E]/30 focus:border-[#C8961E] bg-white">
            {branches.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
          <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} min={today} className={inputClass('preferredDate')} />
          {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
          <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8961E]/30 focus:border-[#C8961E] bg-white">
            {timeSlots.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Topic of Interest</label>
        <select name="topicOfInterest" value={formData.topicOfInterest} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8961E]/30 focus:border-[#C8961E] bg-white">
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
        <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows={4} placeholder="Any specific requirements or questions you'd like to discuss..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8961E]/30 focus:border-[#C8961E] bg-white" />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#C8961E] hover:bg-[#a07818] disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 text-base flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Booking...
          </>
        ) : (
          <>Book Appointment 📅</>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Appointments are subject to advisor availability. We will confirm via email or phone.
      </p>
    </form>
  );
}
