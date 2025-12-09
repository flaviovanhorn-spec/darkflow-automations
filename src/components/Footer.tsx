import { Zap, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <a href="#" className="flex items-center gap-2 text-foreground font-display font-bold text-xl justify-center md:justify-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-4 h-4 text-background" />
              </div>
              <span></span>
            </a>
            <p className="text-muted-foreground text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.nav.solutions')}
            </a>
            <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.nav.process')}
            </a>
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.nav.playbooks')}
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.nav.contact')}
            </a>
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground"
            aria-label="LinkedIn (coming soon)">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} <span className="italic"></span> {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>;
}