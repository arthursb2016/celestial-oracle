<template>
  <div
    class="page-footer"
    :class="{
      show,
    }"
  >
    <slot />
    <div
      class="back-container"
      @click="$router.push('/')"
    >
      BACK
      <v-icon class="back-icon">
        keyboard_return
      </v-icon>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class PageFooter extends Vue {
  @Prop({ default: false })
  show!: boolean;
};
</script>
<style lang="scss" scoped>
.page-footer {
  position: relative;
  flex-grow: 1;
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

  .back-container {
    color: rgba(0, 0, 0, 0.54);
    font-size: 1.6rem;
    opacity: 0.8;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
    ::v-deep .v-icon.back-icon {
      font-size: 2.4rem;
    }
  }
}
</style>
