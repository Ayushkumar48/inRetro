<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/state';

	let { class: className = '' } = $props();

	let pathname = $derived(page.url.href);
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
	<a
		href="/game"
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname.includes('favorite') ||
				pathname.includes('continue') ||
				pathname.includes('statistics')
				? 'text-muted-foreground'
				: ''
		)}
	>
		All Levels</a
	>

	<a
		href="/game/favorite"
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname.includes('favorite') ? '' : 'text-muted-foreground'
		)}
	>
		Favorites
	</a>
	<a
		href="/game/continue"
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname.includes('continue') ? '' : 'text-muted-foreground'
		)}
	>
		Continue
	</a>
	<a
		href="/game/statistics"
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname.includes('statistics') ? '' : 'text-muted-foreground'
		)}
	>
		Statistics
	</a>
</nav>
