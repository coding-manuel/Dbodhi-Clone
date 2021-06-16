<template>
  <NavbarDesktop :scrollChange="scrollChange" v-if="!mobile" />
  <NavbarMobile :scrollChange="scrollChange" v-else />
</template>

<script>
import NavbarDesktop from "./NavbarDesktop.vue";
import NavbarMobile from "./NavbarMobile.vue";

export default {
  props: {
    scrollChange: Boolean,
    mobile: Boolean,
  },
  components: {
    NavbarDesktop,
    NavbarMobile,
  },
};
</script>

<style lang="sass"></style>
