// Test script to verify the current email validation logic handles both Gmail and general .com typos
console.log("Testing current email validation logic...\n");

// Current validation logic (from the fixed version)
function currentValidation(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return "Invalid format";
  }

  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    return "Must contain exactly one @ symbol";
  }

  const emailLower = email.toLowerCase();

  // Specific validation for common Gmail typos
  if (emailLower.includes('@gmail.co') && !emailLower.includes('@gmail.com')) {
    if (emailLower.match(/@gmail\.co([^.]|$)/)) {
      return "Did you mean 'gmail.com' instead of 'gmail.co'?";
    }
  }

  if (emailLower.includes('@gmial.') || emailLower.includes('@gamil.') || emailLower.includes('@gmal.')) {
    const typoMatch = emailLower.match(/(@[a-z.]+\.[a-z]+)/);
    const typoPart = typoMatch ? typoMatch[0] : '@domain';
    return "Did you mean 'gmail.com' instead of '" + typoPart + "'?";
  }

  // Check for common .com typos
  if (emailLower.includes('.comm') || emailLower.includes('.cm') || emailLower.includes('.coom')) {
    return "Email domain appears to have a typo. Did you mean '.com'?";
  }

  // Check for invalid patterns like .comew, .comq, etc.
  if (/\.(com|org|net|edu|gov|co|io|me|info|biz)[a-z]{2,}/.test(emailLower)) {
    const match = emailLower.match(/\.(com|org|net|edu|gov|co|io|me|info|biz)([a-z]+)/);
    if (match && match[2]) {
      const invalidPart = '.' + match[1] + match[2];
      const validPart = '.' + match[1];
      return `Email domain appears to have extra characters after the extension. Did you mean '${validPart}' instead of '${invalidPart}'?`;
    }
  }

  return "Valid";
}

// Test cases focusing on .com spelling issues
const testCases = [
  { email: "user@gmail.com", description: "Valid Gmail address (should be accepted)" },
  { email: "user@gmail.co", description: "Gmail with .co domain (should be accepted if intentional)" },
  { email: "user@yahoo.com", description: "Valid Yahoo address (should be accepted)" },
  { email: "user@example.comm", description: "Typo: .comm instead of .com (should show error)" },
  { email: "user@example.cm", description: "Typo: .cm instead of .com (should show error)" },
  { email: "user@example.coom", description: "Typo: .coom instead of .com (should show error)" },
  { email: "user@example.comew", description: "Extra chars after .com (should show error)" },
  { email: "user@example.comq", description: "Extra char after .com (should show error)" },
  { email: "user@example.comming", description: "Extra chars after .com (should show error)" },
  { email: "user@gmial.com", description: "Typo: gmial instead of gmail (should show error)" },
  { email: "user@gamil.com", description: "Typo: gamil instead of gmail (should show error)" },
  { email: "user@gmal.com", description: "Typo: gmal instead of gmail (should show error)" },
  { email: "user@company.co.uk", description: "Valid UK domain (should be accepted)" },
  { email: "user@site.org", description: "Valid .org domain (should be accepted)" },
  { email: "user@business.net", description: "Valid .net domain (should be accepted)" }
];

console.log("Testing CURRENT validation logic:");
console.log("==================================");
testCases.forEach(testCase => {
  const result = currentValidation(testCase.email);
  const status = result === "Valid" ? "✅ ACCEPTED" : "❌ ERROR";
  console.log(`${status} | ${testCase.email.padEnd(25)} | ${result} (${testCase.description})`);
});

console.log("\nExpected behavior:");
console.log("- Valid emails like 'user@gmail.com', 'user@yahoo.com', 'user@company.co.uk' should be ACCEPTED");
console.log("- Common .com typos like '.comm', '.cm', '.coom', '.comew' should show ERRORS");
console.log("- Gmail typos like 'gmial.com', 'gamil.com', 'gmal.com' should show ERRORS");
console.log("- The fix should allow legitimate domains while catching actual typos");