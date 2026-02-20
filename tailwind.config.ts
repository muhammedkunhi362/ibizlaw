import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#1A1A1A", // Deep Charcoal
                    foreground: "#FFFFFF",
                },
                accent: {
                    DEFAULT: "#8C764D", // Gold
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#F8F9FA", // Off-white
                    foreground: "#2D2D2D",
                },
                background: "#1A1A1A",
                foreground: "#FFFFFF",
                // Admin dashboard colors
                admin: {
                    bg: "#0F1117",
                    surface: "#1A1D27",
                    "surface-hover": "#22252F",
                    border: "#2A2D37",
                    "border-light": "#363942",
                    muted: "#8B8FA3",
                    accent: "#8C764D",
                    "accent-hover": "#A08A5E",
                },
            },
            fontFamily: {
                serif: ["var(--font-serif)", "serif"],
                sans: ["var(--font-sans)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
    ],
};
export default config;
