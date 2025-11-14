import Navigation from '@/components/navigation'
import HeroBanner from '@/components/hero-banner'
import EventDetails from '@/components/event-details'
import Speakers from '@/components/speakers'
import Sponsors from '@/components/sponsors'
import RegistrationForm from '@/components/registration-form'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'

export const metadata = {
  title: 'LEARN FOR GROWTH 2025 - Professional Seminar',
  description: 'Join our professional seminar on November 24, 2025. Learn professional working skills and business expertise from industry leaders.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <Navigation />
      <HeroBanner />
      <EventDetails />
      <RegistrationForm />
      <Speakers />
      <Sponsors />
      <FAQ />
      <Footer />
    </div>
  )
}
