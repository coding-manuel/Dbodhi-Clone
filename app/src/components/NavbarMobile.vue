<template>
	<div class="navbar-mobile">
		<div class="navbar-container" :class="{ changeColor: showColorChange }">
			<ul class="navbar">
				<li class="nav-tab-logo">
					<router-link :to="{ name: 'Home' }">
						<AppLogo />
					</router-link>
				</li>
				<li class="nav-tab-left">
					<div id="ham" class="resp" @click="sidebarOpen('menu')">
						<i class="fas fa-bars"></i>
					</div>
				</li>
				<li class="nav-tab-right" :class="{ hidden: !showCart }">
					<div id="ham" class="resp" @click="cartOpen()">
						<div class="nav-content-right">
							<i class="fas fa-shopping-cart"></i>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<NavbarMobileSidebar
			v-bind:sidebarProps="sidebarProps"
			@openSide="sidebarOpen"
			@closeSide="sidebarClose"
			@openNext="sidebarNext"
			@openPage="sidebarClose"
		/>
		<NavbarMobileCart @closeCart="cartClose" />
	</div>
</template>

<script>
import store from "../store/index";
import NavbarMobileSidebar from "./NavbarMobileSidebar";
import NavbarMobileCart from "./NavbarMobileCart";
import AppLogo from "./AppLogo";
export default {
	props: {
		scrollChange: Boolean,
	},
	components: {
		NavbarMobileSidebar,
		NavbarMobileCart,
		AppLogo,
	},
	methods: {
		sidebarOpen(x) {
			this.sidebarProps.currentTab = x;
			store.commit("sidebarToggle", true);
			this.sidebarProps.startAnim = true;
		},
		sidebarNext(x) {
			this.sidebarProps.currentTab = x;
			this.sidebarProps.startAnim = true;
		},
		sidebarClose() {
			store.commit("sidebarToggle", false);
		},
		onScroll() {
			if (this.scrollChange) {
				const currentScrollPosition =
					window.pageYOffset || document.documentElement.scrollTop;
				if (currentScrollPosition <= 0) {
					store.commit("colorChange", false);
					return;
				}
				store.commit("colorChange", true);
				this.lastScrollPosition = currentScrollPosition;
			} else {
				store.commit("colorChange", true);
			}
		},
		cartOpen() {
			store.commit("cartToggle");
		},
		cartClose() {
			store.commit("cartToggle");
		},
	},
	data() {
		return {
			navbarMobileProps: store.getters.navmenu,
			sidebarProps: {
				currentTab: "menu",
				startAnim: false,
			},
			lastScrollPosition: 0,
			showCart: true,
		};
	},
	computed: {
		sidebarIsOpen() {
			return store.getters.sidebarIsOpen;
		},
		cartIsOpen() {
			return store.getters.cartIsOpen;
		},
		showColorChange() {
			return store.getters.showColorChange;
		},
		items() {
			return this.navList[this.currentTab];
		},
	},
	watch: {
		scrollChange: function (val) {
			this.onScroll();
		},
	},
	mounted() {
		this.onScroll();
		window.addEventListener("scroll", this.onScroll);
	},
	beforeUnmount() {
		window.removeEventListener("scroll", this.onScroll);
	},
};
</script>

<style lang="sass">
.navbar-mobile
	.blacktint
		position: fixed
		top: 0
		left: 0
		right: 0
		width: 100vw
		height: 100vh
		background-color: rgba(0, 0, 0, 0.5)
		z-index: 8
		opacity: 0
		transition: .75s ease

	.navbar-container
		font-family: var(--font-light)
		--nav-text: #222222
		position: fixed
		top: 0
		width: 100vw
		max-width: 100%
		z-index: 10
		color: var(--nav-text)
		background: transparent
		transform: translate3d(0, 0, 0)
		transition: .3s ease, color 0s

	.navbar-container.hidden
		transform: translate3d(0, -100%, 0)

	.navbar-container.changeColor
		background: #ffffff
		border-bottom: 1px solid var(--dark-text)

	.navbar
		display: flex
		align-content: center
		justify-content: space-between
		list-style: none
		padding: 4rem 0rem
		margin: 0

	.nav-content-left
		text-decoration: none
		margin: 0rem 1rem
		font-size: clamp(10px, 1rem, 25px)
		font-weight: 400
		cursor: pointer

	a
		text-decoration: none
		margin: 0rem 1rem
		font-size: clamp(15px, 1rem, 25px)
		font-weight: 400
		cursor: pointer

	i
		color: var(--dark-text)
		cursor: pointer
		margin: 0rem 1rem
		font-size: clamp(30px, 1.2rem, 50px)

	.nav-tab-logo
		flex-grow: 2
		order: 2
		display: flex
		justify-content: center
		cursor: pointer

	.logo
		width: max(7vw, 120px)
		margin-bottom: .5rem
		fill: var(--nav-text)

	.nav-tab-left
		padding: 0
		flex-grow: 1
		display: flex
		align-items: center
		order: 1
		justify-content: center

	.nav-tab-right
		flex-grow: 1
		display: flex
		align-items: center
		order: 3
		justify-content: center
		opacity: 1
		transition: .3s ease

	.nav-tab-right.hidden
		opacity: 0
</style>
