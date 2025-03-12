<script>
	import Header from '$lib/components/custom/root/Header.svelte';
	import Hero from '$lib/components/custom/root/Hero.svelte';
	import Features from '$lib/components/custom/root/Features.svelte';
	import LearningPath from '$lib/components/custom/root/LearningPath.svelte';
	import Cta from '$lib/components/custom/root/CTA.svelte';
	import Footer from '$lib/components/custom/root/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Header />
	<main class="flex-1">
		<Hero />
		<Features />
		<LearningPath />
		<Cta />
	</main>
	<Footer />
</div>
