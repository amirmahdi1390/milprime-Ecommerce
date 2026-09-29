import React, { useState } from 'react';
import { Lock, CreditCard, Shield, Zap } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { CardBrandBadge, detectCardBrand } from './PaymentIcons';

export function CheckoutForm({ onSubmit, loading, totalAmount = 0 }) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    addressCont: '',
    postalCode: '',
    city: '',
    state: '',
    country: 'United States',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardholderName: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    handleChange('cardNumber', formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    let formatted = raw;
    if (raw.length >= 2) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    handleChange('cardExpiry', formatted);
  };

  // Format CVV
  const handleCvvChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    handleChange('cardCvv', raw);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }
    if (formData.cardNumber.replace(/\s/g, '').length < 15) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!formData.cardExpiry || formData.cardExpiry.length < 5) {
      newErrors.cardExpiry = 'Enter MM/YY';
    }
    if (!formData.cardCvv || formData.cardCvv.length < 3) {
      newErrors.cardCvv = 'Enter CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const cardBrand = detectCardBrand(formData.cardNumber);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-left">
      
      {/* Express One-Click Link Button */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => {
            handleChange('email', 'patron@milprime.com');
            handleChange('fullName', 'Julian Vance');
            handleChange('address', '742 Evergreen Terrace');
            handleChange('city', 'New York');
            handleChange('postalCode', '10001');
            handleChange('cardNumber', '4242 4242 4242 4242');
            handleChange('cardExpiry', '12/28');
            handleChange('cardCvv', '888');
          }}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#00d66f] hover:bg-[#00c264] text-black font-semibold text-sm transition-all shadow-sm cursor-pointer"
        >
          <Zap className="h-4 w-4 fill-black" />
          <span>Pay securely with <strong className="font-extrabold tracking-tight">link</strong></span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#e4e4e7] w-full" />
          <span className="bg-white px-3 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider absolute">
            OR PAY WITH CARD
          </span>
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[#09090b]">Contact Information</h3>
        <Input
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />
      </div>

      {/* Shipping Address Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[#09090b]">Shipping Address</h3>
        
        <Input
          label="Full Name"
          placeholder="First and last name"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <Input
          label="Street Address"
          placeholder="123 Minimalist Blvd"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          error={errors.address}
          required
        />

        <Input
          label="Apartment, suite, unit (optional)"
          placeholder="Apt 4B"
          value={formData.addressCont}
          onChange={(e) => handleChange('addressCont', e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Postal Code"
            placeholder="10001"
            value={formData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            error={errors.postalCode}
            required
          />
          <Input
            label="City"
            placeholder="New York"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            error={errors.city}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="State / Province"
            placeholder="NY"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />
          <div>
            <label className="block text-xs font-medium text-[#71717a] uppercase tracking-wider mb-1.5">
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full rounded-lg border border-[#e4e4e7] bg-white px-3.5 py-2.5 text-sm text-[#09090b] focus:outline-none focus:border-[#09090b]"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
        </div>

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
        <p className="text-[11px] text-[#a1a1aa] -mt-2">
          In case our courier needs to reach you regarding parcel delivery.
        </p>
      </div>

      {/* Payment Information Section */}
      <div className="space-y-4 pt-2 border-t border-[#e4e4e7]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#09090b]">Payment Details</h3>
          <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Card Number Input with Dynamic Card Brand Indicator */}
        <div className="relative">
          <Input
            label="Card Number"
            placeholder="4242 •••• •••• 4242"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            error={errors.cardNumber}
            required
          />
          <div className="absolute right-3.5 top-8 flex items-center gap-1.5">
            <CardBrandBadge brand={cardBrand} />
            <CreditCard className="h-4 w-4 text-[#a1a1aa]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiration"
            placeholder="MM/YY"
            value={formData.cardExpiry}
            onChange={handleExpiryChange}
            error={errors.cardExpiry}
            required
          />
          <Input
            label="Security Code"
            placeholder="CVC / CVV"
            value={formData.cardCvv}
            onChange={handleCvvChange}
            error={errors.cardCvv}
            required
          />
        </div>

        <Input
          label="Cardholder Name"
          placeholder="Name as it appears on card"
          value={formData.cardholderName}
          onChange={(e) => handleChange('cardholderName', e.target.value)}
        />
      </div>

      {/* Pay Now Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full text-base font-semibold h-12 shadow-sm"
      >
        {loading ? 'Authorizing Payment...' : `Pay now`}
      </Button>

      {/* Security assurances */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#71717a]">
        <span className="flex items-center gap-1">
          <Shield className="h-3.5 w-3.5 text-emerald-600" />
          End-to-End Encryption
        </span>
        <span>•</span>
        <span>Zero Fraud Liability</span>
        <span>•</span>
        <span>Processed via Stripe</span>
      </div>

    </form>
  );
}
