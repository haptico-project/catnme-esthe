<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CheckoutService from '$lib/infras/checkoutService';
	import { buildSubscriptionProducts, formatYen, planCatalog } from '$lib/infras/planCatalog';

	export let agencyCode = '2139';

	const dispatch = createEventDispatcher();
	const plan = planCatalog.basePlan;

	let step = 1;
	let agreed = false;
	let isProcessing = false;
	let checkoutError = '';
	let selectedOptionIds: string[] = [];

	const close = () => dispatch('close');
	const next = () => {
		if (step === 1 && !agreed) return;
		step += 1;
	};
	const back = () => {
		if (step > 1) step -= 1;
	};

	const toggleOption = (optionId: string) => {
		selectedOptionIds = selectedOptionIds.includes(optionId)
			? selectedOptionIds.filter((id) => id !== optionId)
			: [...selectedOptionIds, optionId];
	};

	const selectedOptions = () =>
		planCatalog.options.filter((option) => selectedOptionIds.includes(option.id));
	const totalMonthly = () =>
		plan.price + selectedOptions().reduce((sum, option) => sum + option.price, 0);
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

	const goToCheckout = async () => {
		if (isProcessing) return;

		const orderProducts = buildSubscriptionProducts(selectedOptionIds);
		if (orderProducts.some((product) => !product.productId || product.productId.includes('REPLACE'))) {
			checkoutError =
				'Price ID が未設定です。`src/lib/infras/planCatalog.ts` に本番用の ID を入力してください。';
			return;
		}

		isProcessing = true;
		checkoutError = '';

		try {
			const response = await CheckoutService.checkouForPaymanage(orderProducts, agencyCode, true);
			const payload = extractPayload(response) as any;
			const url =
				(typeof payload === 'string' ? payload : null) ??
				payload?.checkoutUrl ??
				payload?.paymentUrl ??
				payload?.url ??
				payload?.data?.checkoutUrl ??
				payload?.data?.paymentUrl ??
				payload?.data?.url;

			if (isHttpUrl(url)) {
				window.location.href = url;
				return;
			}

			checkoutError =
				'チェックアウトURLを取得できませんでした。開発環境では `.env.development` の設定も確認してください。';
		} catch (error) {
			console.error('checkout failed', error);
			checkoutError = '決済処理中にエラーが発生しました。';
		} finally {
			isProcessing = false;
		}
	};
</script>

<div
	class="fixed inset-0 z-30 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(239,231,218,0.42),rgba(19,12,18,0.86))] p-2 backdrop-blur-sm sm:p-4"
	style="font-family:'Hiragino Mincho Pro', serif;"
