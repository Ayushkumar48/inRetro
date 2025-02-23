<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ChartNoAxesCombined, Code } from 'lucide-svelte';
	let { level } = $props();
</script>

<Card.Root class="lg:w-64 md:w-52 w-40">
	<Card.Header class="h-40">
		<Card.Description class="text-lg text-wrap">{level.levelDetails.path}</Card.Description>
		<Card.Title class="text-xl text-wrap">{level.levelDetails.language}</Card.Title>
		<Card.Description class="text-base text-wrap">{level.levelDetails.details}</Card.Description>
	</Card.Header>
	<Card.Content>
		<p class="text-sm">{level.levelDetails.isCompleted ? 'Completed' : 'Yet To Complete'}</p>
	</Card.Content>
	<Separator />
	<Card.Footer class="py-4 flex justify-between">
		<Button class="bg-emerald-500 hover:bg-emerald-600"><ChartNoAxesCombined /></Button>
		<Button onclick={() => goto(`/game/${level.id}`)}><Code /></Button>
	</Card.Footer>
</Card.Root>
