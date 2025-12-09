import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { t } = useTranslation();


  return (
    <section className="py-24 relative section-glow" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
           {t('testimonials.headline.titleBefore')}{' '} <span className="text-gradient">{t('testimonials.headline.highlight')}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Placeholder testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card neon-border p-8"
          >
            <Quote className="w-10 h-10 text-primary/30 mb-4" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground italic mb-6 leading-relaxed">
              {t('testimonials.quote.text')}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">?</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{t('testimonials.quote.name')}</p>
                <p className="text-sm text-muted-foreground">{t('testimonials.quote.role')}</p>
              </div>
            </div>
          </motion.div>

          {/* Early partners CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--glow-primary) / 0.1) 0%, hsl(var(--glow-secondary) / 0.1) 100%)',
            }}
          >
            <Sparkles className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-xl font-semibold mb-4 text-foreground">
             {t('testimonials.cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('testimonials.cta.body')}
            </p>
            <p className="text-foreground font-medium mb-6">
             {t('testimonials.cta.secondary')}
            </p>
            <a href="#contact" className="btn-primary inline-block">
              {t('testimonials.cta.button')}
            </a>
            
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
