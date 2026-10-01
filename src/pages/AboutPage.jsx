import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Feather, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Hammer, Eye, HeartHandshake } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Milprime',
    description: 'The story, philosophy, craftsmanship, and materials behind the Milprime studio.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Milprime',
      url: 'https://milprime.shop',
      logo: 'https://milprime.shop/og-image.jpg',
    },
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 text-left">
      <SEO
        title="Our Philosophy & Studio Craft"
        description="Discover the architectural philosophy, material standards, and artisanal craftsmanship behind Milprime."
        canonical="/about"
        schema={aboutSchema}
      />

      {/* 1. Hero Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#71717a]">
          The Milprime Manifesto
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#09090b] leading-[1.08]">
          Architectural minimalism for modern everyday utility.
        </h1>
        <p className="text-base sm:text-lg text-[#71717a] max-w-2xl mx-auto leading-relaxed pt-2">
          We believe personal objects should be conceived like enduring structures: free from superfluous embellishment, built with honest materials, and crafted to last decades.
        </p>
      </section>

      {/* 2. Visual Image Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7]">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt="Milprime Design Studio"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>

      {/* 3. Our Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
              01 / Genesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b] mt-1">
              Our Story
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#52525b] leading-relaxed">
            <p>
              Milprime was founded in response to an accelerating retail culture dominated by planned obsolescence, disposable novelty, and aggressive corporate logos. We observed that the everyday objects accompanying professionals — bags, timepieces, wallets, and apparel — had largely succumbed to plastic-coated veneers and seasonal disposability.
            </p>
            <p>
              Our response was to step back and re-anchor our work in classical industrial design traditions: Scandinavian restraint, mid-century Swiss functionalism, and Japanese monozukuri craftsmanship. What began as a personal studio study in 2021 has expanded into an independent international collective of artisans, engineers, and curators committed to fewer, better things.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Our Philosophy & Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
            02 / Foundations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b] mt-1">
            Our Philosophy
          </h2>
          <p className="mt-2 text-sm text-[#71717a]">
            Our framework governs every textile choice, stitch placement, and mechanical tolerance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3 p-6 rounded-2xl bg-[#fafafa] border border-[#e4e4e7]">
            <Compass className="h-6 w-6 text-[#09090b]" />
            <h3 className="text-base font-semibold text-[#09090b]">Structural Clarity</h3>
            <p className="text-xs text-[#71717a] leading-relaxed">
              We remove unnecessary ornamentation to expose pure form, intuitive ergonomics, and essential functionality.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-[#fafafa] border border-[#e4e4e7]">
            <Feather className="h-6 w-6 text-[#09090b]" />
            <h3 className="text-base font-semibold text-[#09090b]">Material Integrity</h3>
            <p className="text-xs text-[#71717a] leading-relaxed">
              From vegetable-tanned hides to grade-5 titanium and organic twills, we source materials that age with dignity.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-[#fafafa] border border-[#e4e4e7]">
            <ShieldCheck className="h-6 w-6 text-[#09090b]" />
            <h3 className="text-base font-semibold text-[#09090b]">Rigorous Testing</h3>
            <p className="text-xs text-[#71717a] leading-relaxed">
              Every prototype undergoes rigorous stress testing to guarantee seam strength, water repellency, and drop survival.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-[#fafafa] border border-[#e4e4e7]">
            <Sparkles className="h-6 w-6 text-[#09090b]" />
            <h3 className="text-base font-semibold text-[#09090b]">Quiet Luxury</h3>
            <p className="text-xs text-[#71717a] leading-relaxed">
              True confidence whispers. Our branding is subtle and interior, letting craftsmanship speak for itself.
            </p>
          </div>
        </div>
      </section>

      {/* 5. What We Look For & The Design Approach */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4 p-8 rounded-2xl border border-[#e4e4e7] bg-white">
            <div className="h-10 w-10 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#09090b]">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-[#09090b]">What We Look For</h3>
            <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">
              Before an object is approved for prototyping, we evaluate four key criteria:
            </p>
            <ul className="space-y-2.5 text-xs text-[#09090b]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Longevity of Silhouette:</strong> Will this form remain relevant twenty years from now?</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Tactile Honesty:</strong> Does the surface feel natural, warm, and authentic to the touch?</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Field Serviceability:</strong> Can fasteners, straps, and calibers be repaired rather than discarded?</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Proportional Weight:</strong> Does the piece feel substantial in hand without causing fatigue?</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 p-8 rounded-2xl border border-[#e4e4e7] bg-white">
            <div className="h-10 w-10 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#09090b]">
              <Hammer className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-[#09090b]">Design Approach</h3>
            <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">
              Our studio operates on an iterative reductive workflow. We draft complete utilitarian specifications, and then systematically strip away every non-functional element until only the pure structural architecture remains.
            </p>
            <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">
              We prototype extensively in physical mediums — full-scale foam cores, vegetable-tanned hide muslins, and milled 3D titanium blocks — testing weight distribution in everyday commuter contexts before releasing a single piece.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Craftsmanship & Materials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#fafafa] border border-[#e4e4e7] p-8 sm:p-14">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
              03 / Provenance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b] mt-1">
              Craftsmanship & Materials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#09090b]">Tuscan Vegetable Tanning</h3>
              <p className="text-xs text-[#71717a] leading-relaxed">
                We work directly with certified tanneries in Tuscany using natural bark extracts. Unlike synthetic coatings, our full-grain leather breathes, stretches softly, and matures into an irreplaceable patina with continuous travel.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#09090b]">Titanium & Sapphire Calibers</h3>
              <p className="text-xs text-[#71717a] leading-relaxed">
                Our timepieces feature aerospace-grade titanium cases bead-blasted to a satin finish, paired with anti-reflective domed sapphire crystals resistant to everyday scratches and sudden thermal shifts.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#09090b]">Hand-Burnished Edges</h3>
              <p className="text-xs text-[#71717a] leading-relaxed">
                Rather than covering raw hide seams with painted rubber that cracks after a single winter, our leather edges are hand-beveled, waxed with natural beeswax, and heat-burnished to create a permanent water-sealed bond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Experience */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
              04 / Dedication
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b] mt-1">
              Customer Experience
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-sm text-[#52525b] leading-relaxed">
            <p>
              Your relationship with Milprime begins when a piece enters your daily orbit. We believe customer service is not a transactional ticketing queue, but an ongoing concierge dialogue.
            </p>
            <p>
              Every order arrives in bespoke, plastic-free fiber packaging accompanied by our comprehensive care instructions. If you ever require repair advice, replacement hardware, or styling guidance, our studio team in New York is readily available via direct email.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Closing Brand Statement & CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-black text-white p-8 sm:p-14 lg:p-16 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              The Permanent Archive
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              An investment in restraint and enduring craft.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Explore our permanent lineup of bags, horology, apparel, and design objects. Built to be lived in, refined over time, and passed forward.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link to="/shop">
                <Button variant="secondary" size="lg" className="rounded-full px-8 bg-white text-black hover:bg-zinc-200">
                  Explore Catalog <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="rounded-full px-7 border-zinc-700 text-white hover:bg-zinc-900">
                  Contact Studio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
