<script lang="ts">
	import Navbar from '$lib/components/custom/game/Navbar.svelte';
	import { type Snippet } from 'svelte';
	import type { PageData } from './$types';
	let { children, data }: { children: Snippet; data: PageData } = $props();
	import { user } from '$lib/stores/store.svelte';
	$effect(() => {
		user.current = data.user;
	});
</script>

<Navbar />
{@render children()}
