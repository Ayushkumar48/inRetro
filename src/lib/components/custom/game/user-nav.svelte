<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { user } from '$lib/stores/store.svelte';
	import { LogOut } from 'lucide-svelte';
	async function handleLogout() {
		const res = await fetch('/api/logout');
		if (res.ok) {
			toast.success('User logged out!');
			user.current = null;
			window.location.href = '/';
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex items-center relative h-8 w-8 rounded-full">
		<Avatar.Root class="h-8 w-8 select-none">
			{#if user.current?.image}
				<img src={user.current?.image} alt="user" referrerpolicy="no-referrer" />
			{:else}
				<img src="/avatars/boy.png" alt="user" />
			{/if}
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{user.current?.name || 'User'}</p>
				<p class="text-muted-foreground text-xs leading-none">
					{user.current?.username || 'Username'}
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
