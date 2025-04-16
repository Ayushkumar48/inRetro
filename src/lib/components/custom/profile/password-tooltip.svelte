<script>
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { BadgeInfoIcon } from '@lucide/svelte';
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={100}>
		<Tooltip.Trigger><BadgeInfoIcon class="w-5 h-5" /></Tooltip.Trigger>
		<Tooltip.Content class="w-80 text-wrap">
			<p>Password can only be changed if account is not logged in through Google or GitHub.</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
