<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import CheckoutService from '$lib/infras/checkoutService';
	import { formatYen, planCatalog } from '$lib/infras/planCatalog';
	import PlanFlow from '$lib/infras/PlanFlow.svelte';

	let agencyCode = '';
	let cancelMailAddress = '';
	let isCancelLoading = false;
	let cancelError = '';
	let showPlanModal = false;

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		agencyCode = params.get('agency_code') ?? '2139';

		const mailAddress = params.get('mail_address');
		if (mailAddress) {
			cancelMailAddress = mailAddress;
		}
	});

	const scrollToPlans = () => {
		document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
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
</script>

<div class="w-full bg-basebg text-ink">
	<main class="mx-auto max-w-phone px-4 pb-20 pt-16">
		<header class="fixed left-0 right-0 top-0 z-20">
			<div class="border-b border-[#d4d2ce] bg-[rgba(246,246,244,0.9)] backdrop-blur">
				<div class="mx-auto max-w-phone px-4 py-4">
					<div class="flex items-center justify-between gap-3">
						<div>
							<p class="text-sm font-semibold tracking-[0.18em] text-[#584f42]">ペット介護.com</p>
						</div>
						<button
							type="button"
							on:click={scrollToPlans}
							class="inline-flex items-center justify-center rounded-full border border-[#d2d0cb] bg-[#f2f2f0] px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#2f2a24] transition hover:bg-[#e8e8e4]"
						>
							プランを見る
						</button>
					</div>
				</div>
			</div>
		</header>

		<section class="pt-6 text-center">
			<img src={`${base}/images/cat-main.png`} alt="ペット介護" class="mx-auto mb-8 rounded-2xl" />

			<h1 class="mb-4 text-3xl font-semibold tracking-[0.08em] text-[#2f2a24]">
				ペット介護が変わります
			</h1>

			<p class="mx-auto max-w-[26rem] text-sm leading-8 text-[#5b5447]">
				歩くのがゆっくりになった。階段を嫌がるようになった。夜にそわそわする時間が増えた。
				そんな変化を感じたときに、自宅で続けやすいケアの選択肢を整えました。
			</p>
		</section>

		<hr class="my-12 border-[#d8d2c9]" />

		<section class="py-2 text-center">
			<h2 class="mb-4 text-lg font-semibold text-[#2f2a24]">
				自然の音の微細振動※で、<br />
				からだをやわらげるケア
			</h2>

			<div class="my-6">
				<!-- svelte-ignore a11y-media-has-caption -->
				<video
					src={`${base}/videos/catme-esthe.mp4`}
					controls
					playsinline
					class="w-full rounded-xl"
				/>
			</div>

			<p class="mb-6 text-xs text-[#8a8174]">
				※スピーカーに触れると手に伝わる小さな“ふるえ”のこと
			</p>

			<p class="text-left text-sm leading-8 text-[#5b5447]">
				ペットの足腰のこわばり、緊張、不安、ぐったり感に寄り添い、からだと気持ちを整える新しいウェルビーイングケアです。
			</p>

			<div class="mt-8 grid gap-4 text-left">
				<div class="rounded-[22px] border border-[#d6d4cf] bg-[linear-gradient(180deg,#f7f7f5,#ecebe8)] p-4">
					<div class="mb-3 text-xs font-semibold tracking-[0.18em] text-[#8a6c57]">OPTION CUSHION</div>
					<div class="grid gap-4 md:grid-cols-2">
						<div class="overflow-hidden rounded-[16px] bg-black/5">
							<!-- svelte-ignore a11y-media-has-caption -->
							<video
								src={`${base}/videos/option_dog.mp4`}
								controls
								playsinline
								class="h-40 w-full object-cover"
							/>
						</div>
						<div class="overflow-hidden rounded-[16px] bg-black/5">
							<!-- svelte-ignore a11y-media-has-caption -->
							<video
								src={`${base}/videos/option_cat.MOV`}
								controls
								playsinline
								class="h-40 w-full object-cover"
							/>
						</div>
					</div>
					<p class="mt-3 text-xs leading-6 text-[#7b766d]">
						犬用・猫用クッションは各月額2,200円。12ヶ月のお支払い後はプレゼント、13ヶ月目以降の費用はかかりません。
					</p>
				</div>
			</div>
		</section>

		<hr class="my-12 border-[#d8d2c9]" />

		<section class="py-2 text-center">
			<img
				src={`${base}/images/products/one.png`}
				alt="やさしく当てるだけ"
				class="mx-auto mb-8"
			/>

			<h2 class="mb-4 text-xl font-semibold text-[#2f2a24]">やさしく当てるだけ</h2>

			<p class="text-sm leading-8 text-[#5b5447]">
				痛みも強い刺激もありません。気持ちよさそうにウトウトする、帰ってからよく眠るなどのお声も増えています。
			</p>
		</section>

		<hr class="my-12 border-[#d8d2c9]" />

		<section id="plans" class="scroll-mt-24 py-3">
			<div class="mb-8 text-center">
				<p class="text-xs font-semibold tracking-[0.24em] text-[#8a6c57]">PLANS</p>
				<h2 class="mt-3 text-2xl font-semibold text-[#2f2a24]">料金とお申込み内容</h2>
				<p class="mt-3 text-sm leading-7 text-[#5b5447]">
					ベーシックプランに、犬用・猫用クッションをオプション追加できます。
				</p>
			</div>

			<div class="rounded-[28px] border border-[#d6d4cf] bg-[linear-gradient(180deg,#f7f7f5,#ecebe8)] p-5 shadow-[0_18px_40px_rgba(70,70,70,0.08)] sm:p-6">
				<div class="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-center">
					<div class="overflow-hidden rounded-[20px] bg-[#ecebe7]">
						{#if planCatalog.basePlan.image.src}
							<img src={planCatalog.basePlan.image.src} alt={planCatalog.basePlan.image.alt} class="h-56 w-full bg-[#ecebe7] object-contain p-2" />
						{:else}
							<div class="flex h-56 items-center justify-center text-center text-[#7e7b74]">
								<div>
									<div class="text-xs tracking-[0.18em]">PLAN IMAGE</div>
									<div class="mt-2 text-sm">ベーシックプラン画像を追加</div>
								</div>
							</div>
						{/if}
					</div>

					<div>
						<div class="text-sm font-semibold text-[#6f6b64]">{planCatalog.basePlan.priceLabel}</div>
						<p class="mt-3 rounded-[12px] bg-[#f1f1ee] px-4 py-3 text-sm leading-7 text-[#5f5b54]">
							まずは本体レンタルを月額3,300円から。必要に応じた内容の選択は、お申し込み画面で確認できます。
						</p>

						<div class="mt-5 text-sm leading-7 text-[#5f5b54]">
							ご利用規約の確認後に、内容を選んでそのままお申し込みいただけます。
						</div>

						<button
							type="button"
							on:click={() => (showPlanModal = true)}
							class="mt-6 w-full rounded-full border border-[#d2d0cb] bg-[#f2f2f0] px-5 py-3 text-sm font-semibold text-[#2e1d24] transition hover:bg-[#e8e8e4]"
						>
							お申し込み
						</button>
					</div>
				</div>
			</div>
		</section>

		<hr class="my-12 border-[#d8d2c9]" />

		<section class="py-2">
			<h2 class="mb-4 text-center text-xl font-semibold text-[#2f2a24]">こんな子におすすめ</h2>

			<ul class="space-y-2 text-sm leading-7 text-[#5b5447]">
				<li>・シニア期のワンちゃん・ネコちゃん</li>
				<li>・足腰をかばう子</li>
				<li>・眠りが浅くなってきた子</li>
				<li>・震えやすい / 緊張しやすい子</li>
				<li>・介護の始まりを感じている子</li>
			</ul>
		</section>

		<hr class="my-12 border-[#d8d2c9]" />

		<section class="py-2 text-sm leading-8 text-[#5b5447]">
			<h2 class="mb-4 text-center text-xl font-semibold text-[#2f2a24]">
				“借りたい理由” が増えている背景
			</h2>

			<p class="mb-4">
				高齢ペットのケアは、何をしてあげたらいいのかわからないという声が多数です。
			</p>

			<p class="mb-4">
				とくに介護期は、動かさないことがかえって筋力・睡眠・気持ちの低下につながることもあります。
			</p>

			<p>自宅でできる、かんたん、続けやすい。その条件を満たしやすい形で整えています。</p>
		</section>

		<hr class="my-12 border-[#d8d2c9]" />

		<section class="py-2 text-center">
			<img
				src={`${base}/images/section-case/いっしょにヘッドスパ_ねこ.png`}
				alt="獣医コメント"
				class="mx-auto mb-6 rounded-xl"
			/>

			<p class="text-sm leading-8 text-[#5b5447]">
				「シニア期になると、筋肉・関節だけでなく睡眠とメンタルのケアも重要になります。無理に動かさず、やさしい刺激で血流や緊張を整える方法は、飼い主が自宅で実践できる点に価値があります」
			</p>

			<p class="mt-2 text-xs text-[#8a8174]">（動物病院 / 獣医師）</p>
		</section>

		<hr class="my-12 border-[#d8d2c9]" />

		<section class="py-2 text-sm leading-8 text-[#5b5447]">
			<h2 class="mb-4 text-center text-xl font-semibold text-[#2f2a24]">Q&amp;A</h2>

			<p class="mb-4">
				Q：何歳くらいから使うと良いですか？<br />
				A：7〜10歳頃を境に、変化が出はじめる子が多いです。
			</p>

			<p class="mb-4">
				Q：痛がったり怖がったりしませんか？<br />
				A：刺激や音ではなく小さなふるえなので、多くの子がリラックスします。
			</p>

			<p>
				Q：薬や通院と併用できますか？<br />
				A：併用できます。医療行為ではなく生活ケアです。
			</p>
		</section>

		<hr class="my-12 border-[#d8d2c9]" />

		<section class="py-4 text-center">
			<h2 class="mb-4 text-xl font-semibold text-[#2f2a24]">まずは試してみませんか？</h2>
			<p class="text-sm leading-7 text-[#5b5447]">
				ベーシックプランに必要なオプションを添えて、ご自宅で始められます。
			</p>
			<button
				type="button"
				on:click={() => (showPlanModal = true)}
				class="mt-6 inline-flex items-center justify-center rounded-full border border-[#d2d0cb] bg-[#f2f2f0] px-6 py-3 text-sm font-semibold tracking-[0.14em] text-[#2f2a24] transition hover:bg-[#e8e8e4]"
			>
				お申し込み
			</button>
		</section>

		<section class="mt-12 py-8">
			<p class="pb-4 text-center text-sm text-[#8a6c57]">
				<a href="#cancel-portal" class="underline underline-offset-4 transition hover:text-[#5e4b39]">
					ご契約中の方の解約手続きはこちら
				</a>
			</p>

			<div
				id="cancel-portal"
				class="mx-auto mt-4 max-w-[560px] rounded-[28px] border border-[#d4d2ce] bg-[#f3f2ef] px-5 py-7 text-left shadow-[0_16px_36px_rgba(70,70,70,0.08)]"
			>
				<div class="text-[13px] tracking-[0.08em] text-[#8a6c57]">ご契約中のお客さま</div>
				<h3 class="mt-1 text-lg font-semibold text-[#2f2a24]">{planCatalog.cancelPortal.title}</h3>
				<p class="mt-2 text-sm leading-7 text-[#5b5447]">
					ご契約メールアドレスを入力すると、専用ページへ移動します。
				</p>

				<label class="mt-4 block text-sm text-[#2f2a24]">
					ご契約メールアドレス
					<input
						type="email"
						bind:value={cancelMailAddress}
						placeholder="user@example.com"
						class="mt-2 w-full rounded-xl border border-[#d4d2ce] bg-white px-4 py-3 text-sm text-[#3d352d] placeholder:text-[#aaa69f] focus:border-[#8f8a80] focus:outline-none focus:ring-2 focus:ring-[#dddbd4]"
					/>
				</label>

				{#if cancelError}
					<p class="mt-3 text-sm text-[#b23c2e]">{cancelError}</p>
				{/if}

				<div class="mt-4">
					<button
						class="w-full rounded-full border border-[#d2d0cb] bg-[#f2f2f0] px-5 py-3 text-sm font-semibold tracking-[0.14em] text-[#2e1d24] transition hover:bg-[#e8e8e4] disabled:cursor-not-allowed disabled:opacity-60"
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
			</div>
		</section>

		<footer class="text-sm text-[#6f665a]">
			<div class="mt-8 rounded-3xl border border-[#d8d0c3] bg-white/80 px-6 py-12">
				<div class="mb-6 flex flex-wrap items-center justify-center gap-5 text-sm">
					<a href={`${base}/terms`} class="hover:underline">利用規約</a>
					<a href={`${base}/tokusho`} class="hover:underline">特定商取引法に基づく表記</a>
					<a href={`${base}/privacy`} class="hover:underline">プライバシーポリシー</a>
				</div>
				<p class="text-center font-semibold text-[#4d4334]">株式会社ファセテラピー</p>
				<p class="text-center">〒150-0002 東京都渋谷区渋谷1丁目15-15-1010</p>
				<p class="mt-4 text-center text-xs text-[#8a8174]">
					お問い合わせはメールにて承っております。
				</p>
			</div>
		</footer>
	</main>
</div>

{#if showPlanModal}
	<PlanFlow {agencyCode} on:close={() => (showPlanModal = false)} />
{/if}
