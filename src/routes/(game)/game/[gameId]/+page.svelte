<script lang="ts">
	import Sidebar from '$lib/components/custom/game/Sidebar/Sidebar.svelte';
	import sdk, { type ProjectFiles, type VM } from '@stackblitz/sdk';
	import axios from 'axios';
	import { mode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
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
			if (data.game.levelDetails.status === 'Not Attempted') {
				const res = new Promise((resolve, reject) => {
					try {
						axios
							.post('/api/savecode', {
								levelId: data.game.id,
								levelDetails: { ...data.game.levelDetails, status: 'Attempted' },
								files,
								template: data.game.template,
								startScript: data.game.startScript,
								userId: data.user?.id ?? ''
							})
							.then((response) => {
								if (response.data.success) {
									data.game = response.data.userLevel;
									resolve(response.data);
								} else {
									reject(response.data.error);
								}
							})
							.catch((error) => {
								reject(error.message || 'Something went wrong');
							});
					} catch (error) {
						reject(error || 'Something went wrong');
					}
				});

				toast.promise(res, {
					loading: 'Saving the code',
					success: 'Code saved!',
					error: 'Error while saving code'
				});
			} else {
				const res = axios.put('/api/savecode', { files, id: data.game.id });

				toast.promise(res, {
					loading: 'Saving the code',
					success: 'Code saved!',
					error: 'Error while saving code'
				});
			}
		}
	}
</script>

<div class="flex">
	<Sidebar {saveCode} />
	<div bind:this={embed} class="h-[calc(100vh-64px)]"></div>
</div>

<svelte:head>
	<title>Game | {data?.game?.levelDetails.path} | inRetro</title>
</svelte:head>
