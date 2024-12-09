<script>
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	let { form } = $props();
	$effect(() => {
		if (form) {
			if (form.success) {
				toast.success(form.message);
			} else {
				toast.error(form.message);
			}
		}
	});
</script>

<div class="flex h-full flex-row justify-between p-10 text-white">
	<div class="flex h-[70%] w-[50%] flex-col items-center justify-center text-3xl">
		<div class="w-60">Your feedback is <span class="text-yellow-400">valuable</span> to us.</div>
	</div>
	<div class="flex h-[70%] w-[50%] items-center justify-center">
		<form class="flex w-full flex-col items-center gap-3" method="POST" use:enhance>
			<div class="flex w-[50%] flex-col gap-2">
				<label for="name">Name:</label>
				<input type="text" name="name" class="w-full rounded-lg text-black" placeholder="name" />
			</div>
			<div class="flex w-[50%] flex-col gap-2">
				<label for="email">Email:</label>
				<input type="email" name="email" class="w-full rounded-lg text-black" placeholder="email" />
			</div>
			<div class="flex w-[50%] flex-col gap-2">
				<label for="message">Message:</label>
				<textarea
					type="text"
					name="message"
					class="w-full rounded-lg text-black"
					rows="4"
					placeholder="type your thoughts..."
				></textarea>
			</div>
			<div>
				<button
					class="rounded-lg bg-blue-700 px-4 py-2 duration-150 hover:scale-105 hover:bg-blue-600"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</div>
