<script>
	const { sourceCode, updatePreview } = $props();

	let editorInstance = $state(0);
	let theme = $state('vs-dark');

	$effect(() => {
		let scriptElement = document.createElement('script');
		scriptElement.setAttribute(
			'src',
			'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs/loader.min.js'
		);
		document.body.appendChild(scriptElement);

		scriptElement.addEventListener('load', () => {
			require.config({
				paths: {
					vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs'
				}
			});

			require(['vs/editor/editor.main'], () => {
				editorInstance = monaco.editor.create(document.getElementById('html-editor'), {
					value: sourceCode,
					language: 'html',
					automaticLayout: true,
					padding: { top: 5, right: 5, bottom: 5, left: 5 },
					overviewRulerLanes: 0,
					overviewRulerBorder: false,
					theme: document.documentElement.classList.contains('dark') ? 'vs-dark' : 'vs-light',
					minimap: { enabled: false },
					wordWrap: 'on'
				});

				editorInstance.onDidChangeModelContent(() => {
					const updatedSourceCode = editorInstance.getValue();
					updatePreview('html', updatedSourceCode);
				});
			});
		});
	});
</script>

<div class="flex w-[50%] flex-col rounded-sm ring-2 ring-black">
	<div
		class="bg-neutral-300 text-center text-lg font-bold text-slate-500 dark:bg-neutral-800 dark:text-white"
	>
		HTML
	</div>
	<div id="html-editor" class=" h-[40vh]"></div>
</div>
