<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils';
	import sdk, { type ProjectFiles, type VM } from '@stackblitz/sdk';
	import { BadgeInfo, LoaderCircle, Save } from 'lucide-svelte';
	import { mode } from 'mode-watcher';
	import { onMount } from 'svelte';
	let { data } = $props();

	type TemplateType =
		| 'node'
		| 'angular-cli'
		| 'create-react-app'
		| 'html'
		| 'javascript'
		| 'polymer'
		| 'typescript'
		| 'vue';
	let embed = $state<HTMLDivElement>();
	let editorVM = $state<VM | null>(null);

	onMount(async () => {
		editorVM = await sdk.embedProject(
			embed as HTMLDivElement,
			{
				title: data.game.levelDetails.path,
				description: data.game.levelDetails.details,
				template: data.game.template as TemplateType,
				files: data.game.files as ProjectFiles
			},
			{
				openFile: 'index.html',
				theme: $mode === 'dark' ? 'dark' : 'light',
				startScript: data.game.startScript as string
			}
		);
	});

	async function saveCode() {
		if (editorVM) {
			const files = await editorVM.getFsSnapshot();
		}
	}
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
</script>

<div bind:this={embed} class="h-[calc(100vh-64px)] relative">
	<LoaderCircle class="animate-spin fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
</div>

<div class="absolute top-4 left-1/2 -translate-x-[30%] flex items-center gap-x-4">
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger class={cn(buttonVariants({ variant: 'outline' }))} onclick={saveCode}
				><Save /> Save The REPL</Tooltip.Trigger
			>
			<Tooltip.Content>
				<p>Save Code to Database</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>

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
								<h3 class="text-lg font-semibold mb-2">Step {index + 1}: {step.title}</h3>
								<p class="text-gray-700">{step.instruction}</p>
								<Separator class="mt-0.5" />
							</div>
						{/each}
					</div>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</div>
