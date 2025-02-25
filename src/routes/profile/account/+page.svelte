<script lang="ts">
	import AccountForm from '$lib/components/custom/profile/account-form.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-muted-foreground text-sm">Update your account settings.</p>
	</div>
	<Separator />
	<AccountForm data={data.form} />
</div>
