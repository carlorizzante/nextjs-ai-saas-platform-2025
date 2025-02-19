import { LandingContent } from '@/components/landing-content';
import { LandingHero } from '@/components/landing-hero';
import { LandingNavbar } from '@/components/landing-navbar';

export default async function LandingPage() {
  return (
    <main className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </main>
  )
}
