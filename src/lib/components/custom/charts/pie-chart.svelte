<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, type ChartTypeRegistry, type ChartOptions, registerables } from 'chart.js';
	import { cn } from '$lib/utils';
	import { getThemeColors, type Theme } from './theme';
	import ChartTooltip from './chart-tooltip.svelte';

	// Register Chart.js components
	Chart.register(...registerables);

	// Props
	let {
		labels = [],
		data = [],
		backgroundColor = [],
		theme = 'default',
		showTooltip = true,
		className = '',
		height = 300,
		doughnut = false,
		options = {}
	}: {
		labels: string[];
		data: number[];
		backgroundColor?: string[];
		theme?: Theme;
		showTooltip?: boolean;
		className?: string;
		height?: number;
		doughnut?: boolean;
		options?: ChartOptions<keyof ChartTypeRegistry>;
	} = $props();

	// Local state
	let chart: Chart | null = $state(null);
	let tooltipVisible = $state(false);
	let tooltipData: {
		title: string;
		items: { label: string; value: string; color: string }[];
	} | null = $state(null);
	let tooltipPosition = $state({ x: 0, y: 0 });

	onMount(() => {
		const ctx = (document.getElementById('pie-chart') as HTMLCanvasElement).getContext('2d');
		if (!ctx) return;

		const themeColors = getThemeColors(theme);

		// Use theme colors if not provided
		const colors = backgroundColor.length > 0 ? backgroundColor : themeColors.slice(0, data.length);

		const defaultOptions: ChartOptions<keyof ChartTypeRegistry> = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: true,
					position: 'top',
					labels: {
						usePointStyle: true,
						boxWidth: 6
					}
				},
				tooltip: {
					enabled: !showTooltip, // Disable default tooltip if using custom
					external: showTooltip
						? (context) => {
								const { chart, tooltip } = context;

								if (tooltip.opacity === 0) {
									tooltipVisible = false;
									return;
								}

								const position = chart.canvas.getBoundingClientRect();

								tooltipData = {
									title: tooltip.title[0],
									items: tooltip.dataPoints.map((point) => ({
										label: point.label || '',
										value: point.formattedValue,
										color: colors[point.dataIndex % colors.length]
									}))
								};

								tooltipPosition = {
									x: position.left + tooltip.caretX,
									y: position.top + tooltip.caretY
								};

								tooltipVisible = true;
							}
						: undefined
				}
			}
		};

		chart = new Chart(ctx, {
			type: doughnut ? 'doughnut' : 'pie',
			data: {
				labels,
				datasets: [
					{
						data,
						backgroundColor: colors,
						borderWidth: 1,
						borderColor: 'rgba(255, 255, 255, 0.5)'
					}
				]
			},
			options: { ...defaultOptions, ...options }
		});

		return () => {
			if (chart) chart.destroy();
		};
	});

	function handleTooltipClose() {
		tooltipVisible = false;
	}
</script>

<div class={cn('relative', className)} style="height: {height}px;">
	<canvas id="pie-chart"></canvas>

	{#if showTooltip && tooltipVisible && tooltipData}
		<ChartTooltip data={tooltipData} position={tooltipPosition} onClose={handleTooltipClose} />
	{/if}
</div>
