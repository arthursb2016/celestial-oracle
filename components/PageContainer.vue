<template>
  <div
    class="page-container"
    :class="{
      show,
    }"
  >
    <div
      class="page-content"
      :class="{
        show: showContent,
      }"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';

import { animationDelays } from '~/lib/delays';

@Component({})
export default class PageContainer extends Vue {
  private showContent: boolean = false;

  @Prop({ default: false })
  show!: boolean;

  @Watch('show')
  onShowChange() {
    if (!this.show) return;
    setTimeout(() => {
      this.showContent = true;
    }, animationDelays.slow);
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  height: 100%;
  width: $page-box-width;
  background-color: $light-golden;
  border: 0.25rem solid $harsh-golden;
  border-bottom: 0px;
  border-radius: 2rem;
  padding: 2rem;
  margin: auto;
  margin-top: 43rem;
  opacity: 0.1;
  transition: margin-top 1000ms ease-out, opacity 300ms ease-in;

  &.show {
    margin-top: 2rem;
    opacity: 0.9;
    box-shadow: -2px 0px 8px $light-golden, 2px 0px 8px $light-golden;
  }

  .page-content {
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
    color: white;
    letter-spacing: 0.1rem;
    padding-bottom: 1rem;
    opacity: 0;
    transition: 1000ms ease-out;

    &.show {
      opacity: 1;
    }
  }
}
</style>
