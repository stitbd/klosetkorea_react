// src/components/WhatsAppButton.jsx
import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  // 📞 Format: Country code + number, NO +, (), or -
  const phoneNumber = "+8801410200230"; 
  const message = "Hi! I have a question about your services.";
  
  // Build official WhatsApp link
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat with us on WhatsApp"
    >
       <svg width="56" height="56" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#25D366" d="M16 2C8.268 2 2 8.268 2 16c0 2.67.75 5.16 2.06 7.28L2 30l6.92-2.06A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"/>
        <path fill="#FFF" d="M22.2 18.6c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.37.45-.56.15-.19.2-.33.3-.55.1-.22.05-.41-.02-.57-.08-.16-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.86 1.21 3.06c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;