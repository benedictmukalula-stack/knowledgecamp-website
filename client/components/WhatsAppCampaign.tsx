import React from 'react';

interface WhatsAppCampaignProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  phoneNumber: string;
  prefilledMessage?: string;
  successMessage?: string;
}

const WhatsAppCampaign: React.FC<WhatsAppCampaignProps> = ({
  title = 'Chat with us on WhatsApp!',
  subtitle = 'Get instant answers or request more info.',
  buttonLabel = 'Start WhatsApp Chat',
  phoneNumber,
  prefilledMessage = 'Hi, I am interested in your courses!',
  successMessage = 'WhatsApp chat opened!'
}) => {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(prefilledMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
      {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
      {subtitle && <p className="mb-4 text-gray-600">{subtitle}</p>}
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
        onClick={handleClick}
        type="button"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default WhatsAppCampaign;
