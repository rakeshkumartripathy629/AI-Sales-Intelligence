const MIN_LINE_LENGTH = 30;

const BLOCKED_PATTERNS = [
  "cookie policy",
  "privacy policy",
  "terms of service",
  "all rights reserved",
  "subscribe",
  "sign up",
  "login",
  "facebook",
  "instagram",
  "linkedin",
  "twitter"
];

const normalizeWhitespace = (text) => {
  return text
    .replace(/\s+/g, " ")
    .trim();
};

const removeDuplicateLines = (lines) => {
  return [...new Set(lines)];
};

const isUsefulLine = (line) => {
  if (!line) return false;

  if (line.length < MIN_LINE_LENGTH) {
    return false;
  }

  const lowerLine = line.toLowerCase();

  return !BLOCKED_PATTERNS.some((pattern) =>
    lowerLine.includes(pattern)
  );
};

export const cleanScrapedContent = (
  content
) => {
  if (!content) return "";

  let lines = content
    .split(/\.\s|\n/)
    .map((line) => line.trim());

  lines = removeDuplicateLines(lines);

  lines = lines.filter(isUsefulLine);

  const cleanedContent = lines.join(". ");

  return normalizeWhitespace(cleanedContent);
};