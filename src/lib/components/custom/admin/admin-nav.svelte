<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import { LogOut, User } from '@lucide/svelte';
	import { page } from '$app/state';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex items-center relative h-8 w-8 rounded-full">
		<Avatar.Root class="h-8 w-8 select-none">
			<Avatar.Fallback>
				<User class="w-6 h-6" />
			</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Item class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{page.data.admin.name || 'User'}</p>
				<p class="text-muted-foreground text-xs leading-none">
					{page.data.admin.email || 'Email'}
				</p>
			</div>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<LogOut /> Log out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
