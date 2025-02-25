<script lang="ts">
	import UserNav from '$lib/components/custom/game/user-nav.svelte';
	import Search from '$lib/components/custom/game/search.svelte';
	import DashboardMainNav from '$lib/components/custom/game/main-nav.svelte';
	import DarkToggle from '../root-layout/DarkToggle.svelte';
</script>

<div class="flex h-16 items-center px-4 border-b">
	<h1 class="text-3xl font-semibold font-['Spline_Sans_Mono']">
		<a href="/" class="text-[#0BC7BE]"> inRetro </a>
	</h1>
	<DashboardMainNav class="mx-6" />
	<div class="ml-auto flex items-center space-x-4">
		<div>
			<DarkToggle />
		</div>
		<Search />
		<UserNav />
	</div>
</div>
