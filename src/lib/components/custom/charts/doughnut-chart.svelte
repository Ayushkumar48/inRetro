<script lang="ts">
	import type { ChartOptions } from 'chart.js';
	import PieChart from './pie-chart.svelte';
	import type { ChartTypeRegistry } from 'chart.js';
	import type { Theme } from './theme';

	let {
		labels = [],
		data = [],
		backgroundColor = [],
		theme = 'default',
		showTooltip = true,
		className = '',
		height = 300,
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
</script>

<PieChart
	{labels}
	{data}
	{backgroundColor}
	{theme}
	{showTooltip}
	{className}
	{height}
	{options}
	doughnut={true}
/>
