<template>
	<div class="allproducts">
		<div class="header">
			<div class="filter-bar-container">
				<div class="filter-bar">
					<div class="filter-bar-content">
						<div
							class="category-container"
							@click="slidedown"
							@mouseleave="slideup"
						>
							<div class="white-overlay"></div>
							<ul class="menu" :class="{ slideDown: this.slider }">
								<li
									class="menu-elements"
									v-for="menuItem in menuItems"
									@click="categoryChange(menuItem[0])"
									:key="menuItem"
								>
									{{ menuItem[0] }}
								</li>
							</ul>
							<h2>{{ this.currentCategory }}</h2>
							<i
								:class="{ 'fa-rotate-180': this.slider }"
								class="fas fa-chevron-down"
							></i>
						</div>
						<div class="button-container">
							<div v-if="this.filters.length != 0">
								{{ this.filters.length }}
							</div>
							<button class="action-button" @click="sidebarOpen">
								Filters
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				class="blacktint"
				id="blacktint"
				@click="blacktintClose()"
				v-bind:class="{
					openSidebar: this.filterSidebarIsOpen,
				}"
				ref="blacktint"
			></div>
			<FilterSidebar @closeSidebar="sidebarClose()" />
			<div class="product-container" v-if="productList.length !== 0">
				<Product
					v-for="product in productList"
					:key="product"
					:productInfo="product"
					@click="openProduct(product)"
				/>
			</div>
			<div class="product-container no-results" v-else>
				<h1>Oops, no product matches with your search...</h1>
			</div>
		</div>
	</div>
</template>
<script>
import FilterSidebar from "../components/FilterSidebar.vue";
import Product from "../components/ProductTemplate.vue";
import store from "../store/index";
export default {
	components: {
		FilterSidebar,
		Product,
	},
	methods: {
		slidedown() {
			this.slider = true;
		},
		slideup() {
			this.slider = false;
		},
		sidebarOpen() {
			store.commit("filterSidebarToggle");
			if (!this.mobile) {
				this.$refs.blacktint.style.opacity = 1;
				this.$refs.blacktint.style.pointerEvents = "all";
			}
		},
		blacktintClose() {
			this.sidebarClose();
		},
		sidebarClose() {
			store.commit("filterSidebarToggle");
			this.$refs.blacktint.style.opacity = 0;
			this.$refs.blacktint.style.pointerEvents = "none";
		},
		categoryChange(x) {
			store.commit("setCategory", x);
			store.dispatch("FILTER_PRODUCTS");
			this.slideup();
		},
		openProduct(product) {
			this.$router.push({
				name: "ProductInfo",
				params: { id: product._id },
			});
		},
	},
	computed: {
		mobile() {
			return store.getters.mobile;
		},
		productList() {
			return store.getters.productList;
		},
		currentCategory() {
			return store.getters.currentCategory;
		},
		filterSidebarIsOpen() {
			return store.getters.filterSidebarIsOpen;
		},
		filters() {
			return store.getters.collection;
		},
	},
	data() {
		return {
			slider: false,
			menuItems: store.getters.navmenu["shop"],
		};
	},
	mounted() {
		store.commit("colorChangeOff");
		store.dispatch("LOAD_PRODUCTS");
	},
};
</script>
<style lang="sass">
.product-container
    display: grid
    grid-template-columns: repeat(2, 1fr)
    grid-gap: 5vw
    padding: 1rem 3.5vw
    &.no-results
        display: flex
        justify-content: center
        align-items: center
        height: 40vw
        h1
                font-weight: 400
                font-size: 2rem


.menu
    position: absolute
    top: -67vw
    left: 0vw
    width: 100%
    margin: 0
    padding: 0
    list-style: none
    z-index: 4
    transition: .5s cubic-bezier(0.22,0.85,0.5,0.97)

    &.slideDown
        transform: translate(0px, 79vw)

    li
        padding: 3rem 4rem
        font-size: 4rem
        color: var(--light-text)
        background-color: var(--dark-text)
        border-bottom: .5px solid var(--light-grey-text)

.blacktint
    cursor: pointer
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    z-index: 8
    opacity: 0
    transition: .3s ease-out
    pointer-events: none

.white-overlay
    top: -8vw
    left: 0vw
    height: 21vw
    width: 100%
    position: absolute
    background-color: var(--background-color)
    z-index: 5

.category-container
    display: flex
    align-items: center
    cursor: pointer

    h2
        font-size: 5rem
        font-family: var(--font-light)
        font-weight: 400
        z-index: 7
    i
        transition: .5s cubic-bezier(0.22,0.85,0.5,0.97)
        font-size: 2rem
        padding: 2rem
        z-index: 7

.action-button
    padding: 1.5rem 2rem

.filter-bar-container
    position: relative
    height: 50vw

.filter-bar
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
    position: absolute
    bottom: 0

.filter-bar-content
    padding: 0 3.5vw
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column

.button-container
    position: relative
    margin: 2rem
    div
        display: flex
        justify-content: center
        align-items: center
        position: absolute
        border-radius: 2rem
        width: 2rem
        height: 2rem
        font-size: 1.5rem
        top: 1rem
        right: 1rem
        background-color: var(--dark-text)
        color: var(--light-text)

@media only screen and (min-width: 768px)
    .filter-bar-container
        height: 14vw
    .filter-bar-content
        flex-direction: row
    .category-container
        h2
            font-size: 1.5rem
        i
            font-size: .7rem
            padding: .5rem
    .button-container
        margin: 0rem
    .white-overlay
        top: -9vw
        left: 2vw
        height: 14vw
        width: 20vw
    .menu
        top: -19vw
        left: 2.5vw
        width: auto
        &.slideDown
            transform: translate(0px, 24vw)
        li
            font-size: 1rem
            width: auto
            padding: 1rem 4rem
            cursor: pointer
    .product-container
        grid-template-columns: repeat(4, 1fr)
        grid-auto-rows: 30vw
        grid-gap: 1vw
    .action-button
        padding: 1rem 2rem
    .button-container
        div
            border-radius: 1rem
            width: 1rem
            height: 1rem
            font-size: .7rem
            top: .5rem
            right: .5rem
</style>
