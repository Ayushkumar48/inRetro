<script lang="ts">
	import Level from '$lib/components/custom/game/Level.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { originalLevels, searchLevels } from '$lib/stores/store.svelte';
	import type { LevelDetails } from '$lib/server/db/schema';

	let { data }: { data: PageData } = $props();
	type LevelDataType = {
		id: number;
		levelDetails: LevelDetails;
	};
	onMount(() => {
		originalLevels.current = data.levels.map((item: LevelDataType) => ({
			...item,
			searchQuery:
				`${item.levelDetails.details} ${item.levelDetails.language} ${item.levelDetails.path}`.toLowerCase()
		}));
		searchLevels.current = originalLevels.current;
	});
</script>

<div
	class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 md:px-6 px-4 lg:px-8 pb-10 self-center"
>
	{#if searchLevels.current}
		{#each searchLevels.current as level}
			<Level {level} />
		{/each}
	{/if}
</div>
