<script>
	import ProgressBar from '../../lib/Game/ProgressBar.svelte';
	let { data } = $props();
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
		<ProgressBar bind:progress />
	</div>
	<div>Syllabus</div>
</div>
