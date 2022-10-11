module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    transitionProperty: {
      height: "height",
      spacing: "margin, padding",
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "20px",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
    },
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
