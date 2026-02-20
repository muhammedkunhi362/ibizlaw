/** @type {import('tailwindcss').Config} */
module.exports = {
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
                admin: {
                    bg: "#121212",
                    surface: "#1E1E1E",
                    "surface-hover": "#2A2A2A",
                    border: "#333333",
                    "border-light": "#444444",
                    muted: "#9CA3AF",
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
    plugins: [],
};
