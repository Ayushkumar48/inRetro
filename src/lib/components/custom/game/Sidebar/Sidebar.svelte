<script>
	import { cn } from '$lib/utils';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { PersistedState } from 'runed';
	import SubmitCode from './SubmitCode.svelte';
	import SaveREPL from './SaveREPL.svelte';
	import GeneralInfo from './GeneralInfo.svelte';
	import ResetCode from './ResetCode.svelte';
	import KeyboardShortccut from './KeyboardShortccut.svelte';

	let { saveCode } = $props();
	const collapsed = new PersistedState('sidebar-collapsed', true);

	function toggleSidebar() {
		collapsed.current = !collapsed.current;
	}
</script>

<aside
	class={cn(
		'bg-background border-r border-border transition-all duration-200 flex flex-col',
		collapsed.current && 'w-16',
		!collapsed.current && 'w-48'
	)}
>
	<button
		class="p-2 flex justify-end items-center hover:bg-muted/50 transition-colors"
		onclick={toggleSidebar}
		aria-label={collapsed.current ? 'Expand sidebar' : 'Collapse sidebar'}
	>
		{#if collapsed.current}
			<ChevronRight size={18} />
		{:else}
			<ChevronLeft size={18} />
		{/if}
	</button>
	<nav class="flex-1 overflow-y-auto">
		<ul class={cn('py-2 mx-2', collapsed.current && 'flex justify-center flex-col items-center')}>
			<li>
				<GeneralInfo {collapsed} />
			</li>
			<li>
				<SaveREPL {collapsed} {saveCode} />
			</li>
			<li>
				<SubmitCode {collapsed} />
			</li>
			<li>
				<ResetCode {collapsed} />
			</li>
			<li>
				<KeyboardShortccut {collapsed} />
			</li>
		</ul>
	</nav>
</aside>
