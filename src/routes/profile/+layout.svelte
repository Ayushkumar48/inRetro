<script lang="ts">
	import GameDarkToggle from '$lib/components/custom/game/GameDarkToggle.svelte';
	import SidebarNav from '$lib/components/custom/profile/sidebar-nav.svelte';
	import { Button } from '$lib/components/ui/button';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	let { children } = $props();
	const sidebarNavItems = [
		{
			title: 'Profile',
			href: '/profile'
		},
		{
			title: 'Account',
			href: '/profile/account'
		}
	];
</script>

<div class="hidden space-y-6 p-10 pb-16 md:block">
	<div class="flex justify-between">
		<div class="space-y-0.5">
			<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
			<p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
		</div>
		<div class="flex gap-x-4 items-center">
			<GameDarkToggle />
			<Button variant="secondary" href="/">Home</Button>
			<Button variant="secondary" href="/game">Game</Button>
		</div>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			{@render children()}
		</div>
	</div>
</div>
