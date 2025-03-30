<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { LogOut } from '@lucide/svelte';
	import { page } from '$app/state';
	async function handleLogout() {
		const res = await fetch('/api/logout');
		if (res.ok) {
			toast.success('User logged out!');
			page.data.user = null;
			window.location.reload();
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex items-center relative h-8 w-8 rounded-full">
		<Avatar.Root class="h-8 w-8 select-none">
			{#if page.data.user?.image}
				<img src={page.data.user?.image} alt="user" referrerpolicy="no-referrer" loading="lazy" />
			{:else}
				<img src="/avatars/boy.webp" alt="user" loading="lazy" />
			{/if}
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{page.data.user?.name || 'User'}</p>
				<p class="text-muted-foreground text-xs leading-none">
					{page.data.user?.username || 'Username'}
				</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={() => goto('/profile')}>
				Profile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>

			<DropdownMenu.Item onclick={() => goto('/profile/account')}>
				Account
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={handleLogout}>
			<LogOut /> Log out
			<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
