<script>
	import Level from './Level.svelte';
	let levels = [1, 2, 3, 4];
</script>

<div class="flex flex-wrap gap-y-8 gap-x-2 justify-between">
	{#each levels as level}
		<Level />
	{/each}
</div>
