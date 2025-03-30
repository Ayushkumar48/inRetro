<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { FileTerminal } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	let { collapsed } = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root disableHoverableContent>
		<Tooltip.Trigger class={buttonVariants({ variant: 'ghost' })}>
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
