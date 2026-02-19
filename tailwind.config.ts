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
    plugins: [],
};
export default config;
