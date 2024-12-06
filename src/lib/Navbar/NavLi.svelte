<script>
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	let { children, url } = $props();
	async function handleClick() {
		if (url === '/signout') {
			const response = await fetch('/api/signout');
			const res = await response.json();
			if (res === 208) {
				toast.success('Sign out successful!!!');
				window.location.reload();
			} else {
				toast.error('Failed to signout');
			}
		} else {
			goto(url);
		}
	}
</script>

<button onclick={handleClick} class="hover:shadow-xl">
	<span class="glow-text duration-200 ease-in-out">{@render children()}</span>
</button>

<style>
	.glow-text {
		color: #0bc7be;
	}

	.glow-text:hover {
		text-shadow:
			0 0 10px #0bc7be,
			0 0 20px #0bc7be,
			0 0 30px #0bc7be,
			0 0 50px #0bc7be;
	}
</style>
