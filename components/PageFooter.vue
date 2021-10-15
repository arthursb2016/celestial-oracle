<template>
  <div
    class="page-footer"
    :class="{
      show,
    }"
  >
    <slot />
    <v-icon
      class="back-icon"
      @click="$router.push('/')"
    >
      keyboard_return
    </v-icon>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  mixins: [],
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.page-footer {
  position: relative;
  display: flex;
  align-items: flex-end;
  opacity: 0.8;
  bottom: -20rem;
  min-height: 4rem;
  transition: 1500ms ease-out;

  &.show {
    opacity: 1;
    bottom: 0rem;
  }

  ::v-deep .v-icon.back-icon {
    font-size: 2.6rem;
    opacity: 0.8;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
