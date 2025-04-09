<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { cardColors, cardIcons, cn } from '$lib/utils';
	import { Code, Bookmark, BookMarked } from '@lucide/svelte';
	import axios from 'axios';
	let { level } = $props();
	async function handleBookmark() {
		level.levelDetails.isBookmarked = !level?.levelDetails?.isBookmarked;
		const res = await axios.post('/api/toggleBookmark', {
			levelId: level.id
		});
		if (res.data.success !== true) {
			level.levelDetails.isBookmarked = !level?.levelDetails?.isBookmarked;
		}
	}
</script>

<Card.Root class="lg:w-64 md:w-52 w-40 relative overflow-hidden group">
	<button
		class="h-6 w-6 absolute top-2 right-1.5 z-50 cursor-pointer hidden group-hover:block duration-300 ease-in-out"
		onclick={handleBookmark}
	>
		<BookMarked
			class={cn(
				'duration-300 ease-in-out transform absolute top-0 left-0 text-white',
				level?.levelDetails?.isBookmarked && 'scale-100',
				!level?.levelDetails?.isBookmarked && 'scale-0'
			)}
		/>

		<Bookmark
			class={cn(
				'duration-300 ease-in-out transform absolute top-0 left-0 text-white',
				!level?.levelDetails?.isBookmarked && 'scale-100',
				level?.levelDetails?.isBookmarked && 'scale-0'
			)}
		/>
	</button>

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
			<div class="relative h-8 w-8">
				<div
					class={cn(
						'absolute inset-0 opacity-100 group-hover:opacity-0 duration-300 ease-in-out',
						cardIcons[level.levelDetails?.type as keyof typeof cardIcons].title === 'Next.js' &&
							'dark:bg-white/80 dark:rounded-full'
					)}
				>
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
		{level.status}
	</Card.Content>
	<Separator
		class={cn(
			'relative z-10',
			cardIcons[level.levelDetails?.type as keyof typeof cardIcons].title === 'Next.js' &&
				'dark:group-hover:bg-white/20 dark:group-hover:rounded-full duration-300 ease-in-out'
		)}
	/>
	<Card.Footer class={`py-4 gap-x-2 z-10 flex justify-center w-full}`}>
		<Button
			href={`/game/${level.id}`}
			class="w-1/2 z-10 transition-transform duration-150 ease-in-out active:scale-95 hover:scale-105"
		>
			<Code class="mr-2 h-4 w-4" />
			Code
		</Button>
	</Card.Footer>
</Card.Root>
