<script lang="ts">
	import { originalLevels, searchLevels } from '$lib/stores/store.svelte';
	import { Debounced, watch } from 'runed';
	import { onMount } from 'svelte';
	let focused = $state(false);
	let searchValue = $state('');
	const debouncedSearchValue = new Debounced(() => searchValue, 500);
	function handleKeydown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			event.preventDefault();
			focused = true;
			setTimeout(() => document.getElementById('search-input')?.focus(), 0);
		}

		if (event.key === 'Escape' && focused) {
			event.preventDefault();
			focused = false;
			document.getElementById('search-input')?.blur();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	function handleFocus() {
		focused = true;
	}

	function handleBlur() {
		focused = false;
	}

	watch(
		() => debouncedSearchValue.current,
		() => {
			const inputValue = debouncedSearchValue.current.toLowerCase();
			if (!inputValue || inputValue === '') {
				searchLevels.current = [...originalLevels.current];
				return;
			}

			searchLevels.current = originalLevels.current.filter((item) =>
				item.searchQuery.includes(inputValue)
			);
		}
	);
</script>

<div class="relative w-full max-w-md">
	<div class="relative">
		<input
			id="search-input"
			type="search"
			placeholder="Search..."
			class="w-full h-9 pl-10 pr-4 rounded-md border border-input bg-background py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			bind:value={searchValue}
			onfocus={handleFocus}
			onblur={handleBlur}
		/>

		<div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-search"
			>
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
			</svg>
		</div>

		<div
			class="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs gap-0.5 items-center"
		>
			<span class="rounded-sm bg-muted px-1 py-0.5"
				>{navigator.userAgent.includes('Mac') ? '⌘' : 'Ctrl'}</span
			>
			<span class="rounded-sm bg-muted px-1 py-0.5">K</span>
		</div>
	</div>

	{#if focused && searchValue}
		<div
			class="absolute top-full left-0 w-full mt-1 bg-background border rounded-md shadow-md z-10 max-h-80 overflow-y-auto"
		>
			<div class="p-4 text-sm text-muted-foreground">
				{#if searchValue.length < 2}
					Type at least 2 characters to search
				{:else}
					Searching for "{searchValue}"...
				{/if}
			</div>
		</div>
	{/if}
</div>
