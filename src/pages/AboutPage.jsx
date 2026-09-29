import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Feather, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

export function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16 text-left">
      
      {/* Hero Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#71717a]">
          The Milprime Manifesto
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#09090b] leading-[1.1]">
          Architectural minimalism for modern everyday utility.
        </h1>
        <p className="text-base sm:text-lg text-[#71717a] max-w-2xl mx-auto leading-relaxed pt-2">
          We believe personal objects should be conceived like enduring structures: free from superfluous embellishment, built with honest materials, and crafted to last decades.
        </p>
      </section>

      {/* Visual Image Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7]">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt="Milprime Design Studio"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#09090b]">
            Design Principles
          </h2>
          <p className="mt-2 text-sm text-[#71717a]">
            Our framework governs every textile choice, stitch placement, and mechanical tolerance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Narrative Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-[#71717a] leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl font-bold text-[#09090b]">A Rejection of Fast Fashion</h2>
        <p>
          Milprime was established as an antidote to disposable retail culture. We observed an industry obsessed with fleeting trends, planned obsolescence, and overwhelming logos. In response, our studio turned to classical industrial design principles.
        </p>
        <p>
          Each edition is produced in limited, numbered capsules. When an item is sold, we examine client feedback, refine pattern tolerances, and only produce again when absolute refinement has been achieved.
        </p>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#fafafa] border border-[#e4e4e7] p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#09090b]">
            Experience the Collection
          </h2>
          <p className="text-sm text-[#71717a] max-w-md mx-auto">
            Discover our permanent lineup of bags, horology, apparel, and design objects.
          </p>
          <div className="pt-2">
            <Link to="/shop">
              <Button variant="primary" size="lg" className="rounded-full px-8">
                Explore the Catalog <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
