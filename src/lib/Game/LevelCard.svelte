<script>
	import { goto } from '$app/navigation';

	let { level } = $props();
</script>

<div
	class="relative flex h-52 w-52 select-none flex-col rounded-xl bg-white text-black duration-150 ease-in-out hover:scale-[1.03] hover:cursor-grab hover:shadow-md active:cursor-grabbing"
>
	<div
		class={`flex h-[70%] flex-col gap-1 rounded-t-xl px-3 pt-3 text-white bg-${level.color}-700`}
	>
		<div class="opacity-65">{level.path}</div>
		<div class="text-2xl">{level.language}</div>
		<div class="text-xl">{level.topic}</div>
	</div>
	<div class="flex h-[30%] items-center justify-center p-3">{level.status}</div>
	<button
		class="absolute left-[70%] top-[60%] flex items-center justify-center rounded-full bg-slate-200 p-3"
		onclick={() => goto(`/game/${level.levelId}`)}
	>
		<img src="./playicon.svg" alt="" class="h-5 w-5 text-blue-600" />
	</button>
</div>
