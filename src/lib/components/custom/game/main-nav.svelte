<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/state';

	let { class: className = '' } = $props();

	let pathname = $derived(page.url.href);
	function goto(url: string) {
		window.location.href = url;
	}
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
	<button
		onclick={() => goto('/game')}
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname.includes('completed') ||
				pathname.includes('continue') ||
				pathname.includes('progress')
				? 'text-muted-foreground'
				: ''
		)}
	>
		All Levels</button
	>

	<button
		onclick={() => goto('/game/completed')}
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname.includes('completed') ? '' : 'text-muted-foreground'
		)}
	>
		Favorites
	</button>
	<button
		onclick={() => goto('/game/favorites')}
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname.includes('continue') ? '' : 'text-muted-foreground'
		)}
	>
		Continue
	</button>
</nav>
