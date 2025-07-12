import { createTheme, MantineColorsTuple } from "@mantine/core";

const deepNavy: MantineColorsTuple = [
  "#f0f4f8",
  "#d9e2ec",
  "#b8cce5",
  "#8fb3d9",
  "#5a8cc7",
  "#2563eb",
  "#1e40af",
  "#1d4ed8",
  "#1e3a8a",
  "#011c40",
];

const mutedGold: MantineColorsTuple = [
  "#fffef5",
  "#fefce8",
  "#fef3c7",
  "#fde68a",
  "#fcd34d",
  "#f2dc6d",
  "#eab308",
  "#ca8a04",
  "#a16207",
  "#854d0e",
];

const burntOrange: MantineColorsTuple = [
  "#fff7ed",
  "#ffedd5",
  "#fed7aa",
  "#fdba74",
  "#fb923c",
  "#f97316",
  "#ea580c",
  "#bf6b04",
  "#9a3412",
  "#7c2d12",
];

const warmBeige: MantineColorsTuple = [
  "#fefefe",
  "#fdfcfa",
  "#faf8f5",
  "#f5f1eb",
  "#ede5d8",
  "#d9cdbf",
  "#c4b5a3",
  "#a89889",
  "#8b7a6b",
  "#6b5d4f",
];

const chocolateBrown: MantineColorsTuple = [
  "#faf8f5",
  "#f5f1eb",
  "#ede5d8",
  "#dccdb8",
  "#c4b5a3",
  "#a89889",
  "#8b7a6b",
  "#734924",
  "#5d3b1e",
  "#4a2f19",
];

const theme = createTheme({
  primaryColor: "muted-gold",

  colors: {
    "deep-navy": deepNavy,
    "muted-gold": mutedGold,
    "burnt-orange": burntOrange,
    "warm-beige": warmBeige,
    "chocolate-brown": chocolateBrown,
  },

  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },

  defaultRadius: "xl",

  fontFamily:
    "Geist, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",

  headings: {
    fontFamily:
      "Playfair Display, Georgia, Cambria, Times New Roman, Times, serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "2.125rem", lineHeight: "1.3" },
      h2: { fontSize: "1.625rem", lineHeight: "1.35" },
      h3: { fontSize: "1.375rem", lineHeight: "1.4" },
      h4: { fontSize: "1.125rem", lineHeight: "1.45" },
      h5: { fontSize: "1rem", lineHeight: "1.5" },
      h6: { fontSize: "0.875rem", lineHeight: "1.5" },
    },
  },

  components: {
    Button: {
      defaultProps: {
        variant: "filled",
        color: "muted-gold",
      },
    },
  },
});

export default theme;
