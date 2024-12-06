<script>
	let { tasks } = $props();
</script>

<div class="flex flex-col gap-1 rounded-lg bg-slate-200 p-[0.4rem] text-black shadow-2xl">
	<div>Tasks:</div>
	<ul class="list-disc pl-4">
		{#each tasks as task}
			<li>{task}</li>
		{/each}
	</ul>
</div>
