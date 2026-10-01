import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useUIStore } from '../store/uiStore';
import { SEO } from '../components/common/SEO';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useUIStore();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Please write a message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitting(false);
    setSubmitted(true);
    addToast('Your inquiry has been relayed to our concierge team.', 'success');
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Milprime Concierge',
    url: 'https://milprime.shop/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Milprime',
      url: 'https://milprime.shop',
      email: 'concierge@milprime.shop',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left">
      <SEO
        title="Concierge & Studio Support"
        description="Connect with the Milprime concierge team for product inquiries, sizing guidance, order tracking, and private showroom visits."
        canonical="/contact"
        schema={contactSchema}
      />
      
      {/* Title */}
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090b]">
          Contact Concierge
        </h1>
        <p className="mt-2 text-sm text-[#71717a]">
          Have questions regarding sizing, custom studio commissions, or orders? Our concierge team is available to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Contact Info Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] text-[#09090b] shrink-0">
                <MapPin className="h-5 w-5 stroke-[1.75]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#09090b]">Flagship Studio</h3>
                <p className="text-xs text-[#71717a] mt-0.5 leading-relaxed">
                  Milprime Flagship & Gallery<br />
                  482 Mercer Street, Soho<br />
                  New York, NY 10013
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] text-[#09090b] shrink-0">
                <Mail className="h-5 w-5 stroke-[1.75]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#09090b]">Digital Concierge</h3>
                <p className="text-xs text-[#71717a] mt-0.5">concierge@milprime.shop</p>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">Guaranteed response within 12 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] text-[#09090b] shrink-0">
                <Phone className="h-5 w-5 stroke-[1.75]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#09090b]">Telephone</h3>
                <p className="text-xs text-[#71717a] mt-0.5">+1 (800) 842-9102</p>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">Toll-free across North America</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] text-[#09090b] shrink-0">
                <Clock className="h-5 w-5 stroke-[1.75]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#09090b]">Studio Hours</h3>
                <p className="text-xs text-[#71717a] mt-0.5">Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                <p className="text-xs text-[#71717a]">Saturday: 10:00 AM – 5:00 PM EST</p>
              </div>
            </div>

          </div>

          <div className="p-6 rounded-2xl bg-[#fafafa] border border-[#e4e4e7] space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#09090b]">
              Press & Wholesale Enquiries
            </h4>
            <p className="text-xs text-[#71717a] leading-relaxed">
              For showroom appointments, press releases, or retail distribution inquiries, please email press@milprime.shop.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-[#09090b]">Inquiry Relayed</h3>
                <p className="text-xs text-[#71717a] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A client specialist has received your message and will reply to <span className="font-semibold text-[#09090b]">{formData.email}</span> shortly.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-base font-semibold text-[#09090b] mb-1">
                  Send a Direct Dispatch
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    placeholder="e.g. Julian Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    required
                  />
                </div>

                <Input
                  label="Subject *"
                  placeholder="Order Inquiry / Custom Sizing"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  error={errors.subject}
                  required
                />

                <div>
                  <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="How may our concierge assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-[#e4e4e7] bg-white p-3.5 text-sm text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b] focus:ring-1 focus:ring-[#09090b]"
                    required
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={submitting}
                  className="w-full font-semibold"
                >
                  Transmit Message
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
