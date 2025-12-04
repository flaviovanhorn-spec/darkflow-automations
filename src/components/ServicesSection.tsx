import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Workflow, 
  Plug, 
  BarChart3, 
  Users, 
  Settings, 
  Headphones 
} from 'lucide-react';

const services = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Turn repetitive tasks into automated flows. Save hours every week and eliminate human error from routine processes.',
  },
  {
    icon: Plug,
    title: 'Tool Integration',
    description: 'Connect your apps with n8n & Make. No more copy-pasting between systems — your tools finally talk to each other.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards & Reporting',
    description: 'See your business at a glance with Power BI. Automated reports delivered when you need them, with the metrics that matter.',
  },
  {
    icon: Users,
    title: 'CRM & Sales Automation',
    description: 'Never let a lead slip through the cracks. Automated follow-ups, lead scoring, and pipeline updates in HubSpot and beyond.',
  },
  {
    icon: Settings,
    title: 'Operations & Admin',
    description: 'From invoicing to file organization to client onboarding — automate the admin work that eats your productive hours.',
  },
  {
    icon: Headphones,
    title: 'Maintenance & Support',
    description: 'Automations need love too. Ongoing support to keep your workflows running smoothly as your business evolves.',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            What I Can <span className="text-gradient">Automate</span> For You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every business is different, but these are the common areas where automation 
            creates the biggest impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card neon-border p-8 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 group-hover:scale-110">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
