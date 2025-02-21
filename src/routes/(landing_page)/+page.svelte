<script lang="ts">
	import codeimage from '$lib/images/code.avif?enhanced';
	import { cn } from '$lib/utils';
	import { mode } from 'mode-watcher';
</script>

<div class="flex-1 w-full h-[calc(100vh-64px)] flex justify-center items-center">
	<div class="flex flex-row gap-20 items-center">
		<div class="w-80">
			<div class="dark:text-[#D1FAE5] text-xl text-[#51c194]">Our Moto</div>
			<div class="text-[#0BC7BE] text-3xl">Accessible Technology</div>
			<div
				class="dark:text-white text-3xl font-bold text-[#0BC7BE]"
				style={cn(
					$mode === 'dark'
						? 'text-shadow: 0 0 10px #0BC7BE, 0 0 20px #0BC7BE, 0 0 30px #0BC7BE;'
						: ''
				)}
			>
				Learning
			</div>
			<div class="text-wrap dark:text-white text-gray-500">
				A journey to make you fall in love with programming.
			</div>
		</div>
		<div
			class="h-[12rem] w-[24rem] ring-[0.1px] ring-gray-300 rounded-xl bg-black/25 overflow-hidden shadow-inner"
		>
			<enhanced:img src={codeimage} alt="code" class="h-full w-full object-cover p-2 rounded-2xl" />
		</div>
	</div>
</div>
