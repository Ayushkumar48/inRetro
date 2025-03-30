<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { RotateCcw } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/state';

	let { collapsed } = $props();
	async function resetCode() {
		const res = new Promise((resolve, reject) => {
			axios
				.get('/api/resetcode', {
					params: {
						levelId: page.url.pathname.split('/').pop(),
						id: page.data.game.id
					}
				})
				.then((response) => {
					if (response.data.success) {
						window.location.reload();
						resolve(response.data);
					} else {
						reject(response.data.error);
					}
				})
				.catch((error) => {
					reject(error.message || 'Something went wrong');
				});
		});
		toast.promise(res, {
			loading: 'Resetting the code',
			success: 'Code reset!',
			error: 'Error while resetting code'
		});
	}
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Tooltip.Provider>
			<Tooltip.Root disableHoverableContent>
				<Tooltip.Trigger class={buttonVariants({ variant: 'ghost' })}>
					<RotateCcw class="w-5 h-5" />
					{#if !collapsed.current}
						<span in:fly={{ x: -10, duration: 150, delay: 100 }} out:fade={{ duration: 0 }}>
							Reset Code
						</span>
					{/if}
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Reset Code to Default</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure to reset the code?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your existing code and replace it
				with the default code.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={resetCode}>Reset</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
