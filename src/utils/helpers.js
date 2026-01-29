// Email validation function
export const isValidEmail = (email) => {
  // Standard email validation regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Advanced email validation with suggestions
export const validateEmailWithSuggestions = (email) => {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  // Basic syntax check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  const [localPart, domain] = email.toLowerCase().split('@');

  // Common email domains to check against
  const commonDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
    'icloud.com', 'aol.com', 'protonmail.com', 'zoho.com',
    'yandex.com', 'mail.com', 'gmx.com', 'live.com'
  ];

  // Check for exact match first (valid common domain)
  if (commonDomains.includes(domain)) {
    return { isValid: true, error: null };
  }

  // Calculate Levenshtein distance for fuzzy matching
  const levenshteinDistance = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1  // deletion
            )
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  // Check if the domain is close to a common domain
  // Threshold: 1 edit for short domains, 2 for longer ones
  for (const commonDomain of commonDomains) {
    const distance = levenshteinDistance(domain, commonDomain);
    const threshold = commonDomain.length < 10 ? 1 : 2;

    if (distance > 0 && distance <= threshold) {
      return {
        isValid: false,
        error: `Did you mean '${commonDomain}'?`,
        suggestion: commonDomain
      };
    }
  }

  // Special check for gmail variations that might be farther than generic threshold
  // or specific common typos like 'gamil'
  if (domain.includes('gmail') || domain.includes('gmai') || domain.includes('gmil') || domain.includes('gamil')) {
    if (domain !== 'gmail.com') {
      return { isValid: false, error: "Did you mean 'gmail.com'?", suggestion: 'gmail.com' };
    }
  }

  return { isValid: true, error: null };

};

// Password validation function
export const isValidPassword = (password) => {
  // At least 8 characters, contains uppercase, lowercase, number, and special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Generate a strong random password
export const generateStrongPassword = () => {
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const allChars = upperCaseChars + lowerCaseChars + numbers + specialChars;

  // Ensure at least one character from each category
  let password = '';
  password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
  password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest randomly to reach 12 characters
  for (let i = 4; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to randomize character positions
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};