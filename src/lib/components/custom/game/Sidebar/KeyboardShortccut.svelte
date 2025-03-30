<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Keyboard } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import { shortcuts } from '$lib/utils';
	let { collapsed } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Tooltip.Provider>
			<Tooltip.Root disableHoverableContent>
				<Tooltip.Trigger class={buttonVariants({ variant: 'ghost' })}>
					<Keyboard class="h-5 w-5" />
					{#if !collapsed.current}
						<span in:fly={{ x: -10, duration: 150, delay: 100 }} out:fade={{ duration: 0 }}>
							Keyboard Shortcuts
						</span>
					{/if}
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Keyboard Shortcuts in Editor</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header class="flex flex-col gap-y-4">
			<Dialog.Title>Keyboard Shortcuts in Editor</Dialog.Title>
			<Dialog.Description class="h-80 overflow-auto">
				<table class="w-full">
					<tbody>
						<tr>
							<th class="text-gray-300 py-2">Shortcut</th>
							<th class="text-gray-300 py-2">Description</th>
						</tr>
						{#each shortcuts as shortcut}
							<tr>
								<td class="py-2">
									{@html shortcut.shortcut
										.split('+')
										.map((key) => `<kbd class="rounded-sm bg-muted px-1 py-0.5">${key}</kbd>`)
										.join(' + ')}
								</td>
								<td class="py-2">
									<span>{shortcut.description}</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
