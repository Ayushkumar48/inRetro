<script>
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { quintIn, quintOut } from 'svelte/easing';
	import { blur, fade } from 'svelte/transition';

	let { login = $bindable(), form = $bindable() } = $props();
	let seePassword = $state(false);
	function handleClick() {
		login = false;
	}
	$effect(() => {
		if (form) {
			if (form.success === true) {
				toast.success(form.message);
			} else {
				toast.error(form.message);
			}
		}
	});
</script>

<div
	class="flex h-[75%] flex-row items-center justify-between text-black dark:text-white"
	out:blur={{ easing: quintOut }}
	in:fade={{ delay: 300, easing: quintIn }}
>
	<img src="./loginimg.jpg" alt="" class="h-full w-[50%] object-cover" />
	<div class="flex h-full w-[45%] flex-col items-center justify-center gap-2">
		<form
			class="flex flex-col items-center justify-center gap-2"
			method="POST"
			action="?/login"
			use:enhance
		>
			<div class="flex w-full items-center justify-center">
				<div class="flex flex-col gap-1">
					<label for="username">Username:</label>
					<input
						type="text"
						name="username"
						id="username"
						class="w-72 rounded-lg text-black"
						value={form?.username ?? ''}
					/>
				</div>
			</div>
			<div class="flex w-full items-center justify-center">
				<div class="flex flex-col gap-1">
					<label for="password">Password:</label>
					<input
						type={seePassword ? 'text' : 'password'}
						name="password"
						id="password"
						class="w-72 rounded-lg text-black"
					/>
				</div>
			</div>
			<button
				class="rounded-md bg-blue-600 px-3 py-1 text-white shadow-2xl duration-150 ease-in-out hover:bg-blue-700"
			>
				Login
			</button>
		</form>
		<div class="text-center">
			Doesn't have an account yet,
			<button
				class="text-blue-600 duration-75 ease-in-out hover:text-blue-500"
				onclick={handleClick}
			>
				create one
			</button>
		</div>
	</div>
</div>
