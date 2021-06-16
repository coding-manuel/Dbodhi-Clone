<template>
	<div class="container">
		<div class="carousel">
			<Carousel v-if="this.mobile">
				<Slide
					v-for="productImage in this.product.images"
					:key="productImage"
				>
					<div class="carousel__item">
						<img :src="productImage" alt="" loading="lazy" />
					</div>
				</Slide>

				<template #addons>
					<Pagination />
				</template>
			</Carousel>
			<div class="images-display" v-else>
				<div
					class="image-container"
					v-for="(image, index) in this.product.images"
					:key="image"
					:id="'image' + index"
				>
					<img :src="image" />
				</div>
			</div>
		</div>
		<div class="textbox">
			<div class="textbox-container">
				<div class="titlebox">
					<h2 v-if="!this.mobile" class="product-category">
						{{ this.product.category }}
					</h2>
					<h1>{{ this.product.title }}</h1>
					<div class="pricebox">
						<h2 class="price">€{{ this.product.price }}</h2>
						<p class="newbox" v-if="!this.product.new">NEW</p>
					</div>
				</div>
				<div class="size-selector">
					<div class="size-container" @click="slideToggle">
						<h2>Size</h2>
						<div class="size-dropper">
							<h2 v-if="this.size != ''">{{ this.size }}</h2>
							<i
								:class="{ 'fa-rotate-180': this.slider }"
								class="fas fa-chevron-down"
							></i>
						</div>
					</div>
					<div class="menu-container">
						<ul
							class="menu"
							:class="{ slideDown: this.slider }"
							@mouseleave="slideToggle"
						>
							<li
								class="menu-elements"
								v-for="size in this.product.sizes"
								@click="sizeChange(size)"
								:key="size"
							>
								{{ size }}
							</li>
						</ul>
					</div>
				</div>
				<div class="quantity-container">
					<h2>Quantity</h2>
					<div class="quantity-selector">
						<button @click="quantityDecrease()">-</button>
						<h2>{{ this.quantity }}</h2>
						<button @click="quantityIncrease()">+</button>
					</div>
				</div>
				<div class="cart-button-container">
					<button @click="addToCart()">
						€{{ this.finalPrice }} - add to cart
					</button>
					<h2 v-if="this.quantity < 4">Delivery (2-7 days)</h2>
					<h2 v-else>Delivery (4-8 weeks)</h2>
				</div>
				<div class="information-container">
					<div class="information-titles">
						<h2
							@click="changeInfoTab('description')"
							:class="{
								selected: this.currentInfoTab === 'description',
							}"
						>
							DESCRIPTION
						</h2>
						<h2
							@click="changeInfoTab('details')"
							:class="{ selected: this.currentInfoTab === 'details' }"
						>
							DETAILS
						</h2>
						<h2
							@click="changeInfoTab('delivery')"
							:class="{ selected: this.currentInfoTab === 'delivery' }"
						>
							DELIVERY
						</h2>
					</div>
					<div
						class="information-content"
						v-if="this.currentInfoTab === 'description'"
					>
						<ul>
							<li
								v-for="item in this.product[currentInfoTab]"
								:key="item"
							>
								<p v-if="item !== ''">{{ item }}</p>
							</li>
						</ul>
					</div>
					<div class="information-content" v-else>
						<p>{{ this.product[currentInfoTab] }}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="image-navigation" v-if="!this.mobile">
			<div
				class="image-thumb"
				v-for="(image, index) in this.product.images"
				@click="scrollToImage(index)"
				:id="'thumb' + index"
				:key="image"
			>
				<img :src="image" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
import store from "../store/index";
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default {
	methods: {
		slideToggle() {
			this.slider = !this.slider;
		},
		sizeChange(sizeValue) {
			this.size = sizeValue;
		},
		quantityIncrease() {
			this.quantity++;
			this.finalPrice = this.product.price * this.quantity;
		},
		quantityDecrease() {
			if (this.quantity !== 1) this.quantity--;
			this.finalPrice = this.product.price * this.quantity;
		},
		changeInfoTab(tab) {
			this.currentInfoTab = tab;
		},
		scrollToImage(index) {
			var element = document.getElementById("image" + index);

			element.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		},
		addToCart() {
			let newItem = {
				product: this.product,
				quantity: this.quantity,
				size: this.size,
			};
			store.dispatch("ADD_TO_CART", newItem);
			store.commit("cartToggle");
		},
	},
	components: {
		Carousel,
		Slide,
		Pagination,
	},
	data() {
		return {
			slider: false,
			size: "",
			quantity: 1,
			finalPrice: 1,
			currentInfoTab: "description",
		};
	},
	computed: {
		product() {
			return store.getters.product;
		},
		mobile() {
			return store.getters.mobile;
		},
	},
	mounted() {
		store.commit("colorChangeOff");
		store.dispatch("LOAD_PRODUCT", this.$route.params.id);
	},
};
</script>
<style lang="sass">
.container
  position: relative
  display: flex
  flex-direction: column
  background-repeat: repeat-y
  background: url(../assets/Images/grunge.jpg)

.textbox-container
    display: flex
    flex-direction: column

