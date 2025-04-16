<script lang="ts">
	import Sidebar from '$lib/components/custom/game/Sidebar/Sidebar.svelte';
	import sdk, { type ProjectFiles, type VM } from '@stackblitz/sdk';
	import axios from 'axios';
	import { mode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import CustomChat from '$lib/components/custom/custom-chat.svelte';
	import { Dialog } from 'bits-ui';
	import { SparklesIcon } from '@lucide/svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	let { data }: { data: PageData } = $props();

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
			const res = axios.post('/api/savecode', {
				id: data.game.id,
				files
			});

			toast.promise(res, {
				loading: 'Saving the code',
				success: 'Code saved!',
				error: 'Error while saving code'
			});
		}
	}
</script>

<div class="flex">
	<Sidebar {saveCode} />
	<div bind:this={embed} class="h-[calc(100vh-64px)]"></div>

	<Dialog.Root>
		<Dialog.Trigger
			class={cn(
				buttonVariants({ variant: 'default', size: 'sm' }),
				'fixed bottom-12 right-6 rounded-xl'
			)}
		>
			<SparklesIcon class="size-6" />
			<span> Ask AI </span>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay
				class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
			/>
			<Dialog.Content
				class="rounded-card-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed w-80 border border-border right-4 bottom-10 bg-gray-400 rounded-lg"
			>
				<CustomChat />
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</div>

<svelte:head>
	<title>Game | {data?.game?.levelDetails.path} | inRetro</title>
</svelte:head>
