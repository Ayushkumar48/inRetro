<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import AdminNav from '$lib/components/custom/admin/admin-nav.svelte';
	import type { PageData } from './$types';
	import DarkToggle from '$lib/components/custom/root-layout/DarkToggle.svelte';
	let { data }: { data: PageData } = $props();
</script>

<div class="p-8 flex flex-col gap-y-4 w-full h-full">
	<div class="flex flex-row justify-between items-center">
		<h3 class="text-2xl">Admin</h3>
		<div>
			{#if data.admin}
				<div class="flex gap-x-4 items-center">
					<DarkToggle />
					<Button href="/admin/levels-check" variant="outline">Evaluate Levels</Button>
					<AdminNav />
				</div>
			{:else}
				<Button href="/admin/login" variant="outline">Login/Signup</Button>
			{/if}
		</div>
	</div>
	<div class="flex-1 flex justify-center items-center mt-32">
		<div>
			<p>Welcome to the admin page!</p>
			<p>
				This is a protected route. Only admins can access its components. To access the components,
				you need to be logged in as an admin.
			</p>
			<p>
				If you are not an admin user, you will be redirected to the login page. If you are an admin
				user, you can modify the contents.
			</p>
		</div>
	</div>
</div>
