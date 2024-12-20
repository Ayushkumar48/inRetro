<script>
	import HTML from '$lib/Game/HTML.svelte';
	import CSS from '$lib/Game/CSS.svelte';
	import JS from '$lib/Game/JS.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Description from '../../../lib/Game/Description.svelte';
	import { toast } from 'svelte-sonner';
	let { data } = $props();
	const username = data.username;
	const level = data.level;
	let tasks = level.tasks;
	const updatePreview = (type, updatedSource) => {
		if (type === 'js') {
			jsCode = updatedSource;
		} else if (type === 'html') {
			htmlCode = updatedSource;
		} else if (type === 'css') {
			cssCode = updatedSource;
		}
	};

	let htmlCode = $state(``);

	let cssCode = $state(``);

	let jsCode = $state(``);

	let generatedCode = $state('');
	let finalCode = $state('');
	let checkVal = $state(false);

	$effect(() => {
		htmlCode = level.html;
		cssCode = level.css;
		jsCode = level.js;
	});
	$effect(() => {
		generatedCode = `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Sample HTML</title>
				<style> 
					html{background:#fff; height:100%}
					${cssCode}
				</style>
			</head>
			<body>
				${htmlCode}
				<script>${jsCode}<\/script>
			</body>
		</html>`;
		if (!checkVal) {
			finalCode = generatedCode;
		}
	});

	const saveManually = () => {
		finalCode = generatedCode;
	};
	async function saveCode() {
		const data = {
			levelId: level.levelId,
			html: htmlCode,
			css: cssCode,
			js: jsCode,
			path: level.path,
			language: level.language,
			topic: level.topic,
			color: level.color,
			tasks,
			status: true
		};

		try {
			const response = await fetch(`/game/${level.levelId}?username=${username}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			console.log(response);

			if (!response.ok) {
				toast.error('Internal Error');
				return;
			}
			const result = await response.json();
			console.log(result);
			if (result.status === 201) {
				toast.success(result.message);
			} else {
				toast.error('Error while saving data!');
			}
		} catch (error) {
			console.error('Error saving code:', error);
			toast.error('An unexpected error occurred.');
		}
	}
	onMount(() => {
		if (browser) {
			const handleCtrlS = (event) => {
				if (event.ctrlKey && event.key === 's') {
					event.preventDefault();
					saveCode();
				}
			};

			window.addEventListener('keydown', handleCtrlS);
			return () => {
				window.removeEventListener('keydown', handleCtrlS);
			};
		}
	});
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-row justify-between">
		<div class="text-slate-600 dark:text-white">
			<div class="text-2xl font-semibold">
				Path: {level.path}
			</div>
			<div class="text-2xl font-semibold">
				Level: {level.levelId}
			</div>
			<div class="text-2xl font-semibold">
				{level.language} -
				{level.topic}
			</div>
		</div>
		<div class="flex items-center justify-center">
			<button
				class="rounded-md bg-green-600 px-3 py-2 text-white duration-200 ease-in-out hover:bg-green-500 hover:shadow-md hover:shadow-green-400"
				onclick={saveCode}
			>
				Save Code
			</button>
		</div>
	</div>
	<div>
		<Description {tasks} color={level.color} />
	</div>
	<div class="flex flex-row gap-6 text-sm">
		<HTML sourceCode={htmlCode} updatePreview={(type, code) => updatePreview(type, code)} />
		<CSS sourceCode={cssCode} updatePreview={(type, code) => updatePreview(type, code)} />
		<JS sourceCode={jsCode} updatePreview={(type, code) => updatePreview(type, code)} />
	</div>
	<div class="flex flex-col gap-1">
		<div class="flex flex-row items-center justify-between">
			<h2 class="text-black dark:text-white">Live Preview:</h2>
			{#if checkVal}
				<button
					class="rounded-lg bg-blue-600 px-8 py-[6px] text-white shadow-2xl duration-200 ease-in-out hover:bg-blue-500"
					onclick={saveManually}
				>
					Change
				</button>
			{/if}
			<div class="flex flex-row items-center justify-center gap-4 text-slate-500">
				<label class="relative inline-flex cursor-pointer items-center">
					<input type="checkbox" class="peer sr-only" bind:checked={checkVal} />
					<div
						class="peer h-8 w-14 rounded-full bg-gray-300 duration-300 peer-checked:bg-blue-600"
					></div>
					<div
						class="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 peer-checked:translate-x-6"
					></div>
				</label>
				<div>Change on click</div>
			</div>
		</div>
		<!-- svelte-ignore a11y_missing_attribute -->
		<iframe
			id="preview"
			class="min-h-[50vh] w-full rounded-lg border-4 border-slate-700 dark:border-none"
			srcdoc={finalCode}
		></iframe>
	</div>
</div>
