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
		priceLabel: '月額 3,300円から',
		description:
			'ご自宅で続けやすい基本プランです。まずは本体レンタルから始めたい方向けのベーシックな契約内容です。',
		image: {
			src: '/images/products/one.png',
			alt: 'ベーシックプラン画像'
		},
		orderProduct: {
			productId: 'price_1TBxhcPo9yD7PttVVCoH9hlm',
			quantity: 1
		},
	},
	options: [
		{
			id: 'dog-cushion',
			name: '犬用クッション',
			price: 2200,
			priceLabel: '月額 2,200円',
			description: '振動機を中に入れて使用することができる犬用デザインのクッション。',
			image: {
				src: '/images/products/option_dog1.JPG',
				alt: '犬用クッション画像'
			},
			orderProduct: {
				productId: 'price_1TBxs1Po9yD7PttVq8G2eNys',
				quantity: 1
			}
		},
		{
			id: 'cat-cushion',
			name: '猫用クッション',
			price: 2200,
			priceLabel: '月額 2,200円',
			description: '振動機を中に入れて使用することができる猫用デザインのクッション。',
			image: {
				src: '/images/products/option_cat1.png',
				alt: '猫用クッション画像'
			},
			orderProduct: {
				productId: 'price_1TBxvHPo9yD7PttVil9kNnjG',
				quantity: 1
			}
		}
	]
} as const;

export const formatYen = (amount: number) =>
	new Intl.NumberFormat('ja-JP', {
		style: 'currency',
		currency: 'JPY',
		maximumFractionDigits: 0
	}).format(amount);

export const buildSubscriptionProducts = (selectedOptionIds: string[]): CheckoutProduct[] => {
	const products: CheckoutProduct[] = [planCatalog.basePlan.orderProduct];

	for (const option of planCatalog.options) {
		if (selectedOptionIds.includes(option.id)) {
			products.push(option.orderProduct);
		}
	}

	return products;
};
