<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { page } from '$app/state';
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import { Menu } from '@lucide/svelte';
	import { goto } from '$app/navigation';

	let pathname = $derived(page.url.href);
</script>

<nav class="md:flex items-center space-x-4 lg:space-x-6 hidden mx-6">
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

<Menubar.Root class="flex items-center justify-center md:hidden ml-6">
	<Menubar.Menu>
		<Menubar.Trigger><Menu size="22" /></Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item onclick={() => goto('/game')}>All Levels</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item onclick={() => goto('/game/favorite')}>Favorites</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item onclick={() => goto('/game/continue')}>Continue</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item onclick={() => goto('/game/statistics')}>Statistics</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
