<script lang="ts">
	import PageHeader from '$lib/components/custom/page-header.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { originalLevels, searchLevels, type LevelDataType } from '$lib/stores/store.svelte';
	import Level from '$lib/components/custom/game/Level.svelte';
	let { data }: { data: PageData } = $props();
	onMount(() => {
		if (!data.continueLevels) {
			originalLevels.current = [];
			return;
		}
		originalLevels.current = data.continueLevels.map((item: LevelDataType) => ({
			...item,
			searchQuery:
				`${item.levelDetails.details} ${item.levelDetails.language} ${item.levelDetails.path}`.toLowerCase()
		}));
		searchLevels.current = originalLevels.current;
	});
</script>

<PageHeader>Continue</PageHeader>
{#if data.continueLevels && data.continueLevels.length > 0}
	<div
		class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 md:px-6 px-4 lg:px-8 pb-10 self-center"
	>
		{#if searchLevels.current}
			{#each searchLevels.current as level (level.id)}
				<Level {level} />
			{/each}
		{/if}
	</div>
{:else}
	<div class="flex justify-center mt-20">
		<div
			class="border-[3px] border-gray-600 rounded-xl p-8 italic text-black/60 dark:text-white/60"
		>
			Please start a level to see it here.
		</div>
	</div>
{/if}
