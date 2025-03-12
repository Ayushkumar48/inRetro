<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index';
	import { ArrowRight } from 'lucide-svelte';
</script>

<section id="about" class="bg-primary/5 py-20">
	<div class="container mx-auto px-4 text-center">
		<h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Coding Journey?</h2>
		<p class="text-muted-foreground max-w-[600px] mx-auto mb-8">
			Join inRetro today and learn programming through our interactive, step-by-step approach.
		</p>
		<Button size="lg" class="gap-2" onclick={() => goto('/login')}>
			Get Started Now
			<ArrowRight class="h-4 w-4" />
		</Button>
	</div>
</section>
