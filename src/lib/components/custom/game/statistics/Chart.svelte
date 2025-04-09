<script lang="ts">
	import BarChart from '$lib/components/custom/charts/bar-chart.svelte';
	import type { Score } from '$lib/server/db/schema';

	let { userScores }: { userScores: Score[] } = $props();

	const barLabels = userScores.map((score) => {
		const date = new Date(score.completedOn).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: '2-digit'
		});
		return date;
	});

	const barDatasets = [
		{
			label: 'Your Score',
			data: userScores.map((score) => score.score),
			levelNumbers: userScores.map((score) => score.levelNumber)
		}
	];
</script>

<BarChart labels={barLabels} datasets={barDatasets} theme="sapphire" height={300} />
