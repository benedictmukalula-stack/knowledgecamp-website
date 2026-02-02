import React, { useState } from 'react';

interface PartnerReferralProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  partnerCodeLabel?: string;
  partnerCodePlaceholder?: string;
  submitLabel?: string;
  successMessage?: string;
}

const PartnerReferral: React.FC<PartnerReferralProps> = ({
  title = 'Refer a Partner',
  subtitle = 'Share your unique partner code to track referrals and rewards.',
  buttonLabel = 'Show Referral Form',
  partnerCodeLabel = 'Partner Code',
  partnerCodePlaceholder = 'Enter your partner code',
  submitLabel = 'Submit Referral',
  successMessage = 'Referral submitted! Thank you.'
}) => {
  const [showForm, setShowForm] = useState(false);
  const [partnerCode, setPartnerCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/referral/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: partnerCode }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert("Failed to submit referral.");
      }
    } catch (err) {
      alert("Failed to submit referral.");
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
        <p className="text-green-600 font-semibold">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
      {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
      {subtitle && <p className="mb-4 text-gray-600">{subtitle}</p>}
      {!showForm ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
          onClick={() => setShowForm(true)}
          type="button"
        >
          {buttonLabel}
        </button>
      ) : (
        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
          <label className="mb-2 font-medium w-full text-left">
            {partnerCodeLabel}
            <input
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder={partnerCodePlaceholder}
              value={partnerCode}
              onChange={e => setPartnerCode(e.target.value)}
              required
            />
          </label>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
            type="submit"
          >
            {submitLabel}
          </button>
        </form>
      )}
    </div>
  );
};

export default PartnerReferral;
