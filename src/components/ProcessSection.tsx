import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, PenTool, Hammer, TestTube, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const steps = [
  { icon: MessageSquare, key: 'discovery' },
  { icon: PenTool, key: 'conceptDesign' },
  { icon: Hammer, key: 'buildIntegrate' },
  { icon: TestTube, key: 'testRefine' },
  { icon: Rocket, key: 'launchSupport' },
];


export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

const { t } = useTranslation();

const processSteps = t('process.steps', { returnObjects: true }) as {
  id: string;
  title: string;
  description: string;
}[];

  return (
    <section id="process" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            {t('process.headline.titleBefore')}{' '} <span className="text-gradient">{t('process.headline.highlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line - desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-full h-full origin-top"
              style={{
                background: 'linear-gradient(180deg, hsl(var(--glow-primary)) 0%, hsl(var(--glow-secondary)) 50%, transparent 100%)',
                boxShadow: '0 0 20px hsl(var(--glow-primary) / 0.5)',
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
  const content = processSteps[index];

  return (
    <motion.div
      key={step.key}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
      className={`relative md:flex md:items-center ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <div className="glass-card neon-border p-6 inline-block">
          <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
              <step.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {content.title}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm">
            {content.description}
          </p>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/50">
        <div className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
      </div>

      {/* Number - mobile */}
      <div className="md:hidden absolute -left-2 top-6 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background font-bold text-sm">
        {index + 1}
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
})}

          </div>
        </div>
      </div>
    </section>
  );
}
