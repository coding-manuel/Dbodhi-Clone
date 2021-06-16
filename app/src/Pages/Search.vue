<template>
	<div class="search-container">
		<div class="search-bar">
			<input
				type="text"
				v-model="searchQuery"
				@change="someHandler"
				placeholder="Search"
			/>
		</div>
		<div class="search-results">
			<div class="product-container" v-if="searchList.length !== 0">
				<Product
					v-for="product in searchList"
					:key="product"
					:productInfo="product"
					@click="openProduct(product)"
				/>
			</div>
			<div v-else-if="searchQuery === ''"></div>
			<div class="product-container no-results" v-else>
				<h1>Oops, no product matches with your search...</h1>
			</div>
		</div>
	</div>
</template>
<script>
import store from "../store/index";
import Product from "../components/ProductTemplate.vue";
export default {
	components: {
		Product,
	},
	methods: {
		openProduct(product) {
			this.$router.push({
				name: "ProductInfo",
				params: { id: product._id },
			});
		},
	},
	data() {
		return {
			searchQuery: "",
		};
	},
	computed: {
		products() {
			return store.getters.productList;
		},
		searchList() {
			if (this.searchQuery !== "") {
				return this.products.filter((item) => {
					return this.searchQuery
						.toLowerCase()
						.split(" ")
						.every((v) => item.title.toLowerCase().includes(v));
				});
			} else {
				return "";
			}
		},
	},
	mounted() {
		store.commit("colorChangeOff");
		store.dispatch("LOAD_PRODUCTS");
	},
};
</script>
<style lang="sass">
.search-container
    margin: 7rem 3rem
.search-bar
    input, ::placeholder
        width: 100%
        font-size: 5rem
        border: none
        outline: none
        font-family: var(--font-regular)
        font-weight: 200
    input
        background-color: var(--background-color)
        color: var(--dark-text)
.search-results
    min-height: 100vh
    .product-container
        padding: 2rem 0
        grid-template-columns: repeat(4, 1fr)
        grid-auto-rows: 30vw
        grid-gap: 1vw
@media only screen and (max-width: 768px)
    .search-results
        .product-container
            display: grid
            grid-template-columns: repeat(2, 1fr)
            grid-gap: 5vw
            &.no-results
                display: flex
                justify-content: center
                align-items: center
                height: 40vw
                h1
                        font-weight: 400
                        font-size: 2rem
</style>
