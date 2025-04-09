<script lang="ts">
	import Chart from '$lib/components/custom/game/statistics/Chart.svelte';
	import PageHeader from '$lib/components/custom/page-header.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const value = Math.random() > 0.5 ? true : false;
</script>

<PageHeader showInstructions={false}>Statistics</PageHeader>
{#if data.userScores && data?.userScores?.length > 0}
	<div class="dark:bg-gray-200 bg-white w-[60rem] rounded-lg ml-8 ring-1 ring-gray-300">
		<Chart userScores={data.userScores} />
	</div>
{:else}
	<div class="flex justify-center mt-20">
		<div
			class="border-[3px] border-gray-600 rounded-xl p-8 italic text-black/60 dark:text-white/60"
		>
			{#if value}
				If your statistics aren't visible right now, don't worry — they're on the way!
				<br />
				Each level takes time to evaluate as our dedicated educators review them thoroughly. Please check
				back shortly.
			{:else}
				Stats not showing up yet? Hang tight!
				<br />
				Each level is being carefully reviewed by our teaching team, so results might take a little time.
				Thanks for your patience!
			{/if}
		</div>
	</div>
{/if}
