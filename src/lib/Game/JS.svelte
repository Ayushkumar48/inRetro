<script>
	const { sourceCode, updatePreview } = $props();
	let editorInstance = $state(0);

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
				editorInstance = monaco.editor.create(document.getElementById('js-editor'), {
					value: sourceCode,
					language: 'javascript',
					automaticLayout: true,
					padding: { top: 5, right: 5, bottom: 5, left: 5 },
					overviewRulerLanes: 0,
					overviewRulerBorder: false,
					theme: 'vs-dark',
					minimap: {
						enabled: false
					},
					wordWrap: 'on'
				});

				editorInstance.onDidChangeModelContent(() => {
					const updatedSourceCode = editorInstance.getValue();
					updatePreview('js', updatedSourceCode);
				});
			});
		});
	});
</script>

<div class="flex w-[50%] flex-col gap-2">
	<div class="text-center font-bold text-white">JS</div>
	<div id="js-editor" class=" h-[40vh]"></div>
</div>
