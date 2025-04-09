export type Theme =
	| 'default'
	| 'sapphire'
	| 'ruby'
	| 'emerald'
	| 'palette'
	| 'daylight'
	| 'midnight';

export function getThemeColors(theme: Theme): string[] {
	const themes: Record<Theme, string[]> = {
		default: [
			'hsl(var(--primary))',
			'hsl(var(--primary) / 0.8)',
			'hsl(var(--primary) / 0.6)',
			'hsl(var(--primary) / 0.4)',
			'hsl(var(--primary) / 0.2)'
		],
		sapphire: [
			'hsl(215, 90%, 50%)',
			'hsl(215, 90%, 60%)',
			'hsl(215, 90%, 70%)',
			'hsl(215, 90%, 80%)',
			'hsl(215, 90%, 90%)'
		],
		ruby: [
			'hsl(350, 90%, 50%)',
			'hsl(350, 90%, 60%)',
			'hsl(350, 90%, 70%)',
			'hsl(350, 90%, 80%)',
			'hsl(350, 90%, 90%)'
		],
		emerald: [
			'hsl(140, 90%, 40%)',
			'hsl(140, 90%, 50%)',
			'hsl(140, 90%, 60%)',
			'hsl(140, 90%, 70%)',
			'hsl(140, 90%, 80%)'
		],
		palette: [
			'hsl(215, 90%, 50%)',
			'hsl(350, 90%, 50%)',
			'hsl(140, 90%, 40%)',
			'hsl(40, 90%, 50%)',
			'hsl(270, 90%, 50%)'
		],
		daylight: [
			'hsl(210, 100%, 60%)',
			'hsl(40, 100%, 60%)',
			'hsl(140, 80%, 60%)',
			'hsl(350, 80%, 60%)',
			'hsl(270, 80%, 60%)'
		],
		midnight: [
			'hsl(210, 100%, 40%)',
			'hsl(270, 100%, 40%)',
			'hsl(350, 80%, 40%)',
			'hsl(140, 80%, 40%)',
			'hsl(40, 100%, 40%)'
		]
	};

	return themes[theme] || themes['default'];
}
