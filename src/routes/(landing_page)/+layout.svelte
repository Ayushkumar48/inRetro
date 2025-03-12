<script lang="ts">
	import { user } from '$lib/stores/store.svelte.js';
	let { children, data } = $props();
	$effect(() => {
		user.current = data.user;
	});
</script>

{@render children()}
