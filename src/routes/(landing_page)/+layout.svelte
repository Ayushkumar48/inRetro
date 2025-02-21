<script lang="ts">
	import Navbar from '$lib/components/custom/root-layout/Navbar.svelte';
	let { children } = $props();
</script>

<Navbar />
{@render children()}
