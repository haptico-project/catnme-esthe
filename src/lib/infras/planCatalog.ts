export type CheckoutProduct = {
	productId: string;
	quantity: number;
};

export const planCatalog = {
	cancelPortal: {
		shopId: 'acct_1QhJkZPo9yD7PttV',
		title: '解約・お支払い情報の確認'
	},
	basePlan: {
		id: 'basic-plan',
		name: 'ベーシックプラン',
		price: 3300,
		priceLabel: '月額 3,300円',
		description:
			'ご自宅で続けやすい基本プランです。まずは本体レンタルから始めたい方向けのベーシックな契約内容です。',
		image: {
			src: '/images/products/one.png',
			alt: 'ベーシックプラン画像'
		},
		orderProduct: {
			productId: 'price_1TBxhcPo9yD7PttVVCoH9hlm',
			quantity: 1
		}
	}
} as const;

export const formatYen = (amount: number) =>
	new Intl.NumberFormat('ja-JP', {
		style: 'currency',
		currency: 'JPY',
		maximumFractionDigits: 0
	}).format(amount);

export const buildSubscriptionProducts = (): CheckoutProduct[] => [
	planCatalog.basePlan.orderProduct
];
