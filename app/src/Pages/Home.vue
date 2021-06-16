<template>
	<main>
		<div class="hero">
			<div class="hero-img-container">
				<img
					v-if="!this.mobile"
					class="hero-img"
					src="../assets/Images/hero-image.jpg"
					alt=""
				/>
				<img
					v-else
					class="hero-img"
					src="../assets/Images/hero-image-resp.jpg"
					alt=""
				/>
			</div>
			<div class="hero-foot-container">
				<h1 class="hero-tagline">Handcrafted with<br />spirit in Java.</h1>
				<div class="button-container">
					<button class="action-button">Explore</button>
				</div>
			</div>
		</div>
		<div class="info-section-container">
			<div class="info-section">
				<h1>
					When we<br />
					create<br />
					furniture, we<br />
					look for<br />
					the best<br />
					possible<br />
					harmony<br />
					between culture<br />
					and nature.<br />
				</h1>
				<button class="action-button">Explore</button>
			</div>
			<div class="overlap-photos">
				<img
					src="../assets/Images/overlap_picture_1.jpg"
					alt=""
					class="overlap-1"
				/>
				<img
					src="../assets/Images/overlap_picture_2.jpg"
					alt=""
					class="overlap-2"
				/>
			</div>
		</div>
		<div class="new-collection-container">
			<div class="new-collection">
				<img
					src="../assets/Images/Artisan_image.jpg"
					alt=""
					class="new-collection-img"
				/>
				<div class="text-box">
					<div class="text">
						<h1>Artisan</h1>
						<h2>NEW COLLECTION</h2>
						<p>
							The collection’s iconic tables are all entirely made of
							certified, solid reclaimed teak wood of high quality,
							sourced from century-old houses from remote villages in
							East Java. Standout design features include the distinctive
							joineries on the legs, which are inspired by a traditional
							Javanese house construction system called ‘Purus’, in which
							wooden joints are carefully fitted together in an artisanal
							way.
						</p>
					</div>
					<button class="action-button">Explore</button>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import store from "../store/index";
export default {
	computed: {
		mobile() {
			return store.getters.mobile;
		},
	},
	mounted() {
		store.commit("colorChangeOn");
	},
};
</script>

<style lang="sass">
.action-button
  font-family: var(--font-light)
  font-size: clamp(12px, 4rem, 32px)
  color: var(--dark-text)
  padding: 6rem 4rem
  width: 100%
  background-color: transparent
  border: 1px solid var(--dark-text)
  transition: .2s ease-out

  &:hover
    border: 1px solid transparent
    background-color: var(--dark-text)
    color: var(--light-text)
    cursor: pointer

.hero
  position: relative
  height: 100vh

  .hero-img-container
    height: 100vh

  .hero-img
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center center

  .hero-foot-container
    position: absolute
    bottom: 4vh
    width: 90%
    margin: 2rem 4rem
    display: flex
    flex-direction: column
    justify-content: space-between
    align-content: center

    h1
      font-size: clamp(24px, 6rem, 80px)
      font-weight: 400
      color: var(--light-text)
      padding-bottom: 3rem
      margin: 0

.info-section-container
  display: flex
  flex-direction: column
  object-fit: cover
  background-repeat: repeat-y
  background: url(../assets/Images/grunge.jpg)
  overflow: hidden

  .info-section
    margin: 4rem 6rem
    display: flex
    flex-direction: column

  h1
    font-family: "Montserrat", sans-serif
    font-size: clamp(24px, 8rem, 80px)
    font-weight: 500
    color: var(--dark-text)
    text-transform: uppercase
    line-height: 1
    padding-bottom: 4rem

  .action-button
    border: 1px solid var(--dark-text)
    color: var(--dark-text)

    &:hover
      border: 1px solid transparent
      color: var(--light-text)

  .overlap-1
    position: relative
    top: 5vw
    left: 3vw
    width: 70vw

  .overlap-2
    position: relative
    bottom: 20vw
    left: 34vw
    width: 60vw
    height: auto

  .grunge
    height: 100vh
    width: auto
    object-fit: cover
    object-position: center center
    background: url(/Images/grunge.jpg)
    background-blend-mode: lighten

.new-collection-container

  .new-collection
    display: flex
    flex-direction: column

    img
      height: 70vh
      object-fit: cover
      object-position: center center

  .text-box
    margin: 4rem
    display: flex
    flex-direction: column

    h1
      font-family: var(--font-regular)
      font-weight: 500
      font-size: 6rem
      color: var(--dark-text)

    h2
      font-size: 4rem
      font-weight: 500
      color: var(--light-grey-text)
      text-transform: uppercase
      line-height: 1
      padding-bottom: 2rem

    p
      font-family: var(--font-light)
      font-size: 3rem
      font-weight: 400
      color: var(--grey-text)
      padding-bottom: 4rem

    .action-button
      border: 1px solid var(--light-grey-text)
      color: var(--light-grey-text)

      &:hover
        border: 1px solid transparent
        color: var(--light-text)

@media only screen and (min-width: 768px)
  .action-button
      font-size: clamp(12px, 2rem, 16px)
      padding: 1.5rem 6rem

  .hero
    .hero-foot-container
      flex-direction: row
      bottom: 2vh
      h1
        font-size: clamp(12px, 2rem, 30px)
        padding-bottom: 1rem

  .info-section-container
    flex-direction: row

    .info-section
      margin: 2rem 4rem

    h1
      font-size: clamp(24px, 8rem, 60px)
      padding-bottom: 4rem

    .overlap-1
      position: relative
      top: 5vw
      left: 2vw
      width: 38vw

    .overlap-2
      position: relative
      bottom: 14vw
      left: 20vw
      width: 26vw

  .new-collection-container

      .new-collection
        flex-direction: row

        img
          order: 3

      .text-box
        margin: 2rem 4rem
        justify-content: space-between

        h1
          font-size: 2rem
          margin: 0

        h2
          font-size: 1rem
          padding-bottom: 2rem

        p
          font-size: 1rem
          padding-bottom: 4rem
</style>
