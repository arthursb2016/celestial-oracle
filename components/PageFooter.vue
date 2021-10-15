<template>
  <div
    class="page-footer"
    :class="{
      show,
    }"
  >
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
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  opacity: 0;
  transition: 1500ms ease out;

  &.show {
    opacity: 1;
  }

  ::v-deep .v-icon {
    font-size: 2.6rem;
    opacity: 0.8;
  }
}
</style>
