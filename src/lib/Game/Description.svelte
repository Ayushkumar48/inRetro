<script>
	let { tasks, color } = $props();
</script>

<div
	class={`flex flex-col gap-1 rounded-lg bg-${color}-600 p-[0.4rem] text-black shadow-2xl dark:text-white`}
>
	<div class="font-bold">Tasks:</div>
	<ul class="list-disc pl-4">
		{#each tasks as task}
			<li>{task}</li>
		{/each}
	</ul>
</div>
