<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import CheckoutService from '$lib/infras/checkoutService';
	import { planCatalog } from '$lib/infras/planCatalog';
	import PlanFlow from '$lib/infras/PlanFlow.svelte';

	let agencyCode = '';
	let cancelMailAddress = '';
	let isCancelLoading = false;
	let cancelError = '';
	let showPlanModal = false;

	// ヒーローのCTAがスクロールで画面の上に消えたら、同じ訴求の固定ヘッダーを出す。
	// 初期表示で画面の下にある（まだ見ていない）ときは出さない。
	let heroCta: HTMLButtonElement;
	let stickyCtaVisible = false;
	let stickyCtaDuration = 250;

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		agencyCode = params.get('agency_code') ?? '2139';

		const mailAddress = params.get('mail_address');
		if (mailAddress) {
			cancelMailAddress = mailAddress;
		}

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) stickyCtaDuration = 0;

		const observer = new IntersectionObserver(([entry]) => {
			stickyCtaVisible = !entry.isIntersecting && entry.boundingClientRect.top < 0;
		});
		observer.observe(heroCta);
		return () => observer.disconnect();
	});

	const openPlanModal = () => (showPlanModal = true);

	const isHttpUrl = (value: unknown): value is string =>
		typeof value === 'string' && /^https?:\/\//.test(value);

	const extractPayload = (response: unknown) => {
		const candidate = response as {
			data?: unknown;
			response?: {
				data?: unknown;
			};
		};

		return candidate?.data ?? candidate?.response?.data ?? response;
	};

	const goToCancelPortal = async () => {
		cancelError = '';
		const mailAddress = cancelMailAddress.trim();

		if (!mailAddress) {
			cancelError = 'ご契約メールアドレスを入力してください。';
			return;
		}

		if (!planCatalog.cancelPortal.shopId || planCatalog.cancelPortal.shopId.includes('REPLACE')) {
			cancelError =
				'解約ポータルの shopId が未設定です。`src/lib/infras/planCatalog.ts` を更新してください。';
			return;
		}

		isCancelLoading = true;
		try {
			const response = await CheckoutService.getSubscriptionPortalUrl(
				planCatalog.cancelPortal.shopId,
				mailAddress,
				window.location.href
			);
			const payload = extractPayload(response) as any;
			const url =
				(typeof payload === 'string' ? payload : null) ??
				payload?.url ??
				payload?.portalUrl ??
				payload?.data?.url ??
				payload?.data?.portalUrl;

			if (isHttpUrl(url)) {
				window.location.href = url;
				return;
			}

			throw new Error('invalid response');
		} catch (e) {
			console.error('解約ポータルの表示に失敗しました:', e);
			cancelError =
				'解約ページの表示に失敗しました。メールアドレスをご確認のうえ、再度お試しください。';
		} finally {
			isCancelLoading = false;
		}
	};

	// 使い方動画（YouTube Shorts「振動器の使用例」）
	const usageVideoId = 'NsL0jzKRhvw';

	const scenes = [
		'おやすみ前に',
		'痛みが<br />気になるときに',
		'リラックスタイムに',
		'シニア期の<br />デイリーケア'
	];

	const reviews: { who: string; images: string[]; text: string }[] = [
		{
			who: '14歳 ワンちゃん',
			images: ['/images/reviews/review-dog-14y.png'],
			text: 'この頃夜中に起きてしまうことが多かったのですが、このケアを始めてから朝までぐっすり眠ってくれるようになりました。今では毎日愛用しています。'
		},
		{
			who: '保護猫ちゃん 2匹（ルーマニア出身）',
			images: [
				'/images/reviews/review-rescue-cats-pair.jpg',
				'/images/reviews/review-rescue-cat-bed.jpg'
			],
			text: 'ルーマニアの保護施設から若い猫を2匹迎え入れましたが、当初はとても不安そうな様子でした。\nその後、毎日デバイスを使ってマッサージを行ったところ、約2週間で見違えるほど落ち着き、穏やかで幸せそうな様子になりました。\nまた、猫たちはそのデバイスと一緒に眠るのが大好きです。'
		},
		{
			who: '飼い主さまより',
			images: ['/images/reviews/review-dog-owner.png'],
			text: '病弱で歩行も困難な状態でした。夜間も何度も目を覚まし、徘徊を繰り返していました。\nお腹を中心に振動ケアを1日数回行い、こちらは2日後の様子です。\nお腹で深く呼吸しながら穏やかに眠れており、夜間の徘徊も見られませんでした。さらに、散歩でもしっかりとした足取りで歩けるようになっています。'
		}
	];

	const monthlyPrice = planCatalog.basePlan.price.toLocaleString('ja-JP');
