<script lang="ts">
	import { goto } from '$app/navigation';
	import { type LevelDetails, type Score } from '$lib/server/db/schema';
	import * as Table from '$lib/components/ui/table/index.js';

	type UserLevel = {
		levelDetails: LevelDetails;
		template: string | null;
		id: string;
		status: 'Not Attempted' | 'Attempted' | 'Submitted for Evaluation' | 'Completed';
		levelId: number;
		score: Score | null;
	};

	let { levelsData }: { levelsData: UserLevel[] } = $props();
</script>

<Table.Root>
	<Table.Caption>A list of all the user submitted levels.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Path</Table.Head>
			<Table.Head>Language</Table.Head>
			<Table.Head>Details</Table.Head>
			<Table.Head>Template</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head class="text-right">Achieved Score (Max-100)</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each levelsData as level (level.id)}
			<Table.Row onclick={() => goto(`/admin/levels-check/${level.id}`)} class="cursor-pointer">
				<Table.Cell class="font-medium">{level.levelDetails.path}</Table.Cell>
				<Table.Cell>{level.levelDetails.language}</Table.Cell>
				<Table.Cell>{level.levelDetails.details}</Table.Cell>
				<Table.Cell>{level.template}</Table.Cell>
				<Table.Cell>{level.status}</Table.Cell>
				<Table.Cell class="text-right">{level.score?.score || '—'}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
	<Table.Footer>
		<Table.Row>
			<Table.Cell colspan={5}>Levels Count</Table.Cell>
			<Table.Cell class="text-right">{levelsData.length || 0}</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>
