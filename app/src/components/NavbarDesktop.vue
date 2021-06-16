<template>
	<div class="navbar-desktop">
		<div
			class="navbar-container"
			:class="{
				hidden: !showNavbar,
				changeColor: showColorChange,
			}"
		>
			<ul class="navbar">
				<li class="nav-tab-logo">
					<router-link :to="{ name: 'Home' }">
						<AppLogo />
					</router-link>
				</li>
				<li class="nav-tab-left">
					<div
						class="nav-content-left txt-hvr"
						id="shop"
						@click="sidebarOpen('shop')"
					>
						Shop
					</div>
					<div
						class="nav-content-left txt-hvr"
						id="collections"
						@click="sidebarOpen('collections')"
					>
						Collections
					</div>
					<div
						class="nav-content-left txt-hvr"
						id="craftsmanship"
						@click="sidebarOpen('craftsmanship')"
					>
						Craftsmanship
					</div>
					<div
						class="nav-content-left txt-hvr"
						id="service"
						@click="sidebarOpen('service')"
					>
						Service
					</div>
					<div class="nav-content-left txt-hvr">Stores</div>
				</li>
				<li class="nav-tab-right" :class="{ hidden: !showCart }">
					<div class="nav-content-right"><span>Login</span></div>
					<div class="nav-content-right">
						<router-link :to="{ name: 'Search' }">
							<i class="fas fa-search"></i>
						</router-link>
					</div>
					<div class="nav-content-right" @click="cartOpen()">
						<i class="fas fa-shopping-cart"></i>
					</div>
				</li>
			</ul>
		</div>
		<NavbarDesktopSidebar
			v-bind:sidebarProps="sidebarProps"
			@closeSidebar="sidebarClose()"
		/>
		<NavabarDesktopCart @closeCart="cartClose" />
		<div
			class="blacktint"
			id="blacktint"
			@click="blacktintClose()"
			v-bind:class="{
				openSidebar: this.sidebarIsOpen || this.cartIsOpen,
			}"
		></div>
	</div>
</template>

<script>
import store from "../store/index";
import NavbarDesktopSidebar from "./NavbarDesktopSidebar";
import NavabarDesktopCart from "./NavbarDesktopCart";
import AppLogo from "./AppLogo";
export default {
	props: {
		scrollChange: Boolean,
	},
	components: {
		NavbarDesktopSidebar,
		NavabarDesktopCart,
		AppLogo,
	},
	methods: {
		onScroll() {
			const currentScrollPosition =
				window.pageYOffset || document.documentElement.scrollTop;
			if (this.scrollChange) {
				store.commit("colorChange", true);
				if (currentScrollPosition <= 900) {
					store.commit("colorChange", false);
				}
			} else {
				store.commit("colorChange", true);
			}
			if (currentScrollPosition <= 0) {
				return;
			}
			this.showNavbar = currentScrollPosition < this.lastScrollPosition;
			this.lastScrollPosition = currentScrollPosition;
		},
		sidebarOpen(x) {
			store.commit("sidebarToggle", true);
			var currentTabSelector = document.getElementById(
				this.sidebarProps.currentTab
			);
			document.getElementById("blacktint").style.zIndex = 8;
			document.getElementById("blacktint").style.pointerEvents = "all";
			currentTabSelector.classList.remove("focus");

			this.sidebarProps.currentTab = x;

			currentTabSelector = document.getElementById(
				this.sidebarProps.currentTab
			);
			currentTabSelector.classList.add("focus");

			this.showCart = false;
			store.commit("colorChange", false);
			this.sidebarProps.startAnim = true;
			window.removeEventListener("scroll", this.onScroll);
		},
		sidebarClose() {
			store.commit("sidebarToggle", false);
			document.getElementById("blacktint").style.pointerEvents = "none";
			this.showCart = true;
			window.addEventListener("scroll", this.onScroll);
			var currentTabSelector = document.getElementById(
				this.sidebarProps.currentTab
			);
			currentTabSelector.classList.remove("focus");
			store.commit("colorChange", true);

			setTimeout(() => {
				this.sidebarProps.startAnim = false;
			}, 500);
		},
		cartClose() {
			store.commit("cartToggle");
			document.getElementById("blacktint").style.pointerEvents = "none";
		},
		cartOpen() {
			store.commit("cartToggle");
			document.getElementById("blacktint").style.zIndex = 10;
			document.getElementById("blacktint").style.pointerEvents = "all";
		},
		blacktintClose() {
			if (this.cartIsOpen) {
				this.cartClose();
			} else {
				this.sidebarClose();
			}
		},
	},
	data() {
		return {
			navbarDesktopProps: store.getters.navmenu,
			sidebarProps: {
				startAnim: false,
				currentTab: "shop",
			},
			showNavbar: true,
			showCart: true,
			lastScrollPosition: 0,
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
			return this.navbarDesktopProps[this.currentTab];
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
.navbar-desktop
	position: fixed
	top: 0
	width: 100vw
	max-width: 100%
	z-index: 10
.blacktint
	cursor: pointer
	position: fixed
	top: 0
	left: 0
	right: 0
	width: 100vw
	height: 100vh
	background-color: rgba(0, 0, 0, 0.5)
	z-index: 8
	opacity: 0
	transition: .3s ease-out
	pointer-events: none

.blacktint.openSidebar
	opacity: 1

.navbar-container
	width: 100%
	position: fixed
	z-index: 10
	font-family: var(--font-light)
	--nav-text: #ffffff
	color: var(--nav-text)
	background: transparent
	transform: translate3d(0, 0, 0)
	transition: 0.5s cubic-bezier(0.22,0.85,0.5,0.97), color 0s

.navbar-container.hidden
	transform: translate3d(0, -100%, 0)

.navbar-container.changeColor
	--nav-text: #222222

.navbar
	display: flex
	align-content: center
	justify-content: space-between
	list-style: none
	padding: 2.2rem 3.5rem
	margin: 0

.nav-content-left
	margin: 0rem 1rem
	font-size: clamp(12px, .8rem, 20px)
	font-weight: 400
	cursor: pointer

.nav-tab-logo
	order: 0
	display: flex
	justify-content: center
	cursor: pointer

.logo
	width: max(6vw, 70px)
	margin-bottom: .6rem
	fill: var(--nav-text)

.nav-tab-left
	order: 1
	margin-left: 3rem
	display: flex
	align-items: center
	justify-content: flex-start

.nav-tab-right
	flex-grow: 1
	display: flex
	align-items: center
	order: 3
	justify-content: flex-end
	opacity: 1
	transition: .3s ease
	span
		margin: 0rem 1rem
		font-size: clamp(12px, .8rem, 20px)
		cursor: pointer
	i
		color: var(--nav-text)
		cursor: pointer
		margin: 0rem 1rem
		font-size: clamp(10px, 1.5rem, 25px)

.nav-tab-right.hidden
	opacity: 0

.elements
	display: flex
	align-items: center

.txt-hvr
	position: relative
	transform: perspective(1px) translateZ(0)

.txt-hvr::before
	content: ""
	position: absolute
	z-index: -1
	right: 100%
	left: 0
	bottom: 0
	height: 1px
	background-color: var(--nav-text)
	transition: 0.7s cubic-bezier(0.22,0.85,0.5,0.97)
	transition-property: right

.txt-hvr:hover:before , .txt-hvr:focus:before
	right: 0

.focus:before
	right: 0
</style>
