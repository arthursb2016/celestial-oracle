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
      loop
      autoplay
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
  private containerOpacity: number = 0;

  private movStep: number = 120;


  get containerStyles() {
    const styles = {
      'opacity': this.containerOpacity,
    };
    if (!this.animation) {
      return styles;
    }
    const appBgImg = document.querySelector('.app-background-image');
    if (!appBgImg) return {};
    const zIndex = window.getComputedStyle(appBgImg).getPropertyValue('z-index');
    const movement: Movement = this.animation.movement;
    const value = movement.depth === 'behindClouds' ? -1 : 1;
    return {
      ...styles,
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

  public animate(index?: number, count?: number) {
    if (!this.animations.length) return;

    if (this.movementInterval) {
      clearInterval(this.movementInterval);
    }

    const aIndex = typeof index !== 'undefined' ? index : Math.floor(Math.random() * this.animations.length);
    this.animation = new Animation(this.animations[aIndex], this.windowWidth, this.windowHeight);

    if (!this.animation) return;

    setTimeout(() => {
      this.containerOpacity = 1;

      const step = (this.animation!.duration * 1000) / this.movStep;
      const intervalStep: number = Math.floor(step);
      this.movementInterval = setInterval(() => {
        if (!this.animation) return
        const isVisible = this.animation.move(this.windowWidth, this.windowHeight, intervalStep);
        if (this.movementInterval && !isVisible) {
          clearInterval(this.movementInterval);
          const repeatCount = this.animation.repeat ? (this.animation.repeat - ((count || 0) + 1)) : 0;
          this.animation = null;
          this.containerOpacity = 0;
          const minToNext = 2000;
          const maxToNext = 3500;
          const nextTimeout = Math.floor(Math.random() * (maxToNext - minToNext + 1) + minToNext);
          setTimeout(() => {
            if (repeatCount) {
              this.animate(aIndex, repeatCount);
            } else {
              this.animate();
            }
          }, nextTimeout);
        }
      }, intervalStep);
    }, 100);
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
  transition: opacity 1000ms ease-out;

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
