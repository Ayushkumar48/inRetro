<script lang="ts">
	import { page } from '$app/state';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { FileTerminal } from '@lucide/svelte';
	import axios, { type AxiosResponse } from 'axios';
	import { toast } from 'svelte-sonner';
	import { fly, fade } from 'svelte/transition';
	let { collapsed } = $props();
	async function submitCode() {
		const res = axios.post('/api/submitcode', {
			levelId: page.data.game.levelId || page.data.game.id || '',
			userId: page.data.user.id
		});
		toast.promise(res, {
			loading: 'Submitting code',
			success: (data: unknown) => {
				if (data && typeof data === 'object' && 'data' in data) {
					return (data as AxiosResponse).data.message as string;
				}
				return 'Code submitted successfully';
			},
			error: (error: unknown) => {
				if (axios.isAxiosError(error) && error.response) {
					return error.response.data.error as string;
				}
				return 'An unknown error occurred';
			}
		});
	}
</script>

<Tooltip.Provider>
	<Tooltip.Root disableHoverableContent>
		<Tooltip.Trigger class={buttonVariants({ variant: 'ghost' })} onclick={submitCode}>
			<FileTerminal class="w-5 h-5" />
			{#if !collapsed.current}
				<span in:fly={{ x: -10, duration: 150, delay: 100 }} out:fade={{ duration: 0 }}>
					Submit Code
				</span>
			{/if}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Submit Code for Evaluation</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
