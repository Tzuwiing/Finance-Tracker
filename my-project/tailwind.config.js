/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-up": { from: { opacity: 0, transform: "translateY(16px)" }, to: { opacity: 1, transform: "none" } },
        "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
        "slide-in": { from: { opacity: 0, transform: "translateX(-12px)" }, to: { opacity: 1, transform: "none" } },
        pop: { "0%": { opacity: 0, transform: "scale(.92)" }, "100%": { opacity: 1, transform: "scale(1)" } },
        shake: { "0%,100%": { transform: "none" }, "25%": { transform: "translateX(-4px)" }, "75%": { transform: "translateX(4px)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "bar-grow": { from: { transform: "scaleY(0)" }, to: { transform: "scaleY(1)" } },
        draw: { from: { strokeDasharray: "1", strokeDashoffset: "1" }, to: { strokeDasharray: "1", strokeDashoffset: "0" } },
      },
      animation: {
        "fade-up": "fade-up .5s ease-out both",
        "fade-in": "fade-in .4s ease-out both",
        "slide-in": "slide-in .35s ease-out both",
        pop: "pop .3s cubic-bezier(.2,.8,.2,1) both",
        shake: "shake .3s",
        float: "float 6s ease-in-out infinite",
        bar: "bar-grow .7s cubic-bezier(.2,.8,.2,1) both",
        draw: "draw 1.4s ease-out both",
      },
    },
  },
  plugins: [],
};
