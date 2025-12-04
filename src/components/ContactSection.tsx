import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Video } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { contactSchema } from '@/lib/contactSchema';
import { submitToWebhook } from '@/lib/submitToWebhook';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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
        title: 'Please check your input',
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
        title: "Thanks!",
        description: "I'll review your processes and get back to you soon.",
      });
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } else {
      toast({
        title: 'Something went wrong',
        description: result.error || 'Please try emailing me directly at hello@mydomain.com',
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
            Tell Me What's <span className="text-gradient">Slowing You Down</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You don't need a perfect brief. Just tell me about your day — what tasks 
            feel repetitive, what's annoying, what tools you're using. I'll figure out 
            what can be automated.
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
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-glass"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-glass"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-glass"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                Company <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="input-glass"
                placeholder="Your company name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                What does a typical day look like for you? What would you love to automate? *
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-glass resize-none"
                placeholder="Tell me about the tasks that slow you down, the tools you use every day, and what you wish 'just happened' automatically..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Request Your Free Automation Audit
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
                href="mailto:hello@mydomain.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                hello@mydomain.com
              </a>
              <span className="hidden sm:block text-border">|</span>
              <span className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Prefer a video call? I'll send a link.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
