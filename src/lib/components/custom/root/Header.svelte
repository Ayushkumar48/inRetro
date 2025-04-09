<script>
	import { Button } from '$lib/components/ui/button/index';
	import { AlignJustify } from '@lucide/svelte';
	import { siGithub } from 'simple-icons';
	import { page } from '$app/state';
	import UserNav from '$lib/components/custom/game/user-nav.svelte';
	import DarkToggle from '../root-layout/DarkToggle.svelte';
</script>

<header class="container mx-auto py-4 px-4 flex items-center justify-between">
	<a href="/" class="flex items-center gap-2">
		<img src="/logo.svg" alt="inRetro-logo" class="w-6 h-6" />
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
			<span class="w-4 h-4 mr-1 fill-black dark:fill-white">
				{@html siGithub.svg}
			</span>
			GitHub
		</a>
	</nav>
	<div class="items-center gap-x-3 hidden md:flex">
		<DarkToggle />
		{#if page.data.user}
			<Button href="/game" variant="default" size="sm">Let's Learn</Button>
			<UserNav />
		{:else}
			<Button href="/login?type=signup" variant="default" size="sm">Sign Up</Button>
			<Button href="/login" variant="secondary" size="sm">Log In</Button>
		{/if}
	</div>
	<Button variant="outline" size="icon" class="md:hidden">
		<AlignJustify class="h-6 w-6" />
	</Button>
</header>
