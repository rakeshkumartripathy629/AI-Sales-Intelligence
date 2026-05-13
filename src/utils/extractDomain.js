export const extractWebsite = (input) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const match = input.match(urlRegex);

  return match ? match[0] : null;
};