>
	<div class="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[22px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,249,245,0.95))] p-3 shadow-[0_28px_80px_rgba(38,16,31,0.24)] sm:max-h-[90vh] sm:w-[96%] sm:rounded-[28px] sm:border-white/40 sm:p-6 lg:w-[94%] lg:p-8">
		<button
			class="absolute right-4 top-4 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-sm text-gray-600 transition hover:bg-white"
			on:click={close}
		>
			閉じる
		</button>

		<div class="mb-6 border-b border-[#e4d9c8] pb-4">
			<h2 class="mt-2 text-2xl text-[#2e1d24]">お申し込み</h2>
		</div>

		{#if step === 1}
			<h3 class="mb-3 text-lg font-bold text-[#2e1d24]">ご利用規約の確認</h3>
			<div class="h-56 overflow-y-auto rounded-[20px] border border-[#e4d9c8] bg-white/80 p-4 text-sm leading-7 text-[#5f4b53]">
				<p>
					「ペット介護.com」レンタル利用規約<br />
					<br />
					本利用規約は、株式会社ファセテラピーが提供するペット向けケア機器レンタルサービスの利用条件を定めるものです。お客様は本規約に同意のうえ、本サービスを利用するものとします。<br />
					<br />
					第1条（本サービスの内容）<br />
					1. 本サービスは、お客様が当社指定のケア機器を月額利用料を支払うことにより一定期間レンタルできるサービスです。<br />
					2. ベーシックプランの月額利用料は1台あたり3,300円（税込）とし、犬用クッションまたは猫用クッションは各2,200円（税込）の追加オプションとして申し込めます。<br />
					<br />
					第2条（契約の成立および支払い方法）<br />
					1. お客様が当社指定の申込手続を完了し、当社が承諾した時点で契約が成立します。<br />
					2. 利用料はクレジットカードによる自動決済とし、当社指定の決済代行サービスを利用します。<br />
					3. クレジットカード決済が不成立となった場合、当社は再請求またはサービス停止等の対応を行うことがあります。<br />
					<br />
					第3条（機器の引渡しおよび管理）<br />
					1. 当社は申込後、指定住所へ機器を発送します。<br />
					2. お客様は、受領後速やかに状態を確認し、初期不良がある場合には7日以内に当社へ連絡するものとします。<br />
					3. お客様は善良なる管理者の注意をもって機器を使用・保管し、第三者への譲渡、転貸、改造、分解をしてはなりません。<br />
					<br />
					第4条（解約および返却義務）<br />
					1. 解約を希望する場合、当社指定の方法で解約申請を行うものとします。<br />
					2. 解約申請後も、当社が機器の返却を確認するまでは契約が継続し、月額利用料の請求は継続します。<br />
					3. 返却にかかる送料はお客様負担とします。<br />
					<br />
					第5条（故障・破損・紛失）<br />
					1. 故障や破損が発生した場合、お客様は速やかに当社へ連絡するものとします。<br />
					2. 通常使用による自然故障と当社が判断した場合は、当社負担で修理または交換を行います。<br />
					3. お客様の過失による破損、紛失、改造等が認められる場合、修理費または相当額を請求することがあります。<br />
					<br />
					第6条（禁止事項）<br />
					1. 不正利用目的での契約、虚偽情報による申込、第三者への転売・譲渡を禁止します。<br />
					2. 本サービスまたは他の利用者へ不利益を与える行為を禁止します。<br />
					<br />
					第7条（免責事項）<br />
					1. 機器の使用により生じた結果には個体差があり、当社は特定の効果を保証するものではありません。<br />
					2. 当社の故意または重過失を除き、本サービスの利用に関連して生じた損害について責任を負いません。<br />
					<br />
					付則<br />
					本規約は2026年3月17日より適用します。<br />
				</p>
			</div>
			<div class="mt-5 flex items-center rounded-2xl bg-[#f8f4ec] px-4 py-3">
				<input id="agree" type="checkbox" bind:checked={agreed} class="mr-3 h-4 w-4 accent-[#8a6c57]" />
				<label for="agree" class="text-sm text-[#5f4b53]">利用規約に同意してプラン選択へ進みます</label>
			</div>
			<div class="mt-6 flex justify-end">
				<button
					class="rounded-full border border-[#d8cdbb] bg-[#f8f4ec] px-6 py-3 text-sm text-[#2e1d24] transition hover:bg-[#efe6d9] disabled:opacity-40"
					on:click={next}
					disabled={!agreed}
				>
					プラン選択へ進む
				</button>
			</div>
		{:else if step === 2}
			<div class="mb-4 overflow-hidden bg-transparent sm:mb-6">
				<div class="rounded-[18px] border border-[#e4d9c8]/70 bg-[#f7f3ed] p-4 sm:rounded-[20px] sm:p-5">
					<p class="mt-2 text-sm leading-6 text-[#5f4b53]">
						内容をご確認のうえ、必要に応じて犬用・猫用クッションを追加できます。
					</p>
				</div>
				<div class="bg-transparent p-0 pt-4">
					<div class="grid gap-3 md:gap-4">
						<div class="rounded-[18px] border border-[#e4d9c8]/70 bg-white/92 p-3 shadow-[0_8px_20px_rgba(77,63,39,0.04)] sm:rounded-[20px] sm:p-4 md:shadow-none">
							<div class="overflow-hidden rounded-[16px] bg-[#f3ede3] sm:rounded-[20px]">
								{#if plan.image.src}
									<img src={plan.image.src} alt={plan.image.alt} class="h-40 w-full bg-[#f3ede3] object-contain p-2 sm:h-48 md:h-40 lg:h-48" />
								{:else}
									<div class="flex h-40 w-full items-center justify-center bg-[#f3ede3] text-center text-[#867c6c] sm:h-48 md:h-40 lg:h-48">
										<div>
											<div class="text-xs tracking-[0.18em]">PLAN IMAGE</div>
											<div class="mt-2 text-sm">ベーシックプラン画像を追加</div>
										</div>
									</div>
								{/if}
							</div>

							<div class="pb-2">
								<div class="mt-3 text-sm font-semibold text-[#8a6c57] sm:mt-4">{plan.priceLabel}</div>
							</div>

							<div class="mt-3">
								<p class="rounded-[12px] bg-[#faf3e8] px-3 py-2 text-sm leading-6 text-[#65584c]">
									本体セットのみで気軽にスタート
								</p>

								<p class="mt-3 text-sm leading-6 text-[#5f4b53]">{plan.description}</p>
							</div>

							<div class="mt-4 space-y-3">
								<div class="border-t border-[#e8dece]/70 pt-3">
									<div class="text-xs text-[#8d6f79]">追加オプション</div>
									<div class="mt-2 space-y-2">
										{#each planCatalog.options as option}
											<label class="flex cursor-pointer items-start gap-2.5 rounded-[10px] bg-[#fbf8f2] p-2.5 transition hover:bg-[#f1ebe2]">
												<input
													type="checkbox"
													class="mt-1 h-4 w-4 accent-[#8a6c57]"
													checked={selectedOptionIds.includes(option.id)}
													on:change={() => toggleOption(option.id)}
												/>
												<div class="h-14 w-14 shrink-0 overflow-hidden rounded-[12px] bg-[#f3ede3]">
													{#if option.image.src}
														<img src={option.image.src} alt={option.image.alt} class="h-full w-full object-cover" />
													{:else}
														<div class="flex h-full w-full items-center justify-center text-center text-[10px] leading-4 text-[#867c6c]">
															画像枠
														</div>
													{/if}
												</div>
												<div class="flex-1">
													<div class="mt-1 text-sm font-semibold text-[#2e1d24]">{option.name}</div>
													<p class="mt-1 text-xs leading-5 text-[#65515a]">{option.description}</p>
													<div class="mt-1 text-sm text-[#8a6c57]">{option.priceLabel}</div>
												</div>
											</label>
										{/each}
									</div>
								</div>
							</div>

							<button class="mt-4 w-full rounded-full border border-[#d8cdbb] bg-[#f8f4ec] px-4 py-2.5 text-sm text-[#2e1d24] transition hover:bg-[#efe6d9]" on:click={next}>
								このプランで申し込む
							</button>
						</div>
					</div>
				</div>
			</div>
		{:else}
			{@const appliedOptions = selectedOptions()}
			<div class="grid gap-4 md:grid-cols-[1.05fr_0.95fr] sm:gap-5">
				<div class="overflow-hidden rounded-[20px] border border-[#e4d9c8]/70 bg-white shadow-[0_12px_28px_rgba(77,63,39,0.06)] sm:rounded-[28px] sm:border-[#e4d9c8] sm:shadow-[0_18px_40px_rgba(77,63,39,0.08)]">
					<div class="overflow-hidden rounded-t-[20px] bg-[#f3ede3] sm:rounded-t-[28px]">
						{#if plan.image.src}
							<img src={plan.image.src} class="h-52 w-full bg-[#f3ede3] object-contain p-2" alt={plan.image.alt} />
						{:else}
							<div class="flex h-52 w-full items-center justify-center text-center text-[#867c6c]">
								<div>
									<div class="text-xs tracking-[0.18em]">PLAN IMAGE</div>
									<div class="mt-2 text-sm">ベーシックプラン画像を追加</div>
								</div>
							</div>
						{/if}
					</div>

					<div class="space-y-4 p-3 sm:space-y-5 sm:p-5">
						<div>
							<h3 class="text-xl text-[#2e1d24] sm:text-2xl">{plan.name}</h3>
							<p class="mt-2 text-sm leading-7 text-[#5f4b53]">{plan.description}</p>
						</div>

						{#if appliedOptions.length > 0}
							<div>
								<div class="text-xs text-[#8d6f79]">追加オプション</div>
								<div class="mt-3 space-y-3">
									{#each appliedOptions as option}
										<div class="rounded-[14px] bg-[#faf3e8] p-3 sm:rounded-[18px] sm:p-4">
											<div class="flex items-center justify-between gap-3">
												<div>
													<div class="text-sm font-semibold text-[#2e1d24]">{option.name}</div>
													<div class="mt-1 text-xs leading-6 text-[#65515a]">{option.description}</div>
												</div>
												<div class="shrink-0 text-sm text-[#8a6c57]">{option.priceLabel}</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>

				<div class="rounded-[20px] border border-[#e4d9c8]/70 bg-[linear-gradient(180deg,#fffdfb,#f8f4ec)] p-3 shadow-[0_12px_28px_rgba(77,63,39,0.06)] sm:rounded-[28px] sm:border-[#e4d9c8] sm:p-5 sm:shadow-[0_18px_40px_rgba(77,63,39,0.08)]">
					<h3 class="mt-2 text-xl text-[#2e1d24] sm:text-2xl">ご注文内容の確認</h3>

					<div class="mt-4 flex flex-col gap-3">
						<button class="w-full rounded-full border border-[#d8cdbb] bg-[#f8f4ec] px-5 py-3 text-sm text-[#2e1d24] transition hover:bg-[#efe6d9] disabled:opacity-50" on:click={goToCheckout} disabled={isProcessing}>
							{isProcessing ? '処理中...' : '決済に進む'}
						</button>
						<button class="w-full rounded-full border border-[#d8cdbb] px-5 py-3 text-sm text-[#5f4b53] bg-white/80 transition hover:bg-[#f8f4ec]" on:click={back} disabled={isProcessing}>
							プラン選択に戻る
						</button>
					</div>

					<div class="mt-4 rounded-[18px] border border-[#d8cdbb] bg-[#efe8dc] p-4 text-[#2e1d24] sm:mt-5 sm:rounded-[22px] sm:p-5">
						<div class="text-sm text-[#776959]">毎月のお支払い</div>
						<div class="mt-2 text-4xl">{formatYen(totalMonthly())}</div>
						<div class="mt-3 text-sm text-[#776959]">翌月以降も同額 / 月</div>
					</div>

					<div class="mt-4 space-y-3 text-sm text-[#4d3b43] sm:mt-5 sm:space-y-4">
						<div class="rounded-[14px] bg-white/80 p-3 sm:rounded-[18px] sm:p-4">
							<div class="flex items-center justify-between">
								<span>選択プラン</span>
								<span>{plan.priceLabel}</span>
							</div>
							<div class="mt-2 text-xs leading-6 text-[#7a626c]">{plan.name}</div>
						</div>

						{#if appliedOptions.length > 0}
							<div class="rounded-[14px] bg-white/80 p-3 sm:rounded-[18px] sm:p-4">
								<div class="mb-2">追加オプション</div>
								{#each appliedOptions as option}
									<div class="flex items-center justify-between py-1 text-xs text-[#6f5861]">
										<span>{option.name}</span>
										<span>{formatYen(option.price)}</span>
									</div>
								{/each}
							</div>
						{/if}

								<div class="rounded-[14px] border border-dashed border-[#d8cdbb] p-3 text-xs leading-6 text-[#7a626c] sm:rounded-[18px] sm:p-4">
							ベーシックプランは月額3,300円です。犬用クッション、猫用クッションは各月額2,200円で追加できます。
						</div>

						{#if checkoutError}
							<p class="text-sm text-[#c22f61]">{checkoutError}</p>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
