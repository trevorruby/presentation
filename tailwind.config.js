/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: '#ff6600',
                    black: '#050505',
                    dark: '#0a0a0a',
                    gray: '#333333',
                }
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'grid-flow': 'grid-flow 20s linear infinite',
            },
            keyframes: {
                'grid-flow': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(50px)' },
                }
            }
        },
    },
    plugins: [],
}
