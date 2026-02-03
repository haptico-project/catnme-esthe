<script>
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import CheckoutService from '$lib/infras/checkoutService';

	const PRICE_ID = 'price_1SwYhlPo9yD7PttV8cSl1Ez6';
	const IS_SUBSCRIPTION = true;
	let agencyCode = '';
	let isCheckingOut = false;
	let checkoutError = '';

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		agencyCode = params.get('agency_code') ?? '2139';
	});

	const startCheckout = async () => {
		if (isCheckingOut) {
			return;
		}

		checkoutError = '';
		isCheckingOut = true;

		if (!PRICE_ID) {
			checkoutError = '現在お申込みの準備中です。しばらくしてからお試しください。';
			isCheckingOut = false;
			return;
		}

		try {
			const response = await CheckoutService.checkouForPaymanage(
				PRICE_ID,
				agencyCode,
				IS_SUBSCRIPTION
			);
			const payload = response?.data ?? response?.response?.data ?? response;
			const url =
				(typeof payload === 'string' ? payload : null) ??
				payload?.checkoutUrl ??
				payload?.paymentUrl ??
				payload?.url ??
				payload?.data?.checkoutUrl ??
				payload?.data?.paymentUrl ??
				payload?.data?.url;

			if (url) {
				window.location.href = url;
				return;
			}
			checkoutError = 'チェックアウトURLの取得に失敗しました。時間をおいてお試しください。';
		} catch {
			checkoutError = 'チェックアウトに失敗しました。時間をおいてお試しください。';
		} finally {
			isCheckingOut = false;
		}
	};
</script>

