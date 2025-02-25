<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils';
	import sdk, { type ProjectFiles, type VM } from '@stackblitz/sdk';
	import axios from 'axios';
	import { LoaderCircle, Save } from 'lucide-svelte';
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
</script>

<div bind:this={embed} class="h-[calc(100vh-64px)] relative">
	<LoaderCircle class="animate-spin fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
</div>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger
			class={cn(buttonVariants({ variant: 'outline' }), 'absolute top-4 left-1/2 -translate-x-1/2')}
			onclick={saveCode}><Save /> Save The REPL</Tooltip.Trigger
		>
		<Tooltip.Content>
			<p>Save Code to Database</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
