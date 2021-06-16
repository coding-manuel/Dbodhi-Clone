<template>
	<div>
		<TheNavbar :scrollChange="this.colorChange" :mobile="this.mobile" />
		<router-view></router-view>
	</div>
</template>

<script>
import store from "./store/index";
import TheNavbar from "@/components/TheNavbar.vue";
import $ from "jquery";
export default {
	components: {
		TheNavbar,
	},
	methods: {
		onResize() {
			var windowWidth = $(window).width();
			if (windowWidth < 768) {
				store.commit("mobileToggle", true);
			} else {
				store.commit("mobileToggle", false);
			}
		},
	},
	computed: {
		colorChange() {
			return store.getters.colorChange;
		},
		mobile() {
			return store.getters.mobile;
		},
	},
	mounted() {
		this.onResize();
		window.addEventListener("resize", this.onResize);
	},
};
</script>

<style lang="sass">
@font-face
	font-family: "MessinaMono-Regular"
	src: local("MessinaMono"), url(./assets/Fonts/MessinaMono/MessinaSansMono-Regular.ttf) format("truetype")
@font-face
	font-family: "MessinaMono-SemiBold"
	src: local("MessinaMono"), url(./assets/Fonts/MessinaMono/MessinaSansMono-SemiBold.ttf) format("truetype")
@font-face
	font-family: "MessinaMono-Light"
	src: local("MessinaMono"), url(./assets/Fonts/MessinaMono/MessinaSansMono-Light.ttf) format("truetype")

:root
	--font-regular: "MessinaMono-Regular", sans-serif
	--font-semibold: "MessinaMono-SemiBold", sans-serif
	--font-light: "MessinaMono-Light", sans-serif
	--dark-text: #222222
	--grey-text: #555555
	--light-grey-text: #707070
	--light-text: #ffffff
	--background-color: #F2EFEC
	font-size: 1.2vw

body
	padding: 0
	margin: 0
	box-sizing: border-box
	font-family: var(--font-regular)
	background-color: var(--background-color)

#app
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
</style>
