<script lang="ts">
	import Navbar from '$lib/components/custom/game/Navbar.svelte';
	import { type Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<Navbar />
{@render children()}

<svelte:head>
	<title>Game | inRetro</title>
</svelte:head>
