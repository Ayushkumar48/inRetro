<script lang="ts">
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { tick } from 'svelte';
	import * as Form from '$lib/components/ui/form/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Textarea } from '$lib/components/ui/textarea/index';
	import { cn } from '$lib/utils.js';
	import { profileFormSchema, type ProfileSchema } from '$lib/client/schema';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { data }: { data: SuperValidated<Infer<ProfileSchema>> } = $props();

	$effect(() => {
		if (page.data.user) {
			$formData.email = page.data.user?.email || '';
			$formData.username = page.data.user?.username || '';
			$formData.bio = page.data.user?.bio || '';
		}
	});

	const form = superForm(data, {
		validators: zodClient(profileFormSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Profile updated successfully!');
				goto('/profile/account', { replaceState: true });
			} else {
				toast.error('Please resolve the errors.');
			}
		}
	});

	const { form: formData, enhance } = form;

	function addUrl() {
		$formData.urls = [...$formData.urls, ''];

		tick().then(() => {
			const urlInputs = Array.from(
				document.querySelectorAll<HTMLElement>("#profile-form input[name='urls']")
			);
			const lastInput = urlInputs[urlInputs.length - 1];
			lastInput && lastInput.focus();
		});
	}
</script>

<form method="POST" class="space-y-8" use:enhance id="profile-form">
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props }: { props: Record<string, any> })}
				<Form.Label>Username</Form.Label>
				<Input
					placeholder="@inretro"
					{...props}
					bind:value={$formData.username}
					readonly={page.data.user?.githubId !== null || page.data.user?.googleId !== null}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description>
			{#if page.data.user?.githubId || page.data.user?.googleId}
				User Details can't be changed if logged in using GitHub or Google.
			{:else}
				This is your public display name. It can be your real name or a pseudonym. You can only
				change this once every 30 days.
			{/if}
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props }: { props: Record<string, any> })}
				<Form.Label>Email</Form.Label>
				<Input placeholder="example@inretro.com" value={$formData.email} readonly {...props} />
			{/snippet}
		</Form.Control>
		<Form.Description>
			{#if page.data.user?.githubId || page.data.user?.googleId}
				User Details can't be changed if logged in using GitHub or Google.
			{:else}
				This is your email. You can't change email once created.
			{/if}
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="bio">
		<Form.Control>
			{#snippet children({ props }: { props: Record<string, any> })}
				<Form.Label>Bio</Form.Label>
				<Textarea bind:value={$formData.bio} {...props} placeholder="I own a computer." />
			{/snippet}
		</Form.Control>
		<Form.Description>
			You can <span>@mention</span> other users and organizations to link to them.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<div>
		<Form.Fieldset {form} name="urls">
			<Form.Legend>URLs</Form.Legend>
			{#each $formData.urls as _, i}
				<Form.ElementField {form} name="urls[{i}]">
					<Form.Description class={cn(i !== 0 && 'sr-only')}>
						Add links to your website, blog, or social media profiles.
					</Form.Description>
					<Form.Control>
						{#snippet children({ props }: { props: Record<string, any> })}
							<Input {...props} bind:value={$formData.urls[i]} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>
			{/each}
		</Form.Fieldset>
		<Button type="button" variant="outline" size="sm" class="mt-2" onclick={addUrl}>Add URL</Button>
	</div>

	<Form.Button>Update profile</Form.Button>
</form>
