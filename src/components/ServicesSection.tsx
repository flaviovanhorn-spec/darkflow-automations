import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Workflow, 
  Plug, 
  BarChart3, 
  Users, 
  Settings, 
  Headphones 
} from 'lucide-react';

const services = [

  { icon: Workflow, key: 'workflowAutomation' },
  { icon: Plug, key: 'toolIntegration' },
  { icon: BarChart3, key: 'dashboardsReporting' },
  { icon: Users, key: 'crmSalesLanding' },
  { icon: Settings, key: 'operationsAdmin' },
  { icon: Headphones, key: 'maintenanceSupport' },

];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();
  const serviceItems = t('services.items', { returnObjects: true }) as {
  id: string;
  title: string;
  description: string;
}[];

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
           {t('services.headline.titleBefore')}{' '} 
           <span className="text-gradient">{t('services.headline.highlight')}
            </span> {t('services.headline.titleAfter')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card neon-border p-8 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 group-hover:scale-110">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-gradient transition-all duration-300">
      {serviceItems[index].title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
               {serviceItems[index].description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
