import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { CustomSelect } from './WealthPrimitives';

type ContactMethod = 'Email' | 'WhatsApp';

/**
 * Private consultation enquiry form. Posts to the `/api/contact` serverless
 * function, which emails the enquiry to the advisory inbox.
 */
export const WealthConsultationForm: React.FC = () => {
  const t = useTranslation();

  const [formState, setFormState] = useState({
    firstName: '',
    email: '',
    phone: '',
    // Kept as the canonical English value so the emailed enquiry reads the same
    // regardless of the language the visitor used.
    preferredMethod: 'Email' as ContactMethod,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const methodLabels: Record<ContactMethod, string> = {
    Email: t.wealth.contact.form.methodEmail,
    WhatsApp: t.wealth.contact.form.methodWhatsapp,
  };
  const labelToMethod = (label: string): ContactMethod =>
    label === t.wealth.contact.form.methodWhatsapp ? 'WhatsApp' : 'Email';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ firstName: '', email: '', phone: '', preferredMethod: 'Email' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50">
            {t.wealth.contact.form.firstNameLabel}
          </label>
          <input
            required
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-colors"
            placeholder={t.wealth.contact.form.firstNamePlaceholder}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50">
            {t.wealth.contact.form.emailLabel}
          </label>
          <input
            required
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-colors"
            placeholder={t.wealth.contact.form.emailPlaceholder}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50">
            {t.wealth.contact.form.phoneLabel}
          </label>
          <input
            required
            type="tel"
            name="phone"
            value={formState.phone}
            onChange={handleInputChange}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-colors"
            placeholder={t.wealth.contact.form.phonePlaceholder}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50">
            {t.wealth.contact.form.preferredMethodLabel}
          </label>
          <CustomSelect
            value={methodLabels[formState.preferredMethod]}
            onChange={(label) =>
              setFormState((prev) => ({ ...prev, preferredMethod: labelToMethod(label) }))
            }
            options={[methodLabels.Email, methodLabels.WhatsApp]}
            placeholder={t.wealth.contact.form.selectPlaceholder}
          />
        </div>
      </div>

      <button
        disabled={isSubmitting}
        className="w-full py-4 bg-white text-black uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        ) : (
          <>
            {t.wealth.contact.form.submit} <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-green-500/10 border border-green-500/50 text-green-500 text-center text-sm"
          >
            {t.wealth.contact.form.success}
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-center text-sm"
          >
            {t.wealth.contact.form.error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};
