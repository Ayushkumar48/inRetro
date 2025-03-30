<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Save } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	let { collapsed, saveCode } = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root disableHoverableContent>
		<Tooltip.Trigger class={buttonVariants({ variant: 'ghost' })} onclick={saveCode}>
			<Save class="w-5 h-5" />
			{#if !collapsed.current}
				<span in:fly={{ x: -10, duration: 150, delay: 100 }} out:fade={{ duration: 0 }}>
					Save REPL
				</span>
			{/if}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Save the REPL to Database</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
