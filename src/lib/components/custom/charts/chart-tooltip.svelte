<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type TooltipItem = {
		label: string;
		value: string;
		color: string;
	};

	type TooltipData = {
		title: string;
		items: TooltipItem[];
	};

	type Position = {
		x: number;
		y: number;
	};

	let {
		data,
		position,
		className,
		onClose
	}: { data: TooltipData; position: Position; className?: string; onClose?: () => void } = $props();

	let tooltipElement: HTMLDivElement | null = $state(null);
	let tooltipStyle = $state('');

	function calculateTooltipPosition() {
		if (!tooltipElement) return;

		const rect = tooltipElement.getBoundingClientRect();
		let x = position.x;
		let y = position.y;

		if (x + rect.width > window.innerWidth) {
			x -= rect.width;
		}
		if (y + rect.height > window.innerHeight) {
			y -= rect.height;
		}

		tooltipStyle = `left: ${x}px; top: ${y}px;`;
	}

	function handleClickOutside(event: MouseEvent) {
		if (tooltipElement && !tooltipElement.contains(event.target as Node)) {
			onClose?.();
		}
	}

	onMount(() => {
		calculateTooltipPosition();
		document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<div
	bind:this={tooltipElement}
	class={`absolute z-50 min-w-[150px] p-2 rounded-md shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 duration-300 ease-in-out ${className}`}
	style={tooltipStyle}
>
	{#if data.title}
		<div class="font-medium text-sm mb-1 text-gray-900 dark:text-gray-100">
			{data.title}
		</div>
	{/if}

	<div class="space-y-1">
		{#each data.items as item}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-1">
					<span class="w-3 h-3 rounded-full" style="background-color: {item.color};"></span>
					<span class="text-xs text-gray-700 dark:text-gray-300">{item.label}</span>
				</div>
				<span class="text-xs font-medium text-gray-900 dark:text-gray-100">{item.value}</span>
			</div>
		{/each}
	</div>
</div>
