<template>
  <div class="background-animator-controller">
    <background-animator
      v-if="singleAnimations"
      key="singleAnimation-1"
      type="single"
      name="shooting-star-left"
      frequency="medium"
    />
    <background-animator
      v-if="singleAnimations"
      key="singleAnimation-2"
      type="single"
      name="shooting-star-right"
      frequency="medium"
    />
    <background-animator
      v-if="multipleAnimations"
      key="multipleAnimator"
      type="multiple"
      :exclude="['shooting-star-left', 'shooting-star-right']"
      frequency="low"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BackgroundAnimator from './BackgroundAnimator.vue';

@Component({
  components: {
    BackgroundAnimator,
  },
})
export default class BackgroundAnimatorController extends Vue {
  private singleAnimations: boolean = false;
  private multipleAnimations: boolean = false;

  mounted() {
    this.$nuxt.$on('activate-single-animator', () => {
      this.singleAnimations = true;
    });
    this.$nuxt.$on('activate-multiple-animator', () => {
      this.multipleAnimations = true;
    });
  }
}
</script>
<style lang="scss" scoped>
.background-animator-controller { 
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
