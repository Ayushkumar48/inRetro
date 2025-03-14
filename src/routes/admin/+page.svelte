<!-- <script lang="ts">
	import { type Level } from '$lib/server/db/schema';
	import axios from 'axios';

	let data = $state<Level>({
		id: 101,
		levelDetails: {
			path: 'Front-End Development',
			language: 'HTML',
			details: '',
			isAttempted: false
		},
		files: {},
		template: 'node',
		startScript: 'dev'
	});
	async function saveCode() {
		const data1 = axios.post('/api/savecode', data);
	}
</script>

<div class="flex flex-col gap-2 mx-40 my-40">
	<input type="number" placeholder="id" bind:value={data.id} />
	<input type="text" placeholder="path" bind:value={data.levelDetails.path} />
	<input type="text" placeholder="langauge" bind:value={data.levelDetails.language} />
	<input type="text" placeholder="details" bind:value={data.levelDetails.details} />
	<button onclick={saveCode}>Save</button>
</div> -->
