<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		registerables,
		type ChartOptions,
		type ChartDataset,
		type GridLineOptions
	} from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { cn } from '$lib/utils';
	import { getThemeColors, type Theme } from './theme';
	import ChartTooltip from './chart-tooltip.svelte';

	Chart.register(...registerables, ChartDataLabels);

	// ✅ Extend ChartDataset with levelNumbers
	type CustomChartDataset = ChartDataset<'bar', number[]> & {
		levelNumbers?: number[];
	};

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

	// ✅ Props
	let {
		labels = [],
		datasets = [],
		theme = 'default',
		showTooltip = true,
		className = '',
		height = 300,
		horizontal = false,
		options = {}
	}: {
		labels: string[];
		datasets: CustomChartDataset[];
		theme?: Theme;
		showTooltip?: boolean;
		className?: string;
		height?: number;
		horizontal?: boolean;
		options?: ChartOptions<'bar'>;
	} = $props();

	let chart: Chart<'bar'> | null = $state(null);
	let tooltipVisible = $state(false);
	let tooltipData: TooltipData | null = $state(null);
	let tooltipPosition: Position = $state({ x: 0, y: 0 });

	onMount(() => {
		const canvas = document.getElementById('bar-chart') as HTMLCanvasElement;
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;

		const themeColors = getThemeColors(theme);

		const themedDatasets = datasets.map((dataset, index) => ({
			...dataset,
			backgroundColor: dataset.backgroundColor || themeColors[index % themeColors.length],
			borderColor: dataset.borderColor || themeColors[index % themeColors.length],
			borderWidth: dataset.borderWidth ?? 1
		}));

		const defaultOptions: ChartOptions<'bar'> = {
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
					enabled: false, // Disable default
					external: (context: any) => {
						const { chart, tooltip } = context;
						if (!tooltip || tooltip.opacity === 0) {
							tooltipVisible = false;
							return;
						}

						const canvasRect = chart.canvas.getBoundingClientRect();

						tooltipData = {
							title: tooltip.title?.[0] ?? '',
							items: tooltip.dataPoints.map((point: any) => ({
								label: point.dataset.label,
								value: point.formattedValue,
								color: point.dataset.backgroundColor
							}))
						};

						tooltipPosition = {
							x: canvasRect.left + tooltip.caretX,
							y: canvasRect.top + tooltip.caretY
						};

						tooltipVisible = true;
					}
				},
				datalabels: {
					anchor: 'end',
					align: 'start',
					color: '#555',
					font: {
						weight: 'bold' as const
					},
					formatter: function (value: number, context) {
						const level = (context.dataset as CustomChartDataset).levelNumbers?.[context.dataIndex];
						return level ? `Lvl ${level - 100}` : '';
					}
				}
			},
			scales: {
				x: {
					type: 'category',
					grid: { display: false },
					ticks: { padding: 10 }
				},
				y: {
					type: 'linear',
					beginAtZero: true,
					grid: { borderDash: [5, 5] } as Partial<GridLineOptions>,
					ticks: { padding: 10 }
				}
			}
		};

		chart = new Chart(ctx, {
			type: 'bar',
			data: { labels, datasets: themedDatasets },
			options: { ...defaultOptions, ...options },
			plugins: [ChartDataLabels]
		});

		return () => chart?.destroy();
	});

	function handleTooltipClose(): void {
		tooltipVisible = false;
	}
</script>

<!-- ✅ HTML -->
<div class={cn('relative', className)} style={`height: ${height}px;`}>
	<canvas id="bar-chart"></canvas>

	{#if showTooltip && tooltipVisible && tooltipData}
		<ChartTooltip data={tooltipData} position={tooltipPosition} onClose={handleTooltipClose} />
	{/if}
</div>
