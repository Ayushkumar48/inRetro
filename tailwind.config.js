import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'chart-sapphire': {
					1: 'hsl(215, 90%, 50%)',
					2: 'hsl(215, 90%, 60%)',
					3: 'hsl(215, 90%, 70%)',
					4: 'hsl(215, 90%, 80%)',
					5: 'hsl(215, 90%, 90%)'
				},
				'chart-ruby': {
					1: 'hsl(350, 90%, 50%)',
					2: 'hsl(350, 90%, 60%)',
					3: 'hsl(350, 90%, 70%)',
					4: 'hsl(350, 90%, 80%)',
					5: 'hsl(350, 90%, 90%)'
				},
				'chart-emerald': {
					1: 'hsl(140, 90%, 40%)',
					2: 'hsl(140, 90%, 50%)',
					3: 'hsl(140, 90%, 60%)',
					4: 'hsl(140, 90%, 70%)',
					5: 'hsl(140, 90%, 80%)'
				},
				'chart-palette': {
					1: 'hsl(215, 90%, 50%)',
					2: 'hsl(350, 90%, 50%)',
					3: 'hsl(140, 90%, 40%)',
					4: 'hsl(40, 90%, 50%)',
					5: 'hsl(270, 90%, 50%)'
				},
				'chart-daylight': {
					1: 'hsl(210, 100%, 60%)',
					2: 'hsl(40, 100%, 60%)',
					3: 'hsl(140, 80%, 60%)',
					4: 'hsl(350, 80%, 60%)',
					5: 'hsl(270, 80%, 60%)'
				},
				'chart-midnight': {
					1: 'hsl(210, 100%, 40%)',
					2: 'hsl(270, 100%, 40%)',
					3: 'hsl(350, 80%, 40%)',
					4: 'hsl(140, 80%, 40%)',
					5: 'hsl(40, 100%, 40%)'
				}
			},
			borderRadius: {
				xl: 'calc(var(--radius) + 4px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--bits-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--bits-accordion-content-height)' },
					to: { height: '0' }
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate]
};

export default config;
