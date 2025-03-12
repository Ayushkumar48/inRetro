<script>
	import { Badge } from '$lib/components/ui/badge/index';
	import { Layout } from 'lucide-svelte';
</script>

<section id="learning-path" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Your Learning Path</h2>
			<p class="text-muted-foreground max-w-[600px] mx-auto">
				From basic HTML to advanced frameworks, we've got you covered.
			</p>
		</div>

		<div class="relative">
			<!-- Path line -->
			<div
				class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"
			></div>

			<div class="space-y-12 relative">
				<!-- HTML -->
				<div class="flex flex-col md:flex-row items-center gap-8">
					<div class="md:w-1/2 md:text-right order-2 md:order-1">
						<Badge variant="secondary" class="mb-2">Level 1</Badge>
						<h3 class="text-2xl font-bold mb-2">HTML Basics</h3>
						<p class="text-muted-foreground">
							Learn the building blocks of the web. Create your first webpage with HTML tags,
							elements, and structure.
						</p>
					</div>
					<div class="md:w-1/2 flex justify-center order-1 md:order-2">
						<div class="bg-primary/10 p-4 rounded-full">
							<Layout class="h-12 w-12 text-primary" />
						</div>
					</div>
				</div>

				<!-- CSS -->
				<div class="flex flex-col md:flex-row items-center gap-8">
					<div class="md:w-1/2 flex justify-center">
						<div class="bg-primary/10 p-4 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-primary"
								><path d="M4 2l16 0"></path><path d="M4 7l16 0"></path><path d="M4 12l16 0"
								></path><path d="M4 17l16 0"></path><path d="M4 22l16 0"></path></svg
							>
						</div>
					</div>
					<div class="md:w-1/2">
						<Badge variant="secondary" class="mb-2">Level 2</Badge>
						<h3 class="text-2xl font-bold mb-2">CSS Styling</h3>
						<p class="text-muted-foreground">
							Make your websites beautiful with CSS. Learn about selectors, properties, layouts, and
							responsive design.
						</p>
					</div>
				</div>

				<!-- JavaScript -->
				<div class="flex flex-col md:flex-row items-center gap-8">
					<div class="md:w-1/2 md:text-right order-2 md:order-1">
						<Badge variant="secondary" class="mb-2">Level 3</Badge>
						<h3 class="text-2xl font-bold mb-2">JavaScript Programming</h3>
						<p class="text-muted-foreground">
							Add interactivity to your websites. Learn about variables, functions, DOM
							manipulation, and event handling.
						</p>
					</div>
					<div class="md:w-1/2 flex justify-center order-1 md:order-2">
						<div class="bg-primary/10 p-4 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-primary"
								><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><path
									d="m8 16 4-4 4 4"
								></path><path d="M16 16v-1"></path></svg
							>
						</div>
					</div>
				</div>

				<!-- Frameworks -->
				<div class="flex flex-col md:flex-row items-center gap-8">
					<div class="md:w-1/2 flex justify-center">
						<div class="bg-primary/10 p-4 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-primary"
								><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M7 7h10"
								></path><path d="M7 12h10"></path><path d="M7 17h10"></path></svg
							>
						</div>
					</div>
					<div class="md:w-1/2">
						<Badge variant="secondary" class="mb-2">Level 4</Badge>
						<h3 class="text-2xl font-bold mb-2">Modern Frameworks</h3>
						<p class="text-muted-foreground">
							Dive into Svelte or React. Learn component-based architecture, state management, and
							building interactive UIs.
						</p>
					</div>
				</div>

				<!-- Full Stack -->
				<div class="flex flex-col md:flex-row items-center gap-8">
					<div class="md:w-1/2 md:text-right order-2 md:order-1">
						<Badge variant="secondary" class="mb-2">Level 5</Badge>
						<h3 class="text-2xl font-bold mb-2">Full-Stack Development</h3>
						<p class="text-muted-foreground">
							Build complete applications with SvelteKit or Next.js. Learn about routing, data
							fetching, and deployment.
						</p>
					</div>
					<div class="md:w-1/2 flex justify-center order-1 md:order-2">
						<div class="bg-primary/10 p-4 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-primary"
								><path d="M12 2H2v10h10V2Z"></path><path d="M22 12h-10v10h10V12Z"></path><path
									d="M12 12H2v10h10V12Z"
								></path><path d="M22 2h-10v10h10V2Z"></path></svg
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
