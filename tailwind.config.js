export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
				// LP指定書体：ヒラギノ明朝Pro（非Apple端末は Noto Serif JP にフォールバック）
				mincho: [
					'"Hiragino Mincho ProN"',
					'"Hiragino Mincho Pro"',
					'"Noto Serif JP"',
					'"Yu Mincho"',
					'YuMincho',
					'serif'
				]
			},
			colors: {
				basebg: '#EBEBE8', // 全体背景
				basegrad: '#FFFFFF', // グラデーション終点
				ink: '#5E5E5E', // 文字色
				relax: '#FF91C0', // 見出し・波線
				relaxbg: '#FFF1F7', // 「猫と一緒にリラックス」背景
				cta: '#FFDFED', // 購入ボタン
				// --- LP改訂版パレット ---
				navy: '#121A59', // 本文・見出し・ボタン
				coral: '#FF6C6E', // 価格・枠線・アクセント
				petal: '#FFC4C4', // CTA内の強調文字
				blush: '#FFF2F2', // ピンク背景
				sky: '#EFF5FF', // 水色背景
				mist: '#F3F3F3' // グレー背景
			},
			maxWidth: {
				phone: '480px' // 中央“スマホ幅”（任意で390/414等へ）
			}
		}
	},
	plugins: []
};
