<script>
	import { fade, fly } from 'svelte/transition';
	import { cn } from '$lib/utils';
	import { BadgeInfo, ChevronLeft, ChevronRight, Save } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import { PersistedState } from 'runed';

	let { saveCode } = $props();
	const collapsed = new PersistedState('sidebar-collapsed', false);

	function toggleSidebar() {
		collapsed.current = !collapsed.current;
	}

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

<aside
	class={cn(
		'bg-background border-r border-border transition-all duration-200 flex flex-col',
		collapsed.current && 'w-16',
		!collapsed.current && 'w-48'
	)}
>
	<button
		class="p-2 flex justify-end items-center hover:bg-muted/50 transition-colors"
		onclick={toggleSidebar}
		aria-label={collapsed.current ? 'Expand sidebar' : 'Collapse sidebar'}
	>
		{#if collapsed.current}
			<ChevronRight size={18} />
		{:else}
			<ChevronLeft size={18} />
		{/if}
	</button>
	<nav class="flex-1 overflow-y-auto">
		<ul class={cn('py-2 mx-2', collapsed.current && 'flex justify-center flex-col items-center')}>
			<li>
				<Button variant="ghost" onclick={saveCode}>
					<Save class="w-5 h-5" />
					{#if !collapsed.current}
						<span in:fly={{ x: -10, duration: 150, delay: 100 }} out:fade={{ duration: 0 }}>
							Save The REPL
						</span>
					{/if}
				</Button>
			</li>
			<li>
				<Dialog.Root>
					<Dialog.Trigger class={buttonVariants({ variant: 'ghost' })}>
						<BadgeInfo class="h-5 w-5" />
						{#if !collapsed.current}
							<span in:fly={{ x: -10, duration: 150, delay: 100 }} out:fade={{ duration: 0 }}>
								Instructions
							</span>
						{/if}
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
			</li>
		</ul>
	</nav>
</aside>
