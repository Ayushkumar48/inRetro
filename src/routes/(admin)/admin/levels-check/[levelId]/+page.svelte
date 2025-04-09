<script lang="ts">
	import AdminNav from '$lib/components/custom/admin/admin-nav.svelte';
	import AssignMarksButton from '$lib/components/custom/admin/levels-check/assign-marks-button.svelte';
	import DarkToggle from '$lib/components/custom/root-layout/DarkToggle.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import sdk, { type ProjectFiles, type VM } from '@stackblitz/sdk';
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
				title: data.level.levelDetails.path,
				description: data.level.levelDetails.details,
				template: data.level.template as TemplateType,
				files: data.level.files as ProjectFiles
			},
			{
				openFile: 'index.html',
				theme: $mode === 'dark' ? 'dark' : 'light',
				startScript: data.level.startScript as string
			}
		);
	});
</script>

<div class="h-screen w-screen">
	<div class="w-full h-14 flex justify-between items-center px-6">
		<a href="/admin">
			<h3 class="text-xl font-bold">Admin</h3>
		</a>
		<div class="flex items-center gap-x-4">
			<AssignMarksButton />
			<Button variant="secondary" size="sm" href="/admin/levels-check">All Levels</Button>
			<DarkToggle variant="secondary" />
			<AdminNav />
		</div>
	</div>
	<div bind:this={embed} class="w-full h-[calc(100%-56px)]"></div>
</div>