<!-- 背景 -->
<div class="w-full bg-basebg text-ink">
	<!-- コンテンツ幅固定 -->
	<main class="mx-auto max-w-phone px-4 pb-20 pt-20">

		<!-- 固定ヘッダー -->
		<header class="fixed top-0 left-0 right-0 z-20">
			<div class="bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
				<div class="mx-auto max-w-phone px-4 py-4">
				<div class="flex items-center justify-between gap-3">
					<p class="text-sm font-semibold tracking-wide">
						ペット介護.com
					</p>
					<button
						type="button"
						on:click={startCheckout}
						disabled={isCheckingOut}
						class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-ink text-white text-xs font-semibold tracking-wide shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
						aria-busy={isCheckingOut}
					>
						{#if isCheckingOut}
							<span class="inline-block h-4 w-4 rounded-full border-2 border-white/60 border-t-white animate-spin" />
							処理中
						{:else}
							今すぐお申込み
						{/if}
					</button>
				</div>
				{#if checkoutError}
					<p class="text-xs text-red-600 mt-2">
						{checkoutError}
					</p>
				{/if}
				</div>
			</div>
		</header>

		<!-- HERO / 画像1 -->
		<section class="pt-10 text-center">
			<img
				src={`${base}/images/cat-main.png`}
				alt="ペット介護"
				class="mx-auto rounded-2xl mb-8"
			/>

			<h1 class="text-2xl font-semibold mb-6">
				ペット介護が変わります
			</h1>

			<p class="leading-relaxed mb-6">
				歩くのがゆっくりになった<br />
				階段を嫌がるようになった<br />
				夜にそわそわする時間が増えた
			</p>

			<p class="text-sm">
				そんな“変化”を感じたら。
			</p>
		</section>

		<hr class="my-12 border-gray-300" />

		<!-- 仕組み -->
		<section class="text-center">
			<h2 class="text-lg font-semibold mb-4">
				自然の音の微細振動※で、<br />
				からだをやわらげるケア
			</h2>

			<div class="my-6">
				<video
					src={`${base}/videos/catme-esthe.mp4`}
					controls
					playsinline
					class="w-full rounded-xl"
				/>
			</div>

			<p class="text-xs text-gray-500 mb-6">
				※スピーカーに触れると手に伝わる小さな“ふるえ”のこと
			</p>

			<p class="text-left text-sm leading-relaxed">
				ペットの<br />
				・足腰のこわばり<br />
				・緊張<br />
				・不安<br />
				・ぐったり感<br /><br />
				に寄り添い、からだと気持ちを整える<br />
				新しいウェルビーイングケアです。
			</p>
		</section>

		<hr class="my-12 border-gray-300" />

		<!-- 画像2 -->
		<section class="text-center">
			<img
				src={`${base}/images/products/one.png`}
				alt="やさしく当てるだけ"
				class="mx-auto mb-8"
			/>

			<h2 class="text-xl font-semibold mb-4">
				やさしく当てるだけ
			</h2>

			<p class="text-sm leading-relaxed">
				痛みも強い刺激もありません。<br />
				「気持ちよさそうにウトウトする」<br />
				「帰ってからよく眠る」などのお声も増えています。
			</p>
		</section>

		<hr class="my-12 border-gray-300" />

		<!-- 料金 -->
		<section class="text-center">
			<h2 class="text-xl font-semibold mb-4">
				料金と使い方
			</h2>

			<p class="mb-4">月額：3,000円〜</p>

			<p class="text-sm leading-loose">
				使い方はとても簡単<br />
				→ 気になる部分に<br />
				→ スピーカーをそっと当てるだけ
			</p>

			<p class="text-sm mt-4">
				続けるほど変化を感じやすいケアです。
			</p>
		</section>

		<hr class="my-12 border-gray-300" />

		<!-- おすすめ -->
		<section>
			<h2 class="text-xl font-semibold text-center mb-4">
				こんな子におすすめ
			</h2>

			<ul class="text-sm leading-relaxed">
				<li>・シニア期のワンちゃん・ネコちゃん</li>
				<li>・足腰をかばう子</li>
				<li>・眠りが浅くなってきた子</li>
				<li>・震えやすい／緊張しやすい子</li>
				<li>・介護の始まりを感じている子</li>
			</ul>
		</section>

		<hr class="my-12 border-gray-300" />

		<!-- 背景 -->
		<section class="text-sm leading-relaxed">
			<h2 class="text-xl font-semibold text-center mb-4">
				“借りたい理由” が増えている背景
			</h2>

			<p class="mb-4">
				高齢ペットのケアは「何をしてあげたらいいのかわからない」
				という声が多数です。
			</p>

			<p class="mb-4">
				とくに介護期は、動かさないことがかえって
				筋力・睡眠・気持ちの低下につながることも。
			</p>

			<p>
				✔ 自宅でできる<br />
				✔ かんたん<br />
				✔ 続けやすい
			</p>
		</section>

		<hr class="my-12 border-gray-300" />

		<!-- 獣医 -->
		<section class="text-center">
			<img
				src={`${base}/images/section-case/いっしょにヘッドスパ_ねこ.png`}
				alt="獣医コメント"
				class="mx-auto mb-6 rounded-xl"
			/>

			<p class="text-sm leading-relaxed">
				「シニア期になると、筋肉・関節だけでなく
				睡眠とメンタルのケアも重要になります。
				無理に動かさず、やさしい刺激で血流や緊張を整える方法は、
				飼い主が自宅で実践できる点に価値があります」
			</p>

			<p class="text-xs mt-2">
				（動物病院／獣医師）
			</p>
		</section>

		<hr class="my-12 border-gray-300" />

		<!-- Q&A -->
		<section class="text-sm leading-relaxed">
			<h2 class="text-xl font-semibold text-center mb-4">
				Q&amp;A
			</h2>

			<p class="mb-4">
				Q：何歳くらいから使うと良いですか？<br />
				A：7〜10歳頃を境に、変化が出はじめる子が多いです。
			</p>

			<p class="mb-4">
				Q：痛がったり怖がったりしませんか？<br />
				A：刺激や音ではなく“小さなふるえ”なので、多くの子がリラックスします。
			</p>

			<p class="mb-4">
				Q：薬や通院と併用できますか？<br />
				A：併用できます。医療行為ではなく“生活ケア”です。
			</p>
		</section>

		<hr class="my-12 border-gray-300" />

		<!-- CTA -->
		<section class="text-center">
			<h2 class="text-xl font-semibold mb-4">
				まずは試してみませんか？
			</h2>
			<p class="text-sm">
				レンタル／ご自宅トライアルも可能です。
			</p>
			<button
				type="button"
				on:click={startCheckout}
				disabled={isCheckingOut}
				class="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-ink text-white text-sm font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
				aria-busy={isCheckingOut}
			>
				{#if isCheckingOut}
					<span class="inline-block h-4 w-4 rounded-full border-2 border-white/60 border-t-white animate-spin" />
					処理中
				{:else}
					今すぐお申込み
				{/if}
			</button>
			{#if checkoutError}
				<p class="text-xs text-red-600 mt-3">
					{checkoutError}
				</p>
			{/if}
		</section>

		<!-- フッター -->
		<footer class="text-sm text-gray-600">
			<div class="bg-white/70 border border-gray-200 rounded-3xl px-6 py-12 mt-4">
				<div class="flex flex-wrap items-center justify-center gap-5 mb-6 text-sm">
				<a href={`${base}/terms`} class="hover:underline">利用規約</a>
				<a href={`${base}/tokusho`} class="hover:underline">特定商取引法に基づく表記</a>
				<a href={`${base}/privacy`} class="hover:underline">プライバシーポリシー</a>
			</div>
				<p class="text-center text-ink/80 font-semibold">
					株式会社ファセテラピー
				</p>
				<p class="text-center">
					〒150-0002 東京都渋谷区渋谷1丁目15-15-1010
				</p>
				<p class="text-center text-xs text-gray-500 mt-4">
					お問い合わせはメールにて承っております。
				</p>
			</div>
		</footer>

	</main>
</div>
