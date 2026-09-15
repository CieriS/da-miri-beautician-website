/**
 * Genera un link click-to-chat WhatsApp con messaggio precompilato.
 * @see https://faq.whatsapp.com/5913398998672934
 */
export function createWhatsAppLink(phoneNumber: string, message: string): string {
  const digits = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
