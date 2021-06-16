<template>
	<div
		class="cart-container-mobile"
		v-bind:class="{ openCart: this.cartIsOpen }"
	>
		<div class="cart-close-container">
			<div class="cart-title">Cart</div>
			<i class="fas fa-times" @click="sidebarClose"></i>
		</div>
		<div class="cart-elements">
			<div class="cart-item" v-for="cart in cartItems" :key="cart">
				<CartItem :cart="cart" />
			</div>
		</div>
		<div class="cart-checkout-container">
			<button>Go to Checkout</button>
		</div>
	</div>
</template>
<script>
import store from "../store/index";
import CartItem from "./CartItemTemplate.vue";

export default {
	components: {
		CartItem,
	},
	methods: {
		sidebarClose() {
			this.$emit("closeCart");
		},
	},
	watch: {
		cartItems: function (val) {
			if (val.length === 0) this.$emit("closeCart");
		},
	},
	computed: {
		cartIsOpen() {
			return store.getters.cartIsOpen;
		},
		cartItems() {
			return store.getters.cart;
		},
	},
};
</script>
<style lang="sass">
.cart-container-mobile
    position: fixed
    right: 0
    top: 0
    z-index: 11
    height: 100vh
    width: 100vw
    display: flex
    flex-direction: column
    color: var(--dark-text)
    background: var(--light-text)
    transform: translateX(100%)
    transition: 0.6s cubic-bezier(0.22,0.85,0.5,0.97) .2s transform

    &.openCart
        transform: translateX(0%)

    .cart-close-container
        display: flex
        justify-content: space-between
        align-content: center
        border-bottom: 1px solid #e0e0e0
        i
            margin: 0 6rem
            display: flex
            justify-content: center
            align-items: center

    .cart-title
        display: flex
        justify-content: center
        align-items: center
        padding: 5rem
        font-size: 5rem

    .cart-checkout-container
        display: flex
        justify-content: flex-start
        align-content: center
        margin: 2rem 4rem

    .cart-checkout
        padding: 1rem 0rem
        font-size: 5rem
        span
            padding: 0rem 5rem

    button
        font-family: var(--font)
        transition: 0.2s ease-out
        background-color: var(--dark-text)
        padding: 4rem 2rem
        width: 100%
        font-size: clamp(12px, .8rem, 20px)
        font-weight: 300
        color: var(--light-text)
        border: none
        cursor: pointer

    .cart-elements
        flex-grow: 1
        display: flex
        flex-direction: column
        font-family: var(--font-regular)
        padding: 0 4rem

    .cart-item
        padding: 4rem 2rem
        border-bottom: 1px solid #eaeaea
</style>
