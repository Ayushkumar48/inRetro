<script lang="ts">
	import CalendarIcon from 'svelte-radix/Calendar.svelte';
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate
	} from '@internationalized/date';
	import * as Form from '$lib/components/ui/form/index';
	import * as Popover from '$lib/components/ui/popover/index';
	import { Calendar } from '$lib/components/ui/calendar/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import { cn } from '$lib/utils.js';
	import { browser } from '$app/environment';
	import { accountFormSchema, type AccountSchema } from '$lib/client/schema';
	import { Eye, EyeClosed } from 'lucide-svelte';
	import { page } from '$app/state';

	let { data }: { data: SuperValidated<Infer<AccountSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(accountFormSchema)
	});
	const { form: formData, enhance, validate } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let dobValue = $state<DateValue | undefined>(
		$formData.dob ? parseDate($formData.dob) : undefined
	);
	let eyeOpen = $state<boolean>(true);
	$effect(() => {
		if (page.data?.user?.name) {
			$formData.name = page.data?.user?.name;
		}
	});
</script>

<form method="POST" class="space-y-8" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props }: { props: Record<string, any> })}
				<Form.Label>Full Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="dob" class="flex flex-col">
		<Form.Control>
			{#snippet children({ props }: { props: Record<string, any> })}
				<Form.Label>Date of Birth</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-[240px] justify-start text-left font-normal',
							!dobValue && 'text-muted-foreground'
						)}
					>
						<CalendarIcon class="mr-2 h-4 w-4" />
						{dobValue ? df.format(dobValue.toDate(getLocalTimeZone())) : 'Pick a date'}
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" align="start">
						<Calendar
							type="single"
							bind:value={dobValue}
							isDateDisabled={(currDate) => {
								const currDateObj = currDate.toDate(getLocalTimeZone());
								const today = new Date();
								today.setHours(0, 0, 0, 0);

								if (currDateObj > today || currDate.year < 1900) return true;

								return false;
							}}
							onValueChange={(value: DateValue | undefined) => {
								if (value === undefined) {
									$formData.dob = '';
									validate('dob');
									return;
								}
								$formData.dob = value.toDate('UTC').toISOString();
								validate('dob');
							}}
						/>
					</Popover.Content>
					<input hidden bind:value={$formData.dob} name="calender" {...props} />
				</Popover.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field name="password" {form}>
		<Form.Control>
			{#snippet children({ props }: { props: Record<string, any> })}
				<Form.Label>Account Password</Form.Label>
				<div class="relative">
					<Input bind:value={$formData.password} type={eyeOpen ? 'password' : 'text'} {...props} />
					<Button
						variant="ghost"
						class="absolute top-1/2 right-0 -translate-y-1/2"
						onclick={() => (eyeOpen = !eyeOpen)}
						type="button"
					>
						{#if eyeOpen}
							<EyeClosed />
						{:else}
							<Eye />
						{/if}
					</Button>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Update account</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
