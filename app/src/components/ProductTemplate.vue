<template>
	<div class="product">
		<div class="thumbnail">
			<img
				loading="lazy"
				class="img2"
				:src="this.productInfo.images[1]"
				alt=""
			/>
			<img
				loading="lazy"
				class="img1"
				:src="this.productInfo.images[0]"
				alt=""
			/>
		</div>
		<div class="info">
			<p class="title">{{ this.productInfo.title }}</p>
			<p class="price">€{{ this.productInfo.price }}</p>
		</div>
		<div class="new-tag" v-if="this.productInfo.new">NEW</div>
	</div>
</template>
<script>
export default {
	props: {
		productInfo: Object,
	},
};
</script>
<style lang="sass">
.new-tag
	position: absolute
	top: 1rem
	right: 1rem
	padding: .2rem.5rem
	font-size: .7rem
	background-color: var(--light-text)
	color: var(--grey-text)
.product
	position: relative
	grid-row: span 1
	grid-column: span 1
	overflow: hidden
	cursor: pointer

	&:hover
		img
			transform: translateX(0%)

	.thumbnail
		display: flex

	img
		height: 100%
		width: 100%
		object-fit: cover
		object-position: center center
		transform: translateX(-101%)
		transition: .7s cubic-bezier(0.22,0.85,0.5,0.97)
		background-color: #E5DDD6

	.info
		display: flex
		flex-direction: column

		p
			padding: .8rem 0
			margin: 0
		.price
			color: var(--grey-text)
			padding: 0
			font-size: 0.8rem

@media only screen and (max-width: 768px)
	.product
		.info
			p
				font-size: 2.5rem
			.price
				font-size: 2rem
		.new-tag
			top: 1.5rem
			right: 2rem
			font-size: 2rem
</style>
