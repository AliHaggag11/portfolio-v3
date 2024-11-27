import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			sm: "375px",
			md: "768px",
			lg: "1200px",
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				md: "2rem",
			},
		},
		extend: {
			fontFamily: {
				sans: "var(--font-sans)",
				serif: "var(--font-serif)",
			},
			animation: {
				"ping-large": "ping-large 1s ease-in-out infinite",
				"move-left": "move-left 1s linear infinite",
				"move-right": "move-right 1s linear infinite",
			},
			keyframes: {
				"ping-large": {
					"75%, 100%": {
						transform: "scale(3)",
						opacity: "0",
					},
				},
				"move-left": {
					"0%": {
						transform: "translateX(0%)",
					},
					"100%": {
						transform: "translateX(-50%)",
					},
				},
				"move-right": {
					"0%": {
						transform: "translateX(-50%)",
					},
					"100%": {
						transform: "translateX(0%)",
					},
				},
			},
			backdropBlur: {
				xs: '2px',
			},
			typography: {
				DEFAULT: {
					css: {
						color: '#fff',
						a: {
							color: '#6ee7b7',
							'&:hover': {
								color: '#34d399',
							},
						},
						strong: {
							color: '#fff',
						},
						h1: {
							color: '#fff',
						},
						h2: {
							color: '#fff',
						},
						h3: {
							color: '#fff',
						},
						h4: {
							color: '#fff',
						},
						blockquote: {
							color: '#d1d5db',
							borderLeftColor: '#6ee7b7',
						},
						code: {
							color: '#6ee7b7',
							backgroundColor: 'rgba(110, 231, 183, 0.1)',
							padding: '0.25rem 0.5rem',
							borderRadius: '0.25rem',
						},
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
						pre: {
							backgroundColor: '#1f2937',
							code: {
								backgroundColor: 'transparent',
								padding: '0',
							},
						},
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
export default config;
