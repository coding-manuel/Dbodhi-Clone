<template>
	<div
		class="navigation-container"
		:class="{ openNavigation: this.filterSidebarIsOpen }"
	>
		<div class="navigation-close-container" v-if="mobile">
			<div class="navigation-close" @click="sidebarClose()">
				<i class="fas fa-times"></i>
			</div>
		</div>
		<div
			v-for="(name, cont, index) in filters"
			:key="cont"
			class="accordion-container"
			:class="{ open: accordianOpen == index }"
		>
			<button class="accordion" @click="openaccordian(index)">
				<div>
					{{ cont }}
					<i class="fas fa-chevron-down"></i>
				</div>
			</button>
			<div class="panel">
				<div v-for="item in filters[cont]" :key="item">
					<label>
						<input
							type="checkbox"
							:name="item[0]"
							:value="item[0]"
							v-model="checkedCollections"
						/>
						<p>{{ item[0] }}</p></label
					>
				</div>
			</div>
		</div>
		<div
			class="accordion-container"
			:class="{ open: accordianOpen == index }"
		>
			<button class="accordion" @click="openaccordian(index)">
				<div>
					PRICE
					<i class="fas fa-chevron-down"></i>
				</div>
			</button>
			<div
				class="panel"
				style="
					flex-wrap: nowrap;
					justify-content: space-between;
					align-items: center;
				"
			>
				<div class="sliderval">
					<p>MIN</p>
					<p>0</p>
				</div>
				<input
					type="range"
					min="0"
					max="3000"
					value="3000"
					class="slider"
					ref="slider"
					@change="sliderValueChange"
				/>
				<div class="sliderval">
					<p>MAX</p>
					<p>{{ this.sliderValue }}</p>
				</div>
			</div>
		</div>
		<div class="apply-container" @click="applyFilters">
			<button>APPLY</button>
		</div>
	</div>
</template>

<script>
import store from "../store/index";
export default {
	methods: {
		sidebarClose() {
			if (this.mobile) {
				store.commit("filterSidebarToggle");
			} else {
				this.$emit("closeSidebar");
			}
		},
		openaccordian(x) {
			if (this.accordianOpen === x) {
				this.accordianOpen = -1;
			} else {
				this.accordianOpen = x;
			}
		},
		sliderValueChange() {
			this.sliderValue = this.$refs.slider.value;
		},
		applyFilters() {
			store.commit("setCollection", this.checkedCollections);
			store.commit("priceFilter", this.sliderValue);
			store.dispatch("FILTER_PRODUCTS");
			this.sidebarClose();
		},
	},
	data() {
		return {
			filters: this.$store.getters.filters,
			accordianOpen: false,
			sliderValue: 3000,
			checkedCollections: [],
		};
	},
	computed: {
		filterSidebarIsOpen() {
			return store.getters.filterSidebarIsOpen;
		},
		mobile() {
			return store.getters.mobile;
		},
	},
};
</script>

<style lang="sass">
.accordion-container
    border-bottom: 1px solid #444444
    padding: 0rem 4rem
    &.open
        i
            transform: rotateZ(180deg)
        .panel
            max-height: fit-content

.accordion
    font-family: var(--font-medium)
    font-size: clamp(12px, 4rem, 32px)
    color: var(--light-text)
    background-color: var(--dark-text)
    cursor: pointer
    padding: 6rem 4rem
    width: 100%
    text-align: left
    border: none
    outline: none
    text-transform: uppercase
    div
        display: flex
        justify-content: space-between

    i
        transition: .5s cubic-bezier(0.22,0.85,0.5,0.97)

.panel
    display: flex
    flex-wrap: wrap
    max-height: 0
    overflow: hidden
    transition: .5s cubic-bezier(0.22,0.85,0.5,0.97)
    div
        margin: 1rem 2rem
    label
        font-size: 3rem
        display: flex
        align-items: center
        p
            padding: 0rem 1rem
            margin: 0

.sliderval
    display: flex
    flex-direction: column
    align-items: center

input[type=range]
    height: 26px
    background: transparent
    -webkit-appearance: none
    margin: 1rem 2rem
    width: 80%

    &:focus
        outline: none

    &::-webkit-slider-runnable-track
        width: 100%
        height: 2px
        cursor: pointer
        animate: 0.2s
        box-shadow: 0px 0px 0px #000000
        background: #444444
        border-radius: 0px
        border: 0px solid #000000
    &::-webkit-slider-thumb
        box-shadow: 0px 0px 0px #000000
        border: 0px solid #000000
        height: 20px
        width: 20px
        border-radius: 20px
        background: #FFFFFF
        cursor: pointer
        -webkit-appearance: none
        margin-top: -9px
    &:focus::-webkit-slider-runnable-track
        background: #444444
    &::-webkit-progress-bar
        background-color: orange

.slider::-webkit-slider-runnable-track
    width: 300px
    height: 5px
    background: var(--light-dark-text)
    border: none

.slider::-webkit-slider-thumb
    -webkit-appearance: none
    border: none
    height: 25px
    width: 25px
    border-radius: 100%
    background: green
    margin-top: -4px


.slider:focus
    outline: none


.slider:focus::-webkit-slider-runnable-track
    background: #ccc


.navigation-container
    position: fixed
    left: 0
    top: 0
    display: flex
    flex-direction: column
    z-index: 11
    width: 100vw
    height: 100vh
    background: var(--dark-text)
    color: var(--light-text)
    transform: translateX(-100%)
    transition: 0.6s cubic-bezier(0.22,0.85,0.5,0.97) .2s

.navigation-container.openNavigation
    transform: translateX(0%)

.navigation-close-container
    display: flex
    justify-content: flex-end
    align-content: center
    border-bottom: 1px solid #444444

.navigation-login-container
    display: flex
    justify-content: flex-start
    align-content: center
    border-top: 1px solid #444444

.navigation-login
    padding: 3rem 0rem
    font-size: 5rem
    span
        padding: 0rem 5rem

.navigation-close
    padding: 3rem 4rem
    font-size: 5rem
    display: flex
    justify-content: center
    align-content: center
    cursor: pointer
    i
        padding: 0rem 3rem

.apply-container
    display: flex
    justify-content: flex-start
    align-content: center
    margin: 2rem 4rem
    button
        font-family: var(--font)
        transition: 0.2s ease-out
        background-color: var(--light-text)
        padding: 4rem 2rem
        width: 100%
        font-size: clamp(12px, .8rem, 20px)
        font-weight: 300
        color: var(--dark-text)
        border: none
        cursor: pointer
@media only screen and (min-width: 768px)
    .navigation-container
        width: 40vw
        transform: translateX(-100%)
    .accordion-container
        padding: 0 1rem
    .accordion
        font-size: 2rem
        padding: 3rem 4rem
    .panel
        padding: 0 2rem
        div
            margin: 1rem 0
        label
            font-size: 1rem
</style>
