<script lang="ts">
	import { Icons } from '$lib/components/icons/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { cn } from '$lib/utils.js';
	import { enhance, applyAction } from '$app/forms';
	import Label from '$lib/components/ui/label/label.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let className = $state<string | undefined | null>(undefined);
	export { className as class };

	let isLoading = $state<boolean>(false);

	const useEnhanced = () => {
		isLoading = true;
		toast.loading('Signing you in!');
		// @ts-expect-error
		return async ({ result }) => {
			isLoading = false;
			if (result.type === 'success' && result.data?.status === 200) {
				toast.success(result.data.message);
				goto('/game');
			} else {
				toast.error(result.data?.message || 'An error occurred');
				await applyAction(result);
			}
		};
	};
</script>

<div class={cn('grid gap-6', className)}>
	<form method="POST" use:enhance={useEnhanced} action="?/login">
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
	<div class="flex gap-x-4">
		<Button
			variant="outline"
			type="button"
			disabled={isLoading}
			onclick={() => goto('/login/google')}
			class="w-1/2"
		>
			{#if isLoading}
				<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				<Icons.google class="mr-2 h-4 w-4" />
			{/if}
			Google
		</Button>
		<Button
			variant="outline"
			type="button"
			disabled={isLoading}
			onclick={() => goto('/login/github')}
			class="w-1/2"
		>
			{#if isLoading}
				<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				<Icons.gitHub class="mr-2 h-4 w-4" />
			{/if}
			GitHub
		</Button>
	</div>
</div>
