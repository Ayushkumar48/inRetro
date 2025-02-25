<script lang="ts">
	import { Icons } from '$lib/components/icons/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { cn } from '$lib/utils.js';
	import { enhance } from '$app/forms';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { ActionData } from '../../../../routes/(auth)/login/$types';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { form = $bindable() }: { form: ActionData } = $props();
	let className = $state<string | undefined | null>(undefined);
	export { className as class };
	$effect(() => {
		if (form?.status === 200) {
			toast.success(form?.message);
			setTimeout(() => {
				goto('/game');
			}, 10000);
		}
		if (form?.status === 400 || form?.status === 500) {
			toast.error(form?.message);
		}
	});

	let isLoading = $state<boolean>(false);
</script>

<div class={cn('grid gap-6', className)}>
	<form method="POST" use:enhance action="?/login">
		<div class="grid gap-2">
			<div>
				<Label>Username</Label>
				<Input name="username" />
			</div>
			<div>
				<Label>Password</Label>
				<Input type="password" name="password" />
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Login
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t"></span>
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background text-muted-foreground px-2"> Or continue with </span>
		</div>
	</div>
	<Button
		variant="outline"
		type="button"
		disabled={isLoading}
		onclick={() => goto('/login/github')}
	>
		{#if isLoading}
			<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
		{:else}
			<Icons.gitHub class="mr-2 h-4 w-4" />
		{/if}
		GitHub
	</Button>
</div>
