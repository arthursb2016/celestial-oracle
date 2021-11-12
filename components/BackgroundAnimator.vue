<template>
  <div
    id="backgroundAnimatorContainer"
    :style="containerStyles"
  >
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
      :class="{
        [animation.size]: true,
        [animation.movement.depth]: true,
      }"
      :style="animationStyles"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import {
  IAnimation,
  Movement,
  Position,
  PositionName,
} from '~/types/animation';
import { Animation } from '~/models/animation';

@Component({})
export default class BackgroundAnimator extends Vue {
  private movementInterval: ReturnType<typeof setInterval> | null = null;

  private windowWidth: number = 0;
  private windowHeight: number = 0;

  private animations: IAnimation[] = [];
  private animation: Animation | null = null;

  private containerZIndex: number = 0;

  private movStep: number = 100;


  get containerStyles() {
    if (!this.animation) return {};
    const appBgImg = document.querySelector('.app-background-image');
    if (!appBgImg) return {};
    const zIndex = window.getComputedStyle(appBgImg).getPropertyValue('z-index');
    const movement: Movement = this.animation.movement;
    const value = movement.depth === 'behindClouds' ? -1 : 1;
    return {
      'z-index': parseInt(zIndex) + value,
    };
  }

  get animationStyles() {
    if (!this.animation) return {};
    const movement: Movement = this.animation.movement;
    const position: Position = this.animation.position;
    const styles: any = {
      opacity: this.animation.opacity,
      transform: movement.transform ? movement.transform : '',
    };
    const positionNames: PositionName[] = ['top', 'right', 'bottom', 'left'];
    positionNames.forEach((pos) => {
      if (position[pos] !== null) {
        styles[pos] = `${position[pos]}px`;
      }
    });
    return styles;
  }

  public animate() {
    if (!this.animations.length) {
      return;
    }
    const index = Math.floor(Math.random() * this.animations.length);
    this.animation = new Animation(this.animations[index], this.windowWidth, this.windowHeight);
    const movIntervalStep: number = (this.animation.duration * 1000) / this.movStep;
    this.movementInterval = setInterval(() => {
      if (!this.animation) return;
      const isVisible = this.animation.move(this.windowWidth, this.windowHeight, movIntervalStep);
      if (this.movementInterval && !isVisible) {
        clearInterval(this.movementInterval);
        this.animate();
      }
    }, movIntervalStep);
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
#backgroundAnimatorContainer {
  width: 100%;
  height: 100%;
  position: absolute;

  .animation {
    position: absolute;

    &.small {
      width: 8.5rem;
      height: 8.5rem;
    }

    &.medium {
      width: 10rem;
      height: 10rem;
    }

    &.large {
      width: 11.6rem;
      height: 11.6rem;
    }
  }
}
</style>
