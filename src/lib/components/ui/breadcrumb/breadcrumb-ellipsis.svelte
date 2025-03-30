<script lang="ts">
	import { EllipsisVertical } from '@lucide/svelte';
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
	bind:this={ref}
	role="presentation"
	aria-hidden="true"
	class={cn('flex size-9 items-center justify-center', className)}
	{...restProps}
>
	<EllipsisVertical class="size-4" />
	<span class="sr-only">More</span>
</span>
