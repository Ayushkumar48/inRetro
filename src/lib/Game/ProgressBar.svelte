<script>
	let { progress = $bindable() } = $props();
	let text = $state('');
	let isComplete = $state(false);

	$effect(() => {
		if (progress === 100) {
			isComplete = true;
		} else {
			isComplete = false;
			text = progress + '%';
		}
	});
</script>

<div class="relative size-40 rounded-xl bg-slate-300 p-3 shadow-2xl">
	<svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
		<circle
			cx="18"
			cy="18"
			r="16"
			fill="none"
			class="stroke-current text-white dark:text-neutral-700"
			stroke-width="2"
		></circle>
		<circle
			cx="18"
			cy="18"
			r="16"
			fill="none"
			class="stroke-current text-blue-600 dark:text-blue-500"
			stroke-width="2"
			stroke-dasharray="100"
			stroke-dashoffset={100 - progress}
			stroke-linecap="round"
		></circle>
	</svg>

	<div class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
		{#if isComplete}
			<img src="./tick.png" alt="tick" class="scale-[0.75]" />
		{:else}
			<span class="text-center text-2xl font-bold text-blue-600 dark:text-blue-500">
				{text}
			</span>
		{/if}
	</div>
</div>
