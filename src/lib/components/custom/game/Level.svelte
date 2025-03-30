<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { cardColors, cardIcons, cn } from '$lib/utils';
	import { Code, Bookmark, BookMarked } from '@lucide/svelte';
	let { level } = $props();
</script>

<Card.Root class="lg:w-64 md:w-52 w-40 relative overflow-hidden group">
	{#if level?.levelDetails?.isBookmarked}
		<BookMarked
			class="h-6 w-6 absolute top-2 right-1.5 z-50 cursor-pointer hidden group-hover:block duration-300 ease-in-out"
		/>
	{:else}
		<Bookmark
			class="h-6 w-6 absolute top-2 right-1.5 z-50 cursor-pointer hidden group-hover:block duration-300 ease-in-out"
		/>
	{/if}
	<div
		class="rounded-full h-80 w-80 absolute -top-40 -right-40 z-0 group-hover:scale-[2.5] [transition-duration:550ms] ease-in-out"
		style={`background-color: ${cardColors[level.levelDetails?.type as keyof typeof cardColors]}`}
	></div>
	<Card.Header class="h-40">
		<Card.Description
			class="text-lg text-wrap z-50 group-hover:text-gray-300 duration-300 ease-in-out"
			>{level.levelDetails?.path}</Card.Description
		>
		<div class="flex gap-x-2 z-10 items-center">
			<div
				class={cn(
					'relative h-8 w-8',
					cardIcons[level.levelDetails.type as keyof typeof cardIcons].title === 'Next.js' &&
						'p-2 rounded-full bg-white/20 dark:bg-white/10'
				)}
			>
				<div class="absolute inset-0 opacity-100 group-hover:opacity-0 duration-300 ease-in-out">
					{@html cardIcons[level.levelDetails?.type as keyof typeof cardIcons].svg.replace(
						'<svg',
						`<svg fill="#${cardIcons[level.levelDetails?.type as keyof typeof cardIcons].hex}"`
					)}
				</div>
				<div class="absolute inset-0 opacity-0 group-hover:opacity-100 duration-300 ease-in-out">
					{@html cardIcons[level.levelDetails?.type as keyof typeof cardIcons].svg.replace(
						'<svg',
						`<svg fill="#fff"`
					)}
				</div>
			</div>
			<Card.Title class="text-xl text-wrap duration-300 ease-in-out group-hover:text-white"
				>{level.levelDetails?.language}</Card.Title
			>
		</div>

		<Card.Description
			class="text-base text-wrap z-50 text-black dark:text-white group-hover:text-gray-300 duration-300 ease-in-out"
		>
			{level.levelDetails?.details}
		</Card.Description>
	</Card.Header>
	<Card.Content class="relative z-10 text-sm group-hover:text-gray-100">
		{level.levelDetails?.status}
	</Card.Content>
	<Separator class="relative z-10" />
	<Card.Footer class={`py-4 gap-x-2 z-10 flex justify-center w-full}`}>
		<Button onclick={() => (window.location.href = `/game/${level.id}`)} class="w-1/2 z-10">
			<Code /> Code
		</Button>
	</Card.Footer>
</Card.Root>
