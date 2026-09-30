export function isValidLuhn(numberString) {
  const digits = numberString.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export function isValidExpiry(expiry) {
  if (!expiry || typeof expiry !== 'string') return false;
  const match = expiry.trim().match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = parseInt(match[1], 10);
  const yearShort = parseInt(match[2], 10);

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYearShort = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (yearShort < currentYearShort) return false;
  if (yearShort === currentYearShort && month < currentMonth) return false;
  if (yearShort > currentYearShort + 25) return false;

  return true;
}

export function isValidCvv(cvv) {
  if (!cvv || typeof cvv !== 'string') return false;
  const trimmed = cvv.trim();
  return /^\d{3,4}$/.test(trimmed);
}

export function isValidCardholderName(name) {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 3) return false;
  return /^[a-zA-Z\s'.\-]{3,50}$/.test(trimmed) && trimmed.includes(' ');
}

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPostalCode(postalCode) {
  if (!postalCode || typeof postalCode !== 'string') return false;
  return /^[a-zA-Z0-9\s-]{3,10}$/.test(postalCode.trim());
}

export function isValidPhone(phone, required = false) {
  if (!phone || typeof phone !== 'string') return !required;
  const trimmed = phone.trim();
  if (!trimmed) return !required;
  return /^[\d\s+().-]{7,20}$/.test(trimmed);
}
