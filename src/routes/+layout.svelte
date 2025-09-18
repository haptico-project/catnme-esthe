<!-- +layout.svelte -->
<div class="relative min-h-dvh font-sans text-ink">
	<!-- 背景：画面に固定 -->
	<div
		class="fixed inset-0 -z-10 pointer-events-none bg-cover bg-center blur-md brightness-90"
		style={`background-image: url('${base}/images/bg.jpg');`}
	></div>
	<!-- オーバーレイ（必要なら） -->
	<div class="fixed inset-0 -z-10 bg-white/40 pointer-events-none"></div>

	<!-- コンテンツ（普通にブラウザ標準スクロール） -->
	<div class="mx-auto max-w-[1200px] md:px-6 grid md:grid-cols-[1fr_min(100%,theme(maxWidth.phone))_1fr]">
		<aside class="hidden md:block"><slot name="left" /></aside>
		<main class="w-full md:mx-auto md:max-w-phone"><slot /></main>
		<aside class="hidden md:block"><slot name="right" /></aside>
	</div>
</div>


<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
</script>
