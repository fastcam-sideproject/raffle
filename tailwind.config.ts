import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-light': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 8px rgba(0, 0, 0, 0.3)',
      },
      textShadow: {
        'white-shadow':
          'rgb(255, 255, 255) 3px 0px 0px, rgb(255, 255, 255) 2.83487px 0.981584px 0px, rgb(255, 255, 255) 2.35766px 1.85511px 0px, rgb(255, 255, 255) 1.62091px 2.52441px 0px, rgb(255, 255, 255) 0.705713px 2.91581px 0px, rgb(255, 255, 255) -0.287171px 2.98622px 0px, rgb(255, 255, 255) -1.24844px 2.72789px 0px, rgb(255, 255, 255) -2.07227px 2.16926px 0px, rgb(255, 255, 255) -2.66798px 1.37182px 0px, rgb(255, 255, 255) -2.96998px 0.42336px 0px, rgb(255, 255, 255) -2.94502px -0.571704px 0px, rgb(255, 255, 255) -2.59586px -1.50383px 0px, rgb(255, 255, 255) -1.96093px -2.27041px 0px, rgb(255, 255, 255) -1.11013px -2.78704px 0px, rgb(255, 255, 255) -0.137119px -2.99686px 0px, rgb(255, 255, 255) 0.850987px -2.87677px 0px, rgb(255, 255, 255) 1.74541px -2.43999px 0px, rgb(255, 255, 255) 2.44769px -1.73459px 0px, rgb(255, 255, 255) 2.88051px -0.838247px 0px',
      },
      colors: {
        neutral: {
          0: '#ffffff',
          5: '#f6f7f9',
          7: '#e8eaed',
          10: '#d9dce2',
          20: '#bcc1cc',
          30: '#9fa6b6',
          40: '#828ca0',
          50: '#677288',
          60: '#515a6b',
          70: '#3b414e',
          80: '#252931',
          90: '#161a1d',
          100: '#0b0c0f',
        },
        primary: {
          5: '#eff6ff',
          10: '#dbeafe',
          20: '#93c5fd',
          30: '#60a5fa',
          40: '#3b82f6',
          50: '#2563eb',
          60: '#1d4ed8',
          70: '#1e40af',
          80: '#1e3a8a',
          90: '#172554',
        },
        error: {
          5: '#fdf2f3',
          10: '#fbd6d8',
          20: '#f5a3a8',
          30: '#f1747c',
          40: '#ec4651',
          50: '#e71825',
          60: '#b9131e',
          70: '#8b0e16',
          80: '#5c0a0f',
          90: '#2e0507',
        },
        warn: {
          5: '#fff8e9',
          10: '#ffeac1',
          20: '#ffe2a7',
          30: '#ffd47c',
          40: '#ffc550',
          50: '#ffb724',
          60: '#98690a',
          70: '#66490e',
          80: '#4d370b',
          90: '#332507',
        },
        success: {
          5: '#effaf0',
          10: '#c8efc9',
          20: '#a0e3a3',
          30: '#79d87d',
          40: '#51cc56',
          50: '#35b53a',
          60: '#2a8e2e',
          70: '#1e6721',
          80: '#123f14',
          90: '#071808',
        },
        // primary: '#60A5FA',
        secondary: '#f87171',
        // error: '#dc2626',
        white: '#ffffff',
        black: '#000000',

        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        blue: {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1e40af',
        },
        slate: {
          50: '#f9fafb',
          100: '#f3f4f6',
        },
        red: {
          500: '#ef4444',
        },
      },
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.3rem',
        '4xl': '1.5rem',
        '5xl': '2rem',
        full: '1000px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.text-shadow-white-shadow': {
          textShadow:
            'rgb(255, 255, 255) 3px 0px 0px, rgb(255, 255, 255) 2.83487px 0.981584px 0px, rgb(255, 255, 255) 2.35766px 1.85511px 0px, rgb(255, 255, 255) 1.62091px 2.52441px 0px, rgb(255, 255, 255) 0.705713px 2.91581px 0px, rgb(255, 255, 255) -0.287171px 2.98622px 0px, rgb(255, 255, 255) -1.24844px 2.72789px 0px, rgb(255, 255, 255) -2.07227px 2.16926px 0px, rgb(255, 255, 255) -2.66798px 1.37182px 0px, rgb(255, 255, 255) -2.96998px 0.42336px 0px, rgb(255, 255, 255) -2.94502px -0.571704px 0px, rgb(255, 255, 255) -2.59586px -1.50383px 0px, rgb(255, 255, 255) -1.96093px -2.27041px 0px, rgb(255, 255, 255) -1.11013px -2.78704px 0px, rgb(255, 255, 255) -0.137119px -2.99686px 0px, rgb(255, 255, 255) 0.850987px -2.87677px 0px, rgb(255, 255, 255) 1.74541px -2.43999px 0px, rgb(255, 255, 255) 2.44769px -1.73459px 0px, rgb(255, 255, 255) 2.88051px -0.838247px 0px',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  safelist: ['w-9/12', 'w-10/12', 'w-auto', 'w-1/2', 'w-2/3', 'w-3/4', 'w-4/5', 'w-5/6', 'w-11/12'],
};
export default config;
