<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center gap-4 text-white">
	<div>An error occured!!!</div>
	<div class="flex flex-row gap-2">
		<h1>Error:</h1>
		<div>
			{$page.status}
		</div>
	</div>
	<div>{$page.error.message}</div>
</div>
