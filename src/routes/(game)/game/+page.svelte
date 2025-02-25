<script lang="ts">
	import Level from '$lib/components/custom/game/Level.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div
	class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4 md:px-6 px-4 lg:px-8 py-10 self-center"
>
	{#if data.levels}
		{#each data.levels as level}
			<Level {level} />
		{/each}
	{/if}
</div>
