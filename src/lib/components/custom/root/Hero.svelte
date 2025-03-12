<script>
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge/index';
	import { Button } from '$lib/components/ui/button/index';

	import { ArrowRight } from 'lucide-svelte';
</script>

<section class="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
	<Badge variant="outline" class="mb-4">Capstone Project</Badge>
	<h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
		Learn to code <span class="text-primary">the retro way</span>
	</h1>
	<p class="text-lg md:text-xl text-muted-foreground max-w-[700px] mb-8">
		A step-by-step journey from HTML basics to modern frameworks, with an in-browser editor and
		interactive challenges.
	</p>
	<div class="flex flex-col sm:flex-row gap-4">
		<Button size="lg" class="gap-2" onclick={() => goto('/login')}>
			Start Learning
			<ArrowRight class="h-4 w-4" />
		</Button>
		<Button variant="outline" size="lg" onclick={() => goto('/game')}>Explore Levels</Button>
	</div>

	<div class="mt-16 relative w-full max-w-3xl">
		<div
			class="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary rounded-lg blur-lg opacity-50"
		></div>
		<div class="relative bg-background rounded-lg border shadow-lg overflow-hidden">
			<!-- svelte-ignore a11y_media_has_caption -->
			<video src="/landing-page-video.webm" autoplay muted loop playsinline></video>
		</div>
	</div>
</section>
