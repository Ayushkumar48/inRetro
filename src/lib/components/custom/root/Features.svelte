<script>
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Code, Layers, Zap } from '@lucide/svelte';
</script>

<section id="features" class="bg-muted/50 py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Why inRetro?</h2>
			<p class="text-muted-foreground max-w-[600px] mx-auto">
				A unique approach to learning programming that combines retro aesthetics with modern web
				technologies.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<Card>
				<CardHeader>
					<Zap class="h-12 w-12 text-primary mb-2" />
					<CardTitle>Interactive Learning</CardTitle>
					<CardDescription>Learn by doing with real-time feedback and guidance.</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						Our interactive challenges help you apply what you've learned immediately, reinforcing
						concepts through practice.
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<Code class="h-12 w-12 text-primary mb-2" />
					<CardTitle>In-Browser Editor</CardTitle>
					<CardDescription>
						Code directly in your browser with our Stackblitz integration.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						No setup required. Our in-browser editor lets you start coding immediately with syntax
						highlighting and error checking.
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<Layers class="h-12 w-12 text-primary mb-2" />
					<CardTitle>Progressive Learning</CardTitle>
					<CardDescription>Start with basics and progress to advanced frameworks.</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						Our structured curriculum takes you from HTML fundamentals all the way to modern
						frameworks like SvelteKit and Next.js.
					</p>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
