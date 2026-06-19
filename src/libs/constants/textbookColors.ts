export const TEXTBOOK_COLOR_PALETTE = [
  "#06B6D4", // Cyan
  "#F59E0B", // Amber
  "#10B981", // Green
  "#8B5CF6", // Violet
  "#EF4444", // Red
  "#F97316", // Orange
] as const;

export type TextbookColor = (typeof TEXTBOOK_COLOR_PALETTE)[number];
