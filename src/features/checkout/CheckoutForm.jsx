import React, { useState } from 'react';
import { Lock, CreditCard, Shield } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { CardBrandBadge, detectCardBrand, SupportedPaymentMethods } from './PaymentIcons';
import {
  isValidLuhn,
  isValidExpiry,
  isValidCvv,
  isValidCardholderName,
  isValidEmail,
  isValidPostalCode,
  isValidPhone,
} from '../../utils/validation';

export function CheckoutForm({ onSubmit, loading }) {
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

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 19);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    handleChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    let formatted = raw;
    if (raw.length >= 2) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    handleChange('cardExpiry', formatted);
  };

  const handleCvvChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    handleChange('cardCvv', raw);
  };

  const validate = () => {
    const newErrors = {};

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.address.trim() || formData.address.trim().length < 3) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!isValidPostalCode(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid postal code';
    }
    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    const cleanCard = formData.cardNumber.replace(/\s/g, '');
    if (!cleanCard || cleanCard.length < 13 || !isValidLuhn(cleanCard)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    if (!isValidExpiry(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Invalid or expired date (MM/YY)';
    }
    if (!isValidCvv(formData.cardCvv)) {
      newErrors.cardCvv = 'Enter valid 3 or 4 digit CVV';
    }
    if (!isValidCardholderName(formData.cardholderName)) {
      newErrors.cardholderName = 'Enter full cardholder name (first and last)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Send customer data without persisting card credentials
    const submissionData = {
      email: formData.email,
      fullName: formData.fullName,
      address: formData.address,
      addressCont: formData.addressCont,
      postalCode: formData.postalCode,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      phone: formData.phone,
      cardBrand: detectCardBrand(formData.cardNumber),
      cardLast4: formData.cardNumber.replace(/\s/g, '').slice(-4),
    };

    onSubmit(submissionData);
  };

  const cardBrand = detectCardBrand(formData.cardNumber);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-left">
      
      {/* Contact Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-[#09090b]">Contact Information</h2>
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />
      </div>

      {/* Shipping Address Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-[#09090b]">Shipping Address</h2>
        
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <Input
          label="Street Address"
          placeholder="Street address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          error={errors.address}
          required
        />

        <Input
          label="Apartment, suite, unit (optional)"
          placeholder="Apt, Suite, Unit"
          value={formData.addressCont}
          onChange={(e) => handleChange('addressCont', e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Postal Code"
            placeholder="Postal code"
            value={formData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            error={errors.postalCode}
            required
          />
          <Input
            label="City"
            placeholder="City"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            error={errors.city}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="State / Province"
            placeholder="State / Province"
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
          placeholder="Phone number"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
        />
        <p className="text-[11px] text-[#a1a1aa] -mt-2">
          Used solely for courier delivery notifications.
        </p>
      </div>

      {/* Payment Information Section */}
      <div className="space-y-4 pt-2 border-t border-[#e4e4e7]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-[#09090b]">Payment Details</h2>
            <SupportedPaymentMethods />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

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
            placeholder="CVV"
            value={formData.cardCvv}
            onChange={handleCvvChange}
            error={errors.cardCvv}
            required
          />
        </div>

        <Input
          label="Cardholder Name"
          placeholder="Full name as shown on card"
          value={formData.cardholderName}
          onChange={(e) => handleChange('cardholderName', e.target.value)}
          error={errors.cardholderName}
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full text-base font-semibold h-12 shadow-sm"
      >
        {loading ? 'Authorizing Payment...' : 'Pay now'}
      </Button>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#71717a]">
        <span className="flex items-center gap-1">
          <Shield className="h-3.5 w-3.5 text-emerald-600" />
          End-to-End Encryption
        </span>
        <span>•</span>
        <span>Zero Fraud Liability</span>
        <span>•</span>
        <span>Verified Checkout</span>
      </div>

    </form>
  );
}
