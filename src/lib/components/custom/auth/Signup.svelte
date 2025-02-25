<script lang="ts">
	import { Icons } from '$lib/components/icons/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { cn } from '$lib/utils.js';
	import * as Form from '$lib/components/ui/form/index';
	import { userSchema, type UserSchema } from '$lib/client/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let { signup }: { signup: SuperValidated<Infer<UserSchema>> } = $props();

	const form = superForm(signup, {
		validators: zodClient(userSchema),
		taintedMessage: 'Are you sure you want to leave?',
		onUpdated({ form }) {
			if (form.message.status === 'success') {
				toast.success(form.message.text);
			} else {
				toast.error(form.message.text);
			}
		}
	});
	const { form: formData, enhance } = form;

	let className = $state<string | undefined | null>(undefined);
	export { className as class };

	let isLoading = $state<boolean>(false);
</script>

<div class={cn('grid gap-6', className)}>
	<form method="POST" use:enhance action="?/signup" enctype="multipart/form-data">
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
			<Form.Field {form} name="image">
				<Form.Control>
					{#snippet children({ props }: { props: Record<string, any> })}
						<Form.Label
							>Profile Picture <span class="opacity-35 text-xs italic">(optional)</span></Form.Label
						>
						<Input
							{...props}
							type="file"
							oninput={(e) => ($formData.image = e.currentTarget.files?.item(0) as File)}
							bind:value={$formData.image}
							accept="image/png, image/jpeg, image/webp"
						/>
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
</div>
