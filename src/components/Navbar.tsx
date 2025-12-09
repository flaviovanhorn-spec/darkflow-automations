import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next'; 
const navLinks = [{
  href: '#about',
  label: 'nav.about'
}, {
  href: '#services',
  label: 'nav.solutions'
}, {
  href: '#portfolio',
  label: 'nav.playbooks'
}, {
  href: '#process',
  label: 'nav.process'
}, {
  href: '#contact',
  label: 'nav.contact'
}];
export default function Navbar() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: "en" | "es" | "nl") => {
    i18n.changeLanguage(lng);
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card py-3' : 'py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-foreground font-display font-bold text-xl">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Zap className="w-5 h-5 text-background" />
          </div>
          <span className="text-xs italic"></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (<a 
          key={link.href} 
          href={link.href} 
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium">
              {t(link.label)}
            </a>
          ))}
<div className="flex items-center gap-2 ml-4 text-xs">
  {["en", "es", "nl"].map((lang) => (
    <button
      key={lang}
      onClick={() => changeLanguage(lang as "en" | "es" | "nl")}
      className={`uppercase ${
        i18n.language.startsWith(lang) ? "font-semibold" : "opacity-60"
      }`}
    >
      {lang}
    </button>
  ))}
</div>
        <a href="#contact" className="btn-primary text-sm py-2 px-6">
          {t("nav.cta")}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden glass-card mt-2 mx-4 rounded-xl overflow-hidden">
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2">
                  {t(link.label)}
                </a>)}
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary text-center text-sm py-3">
                {t("nav.cta")}
              </a>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
}