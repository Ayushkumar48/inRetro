<script>
	import * as Dialog from '$lib/components/ui/dialog';
	import { buttonVariants } from '$lib/components/ui/button';
	import { BadgeInfo } from '@lucide/svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	let instructions = [
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
	let { children, showInstructions = true } = $props();
</script>

<div class="flex justify-between w-full pt-8 pb-10 md:px-6 px-4 lg:px-8 items-center">
	<h4 class="text-2xl">{@render children()}</h4>
	{#if showInstructions}
		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
				General Instructions <BadgeInfo class="h-6 w-6" />
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
					</Dialog.Description>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	{/if}
</div>
