<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { BadgeInfo } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	let { collapsed } = $props();
	const instructions = [
		{
			title: 'Open ReadMe.md',
			instruction:
				"Open the `ReadMe.md` file in your editor. This file contains the project's instructions."
		},
		{
			title: 'Understand the Instructions',
			instruction:
				'Carefully read and understand each instruction in the `ReadMe.md` before proceeding.'
		},
		{
			title: 'Solve Sequentially',
			instruction:
				'Solve each instruction one by one in your editor, following the order in the `ReadMe.md`.'
		},
		{
			title: 'Test Your Work',
			instruction:
				'After implementing each instruction, test your changes to ensure they work as expected.'
		}
	];
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Tooltip.Provider>
			<Tooltip.Root disableHoverableContent>
				<Tooltip.Trigger class={buttonVariants({ variant: 'ghost' })}>
					<BadgeInfo class="h-5 w-5" />
					{#if !collapsed.current}
						<span in:fly={{ x: -10, duration: 150, delay: 100 }} out:fade={{ duration: 0 }}>
							Instructions
						</span>
					{/if}
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>General Instructions</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Instructions for approaching a level.</Dialog.Title>
			<Dialog.Description>
				<div class="space-y-2 mt-4">
					{#each instructions as step, index}
						<div class="pb-4">
							<h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
								Step {index + 1}: {step.title}
							</h3>
							<p class="text-gray-700 dark:text-gray-300">
								{step.instruction}
							</p>
							<Separator class="mt-0.5 bg-gray-300 dark:bg-gray-600" />
						</div>
					{/each}
				</div>
				<div class="text-sm text-gray-500 dark:text-gray-400">
					Note: <br />1. Use "Save REPL" to save your code before submitting. <br />2. Use "Submit
					Code" to submit your code for evaluation. <br />3. Make sure to give your best code for
					evaluation.
				</div>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
