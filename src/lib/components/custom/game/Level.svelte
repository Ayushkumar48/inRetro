<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ChartNoAxesCombined, Code } from 'lucide-svelte';
	let { level } = $props();
	$inspect(level.levelDetails);
</script>

<Card.Root class="lg:w-64 md:w-52 w-40 relative overflow-hidden group">
	<div
		class="rounded-full h-80 w-80 absolute -top-40 -right-40 z-0 group-hover:scale-[2.5] duration-300 ease-in-out"
		style={`background-color: ${level.levelDetails?.color}`}
	></div>
	<Card.Header class="h-40">
		<Card.Description
			class="text-lg text-wrap z-50 group-hover:text-gray-300 duration-300 ease-in-out"
			>{level.levelDetails.path}</Card.Description
		>
		<Card.Title class="text-xl text-wrap z-50 group-hover:text-white duration-300 ease-in-out"
			>{level.levelDetails.language}</Card.Title
		>
		<Card.Description
			class="text-base text-wrap z-50 group-hover:text-gray-300 duration-300 ease-in-out"
			>{level.levelDetails.details}</Card.Description
		>
	</Card.Header>
	<Card.Content class="relative z-10 text-sm group-hover:text-gray-100">
		{level.levelDetails.isCompleted
			? 'Completed'
			: level.levelDetails.isAttempted
				? 'Attempted'
				: 'Not Attempted'}
	</Card.Content>
	<Separator class="relative z-10" />
	<Card.Footer
		class={`py-4 gap-x-2 z-10 flex ${level.levelDetails.isAttempted ? 'justify-between' : 'justify-end'}`}
	>
		{#if level.levelDetails.isAttempted}
			<Button class="bg-emerald-500 hover:bg-emerald-600 w-1/2 z-10"
				><ChartNoAxesCombined /> Analytics</Button
			>
		{/if}
		<Button onclick={() => (window.location.href = `/game/${level.id}`)} class="w-1/2 z-10"
			><Code /> Code</Button
		>
	</Card.Footer>
</Card.Root>
