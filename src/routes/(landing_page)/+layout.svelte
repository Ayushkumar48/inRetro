<script lang="ts">
	import Navbar from '$lib/components/custom/root-layout/Navbar.svelte';
	import { user } from '$lib/stores/store.svelte.js';
	let { children, data } = $props();
	$effect(() => {
		user.current = data.user;
	});
</script>

<Navbar />
{@render children()}
