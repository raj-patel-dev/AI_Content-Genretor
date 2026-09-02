
export const formatTwoWords = (text) => {
  if (!text || typeof text !== "string") return "";
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).join(" ");
};
