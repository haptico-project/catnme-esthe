<script>
	import { base } from '$app/paths';

	export const prerender = true;
</script>

<div class="w-full bg-basebg text-ink">
	<main class="mx-auto max-w-phone px-4 pb-20 pt-10">
		<header class="mb-8">
			<a href={`${base}/`} class="text-sm text-gray-600 hover:underline">トップへ戻る</a>
			<h1 class="text-2xl font-semibold mt-4">特定商取引法に基づく表記</h1>
		</header>

		<section class="text-sm leading-relaxed">
			<p class="mb-4">
				販売業者：株式会社ファセテラピー
			</p>
			<p class="mb-4">
				運営責任者：鈴木理絵子
			</p>
			<p class="mb-4">
				所在地：〒150-0002 東京都渋谷区渋谷1丁目15-15-1010
			</p>
			<p class="mb-4">
				お問い合わせ先：メール 5555rieko@gmail.com<br />
				※お問い合わせはメールにて承っております。
			</p>
			<p class="mb-4">
				販売価格：各商品ページに記載の料金をご確認ください。
			</p>
			<p class="mb-4">
				商品代金以外の必要料金：消費税／振込手数料（銀行振込の場合）※銀行振り込みは基本的に承っておりません。／送料（返却・交換時の送料はユーザー負担）
			</p>
			<p class="mb-4">
				お支払い方法：クレジットカード決済（Stripe を利用）
			</p>
			<p class="mb-4">
				お支払い時期：初回申込時に決済が行われ、その後毎月自動決済となります。
			</p>
			<p class="mb-4">
				商品の引き渡し時期：お申し込み後、3〜7営業日以内に発送いたします。※在庫状況・配送地域により前後する場合があります。
			</p>
			<p class="mb-4">
				返品・交換について：レンタル商品の性質上、原則としてお客様都合の返品・交換はお受けできません。<br />
				ただし、初期不良があった場合は、商品到着後7日以内にご連絡ください。当社負担で交換対応を行います。
			</p>
			<p class="mb-4">
				中途解約について：解約をご希望の場合、当社が定める方法にて解約申請を行ってください。レンタル機器の返却を当社で確認できるまでは契約は継続し、月額料金が発生します。
			</p>
			<p>
				表現および商品に関する注意書き：本サービスで提供する美容機器・ケア効果には個人差があります。効果を保証するものではありません。
			</p>
		</section>

		<footer class="text-sm text-gray-600 mt-16">
			<div class="bg-white/70 border border-gray-200 rounded-3xl px-6 py-12">
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
