<script lang="ts">
	import Navbar from '$lib/components/custom/game/Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
{@render children()}
