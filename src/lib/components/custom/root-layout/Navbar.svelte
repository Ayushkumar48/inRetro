<script lang="ts">
	import DarkToggle from './DarkToggle.svelte';
	type Link = { name: String; href: string };

	let navlis: Link[] = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Game',
			href: '/game'
		},
		{
			name: 'Login',
			href: '/login'
		},
		{
			name: 'Contact Us',
			href: '/contact-us'
		}
	];
</script>

<div
	class="flex items-center justify-between px-10 py-3 border-b border-gray-300 dark:border-gray-700"
>
	<h1 class="text-3xl font-semibold" style="font-family: 'Spline Sans Mono';">
		<a href="/"> inRetro </a>
	</h1>
	<div class="flex gap-x-5 items-center">
		{#each navlis as item, i}
			<a href={item.href}>{item.name}</a>
		{/each}
		<DarkToggle />
	</div>
</div>
