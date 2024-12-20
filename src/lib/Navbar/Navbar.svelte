<script>
	import DarkMode from './DarkMode.svelte';
	import NavLi from './NavLi.svelte';
	let { username } = $props();
</script>

<div class="flex w-full flex-row justify-between p-4 duration-100 ease-in-out">
	<a class="ff text-4xl hover:cursor-pointer" href="/">inRetro</a>
	<div class="flex flex-row gap-8">
		<NavLi url="/">Home</NavLi>
		<NavLi url="/game">Game</NavLi>
		{#if username && username !== ''}
			<NavLi url="/signout">Signout</NavLi>
		{:else}
			<NavLi url="/auth">Login</NavLi>
		{/if}
		<NavLi url="/contact">Contact Us</NavLi>
		<DarkMode />
	</div>
</div>

<style>
	.ff {
		font-family: 'Spline Sans Mono', monospace;
	}
</style>
