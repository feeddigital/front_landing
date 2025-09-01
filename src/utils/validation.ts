export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  phone: (phone: string): boolean => {
    if (!phone) return true; 
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  },

  required: (value: string): boolean => {
    return value.trim() !== "";
  },

  minLength: (value: string, min: number): boolean => {
    return value.trim().length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.trim().length <= max;
  },
};