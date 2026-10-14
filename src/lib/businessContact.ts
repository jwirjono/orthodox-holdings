/**
 * Orthodox Business Solutions contact channels. WhatsApp entry points on the
 * business page go to this number, except wealth-related conversation starters.
 */
export const BUSINESS_WHATSAPP_NUMBER = '62881081708505';
export const BUSINESS_WHATSAPP_DISPLAY = '(+62) 881 081 708 505';
export const BUSINESS_EMAIL = 'businesssolutions@orthodoxholding.com';
export const BUSINESS_LINKEDIN_URL = 'https://www.linkedin.com/company/orthodox-business-solutions/';
export const BUSINESS_INSTAGRAM_URL = 'https://www.instagram.com/orthodoxbusinesssolutions/';

/** wa.me link to the business WhatsApp, optionally with a pre-filled message. */
export const businessWhatsappUrl = (text?: string) =>
  `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
