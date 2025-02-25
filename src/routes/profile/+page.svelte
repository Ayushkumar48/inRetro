<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import type { PageData } from './$types.js';
	import ProfileForm from '$lib/components/custom/profile/profile-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Profile</h3>
		<p class="text-muted-foreground text-sm">This is how others will see you on the site.</p>
	</div>
	<Separator />
	<ProfileForm data={data.form} />
</div>
