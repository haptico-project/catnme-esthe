<script>
	import { base } from '$app/paths';
	import ImageAt from '../infras/ImageAt.svelte';
	import HeroBoard from '../infras/HeroBoard.svelte';
</script>

<section class="text-center relative">

	<!-- 固定アスペクトの盤面にヒーロー画像とオーバーレイを重ねる -->
	<HeroBoard src={`${base}/images/cat-main.png`} designW={428} designH={926}>
		<!-- ロゴ（右上に重ねる） -->
		<div class="absolute top-3 right-3">
			<img src={`${base}/images/logo.svg`} alt="logo" class="h-8 w-auto" />
		</div>

		<!-- 見出し（盤面比で固定位置に） -->
		<div class="absolute right-1" style="top: 85%;">
			<span class="-translate-x-1/2 text-[30px] font-bold">一緒に、エステ。</span>
		</div>

	</HeroBoard>

	<!-- 購入ボタン（盤面内の%座標。端末が変わっても位置がブレない） -->
	<div class="relative -mt-4 flex justify-center">
		<ImageAt
			class="pressable pressable-glow"
			href="#"
			src={`${base}/images/shop-btn.svg`}
			width="40%"
			x={75}
			y={95}
		/>
	</div>

	<!-- 下部テキスト（ヒーローの下に続く） -->
	<section class="relative px-6 py-8" style="margin-top: 6rem;">
		<div class="text-center text-ink">
			「猫とわたしのエステ」は、<br />
			熟練マッサージ師の手の動きを再現した振動器です。<br />
			やわらかな振動が、<br />
			心と体を静かにゆるめていきます。<br />
			<br />

			そして、<br />
			この振動器のいちばんの魅力は<br />
			猫と一緒に使えること。<br />
			通常の振動モードにくわえて、<br />
			猫の小さな体にもやさしい、穏やかなモードが選べます。<br />
			<br />
			猫がゴロゴロと喉を鳴らし、<br />
			私も目を閉じて、夢の中へ...<br />
			<br />
			猫と一緒に、やさしく癒される。<br />
			そんな、日常に小さな贅沢を添える<br />
			新しいエステ体験をお楽しみください。<br />
		</div>
	</section>

	<div class="h-10"></div>
</section>
