<script>
	import '../app.css';
	import Navbar from '../lib/Navbar/Navbar.svelte';
	import { Toaster } from 'svelte-sonner';
	let { children, data } = $props();
</script>

<div class="h-full w-full">
	<div
		class="ff absolute -z-50 flex h-full w-full flex-col items-center justify-between text-[10rem] opacity-[0.2] hover:select-none"
	>
		<div>i</div>
		<div>n</div>
		<div>R</div>
		<div>e</div>
		<div>t</div>
		<div>r</div>
		<div>o</div>
	</div>
	<Navbar username={data.username} />
	{@render children()}
</div>

<Toaster position="top-center" expand={true} richColors />

<style>
	.ff {
		font-family: 'Spline Sans Mono', monospace;
	}
</style>
