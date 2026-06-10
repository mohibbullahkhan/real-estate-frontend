import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import MapSection from '@/components/MapSection'
import PropertiesSection from '@/components/PropertiesSection'
import FAQSection from '@/components/FAQSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      {/* Hero – animated via framer-motion internally */}
      <HeroSection />

      {/* About Section */}
      <ScrollReveal direction="up" delay={0}>
        <AboutSection />
      </ScrollReveal>

      {/* Map Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <MapSection />
      </ScrollReveal>

      {/* Properties Section */}
      <ScrollReveal direction="up" delay={0}>
        <PropertiesSection />
      </ScrollReveal>

      {/* Testimonials */}
      <ScrollReveal direction="up" delay={0.05}>
        <TestimonialsSection />
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal direction="up" delay={0.05}>
        <FAQSection />
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal direction="up" delay={0.1}>
        <CTASection />
      </ScrollReveal>
    </main>
  )
}
