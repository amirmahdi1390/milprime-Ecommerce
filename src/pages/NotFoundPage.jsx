import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ArrowRight, Compass } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <SEO title="Page Not Found (404)" canonical="/404" noindex={true} />
      <div className="h-16 w-16 mx-auto rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#71717a]">
        <Compass className="h-8 w-8 stroke-[1.5]" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#71717a]">
          404 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090b]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#71717a] max-w-sm mx-auto">
          The destination you requested does not exist or has been relocated within our catalog.
        </p>
      </div>

      <div className="pt-2 flex items-center justify-center gap-4">
        <Link to="/">
          <Button variant="primary" size="md">
            Return Home <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline" size="md">
            Explore Shop
          </Button>
        </Link>
      </div>
    </div>
  );
}
