<script lang="ts">
	export let src: string;
	export let alt: string = "";
	export let x: number = 0; // X座標(pxまたは%)
	export let y: number = 0; // Y座標(pxまたは%)
	export let unit: "px" | "%" = "%"; // 単位を切り替えたい場合
	export let width: string = "auto";
	export let height: string = "auto";
</script>

<div class="relative w-full h-full">
	<img
		src={src}
		alt={alt}
		class="absolute"
		style={`left:${x}${unit}; top:${y}${unit}; width:${width}; height:${height};`}
	/>
</div>
