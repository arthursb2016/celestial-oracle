<template>
  <div class="background-animator-controller">
    <background-animator
      v-for="(sa, indexS) in singleAnimations"
      :key="indexS"
      type="single"
      :name="sa.name"
      :frequency="sa.frequency"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BackgroundAnimator from './BackgroundAnimator.vue';

const singleAnimations = [
  {
    name: 'shooting-star',
    frequency: 'high',
  },
  {
    name: 'shooting-star',
    frequency: 'medium',
  }
];

@Component({
  components: {
    BackgroundAnimator,
  },
})
export default class BackgroundAnimatorController extends Vue {
  private singleAnimations: any = [];

  mounted() {
    this.$nuxt.$on('activate-single-animator', () => {
      this.singleAnimations = [...singleAnimations];
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
