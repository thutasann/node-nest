import type { Config } from 'tailwindcss';
import { join } from 'path';
import { nextui } from '@nextui-org/react';

const config: Config = {
	content: [
		join(
			__dirname,
			'{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
		),
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				Poppins: ['var(--font-Poppins)'],
				Inter: ['var(--font-inter)'],
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui()],
};
export default config;
