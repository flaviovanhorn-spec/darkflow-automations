import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Mail, FolderOpen, UserPlus, BarChart2, Headphones, FileText } from 'lucide-react';

const playbooks = [
  {
    id: 1,
    title: 'Lead → CRM → Follow-Up',
    category: 'Sales',
    summary: 'Capture leads automatically and trigger personalized follow-ups',
    icon: Mail,
    detail: 'When a lead comes in from your website, form, or ad — it automatically goes into your CRM, gets tagged, and triggers a personalized email sequence. No manual data entry, no forgotten follow-ups.',
  },
  {
    id: 2,
    title: 'Automated Client Onboarding',
    category: 'Operations',
    summary: 'Welcome new clients with zero manual steps',
    icon: UserPlus,
    detail: 'New client signs up? They automatically get a welcome email, their folder is created in Google Drive, their project is set up in your PM tool, and you get a Slack notification. First impressions, handled.',
  },
  {
    id: 3,
    title: 'Morning KPI Snapshot',
    category: 'Reporting',
    summary: 'Daily email with your key metrics, automatically',
    icon: BarChart2,
    detail: 'Wake up to an email showing yesterday\'s sales, support tickets, website visits, and whatever else matters. Power BI pulls the data, the automation sends it — you just drink your coffee.',
  },
  {
    id: 4,
    title: 'Invoices & Payment Updates',
    category: 'Finance',
    summary: 'Track payments and notify your team automatically',
    icon: FileText,
    detail: 'When an invoice is paid, your accounting software updates, your CRM marks the client as active, and your team gets notified. Overdue? Automatic reminders go out.',
  },
  {
    id: 5,
    title: 'Smart Support Ticket Routing',
    category: 'Support',
    summary: 'Get tickets to the right person, instantly',
    icon: Headphones,
    detail: 'Support request comes in? It\'s automatically categorized, assigned to the right team member based on skill or availability, and the customer gets an instant acknowledgment.',
  },
  {
    id: 6,
    title: 'Organized File System',
    category: 'Operations',
    summary: 'Files sorted and renamed automatically in Google Drive',
    icon: FolderOpen,
    detail: 'Tired of messy folders? New files automatically get renamed following your convention, moved to the right folder, and logged in a spreadsheet. Find anything in seconds.',
  },
];

export default function PortfolioSection() {
  const [selectedPlaybook, setSelectedPlaybook] = useState<typeof playbooks[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            Automation <span className="text-gradient">Playbooks</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Examples of what we can build together — we'll adapt everything to your tools and workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playbooks.map((playbook, index) => (
            <motion.div
              key={playbook.id}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 }
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
                  {playbook.category}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground group-hover:text-gradient transition-all">
                {playbook.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {playbook.summary}
              </p>
              <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
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
                  <span className="text-xs font-medium text-secondary">{selectedPlaybook.category}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {selectedPlaybook.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedPlaybook.detail}
              </p>
              
              <a href="#contact" className="btn-primary w-full text-center block">
                Build This For Me
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
