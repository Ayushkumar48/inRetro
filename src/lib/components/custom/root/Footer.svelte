<script>
	import { siGithub } from 'simple-icons';
</script>

<footer class="bg-muted/30 py-8">
	<div class="container mx-auto px-4">
		<div class="flex flex-col md:flex-row justify-between items-center">
			<div class="flex items-center gap-2 mb-4 md:mb-0">
				<img src="/logo.svg" alt="inRetro-logo" class="w-5 h-5" />
				<span class="font-bold">inRetro</span>
			</div>
			<div class="text-sm text-muted-foreground">
				© {new Date().getFullYear()} inRetro. Developed by Ayush Kumar.
			</div>
			<div class="flex gap-4 mt-4 md:mt-0">
				<a
					href="https://github.com/Ayushkumar48/inRetro"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted-foreground hover:text-primary transition-colors h-5 w-5 fill-black dark:fill-white"
				>
					{@html siGithub.svg}
					<span class="sr-only">GitHub</span>
				</a>
			</div>
		</div>
	</div>
</footer>
