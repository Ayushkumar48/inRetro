<script>
	import { goto } from '$app/navigation';
	import Navbar from './Navbar.svelte';
	function handleClick() {
		goto('/');
	}

	let arr = [1, 2, 3, 4, 5, 1, 2, 6, 2];
	let num = 5;
</script>

<div>
	<button on:click={handleClick}> click {num} </button>
	{#each arr as a}
		{#if a === 2}
			<Navbar />
		{/if}
	{/each}
</div>
