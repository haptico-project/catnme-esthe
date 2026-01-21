<script>
	import { base } from '$app/paths';
</script>

<!-- 背景 -->
<div class="w-full bg-basebg text-ink">
	<!-- コンテンツ幅固定 -->
	<main class="mx-auto max-w-phone px-4 pb-20">

		<!-- HERO / 画像1 -->
		<section class="pt-10 text-center">
			<img
				src={`${base}/images/cat-main.png`}
				alt="シニアペットケア"
				class="mx-auto rounded-2xl mb-8"
			/>

			<h1 class="text-2xl font-semibold mb-6">
				シニアペットのケアが変わります
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
		</section>

	</main>
</div>
