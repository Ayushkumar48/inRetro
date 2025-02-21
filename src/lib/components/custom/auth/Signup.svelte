<script lang="ts">
	import { Icons } from '$lib/components/icons/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { cn } from '$lib/utils.js';
	import * as Form from '$lib/components/ui/form/index';
	import { userSchema, type UserSchema } from '$lib/client/schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { signup }: { signup: SuperValidated<Infer<UserSchema>> } = $props();

	const form = superForm(signup, {
		validators: zodClient(userSchema),
		taintedMessage: 'Are you sure you want to leave?'
	});
	const { form: formData, enhance, errors } = form;

	let className = $state<string | undefined | null>(undefined);
	export { className as class };

	let isLoading = $state<boolean>(false);
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
</script>

<div class={cn('grid gap-6', className)}>
	<!-- <SuperDebug data={$formData} /> -->
	<form method="POST" use:enhance action="?/signup">
		<div class="grid gap-2">
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props }: { props: Record<string, any> })}
						<Form.Label>Full Name</Form.Label>
						<Input {...props} bind:value={$formData.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="username">
				<Form.Control>
					{#snippet children({ props }: { props: Record<string, any> })}
						<Form.Label>Username</Form.Label>
						<Input {...props} bind:value={$formData.username} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props }: { props: Record<string, any> })}
						<Form.Label>Email</Form.Label>
						<Input {...props} type="email" bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props }: { props: Record<string, any> })}
						<Form.Label>Password</Form.Label>
						<Input {...props} type="password" bind:value={$formData.password} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Create Account
			</Form.Button>
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
	<Button variant="outline" type="button" disabled={isLoading}>
		{#if isLoading}
			<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
		{:else}
			<Icons.gitHub class="mr-2 h-4 w-4" />
		{/if}
		GitHub
	</Button>
</div>
