<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/state';

	let { class: className = '' } = $props();

	let pathname = $derived(page.url.href.split('#').pop());
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
	<a
		href="#all"
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname === 'all' ? '' : 'text-muted-foreground'
		)}
	>
		All Levels</a
	>

	<a
		href="#completed"
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname === 'completed' ? '' : 'text-muted-foreground'
		)}
	>
		Completed
	</a>
	<a
		href="#continue"
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname === 'continue' ? '' : 'text-muted-foreground'
		)}
	>
		Continue
	</a>
	<a
		href="#settings"
		class={cn(
			'hover:text-primary text-sm font-medium transition-colors',
			pathname === 'settings' ? '' : 'text-muted-foreground'
		)}
	>
		Settings
	</a>
</nav>
