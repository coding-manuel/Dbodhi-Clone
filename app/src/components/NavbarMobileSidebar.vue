<template>
  <div
    class="navigation-container"
    :class="{ openNavigation: this.sidebarIsOpen }"
  >
    <div class="navigation-close-container">
      <div
        class="navigation-close"
        @click="sidebarClose()"
        v-if="this.sidebarProps.currentTab == 'menu'"
      >
        <i class="fas fa-times"></i>
      </div>
      <div class="navigation-close" @click="sidebarBack()" v-else>
        <i class="fas fa-chevron-left"></i>
      </div>
    </div>
    <ul
      class="navigation-elements"
      v-if="this.sidebarProps.currentTab == 'menu'"
    >
      <li
        class="navigation-content"
        v-for="item in items"
        :key="item"
        @click="sidebarNext(item[0].toLowerCase())"
        v-bind:class="{ animating: this.sidebarProps.startAnim }"
      >
        <div class="side-content-left txt-hvr">{{ item[0] }}</div>
        <div class="side-content-left txt-hvr" v-if="item[1]">
          <i class="fas fa-chevron-right"></i>
        </div>
      </li>
    </ul>
    <ul class="navigation-elements" v-else>
      <router-link :to="{ name: 'AllProducts' }">
        <li
          class="navigation-content"
          v-for="item in items"
          :key="item"
          @click="sidebarRedirect(item[0].toLowerCase())"
          v-bind:class="{ animating: this.sidebarProps.startAnim }"
        >
          <div class="side-content-left txt-hvr">{{ item[0] }}</div>
          <div class="side-content-left txt-hvr" v-if="item[1]">
            <i class="fas fa-chevron-right"></i>
          </div>
        </li>
      </router-link>
    </ul>
    <div class="navigation-login-container">
      <div class="navigation-login">
        <span>Login</span>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store/index";
export default {
  props: {
    sidebarProps: Object,
  },
  methods: {
    sidebarOpen(x) {
      this.$emit("openSide", x);
    },
    sidebarClose() {
      this.$emit("closeSide");
    },
    sidebarBack() {
      this.$emit("openNext", "menu");
    },
    sidebarNext(x) {
      this.$emit("openNext", x);
    },
    sidebarRedirect(x) {
      this.$emit("openPage", x);
    },
  },
  data() {
    return {
      navbarMobileProps: store.getters.navmenu,
    };
  },
  computed: {
    sidebarIsOpen() {
      return store.getters.sidebarIsOpen;
    },
    items() {
      return this.navbarMobileProps[this.sidebarProps.currentTab];
    },
  },
};
</script>
<style lang="sass">
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

@keyframes liststag
    0%
        opacity: 0
    100%
        opacity: 1

.navigation-elements
    flex-grow: 1
    display: flex
    flex-direction: column
    align-content: center
    justify-content: center
    list-style: none
    padding: 3rem 3rem
    margin: 0
    font-family: var(--font-regular)

    li
        cursor: pointer
        font-size: clamp(20px, 6rem, 80px)
        margin: 1.5rem
        opacity: 0

    li.animating
        animation: liststag .2s cubic-bezier(0.76, 0, 0.24, 1) both

    @for $i from 1 through 50
        li:nth-child(#{$i})
            animation-delay: .4s + .07s * $i


.navigation-content
    display: flex
    align-items: center
    justify-content: space-between
    text-decoration: none
    color: var(--light-text)
</style>
