<template>
	<div class="cart-item-container">
		<div class="cart-item-image">
			<img :src="cart.product.images[0]" alt="" />
		</div>
		<div class="cart-item-content">
			<div class="cart-item-section">
				<div class="cart-item-title">
					<h2>{{ cart.product.title }}</h2>
					<h2 class="cart-size">{{ cart.size }}</h2>
				</div>
				<div class="cart-item-price">
					<h2 class="cart-price">
						€{{ cart.product.price * cart.quantity }}
					</h2>
				</div>
			</div>
			<div class="cart-item-section">
				<div class="cart-item-quantity">
					<h2>Quantity</h2>
					<div class="quantity-selector">
						<button @click="quantityDecrease()">-</button>
						<h2>{{ cart.quantity }}</h2>
						<button @click="quantityIncrease()">+</button>
					</div>
				</div>
				<div class="cart-item-price">
					<h2 @click="itemDelete()" class="cart-delete">Delete</h2>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import store from "../store/index";
export default {
	props: {
		cart: Object,
	},
	methods: {
		quantityIncrease() {
			store.dispatch("CART_QUANTTY_INCREASE", this.cart.product._id);
		},
		quantityDecrease() {
			store.dispatch("CART_QUANTTY_DECREASE", this.cart.product._id);
		},
		itemDelete() {
			store.dispatch("CART_ITEM_DELETE", this.cart.product._id);
		},
	},
};
</script>
<style lang="sass">
.cart-item-container
    display: flex
.cart-item-image
    width: 10rem
    height: 10rem
    img
        width: 100%
        height: 100%
        object-fit: cover
        background-color: #E5DDD6
.cart-item-content
    display: flex
    flex-direction: column
    justify-content: space-between
    width: 100%
    padding: 0 1rem

    .cart-item-section
        display: flex
        justify-content: space-between
    h2
        margin: 0
        padding: .1rem 0
        font-size: .9rem
        font-weight: 400
    .cart-size
        color: var(--light-grey-text)
    .cart-price
        font-size: 1rem
        color: var(--light-grey-text)
    .cart-item-quantity
        display: flex
        border: none
        align-items: center
        .quantity-selector
            border: 1px solid #e0e0e0
            margin: 0 1rem
            align-items: center
            button
                color: var(--grey-text)
                font-size: 1rem
                padding: .3rem .5rem
            h2
                border: solid #e0e0e0
                color: var(--grey-text)
                border-width: 0 1px 0 1px
                padding: .3rem .8rem
                font-size: .8rem

    .cart-delete
        color: var(--light-grey-text)
        cursor: pointer
@media only screen and (max-width: 768px)
    .cart-item-image
        width: 30rem
        height: 30rem
    .cart-item-content
        padding: 0 2rem
        h2
            padding: .5rem 0
            font-size: 2.5rem
        .cart-price
            font-size: 3rem
        .cart-item-quantity
            .quantity-selector
                margin: 0 2rem
                padding: 0
                button
                    font-size: 2rem
                    padding: .3rem 1.5rem
                h2
                    padding: 0.3rem 2rem
                    font-size: 1.5rem
</style>
