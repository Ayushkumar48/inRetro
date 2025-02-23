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
		Completed
	</button>
	<button
		onclick={() => goto('/game/continue')}
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname.includes('continue') ? '' : 'text-muted-foreground'
		)}
	>
		Continue
	</button>
	<button
		onclick={() => goto('/game/progress')}
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname.includes('progress') ? '' : 'text-muted-foreground'
		)}
	>
		Progress
	</button>
</nav>
