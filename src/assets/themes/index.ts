import { createTheme } from "@mui/material";
import type { PaletteColor, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    accent: PaletteColor;
  }
  interface PaletteOptions {
    accent?: PaletteColorOptions;
  }
}

// ここを変更したらvariable.scssも変更する
const COLOR_PALETTE = {
  // Primary (Indigo Blue)
  primary50: "#EEF1FF",
  primary200: "#C5CEFF",
  primary400: "#748FFC",
  primary: "#4361EE",
  primary700: "#3346C4",
  primary900: "#3A0CA3",
  // Secondary (Amber)
  amber: "#F9A825",
  // Accent (Cyan)
  cyan: "#0CC8E8",
  // Success (Green)
  green: "#22C55E",
  // Neutrals (Cool Blue Grey)
  bgBase: "#F5F6FC",
  surface2: "#EAECF5",
  border: "#E2E4F0",
  textPlaceholder: "#9194AF",
  textSub: "#5C6285",
  textMain: "#1A1D3B",
};

export const defaultTheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: COLOR_PALETTE.primary,
      light: COLOR_PALETTE.primary400,
      dark: COLOR_PALETTE.primary700,
    },
    secondary: {
      main: COLOR_PALETTE.amber,
    },
    success: {
      main: COLOR_PALETTE.green,
    },
    accent: {
      main: COLOR_PALETTE.cyan,
      light: COLOR_PALETTE.cyan,
      dark: COLOR_PALETTE.cyan,
      contrastText: "#fff",
    },
    text: {
      primary: COLOR_PALETTE.textMain,
      secondary: COLOR_PALETTE.textSub,
      disabled: COLOR_PALETTE.textPlaceholder,
    },
    background: {
      default: COLOR_PALETTE.bgBase,
      paper: COLOR_PALETTE.surface2,
    },
  },
  typography: {
    fontFamily: 'var(--font-noto-sans-jp), "Noto Sans JP", sans-serif',
    h1: { fontSize: "3rem" },
    h2: { fontSize: "2.5rem" },
    h3: { fontSize: "2rem" },
    h4: { fontSize: "1.75rem" },
    h5: { fontSize: "1.5rem" },
    h6: { fontSize: "1.25rem" },
    subtitle1: { fontSize: "1rem" },
    subtitle2: { fontSize: "0.875rem" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
  },
  shape: {
    borderRadius: 8,
  },
});
