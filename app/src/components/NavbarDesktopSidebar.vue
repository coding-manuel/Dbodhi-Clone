<template>
	<div
		class="sidebar-container"
		v-bind:class="{ openSidebar: this.sidebarIsOpen }"
	>
		<div class="sidebar-elements">
			<div
				class="sidebar-content"
				v-for="item in items"
				:key="item"
				v-bind:class="{ animating: this.sidebarProps.startAnim }"
			>
				<p @click="openPage(item[0])" class="txt-hvr">
					{{ item[0] }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import store from "../store/index";
export default {
	props: {
		sidebarProps: Object,
	},
	methods: {
		openPage(clicked) {
			this.$emit("closeSidebar");
			store.commit("setCategory", clicked);
			store.dispatch("FILTER_PRODUCTS");
			this.$router.push({
				name: "AllProducts",
			});
		},
	},
	data() {
		return {
			navbarDesktopProps: this.$store.getters.navmenu,
		};
	},
	computed: {
		sidebarIsOpen() {
			return store.getters.sidebarIsOpen;
		},
		items() {
			return this.navbarDesktopProps[this.sidebarProps.currentTab];
		},
	},
};
</script>

<style lang="sass">
.sidebar-container
	position: fixed
	left: 0
	top: 0
	z-index: 9
	height: 100vh
	width: 35vw
	background: var(--dark-text)
	transform: translateX(-100%)
	transition: 0.6s cubic-bezier(0.22,0.85,0.5,0.97) .2s

.sidebar-container.openSidebar
	transform: translateX(0%)

.sidebar-content
	cursor: pointer
	margin: .2rem
	opacity: 0
	color: var(--light-text)
	font-size: clamp(20px, 2rem, 40px)
	text-decoration: none

	&.animating
		animation: liststag .2s cubic-bezier(0.76, 0, 0.24, 1) both

	@for $i from 1 through 50
		&:nth-child(#{$i})
			animation-delay: .4s + .07s * $i
	p
		margin: 0
		display: inline-block

@keyframes liststag
	0%
		opacity: 0
	100%
		opacity: 1

.sidebar-elements
	display: flex
	flex-direction: column
	align-content: center
	justify-content: space-between
	list-style: none
	padding: 8rem 0rem 0rem 2rem
	margin: 0
	font-family: var(--font-light)

	.txt-hvr::before
		background-color: var(--light-text)
		height: 2px
</style>
