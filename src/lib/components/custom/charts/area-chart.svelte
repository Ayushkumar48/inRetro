<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		registerables,
		type ChartOptions,
		type TooltipModel,
		type ChartDataset,
		type GridLineOptions
	} from 'chart.js';
	import { cn } from '$lib/utils';
	import { getThemeColors, type Theme } from './theme';
	import ChartTooltip from './chart-tooltip.svelte';

	Chart.register(...registerables);

	// Tooltip data shape
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

	// Props
	let {
		labels = [],
		datasets = [],
		theme = 'default',
		showTooltip = true,
		className = '',
		height = 300,
		options = {}
	}: {
		labels: string[];
		datasets: ChartDataset<'line'>[];
		theme: Theme;
		showTooltip: boolean;
		className: string;
		height: number;
		options: ChartOptions<'line'>;
	} = $props();

	// Local state
	let chart: Chart<'line'> | null = $state(null);
	let tooltipVisible = $state(false);
	let tooltipData: TooltipData | null = $state(null);
	let tooltipPosition: Position = $state({ x: 0, y: 0 });

	onMount(() => {
		const canvas = document.getElementById('area-chart') as HTMLCanvasElement | null;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const themeColors = getThemeColors(theme);

		const themedDatasets = datasets.map((dataset, index) => {
			const color = themeColors[index % themeColors.length];
			return {
				...dataset,
				backgroundColor: dataset.backgroundColor || `${color}33`, // semi-transparent fill
				borderColor: dataset.borderColor || color,
				fill: dataset.fill ?? true,
				tension: 0.4,
				pointBackgroundColor: color,
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: color,
				pointRadius: 4,
				pointHoverRadius: 6
			};
		});

		const defaultOptions: ChartOptions<'line'> = {
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
					enabled: !showTooltip,
					external: showTooltip
						? function (
								this: TooltipModel<'line'>,
								context: {
									chart: Chart<'line'>;
									tooltip: TooltipModel<'line'>;
								}
							) {
								const { chart, tooltip } = context;

								if (tooltip.opacity === 0) {
									tooltipVisible = false;
									return;
								}

								const position = chart.canvas.getBoundingClientRect();

								tooltipData = {
									title: tooltip.title?.[0] ?? '',
									items: tooltip.dataPoints.map((point) => ({
										label: point.dataset.label ?? '',
										value: point.formattedValue,
										color: point.dataset.borderColor as string
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
			},
			scales: {
				x: {
					grid: {
						display: false
					},
					ticks: {
						padding: 10
					}
				},
				y: {
					grid: {
						borderDash: [5, 5]
					} as Partial<GridLineOptions>,
					ticks: {
						padding: 10
					}
				}
			}
		};

		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels,
				datasets: themedDatasets
			},
			options: {
				...defaultOptions,
				...options
			}
		});

		return () => {
			chart?.destroy();
		};
	});

	function handleTooltipClose() {
		tooltipVisible = false;
	}
</script>

<div class={cn('relative', className)} style="height: {height}px;">
	<canvas id="area-chart"></canvas>

	{#if showTooltip && tooltipVisible && tooltipData}
		<ChartTooltip data={tooltipData} position={tooltipPosition} onClose={handleTooltipClose} />
	{/if}
</div>
