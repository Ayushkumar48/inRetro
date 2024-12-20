<script>
	import LevelCard from '$lib/Game/LevelCard.svelte';
	import ProgressBar from '../../lib/Game/ProgressBar.svelte';
	let { data } = $props();
	const user = data.user;
	const levels = data.levels;
	const username = data.username;
	let progress = $state(100);
	$effect(() => {
		if (!username) {
			window.location.href = '/auth';
		}
		progress = (user.levels.length / levels.length) * 100;
	});
</script>

<div class="mt-10 flex flex-col gap-8 text-white">
	<div class="flex h-full w-full flex-col gap-3">
		<div class="text-xl text-black dark:text-white">Progress:</div>
		<ProgressBar bind:progress />
	</div>
	<div class="flex h-full w-full flex-col gap-3">
		<div class="text-xl text-black dark:text-white">Continue Journey:</div>
		{#if user.levels.length < levels.length}
			<LevelCard level={levels[user.levels.length]} />
		{:else}
			<div>You completed all the levels.</div>
		{/if}
	</div>
	<div class="flex h-full w-full flex-col gap-3">
		<div class="text-xl text-black dark:text-white">Levels Completed:</div>
		<div class="flex flex-row flex-wrap gap-4">
			{#if user.levels.length !== 0}
				{#each user.levels as level}
					<LevelCard {level} />
				{/each}
			{:else}
				<div class="text-black dark:text-white">
					Start a level from 'continue journey' to show the progress.
				</div>
			{/if}
		</div>
	</div>
	<div class="flex h-full w-full flex-col gap-3">
		<div class="text-xl text-black dark:text-white">All Levels:</div>
		<div class="flex flex-row flex-wrap gap-4">
			{#if user.levels.length !== 0}
				{#each user.levels as level}
					<LevelCard {level} />
				{/each}
			{/if}
			{#each levels as level}
				{#if user.levels.length < level.levelId}
					<LevelCard {level} />
				{/if}
			{/each}
		</div>
	</div>
</div>
