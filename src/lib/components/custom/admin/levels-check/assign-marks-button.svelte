<script lang="ts">
	import { page } from '$app/state';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { ArrowUp10 } from '@lucide/svelte';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';
	let open = $state(false);
	let marks = $state(0);
	async function handleClick() {
		const res = axios.post('/api/assign-marks', {
			userId: page.data.level.userId,
			levelNumber: page.data.level.levelId,
			marks
		});
		toast.promise(res, {
			loading: 'Assigning Marks...',
			success: (response) => {
				open = false;
				return response.data || 'Marks Assigned Successfully!';
			},
			error: (error: any) => {
				return error.response.data || 'Error Assigning Marks!';
			}
		});
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		class={buttonVariants({
			size: 'sm',
			variant: 'secondary'
		})}
	>
		Assign Marks
		<ArrowUp10 />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Assign Marks to Level</Dialog.Title>
			<Dialog.Description>
				Are you sure you evaluated the level correctly and want to assign the marks? <br />
				<br />Min marks - 0 <br /> Max marks - 100
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="marks" class="text-right">Marks</Label>
				<Input id="marks" bind:value={marks} class="col-span-3" name="marks" type="number" />
			</div>
			<Dialog.Footer>
				<Button type="button" onclick={() => (open = false)} variant="destructive">Cancel</Button>
				<Button onclick={handleClick}>Save Marks</Button>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>
