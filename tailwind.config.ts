import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Noto Serif JP"', 'serif'],
        brand: ['"Montserrat"', 'sans-serif'],
        body: ['"Inter"', '"Noto Sans JP"', '"Noto Sans KR"', 'sans-serif'],
        jp: ['"Noto Sans JP"', 'sans-serif'],
        kr: ['"Noto Sans KR"', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        cyan: {
          DEFAULT: "hsl(188 85% 53%)",
          50: "hsl(188 85% 95%)",
          100: "hsl(188 85% 85%)",
          200: "hsl(188 85% 75%)",
          300: "hsl(188 85% 65%)",
          400: "hsl(188 85% 58%)",
          500: "hsl(188 85% 53%)",
          600: "hsl(188 85% 45%)",
          700: "hsl(188 85% 38%)",
          800: "hsl(188 85% 30%)",
          900: "hsl(188 85% 20%)",
        },
        gold: {
          DEFAULT: "hsl(51 100% 50%)",
          50: "hsl(51 100% 95%)",
          100: "hsl(51 100% 85%)",
          200: "hsl(51 100% 70%)",
          300: "hsl(51 100% 60%)",
          400: "hsl(51 100% 55%)",
          500: "hsl(51 100% 50%)",
          600: "hsl(45 100% 45%)",
          700: "hsl(40 100% 40%)",
        },
        navy: {
          DEFAULT: "hsl(220 47% 6%)",
          50: "hsl(220 30% 95%)",
          100: "hsl(220 35% 85%)",
          200: "hsl(220 35% 70%)",
          300: "hsl(220 35% 50%)",
          400: "hsl(220 40% 30%)",
          500: "hsl(220 40% 20%)",
          600: "hsl(220 45% 15%)",
          700: "hsl(220 45% 10%)",
          800: "hsl(220 47% 8%)",
          900: "hsl(220 47% 6%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(188 85% 53% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(188 85% 53% / 0.5)" },
        },
        "shimmer": {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(180deg, hsl(220 47% 6%) 0%, hsl(220 50% 4%) 50%, hsl(220 47% 6%) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
