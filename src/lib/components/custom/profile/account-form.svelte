<script lang="ts">
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Button } from '$lib/components/ui/button/index';
	import { accountFormSchema, type AccountSchema } from '$lib/client/schema';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';

	import DatePicker from './date-picker.svelte';
	import PasswordTooltip from './password-tooltip.svelte';
	import { EyeClosedIcon, EyeIcon } from '@lucide/svelte';
	import { goto } from '$app/navigation';

	let { data }: { data: SuperValidated<Infer<AccountSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(accountFormSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Profile updated successfully!');
				goto('/profile', { replaceState: true });
			} else {
				toast.error('Please resolve the errors.');
			}
		}
	});
	const { form: formData, enhance } = form;
	let eyeOpen = $state<boolean>(true);
	$effect(() => {
		if (page.data.user?.name) {
			$formData.name = page.data.user?.name;
		}
	});
</script>

<form method="POST" class="space-y-8" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props }: { props: Record<string, any> })}
				<Form.Label>Full Name</Form.Label>
				<Input
					{...props}
					bind:value={$formData.name}
					readonly={page.data.user?.githubId !== null || page.data.user?.googleId !== null}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description>
			{#if page.data.user?.githubId || page.data.user?.googleId}
				User Details can't be changed if logged in using GitHub.
			{/if}
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="dob" class="flex flex-col">
		<Form.Control>
			{#snippet children({ props }: { props: Record<string, any> })}
				<Form.Label>Date of Birth</Form.Label>
				<DatePicker bind:value={$formData.dob} {...props} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field name="password" {form}>
		<Form.Control>
			{#snippet children({ props }: { props: Record<string, any> })}
				<Form.Label class="flex gap-x-2 items-center">
					Account Password
					<PasswordTooltip />
				</Form.Label>
				<div class="relative">
					<Input
						bind:value={$formData.password}
						disabled={page.data.user?.githubId !== null || page.data.user?.googleId !== null}
						type={eyeOpen ? 'password' : 'text'}
						{...props}
					/>
					<Button
						variant="ghost"
						class="absolute top-1/2 right-0 -translate-y-1/2"
						onclick={() => (eyeOpen = !eyeOpen)}
						type="button"
					>
						{#if eyeOpen}
							<EyeClosedIcon />
						{:else}
							<EyeIcon />
						{/if}
					</Button>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Update account</Form.Button>
</form>
