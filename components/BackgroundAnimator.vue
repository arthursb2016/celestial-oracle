<template>
  <div class="background-animator-container">
    <lottie-player
      v-if="animation"
      id="backgroundAnimation"
      :src="`/animations/${animation.name}.json`"
      mode="bounce"
      background="transparent"
      speed="1"
      autoplay
      loop
      class="animation"
      :style="animationStyles"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { IAnimation } from '~/types/animation';
import { Animation } from '~/models/animation';

@Component({})
export default class BackgroundAnimator extends Vue {
  private movementInterval: ReturnType<typeof setInterval> | null = null;

  private windowWidth: number = 0;
  private windowHeight: number = 0;

  private animations: IAnimation[] = [];
  private animation: Animation | null = null;

  public animate() {
    if (!this.animations.length) return;
    const index = Math.floor(Math.random() * this.animations.length);
    const animation = new Animation(this.animations[index]);
    console.log('i animate');
    console.log(animation);
    /*const movIntervalStep = 
    this.movementInterval = setInterval(() => {
      this.bottom += this.windowHeight / intervalStep;
      this.left += this.windowWidth / intervalStep;
    }, intervalStep);*/
  }

  mounted() {
    const updateWindowDimensions = () => {
      this.windowWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

      this.windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    };

    window.addEventListener('resize', updateWindowDimensions);

    updateWindowDimensions();

   this.$nuxt.$on('activate-background-animation', (animationData: IAnimation[]) => {
     this.animations = [...animationData];
     this.animate();
   });
  }
}
</script>
<style lang="scss" scoped>
.background-animator-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  opacity: 0.6;

  .animation {
    position: absolute;
    width: 10rem;
    height: 10rem;
  }
}
</style>
