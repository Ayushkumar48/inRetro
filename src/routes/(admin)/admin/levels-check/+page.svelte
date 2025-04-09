<script>
	import AdminNav from '$lib/components/custom/admin/admin-nav.svelte';
	import LevelTable from '$lib/components/custom/admin/levels-check/level-table.svelte';
	import DarkToggle from '$lib/components/custom/root-layout/DarkToggle.svelte';
	let { data } = $props();
</script>

<div class="flex justify-between items-center px-6 pt-10">
	<div>
		<h2 class="text-xl font-semibold text-foreground">Submitted Levels</h2>
		<p class="text-muted-foreground">Contains the levels submitted by learners.</p>
	</div>
	<div class="flex gap-x-4 items-center">
		<DarkToggle />
		<AdminNav />
	</div>
</div>
{#if data?.checkingLevels && data.checkingLevels.length > 0}
	<div class="ring-1 ring-gray-300 rounded-lg shadow-sm m-6 p-1">
		<LevelTable levelsData={data.checkingLevels} />
	</div>
{:else}
	<div class="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
		<h2 class="text-xl font-semibold text-foreground">No Levels Found</h2>
		<p class="text-muted-foreground">No levels are currently being checked.</p>
	</div>
{/if}
