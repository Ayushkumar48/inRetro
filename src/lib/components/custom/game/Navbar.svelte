<script lang="ts">
	import UserNav from '$lib/components/custom/game/user-nav.svelte';
	import Search from '$lib/components/custom/game/search.svelte';
	import DashboardMainNav from '$lib/components/custom/game/main-nav.svelte';
	import GameDarkToggle from './GameDarkToggle.svelte';
	import { Terminal } from '@lucide/svelte';
</script>

<div class="flex h-16 items-center px-4 border-b">
	<a href="/" class="flex items-center gap-2">
		<Terminal class="h-6 w-6 text-primary" />
		<h1 class="font-bold text-xl" style="font-family: 'Spline Sans Mono';">inRetro</h1>
	</a>
	<DashboardMainNav class="mx-6" />
	<div class="ml-auto flex items-center space-x-4">
		<div>
			<GameDarkToggle />
		</div>
		<Search />
		<UserNav />
	</div>
</div>
