<script>
	import LevelCard from '$lib/Game/LevelCard.svelte';
	import ProgressBar from '../../lib/Game/ProgressBar.svelte';
	let { data } = $props();
	$effect(() => {
		if (!data.username) {
			window.location.href = '/auth';
		}
	});
	let levels = $state([
		{
			levelId: 1,
			path: 'Front-End Development',
			language: 'HTML',
			topic: 'Introduction',
			status: 'Done',
			color: 'yellow'
		},
		{
			levelId: 2,
			path: 'Front-End Development',
			language: 'HTML',
			topic: 'Image Tags',
			status: 'Done',
			color: 'sky'
		},
		{
			levelId: 3,
			path: 'Front-End Development',
			language: 'HTML',
			topic: 'Introduction',
			status: 'Done',
			color: 'green'
		},
		{
			levelId: 4,
			path: 'Front-End Development',
			language: 'HTML',
			topic: 'Image Tags',
			status: 'Done',
			color: 'red'
		}
	]);
	let progress = $state(10);
</script>

<div class="mt-10 flex flex-col gap-8 text-white">
	<div class="flex h-full w-full flex-col gap-3">
		<div class="text-xl">Progress:</div>
		<ProgressBar bind:progress />
	</div>
	<div class="flex h-full w-full flex-col gap-3">
		<div class="text-xl">Continue Journey:</div>
		<ProgressBar bind:progress />
	</div>
	<div class="flex h-full w-full flex-col gap-3">
		<div class="text-xl">Levels Completed:</div>
		<div class="flex flex-row flex-wrap gap-4">
			{#each levels as level, i}
				<LevelCard {level} />
			{/each}
		</div>
	</div>
	<div>Syllabus</div>
</div>
