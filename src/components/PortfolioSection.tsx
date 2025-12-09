import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Mail, FolderOpen, UserPlus, BarChart2, Headphones, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const playbooks = [
  {
    id: 1,
    key: 'leadCrmFollowup',
    icon: Mail,
  },
  {
    id: 2,
    key: 'automatedOnboarding',
    icon: UserPlus,
  },
  {
    id: 3,
    key: 'morningKpiSnapshot',
    icon: BarChart2,
  },
  {
    id: 4,
    key: 'invoicesPayments',
    icon: FileText,
  },
  {
    id: 5,
    key: 'smartTicketRouting',
    icon: Headphones,
  },
  {
    id: 6,
    key: 'smartScheduling',
    icon: FolderOpen,
  },
];


export default function PortfolioSection() {
  const [selectedPlaybook, setSelectedPlaybook] = useState<typeof playbooks[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

const playbookItems = t('playbooks.items', { returnObjects: true }) as {
  id: string;
  title: string;
  category: string;
  summary: string;
  detail: string;
}[];
const selectedPlaybookContent = selectedPlaybook
  ? playbookItems.find((item) => item.id === selectedPlaybook.key)
  : null;


  return (
    <section id="portfolio" className="py-24 relative section-glow" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
           {t('playbooks.headline.titleBefore')}{' '} <span className="text-gradient">{t('playbooks.headline.highlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
           {t('playbooks.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playbooks.map((playbook, index) => {
  const content = playbookItems[index];

  return (
    <motion.div
      key={playbook.id}
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 },
      }}
      onClick={() => setSelectedPlaybook(playbook)}
      className="glass-card neon-border p-6 cursor-pointer group perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
          <playbook.icon className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xs font-medium text-secondary px-2 py-1 rounded-full bg-secondary/10">
          {content.category}
        </span>
      </div>
      <h3 className="font-display text-lg font-semibold mb-2 text-foreground group-hover:text-gradient transition-all">
        {content.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        {content.summary}
      </p>
      <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
        <span>{t('playbooks.ctaLearnMore')}</span>
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
})}

        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPlaybook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedPlaybook(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPlaybook(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <selectedPlaybook.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-medium text-secondary">{selectedPlaybookContent?.category}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {selectedPlaybookContent?.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedPlaybookContent?.detail}
              </p>
              
              <a href="#contact" className="btn-primary w-full text-center block">
                {t('playbooks.ctaBuildThis')}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
