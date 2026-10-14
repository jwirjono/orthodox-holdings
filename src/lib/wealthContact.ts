/** Orthodox Wealth Management WhatsApp. */
export const WEALTH_WHATSAPP_NUMBER = '6285111218413';

/** wa.me link to the Wealth Management WhatsApp, optionally with a pre-filled message. */
export const wealthWhatsappUrl = (text?: string) =>
  `https://wa.me/${WEALTH_WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
