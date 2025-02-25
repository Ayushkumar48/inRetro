<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { user } from '$lib/stores/store.svelte';
	import UserNav from '../game/user-nav.svelte';
	import DarkToggle from './DarkToggle.svelte';
</script>

<div
	class="flex items-center justify-between px-10 py-3 border-b border-gray-300 dark:border-gray-700"
>
	<h1 class="text-3xl font-semibold" style="font-family: 'Spline Sans Mono';">
		<a href="/" class="text-[#0BC7BE]"> inRetro </a>
	</h1>
	<div class="flex items-center gap-x-6">
		{#if user.current}
			<Button href="/game" variant="secondary">Game</Button>
			<UserNav />
		{:else}
			<div class="gap-x-2 flex">
				<Button href="/login" variant="ghost">Login</Button>
				<Button href="/login">Get Started</Button>
			</div>
		{/if}
		<DarkToggle />
	</div>
</div>
