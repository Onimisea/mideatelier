// theme.ts
import { createTheme, MantineColorsTuple } from "@mantine/core";

// Define your brand colors as Mantine color tuples
const deepNavy: MantineColorsTuple = [
  "#e6f0ff",
  "#cce0ff",
  "#99c2ff",
  "#66a3ff",
  "#3385ff",
  "#0066ff",
  "#0052cc",
  "#011C40", // Your primary deep navy
  "#001133",
  "#000d26",
];

const mutedGold: MantineColorsTuple = [
  "#fefcf0",
  "#fcf7e0",
  "#f9f0c2",
  "#f6e8a3",
  "#F2DC6D", // Your muted gold
  "#efd455",
  "#d4b946",
  "#b89e37",
  "#9c8429",
  "#80691b",
];

const burntOrange: MantineColorsTuple = [
  "#fff4e6",
  "#ffe8cc",
  "#ffcc99",
  "#ffb166",
  "#ff9533",
  "#BF6B04", // Your burnt orange
  "#a65900",
  "#8c4700",
  "#733600",
  "#592600",
];

const warmBeige: MantineColorsTuple = [
  "#fdfcfa",
  "#faf8f4",
  "#f5f1ea",
  "#f0eae0",
  "#eae3d5",
  "#D9CDBF", // Your warm beige
  "#c4b7a8",
  "#af9f90",
  "#9a8779",
  "#856f62",
];

const chocolateBrown: MantineColorsTuple = [
  "#f5f2ef",
  "#ebe4de",
  "#d6c7bd",
  "#c2aa9c",
  "#ad8d7b",
  "#996f5a",
  "#734924", // Your chocolate brown
  "#5e3b1d",
  "#492d16",
  "#341f0f",
];

export const earthy_luxe_theme = createTheme({
  // Color scheme
  colors: {
    deepNavy,
    mutedGold,
    burntOrange,
    warmBeige,
    chocolateBrown,
  },

  // Set primary color to deep navy for main brand identity
  primaryColor: "deepNavy",

  // Typography - elegant serif for luxury feel
  fontFamily: "var(--geist)",

  // Heading styles for luxury aesthetic
  headings: {
    fontFamily: "var(--layfair)",
    fontWeight: "400",
    sizes: {
      h1: { fontSize: "2.5rem", lineHeight: "1.2" },
      h2: { fontSize: "2rem", lineHeight: "1.3" },
      h3: { fontSize: "1.75rem", lineHeight: "1.4" },
      h4: { fontSize: "1.5rem", lineHeight: "1.4" },
      h5: { fontSize: "1.25rem", lineHeight: "1.5" },
      h6: { fontSize: "1rem", lineHeight: "1.5" },
    },
  },

  // Spacing for luxurious feel
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },

  // Radius for modern sophistication
  radius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },

  // Shadows for depth and luxury
  shadows: {
    xs: "0 1px 3px rgba(1, 28, 64, 0.12)",
    sm: "0 1px 3px rgba(1, 28, 64, 0.12), 0 1px 2px rgba(1, 28, 64, 0.24)",
    md: "0 4px 6px rgba(1, 28, 64, 0.12), 0 2px 4px rgba(1, 28, 64, 0.08)",
    lg: "0 10px 15px rgba(1, 28, 64, 0.12), 0 4px 6px rgba(1, 28, 64, 0.08)",
    xl: "0 20px 25px rgba(1, 28, 64, 0.12), 0 10px 10px rgba(1, 28, 64, 0.04)",
  },

  // Component-specific overrides
  components: {
    Button: {
      styles: {
        root: {
          fontWeight: 500,
          textTransform: "none",
          letterSpacing: "0.025em",
        },
      },
    },

    Card: {
      styles: {
        root: {
          backgroundColor: "var(--mantine-color-warmBeige-0)",
          border: "1px solid var(--mantine-color-warmBeige-2)",
        },
      },
    },

    Paper: {
      styles: {
        root: {
          backgroundColor: "var(--mantine-color-warmBeige-0)",
        },
      },
    },

    Text: {
      styles: {
        root: {
          color: "var(--mantine-color-deepNavy-7)",
        },
      },
    },

    Title: {
      styles: {
        root: {
          color: "var(--mantine-color-deepNavy-8)",
          fontWeight: 400,
        },
      },
    },
  },

  // Other theme properties
  other: {
    // Custom CSS variables for your brand
    brandColors: {
      deepNavy: "#011C40",
      mutedGold: "#F2DC6D",
      burntOrange: "#BF6B04",
      warmBeige: "#D9CDBF",
      chocolateBrown: "#734924",
    },
  },
});
