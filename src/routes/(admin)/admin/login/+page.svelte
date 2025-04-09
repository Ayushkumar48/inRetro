<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Eye, EyeOff } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	let showPassword = $state(false);
	let login = $state(true);
	let { form } = $props();
	$effect(() => {
		if (form?.admin) {
			page.data.admin = form.admin;
			toast.success('Login successful!');
			goto('/admin/levels-check');
		}
	});
</script>

<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
				{login ? 'Sign in to your account' : 'Create a new account'}
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
				{login ? 'Admin Login' : 'Please fill in your details to get started'}
			</p>
		</div>

		<form class="mt-8 space-y-6" use:enhance action={login ? '?/login' : '?/signup'} method="POST">
			<div class="rounded-md shadow-sm space-y-4">
				<div class="text-red-500">{form?.message}</div>
				{#if !login}
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
						<div class="mt-1">
							<input
								value={form?.name || ''}
								id="name"
								name="name"
								type="text"
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
								placeholder="John Doe"
							/>
						</div>
					</div>
				{/if}

				<div>
					<label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
					<div class="mt-1">
						<input
							value={form?.email || ''}
							id="email"
							name="email"
							type="email"
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							placeholder="john@example.com"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
					<div class="mt-1 relative">
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10"
							placeholder="••••••••"
						/>
						<button
							type="button"
							class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
							onclick={() => (showPassword = !showPassword)}
							aria-label="Toggle password visibility"
						>
							{#if showPassword}
								<EyeOff />
							{:else}
								<Eye />
							{/if}
						</button>
					</div>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
				>
					{login ? 'Sign In' : 'Create Account'}
				</button>
			</div>
		</form>

		{#if login}
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
				Don't have an account?{' '}
				<button class="font-medium text-foreground" onclick={() => (login = false)}>Sign up</button>
			</p>
		{:else}
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
				Already have an account?{' '}
				<button class="font-medium text-foreground" onclick={() => (login = true)}>Sign In</button>
			</p>
		{/if}
	</div>
</div>

<style>
	/* Custom colors for the form */
	:global(:root) {
		--color-primary: #10b981;
		--color-primary-dark: #059669;
	}

	.bg-primary {
		background-color: var(--color-primary);
	}

	.hover\:bg-primary-dark:hover {
		background-color: var(--color-primary-dark);
	}

	.focus\:ring-primary:focus {
		--tw-ring-color: var(--color-primary);
	}

	.focus\:border-primary:focus {
		border-color: var(--color-primary);
	}
</style>
