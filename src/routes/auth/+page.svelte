<script>
	import Login from '../../lib/Auth/Login.svelte';
	import Signup from '../../lib/Auth/Signup.svelte';
	let { form } = $props();
	let login = $state(true);
</script>

<div class="h-full w-full bg-slate-50 dark:bg-[#181818]">
	{#if login}
		<Login bind:login bind:form />
	{:else}
		<Signup bind:login bind:form />
	{/if}
</div>
