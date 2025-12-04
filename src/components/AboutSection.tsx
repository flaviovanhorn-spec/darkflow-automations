import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Wrench, Lightbulb, Rocket } from 'lucide-react';

const highlights = [
  { icon: Target, title: 'Focus', text: 'Solving real problems, not chasing shiny tools' },
  { icon: Wrench, title: 'Tools', text: 'n8n, Make, Google Workspace, HubSpot, Power BI' },
  { icon: Lightbulb, title: 'Style', text: 'Simple solutions that grow with your business' },
  { icon: Rocket, title: 'Goal', text: 'More time for what matters, less busywork' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative section-glow" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Your Automation Partner,
            <br />
            <span className="text-gradient">Not Just Another Tool Guy</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 neon-border"
          >
            <h3 className="font-display text-2xl font-semibold mb-4 text-foreground">
              How I Work With You
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I start by listening. Tell me about your day — what tasks feel repetitive, 
                what makes you roll your eyes, what you wish "just happened" without you touching it.
              </p>
              <p>
                Then I map out your processes, identify what can be automated, and build clean 
                workflows that connect your tools. No complex jargon, no over-engineered systems. 
                Just practical automations that save you hours every week.
              </p>
              <p>
                Whether it's syncing your CRM with your inbox, generating reports automatically, 
                or routing support tickets to the right person — I make sure it works reliably 
                and grows with your business.
              </p>
            </div>
          </motion.div>

          {/* Right: Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-card p-6 flex items-start gap-4 group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