.textbox
  margin: 4rem

  h1
    font-family: var(--font-regular)
    color: var(--dark-text)
    font-weight: 400
    font-size: 6rem

  h2
    font-size: 3rem
    color: var(--grey-text)
    margin: 0

h2
  font-family: var(--font-regular)
  color: var(--dark-text)
  font-weight: 500

.pricebox
  display: flex
  align-items: center

.newbox
  font-size: 2rem
  color: var(--dark-text)
  background: #e5ddd6
  margin: 0 2rem
  padding: 0.3rem

.size-container
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  padding: 2rem 0
  cursor: pointer
  border-bottom: 1px solid var(--light-grey-text)

  i
    margin: 0 1rem
    font-size: 2rem

.menu-container
  .menu
    position: unset
    transform: translateY(-60vw)
    pointer-events: all

    &.slideDown
      transform: translateY(0vw)

  width: 100%
  min-height: 8rem
  overflow: hidden
  position: absolute
  pointer-events: none

.menu-elements
  cursor: pointer

.size-selector
  margin: 4rem 0
  position: relative

.size-dropper
  display: flex
  align-items: center

.carousel__item
  display: flex
  justify-content: center
  align-items: center
  width: 100%

.carousel__pagination
  padding: 0

.carousel img
  width: 100%
  height: 100%
  object-fit: cover
  object-position: center center

.carousel__item img
  cursor: grab

.images-display
  display: flex
  flex-direction: column
  width: 58vw
  position: relative

  img
    cursor: zoom-in

.quantity-container
  display: flex
  justify-content: space-between
  margin: 6rem 0 0 0

  h2
    padding: 6rem 5rem
    border: 1px solid var(--light-grey-text)
    margin: 0

.quantity-selector
  display: flex
  justify-content: space-around
  align-content: center
  padding: 0 4rem
  flex-grow: 2
  border: solid var(--light-grey-text)
  border-width: 1px 1px 1px 0

  h2
    font-family: var(--font-semibold)
    border: none

  button
    border: none
    background-color: transparent
    box-shadow: none
    font-family: var(--font-regular)
    font-size: 5rem
    color: var(--dark-text)
    flex-grow: 2
    cursor: pointer

.cart-button-container
  h2
    text-align: center
    margin: 4rem 0 6rem 0
    color: var(--grey-text)

  button
    width: 100%
    padding: 6rem 4rem
    background: var(--dark-text)
    border: none
    box-shadow: none
    color: var(--light-grey-text)
    font-family: var(--font-regular)
    font-size: 3rem
    flex-grow: 2
    cursor: pointer

.information-container
  padding: 2rem 0

.information-titles
  display: flex
  align-content: center

  h2
    color: var(--grey-text)
    margin: 0 3rem 0 0
    cursor: pointer

    &.selected
      color: var(--dark-text)

.information-content
    margin: 2rem 0

    ul
        margin: 0
        padding: 0 4rem

    li::marker
        color: var(--grey-text)
        font-size: 3rem

    p
        color: var(--grey-text)
        font-size: 2.5rem
        line-height: 4rem
        margin: 0
        padding: 0

@media only screen and (min-width: 768px)
    .container
        flex-direction: row
        h2
            font-size:1rem
    .textbox-container
        margin: 0 7rem
        justify-content: center
    .product-category
        cursor: pointer
    .textbox
        display: flex
        position: sticky
        top: 0px
        height: 100vh
        width: 42vw
        margin: 0
        .price
            font-size: 1rem
        h1
            font-size: 1.5rem
            margin: .5rem 0
        h2
            font-size: .7rem
    .image-container
        height: 100vh
        width: 100%
    .image-navigation
        height: 100vh
        top: 0
        display: flex
        flex-direction: column
        justify-content: center
        position: fixed
    .image-thumb
        height: 2rem
        width: 2rem
        border-radius: 2rem
        margin: .5rem 3rem
        overflow: hidden
        background: var(--light-text)
        transition: .5s cubic-bezier(0.22,0.85,0.5,0.97)
        &:hover
            transform: scale(1.4)
        img
            width: 100%
            height: 100%
            cursor: pointer
            object-fit: cover

    .carousel img
        object-fit: cover
        object-position: 50% 50%
    .titlebox
        padding: 0 0 1rem 0
        border-bottom: 1px solid var(--light-grey-text)
        order: -2
    .menu-container
        .menu
            transform: translateY(-20vw)
    .newbox
        font-size: .8rem
    .size-selector
        margin: 0
    .size-container
        padding: 1rem 0
        i
            font-size: 1rem
    .information-container
        order: -1
        margin: 0
        padding: 1rem 0
        h2
            font-size: .8rem
            margin: 0 2rem 0 0
        .information-content
            height: 4rem
            margin: 1rem 0
        ul
            padding: 0 1rem
        li::marker
            font-size: 1rem
        p
            font-size: .6rem
            line-height: .8rem
    .quantity-container
        margin: 2rem 0 0 0
        h2
            padding: 1.5rem 2rem
    .quantity-selector
        padding: 0
        h2
            padding: 1.5rem 2rem
        button
            font-size: 1rem
    .cart-button-container
        h2
            margin: 1rem
        button
            padding: 1.5rem 3rem
            font-size: .7rem
</style>