</script>

<svelte:head>
	<title>ペットのウェルネスケア｜まずは7日間無料お試し</title>
</svelte:head>

<div class="w-full bg-white font-mincho tracking-[-0.06em] text-navy">
	<main class="mx-auto max-w-phone overflow-hidden pb-[40px]">
		<!-- ============== HERO ============== -->
		<section class="relative aspect-[375/640] w-full overflow-hidden bg-white">
			<img
				src={`${base}/images/cat-main.png`}
				alt="振動パッドでケアを受ける猫"
				class="absolute left-0 top-[-11.4%] w-[110%] max-w-none"
				fetchpriority="high"
			/>
			<!-- 下部を白くフェードさせて文字を読みやすく -->
			<div
				class="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.6)_40%,rgba(255,255,255,0.95)_75%,#ffffff_100%)]"
				aria-hidden="true"
			></div>
			<div class="absolute inset-x-0 bottom-0 px-[6px] pb-[66px] text-center">
				<h1 class="fs-32 whitespace-nowrap leading-[40px]">ペットのウェルネスケア</h1>
				<p class="fs-16 mt-[16px] leading-[26px]">
					ペットの毎日の「心地よい」をつくる、<br />
					おうちでできるウェルネスケア。<br />
					シニア期の犬・猫の健やかな毎日をサポートします。
				</p>
			</div>
		</section>

		<!-- ============== CONCERNS ============== -->
		<section class="relative bg-mist pt-[67px] pb-[34px] text-center">
			<div class="absolute inset-x-0 -top-[55px]">
				<button type="button" class="cta-btn" bind:this={heroCta} on:click={openPlanModal}>
					まずは<span class="text-petal">7日間無料</span>お試し
				</button>
			</div>

			<h2 class="fs-26 font-bold leading-[36px]">こんなお悩みありませんか？</h2>

			<ul class="fs-16 mx-auto mt-[24px] inline-block text-left leading-[35px]">
				<li class="check-item"><span>最近、<b>寝ている時間が増えた</b>。</span></li>
				<li class="check-item"><span>眠りが浅い。</span></li>
				<li class="check-item"><span>階段を<b>嫌がる</b>。</span></li>
				<li class="check-item"><span>歩くのが<b>ゆっくり</b>。</span></li>
			</ul>

			<img
				src={`${base}/images/concerns-sleeping-pets.png`}
				alt="寄り添って眠る犬と猫のイラスト"
				class="mx-auto mt-[4px] w-[82%]"
				loading="lazy"
			/>
		</section>
		<div class="chevron" aria-hidden="true"></div>

		<!-- ============== INTRO ============== -->
		<section class="glow-blush px-[8px] pt-[42px] pb-[90px] text-center">
			<h2 class="fs-26 leading-[36px]">
				そんな毎日に、<br />
				おうちでできる<b>ウェルネスケア</b>
			</h2>
			<p class="fs-16 mt-[26px] leading-[26px]">
				やさしい振動をからだに届ける、<br />
				1日5〜10分の新しいケア習慣。
			</p>
		</section>

		<!-- ============== HOW TO ============== -->
		<section
			class="bg-[linear-gradient(180deg,#EFF5FF_50%,#FFFFFF_96%)] px-4 pt-[24px] pb-[38px] text-center"
		>
			<h2 class="fs-26 font-bold leading-[36px]">使い方はとても簡単</h2>
			<span class="rule" aria-hidden="true"></span>
			<p class="fs-20 mt-[12px] leading-[26px]">
				ペットの気になる部分に、<br />
				優しく当てるだけ。<br />
				1日5〜10分が目安です。
			</p>

			<div class="mx-auto mt-[18px] w-[160px] overflow-hidden rounded-[8px] bg-navy/5">
				<div class="aspect-[9/16] w-full">
					<iframe
						src={`https://www.youtube.com/embed/${usageVideoId}`}
						title="振動器の使用例"
						class="h-full w-full"
						loading="lazy"
						referrerpolicy="strict-origin-when-cross-origin"
						allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				</div>
			</div>

			<h3 class="fs-26 mt-[40px] leading-[36px]">〜ご利用シーン〜</h3>
			<ul class="mx-auto mt-[8px] grid w-[89%] grid-cols-2 gap-x-[8px] gap-y-[7px]">
				{#each scenes as scene}
					<li
						class="fs-16 flex aspect-[148/136] items-center justify-center rounded-[20px] border border-navy bg-white px-[4px] leading-[26px]"
					>
						<span>{@html scene}</span>
					</li>
				{/each}
			</ul>
		</section>

		<!-- ============== RESEARCH ============== -->
		<section
			class="mx-[11px] rounded-[20px] border border-coral bg-blush px-[8px] pt-[44px] pb-[35px] text-center shadow-[0_4px_14px_rgba(0,0,0,0.16)]"
		>
			<h2 class="fs-26 font-bold leading-[36px]">
				毎日使うものだから、<br />
				安心して選べるものを。
			</h2>
			<span class="rule mt-[16px]" aria-hidden="true"></span>

			<img
				src={`${base}/images/research-oscilloscope.png`}
				alt="振動波形を表示するオシロスコープ"
				class="mx-auto mt-[26px] w-[69%]"
				loading="lazy"
			/>

			<div class="bracket fs-20 mx-auto mt-[32px] w-[85%] leading-[30px]">
				<b>名古屋大学</b>との共同研究
			</div>

			<p class="fs-16 mt-[14px] leading-[26px]">
				私たちは名古屋大学と共同で、<br />
				振動がペットにもたらす可能性について<br />
				研究を進めています。<br />
				研究では、特定のやさしい振動が、<br />
				人やペットの快適さにさまざまな変化をもたらす<br />
				ことが確認されています。
			</p>
		</section>

		<!-- ============== REVIEWS ============== -->
		<section class="pt-[80px]">
			<h2 class="fs-26 text-center leading-[36px]">お客様の声</h2>

			<div
				class="scrollbar-none mt-[18px] overflow-x-auto"
				style="scroll-snap-type: x mandatory; scroll-padding-left: 13%;"
			>
				<ul class="flex items-stretch gap-[12px] pl-[13%]">
					{#each reviews as review}
						<li class="w-[74%] flex-shrink-0" style="scroll-snap-align: start;">
							<figure class="flex h-full flex-col overflow-hidden rounded-[30px] bg-blush">
								{#if review.images.length > 1}
									<div class="grid aspect-square w-full grid-cols-2 gap-[2px]">
										{#each review.images as src}
											<img
												src={`${base}${src}`}
												alt={review.who}
												class="h-full w-full object-cover"
												loading="lazy"
											/>
										{/each}
									</div>
								{:else}
									<div class="aspect-square w-full">
										<img
											src={`${base}${review.images[0]}`}
											alt={review.who}
											class="h-full w-full object-cover"
											loading="lazy"
										/>
									</div>
								{/if}
								<div class="fs-16 px-[14px] pt-[10px] pb-[28px] text-left leading-[26px]">
									<p class="text-coral">{review.who}</p>
									<blockquote class="mt-[3px] whitespace-pre-line">
										{review.text}
									</blockquote>
								</div>
							</figure>
						</li>
					{/each}
					<li class="w-[6%] flex-shrink-0" aria-hidden="true"></li>
				</ul>
			</div>

			<div
				class="mt-[10px] mr-[22px] ml-auto w-[46px] text-center text-[14px] leading-[16px] tracking-normal"
				aria-hidden="true"
			>
				<svg
					width="46"
					height="10"
					viewBox="0 0 46 10"
					fill="none"
					stroke="#121A59"
					stroke-width="1.2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M0 5h44M39.5 1l4.5 4-4.5 4" />
				</svg>
				<span class="block">swipe</span>
			</div>
		</section>

		<!-- ============== CLOSING ============== -->
		<section class="glow-blush px-4 pt-[50px] pb-[98px] text-center">
			<p class="fs-16 leading-[26px]">
				大切なペットとの毎日に、<br />
				ウェルネスケアという選択を。<br />
				まずは気軽に1ヶ月から<br />
				始めてみませんか？
			</p>
		</section>

		<!-- ============== SET / PRICE ============== -->
		<section id="plans" class="scroll-mt-6 text-center">
			<h2 class="fs-26 font-bold leading-[36px]">セット内容</h2>

			<img
				src={`${base}/images/products/set-contents.png`}
				alt="セット内容：USB電源アダプター、USBケーブル、振動機本体、振動パッド、サラシ、振動機接続コード"
				class="mx-auto mt-[40px] w-[88%]"
				loading="lazy"
			/>

			<div
				class="mx-[6%] mt-[24px] rounded-[20px] border border-coral bg-white px-[12px] pt-[20px] pb-[10px] shadow-[0_4px_14px_rgba(0,0,0,0.16)]"
			>
				<div
					class="fs-16 flex items-baseline justify-center gap-x-[4px] whitespace-nowrap leading-[40px]"
				>
					<span>サブスクリプション</span>
					<span class="fs-40 leading-[40px] text-coral">{monthlyPrice}</span>
					<span>円/月</span>
				</div>
				<button
					type="button"
					class="fs-20 mt-[2px] block h-[32px] w-full rounded-[10px] bg-coral leading-[32px] tracking-normal text-white transition hover:brightness-105"
					on:click={openPlanModal}
				>
					まずは7日間、無料お試し
				</button>
				<hr class="mt-[13px] border-0 border-t border-navy" />
				<dl class="fs-16 mt-[4px] px-[10px] leading-[30px]">
					<div class="flex items-center justify-between">
						<dt>送料</dt>
						<dd class="text-coral">無料</dd>
					</div>
					<div class="flex items-center justify-between">
						<dt>解約</dt>
						<dd class="text-coral">いつでも可能</dd>
					</div>
				</dl>
			</div>

			<div class="mt-[31px]">
				<button type="button" class="cta-btn" on:click={openPlanModal}>
					まずは<span class="text-petal">7日間無料</span>お試し
				</button>
			</div>
		</section>

		<!-- ============== CANCEL PORTAL ============== -->
		<section class="mt-[72px] px-[24px]">
			<p class="text-center text-[13px] leading-[22px]">
				<a href="#cancel-portal" class="underline underline-offset-4 transition hover:text-coral">
					ご契約中の方の解約手続きはこちら
				</a>
			</p>

			<div
				id="cancel-portal"
				class="mt-[16px] scroll-mt-[72px] rounded-[20px] bg-mist px-[20px] py-[24px] text-left"
			>
				<div class="text-[12px] tracking-[0.08em] text-navy/70">ご契約中のお客さま</div>
				<h3 class="mt-[4px] text-[18px] leading-[28px]">{planCatalog.cancelPortal.title}</h3>
				<p class="mt-[8px] text-[13px] leading-[22px]">
					ご契約メールアドレスを入力すると、専用ページへ移動します。
				</p>

				<label class="mt-[16px] block text-[13px] leading-[22px]">
					ご契約メールアドレス
					<input
						type="email"
						bind:value={cancelMailAddress}
						placeholder="user@example.com"
						class="mt-[6px] w-full rounded-[10px] border border-navy/20 bg-white px-4 py-3 text-[14px] text-navy placeholder:text-navy/40 focus:border-navy focus:outline-none"
					/>
				</label>

				{#if cancelError}
					<p class="mt-[12px] text-[13px] leading-[20px] text-coral">{cancelError}</p>
				{/if}

				<button
					type="button"
					class="mt-[16px] w-full rounded-full border border-navy px-5 py-3 text-[14px] text-navy transition hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
					on:click={goToCancelPortal}
					disabled={isCancelLoading}
				>
					{#if isCancelLoading}
						解約ページを準備中...
					{:else}
						解約ページへ進む
					{/if}
				</button>
			</div>
		</section>

		<!-- ============== FOOTER ============== -->
		<footer class="mt-[40px] px-[24px] pt-[28px] text-center text-[12px] leading-[22px]">
			<div class="flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[4px]">
				<a href={`${base}/terms`} class="hover:underline">利用規約</a>
				<a href={`${base}/tokusho`} class="hover:underline">特定商取引法に基づく表記</a>
				<a href={`${base}/privacy`} class="hover:underline">プライバシーポリシー</a>
			</div>
			<p class="mt-[16px]">株式会社ファセテラピー</p>
			<p>〒150-0002 東京都渋谷区渋谷1丁目15-15-1010</p>
			<p class="mt-[8px] text-navy/70">お問い合わせはメールにて承っております。</p>
		</footer>
	</main>

	<!-- ヒーローのCTAが画面上に消えている間だけ出る固定ヘッダー（バナー全体が申込ボタン） -->
	{#if stickyCtaVisible}
		<button
			type="button"
			class="sticky-cta"
			transition:fly={{ y: -72, duration: stickyCtaDuration }}
			on:click={openPlanModal}
		>
			<span class="sticky-cta__label">まずは<em>7日間無料</em>お試し</span>
			<span class="sticky-cta__pill">お申込み</span>
		</button>
	{/if}
</div>

{#if showPlanModal}
	<PlanFlow {agencyCode} on:close={() => (showPlanModal = false)} />
{/if}

<style>
	/* 指示書のpxサイズ。375px未満の端末では画面幅に応じて縮める */
	.fs-16 {
		font-size: min(16px, 4.27vw);
	}
	.fs-20 {
		font-size: min(20px, 5.33vw);
	}
	.fs-26 {
		font-size: min(26px, 6.93vw);
	}
	.fs-32 {
		font-size: min(32px, 8.53vw);
	}
	.fs-40 {
		font-size: min(40px, 10.67vw);
	}

	/* ===== 固定ヘッダー（申込バナー） =====
	   LPカラム（max-width 480px）と同じ幅で上端に固定。申込モーダル（z-30）より下に置く。 */
	.sticky-cta {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		max-width: 480px;
		margin: 0 auto;
		padding: 10px 14px;
		padding-top: calc(10px + env(safe-area-inset-top, 0px));
		background-color: rgba(18, 26, 89, 0.96);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		color: #ffffff;
		font-family: inherit;
		box-shadow: 0 6px 20px rgba(18, 26, 89, 0.28);
		transition: opacity 0.2s ease;
	}
	.sticky-cta:hover {
		opacity: 0.94;
	}
	.sticky-cta__label {
		flex: 1 1 0;
		font-size: min(20px, 5.1vw);
		letter-spacing: 0.04em;
		white-space: nowrap;
		text-align: center;
	}
	.sticky-cta__label em {
		font-style: normal;
		color: #ffc4c4;
	}
	.sticky-cta__pill {
		flex: none;
		padding: 8px 14px;
		border-radius: 9999px;
		background-color: #ffc4c4;
		color: #121a59;
		font-size: 12px;
		letter-spacing: 0.08em;
		white-space: nowrap;
	}

	/* 主CTA：角丸ピル・紺地・白文字（「7日間無料」のみ淡ピンク） */
	.cta-btn {
		display: block;
		width: calc(100% - 20px);
		height: 72px;
		margin: 0 auto;
		border-radius: 9999px;
		background: #121a59;
		color: #ffffff;
		font-size: min(30px, 8vw);
		letter-spacing: 0.03em;
		white-space: nowrap;
		box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
		transition: filter 0.15s ease;
	}
	.cta-btn:hover {
		filter: brightness(1.12);
	}

	/* お悩みチェックリスト */
	.check-item {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.check-item::before {
		content: '';
		flex-shrink: 0;
		width: 16px;
		height: 16px;
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Crect x='1' y='1' width='14' height='14' rx='1' stroke='%23707070' stroke-width='1.6'/%3E%3Cpath d='M3.5 8.5l3 3L12.5 4.5' stroke='%23606060' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
			center / contain no-repeat;
	}

	/* お悩みセクション下の下向き矢印（グレー三角） */
	.chevron {
		height: 32px;
		margin-top: 8px;
		background: #f3f3f3;
		clip-path: polygon(0 0, 100% 0, 50% 100%);
	}

	/* 中央がほんのりピンクに光る背景 */
	.glow-blush {
		background: radial-gradient(
			ellipse 210px 160px at 50% 48%,
			#fff0f0 0%,
			#fff2f2 35%,
			#ffffff 100%
		);
	}

	/* 見出し下の短い罫線 */
	.rule {
		display: block;
		width: 40px;
		height: 1px;
		margin: 9px auto 0;
		background: #121a59;
	}

	/* 「名古屋大学との共同研究」の鉤括弧風コーナー */
	.bracket {
		position: relative;
		padding: 18px 24px;
	}
	.bracket::before,
	.bracket::after {
		content: '';
		position: absolute;
		width: 24px;
		height: 52px;
		border: 0 solid #121a59;
	}
	.bracket::before {
		left: 0;
		top: 0;
		border-left-width: 1px;
		border-top-width: 1px;
	}
	.bracket::after {
		right: 0;
		bottom: 0;
		border-right-width: 1px;
		border-bottom-width: 1px;
	}

	/* 横スクロールのスクロールバーを隠す */
	.scrollbar-none {
		scrollbar-width: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
