<script>
	import { dev } from '$app/environment';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	const seo_picture = dev
		? 'http://localhost:5173/seo-picture.webp'
		: 'https://inretro.vercel.app/seo-picture.webp';
	let { children } = $props();
</script>

<Toaster richColors />
<ModeWatcher />
{@render children()}

<svelte:head>
	<title>Learn Programming | inRetro</title>
	<meta name="description" content="An interactive platform to learn programming from scratch." />
	<meta
		name="keywords"
		content="learn programming, coding for beginners, javascript, sveltekit, next.js"
	/>
	<meta name="author" content="Ayush Kumar" />

	<meta property="og:title" content="Learn Programming for Beginners" />
	<meta property="og:description" content="A beginner-friendly platform to start coding today!" />
	<meta property="og:image" content={seo_picture} />
	<meta property="og:url" content="https://inretro.vercel.app/" />
	<script type="application/ld+json">
		{`
		  {
			"@context": "https://schema.org",
			"@type": "EducationalOrganization",
			"name": "inRetro",
			"url": "https://inretro.vercel.app/",
			"description": "An interactive platform to learn programming from scratch."
		  }
		`}
	</script>
</svelte:head>
