<script lang="ts">
	import Sidebar from '$lib/components/custom/game/Sidebar/Sidebar.svelte';
	import { page } from '$app/state';
	import sdk, { type ProjectFiles, type VM } from '@stackblitz/sdk';
	import axios from 'axios';
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
			console.log(files);
			// const res = await axios.post('/api/savecode', { files, id: page.params });
		}
	}
</script>

<div class="flex">
	<Sidebar {saveCode} />
	<div bind:this={embed} class="h-[calc(100vh-64px)]"></div>
</div>
