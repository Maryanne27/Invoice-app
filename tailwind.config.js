export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#7C5DFA",
        primaryHover: "#9277FF",
        bgLight: "#F8F8FB",
        bgDark2: "#0C0E16",
        bgDark: "#141625" ,
        cardLight: "#FFFFFF",
        cardDark: "#1E2139",
        textPrimary: "#0C0E16",
        textSecondary: "#858BB2",
        pending: "#FF8F00",
        paid: "#33D69F",
        draft: "#373B53",
      },
    },
  },
  plugins: [],
};