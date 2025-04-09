<script lang="ts">
	import { page } from '$app/state';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { FileTerminal } from '@lucide/svelte';
	import axios, { type AxiosResponse } from 'axios';
	import { toast } from 'svelte-sonner';
	import { fly, fade } from 'svelte/transition';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	let { collapsed } = $props();
	let open = $state(false);
	async function submitCode() {
		const res = axios.post('/api/submitcode', {
			levelId: page.data.game.id
		});
		toast.promise(res, {
			loading: 'Submitting code',
			success: (response: AxiosResponse) => {
				open = false;
				if (response.data) {
					return response.data;
				}
				return 'Code submitted successfully';
			},
			error: (res: any) => {
				if (res.response.data) {
					return res.response.data;
				}
				return 'An unknown error occurred';
			}
		});
	}
</script>

<Tooltip.Provider>
	<Tooltip.Root disableHoverableContent>
		<Tooltip.Trigger class={buttonVariants({ variant: 'ghost' })}>
			<AlertDialog.Root bind:open>
				<AlertDialog.Trigger>
					<FileTerminal class="w-5 h-5" />
					{#if !collapsed.current}
						<span in:fly={{ x: -10, duration: 150, delay: 100 }} out:fade={{ duration: 0 }}>
							Submit Code
						</span>
					{/if}
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. This will submit your code for evaluation.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action onclick={submitCode}>Submit Code</AlertDialog.Action>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Submit Code for Evaluation</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
