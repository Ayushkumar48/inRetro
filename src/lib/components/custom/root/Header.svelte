<script>
	import { Button } from '$lib/components/ui/button/index';

	import { Github, Terminal } from 'lucide-svelte';
</script>

<header class="container mx-auto py-4 px-4 flex items-center justify-between">
	<a href="/" class="flex items-center gap-2">
		<Terminal class="h-6 w-6 text-primary" />
		<h1 class="font-bold text-xl" style="font-family: 'Spline Sans Mono';">inRetro</h1>
	</a>
	<nav class="hidden md:flex items-center gap-6">
		<a href="#features" class="text-sm font-medium hover:text-primary transition-colors">Features</a
		>
		<a href="#learning-path" class="text-sm font-medium hover:text-primary transition-colors"
			>Learning Path</a
		>
		<a href="#about" class="text-sm font-medium hover:text-primary transition-colors">About</a>
		<a
			href="https://github.com/Ayushkumar48/inRetro"
			target="_blank"
			rel="noopener noreferrer"
			class="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
		>
			<Github class="h-4 w-4" />
			GitHub
		</a>
	</nav>
	<Button href="/game" variant="default" size="sm" class="hidden md:inline-flex">
		Start Learning
	</Button>
	<Button variant="outline" size="icon" class="md:hidden">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-6 w-6"
			><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line
				x1="4"
				x2="20"
				y1="18"
				y2="18"
			/></svg
		>
	</Button>
</header>
