<script>
	import { goto } from '$app/navigation';

	let { level } = $props();
</script>

<div
	class="relative flex h-[14.5rem] w-[14.5rem] select-none flex-col rounded-xl bg-white text-black duration-[0.35s] ease-in-out hover:scale-[1.03] hover:cursor-grab hover:shadow-md active:cursor-grabbing"
>
	<div
		class={`flex h-[70%] flex-col gap-1 rounded-t-xl px-3 pt-3 text-white bg-${level.color}-700`}
	>
		<div class="opacity-65">{level.path}</div>
		<div class="text-2xl">{level.language}</div>
		<div class="text-xl">{level.topic}</div>
	</div>
	<div
		class="flex h-[30%] items-center justify-center rounded-b-xl bg-neutral-300 p-3 dark:bg-white"
	>
		{level?.status === true ? 'Level Completed' : 'Yet to be completed'}
	</div>
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		class="group absolute left-[70%] top-[60%] flex items-center justify-center rounded-full bg-slate-200 p-3 duration-150 hover:scale-105"
		onclick={() => goto(`/game/${level.levelId}`)}
	>
		<svg
			class="h-5 w-5 fill-current group-hover:text-blue-500"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 384 512"
		>
			<path
				d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
			/>
		</svg>
	</button>
</div>
