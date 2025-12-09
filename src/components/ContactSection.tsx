import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Video } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { contactSchema } from '@/lib/contactSchema';
import { submitToWebhook } from '@/lib/submitToWebhook';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: t('contact.toast.invalidTitle'),
        description: firstError.message,
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Submit to webhook
    const result = await submitToWebhook(validation.data);

    if (result.success) {
      toast({
        title: t('contact.toast.successTitle'),
        description: t('contact.toast.successDescription'),
      });
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } else {
      toast({
        title: t('contact.toast.errorTitle'),
        description: result.error || t('contact.toast.errorDescriptionFallback'),
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
          {t('contact.headline.titleBefore')}{' '} <span className="text-gradient">{t('contact.headline.highlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
           {t('contact.subtitle')} 
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card neon-border p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                 {t('contact.form.nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-glass"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.form.emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-glass"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              {t('contact.form.phoneLabel')}{' '} <span className="text-muted-foreground">{t('contact.form.phoneOptional')}</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-glass"
                placeholder={t('contact.form.phonePlaceholder')}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                {t('contact.form.companyLabel')}{' '} <span className="text-muted-foreground">{t('contact.form.companyOptional')}</span>
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="input-glass"
                placeholder={t('contact.form.companyPlaceholder')}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                {t('contact.form.messageLabel')}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-glass resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>{t('contact.form.submitProcessing')}</>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('contact.form.submitIdle')}
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
              <a
                href="mailto:contact@fvhautomation.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
               {t('contact.contactMethods.emailLabel')}
              </a>
              <span className="hidden sm:block text-border">|</span>
              <span className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                {t('contact.contactMethods.videoText')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
