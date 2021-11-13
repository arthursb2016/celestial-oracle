<template>
  <div
    class="background-animator-container"
    :style="containerStyles"
  >
    <lottie-player
      v-if="animation"
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
import { Component, Vue, Prop } from 'vue-property-decorator';

import {
  IAnimation,
  Movement,
  Position,
  PositionName,
} from '~/types/animation';
import { Animation } from '~/models/animation';

@Component({})
export default class BackgroundAnimator extends Vue {
  @Prop({ default: '' })
  persist?: string | string[];

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

  public animate(lastAnimated?: string) {
    if (!this.animations.length) return;

    if (this.movementInterval) {
      clearInterval(this.movementInterval);
    }

    const animations = this.animations.filter((a) => {
      if (!this.persist && lastAnimated) {
        return a.name !== lastAnimated;
      }
      return true;
    });

    const aIndex = Math.floor(Math.random() * animations.length);
    this.animation = new Animation(animations[aIndex], this.windowWidth, this.windowHeight);

    if (!this.animation) return;

    setTimeout(() => {
      this.containerOpacity = 1;

      const step = (this.animation!.duration * 1000) / this.movStep;
      const intervalStep: number = Math.floor(step);
      this.movementInterval = setInterval(() => {
        if (!this.animation) return
        const isVisible = this.animation.move(this.windowWidth, this.windowHeight, intervalStep);
        if (this.movementInterval && !isVisible) {
          const { name } = this.animation;
          clearInterval(this.movementInterval);
          this.animation = null;
          this.containerOpacity = 0;
          const minToNext = !!this.persist ? 1000 : 2000;
          const maxToNext = !!this.persist ? 2000 : 3500;
          const nextTimeout = Math.floor(Math.random() * (maxToNext - minToNext + 1) + minToNext);
          setTimeout(() => {
            this.animate(name);
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
      if (this.movementInterval) return;
      this.animations = [...animationData].filter((i) => {
        if (this.persist) {
          return i.name === this.persist;
        }
        return true;
      });
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
  transition: opacity 1000ms ease-out;

  .animation {
    position: absolute;

    &.xsmall {
      width: 7.5rem;
      height: 7.5rem
    }

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

    &.xlarge {
      width: 15rem;
      height: 15rem;
    }

    &.xxlarge {
      width: 18rem;
      height: 18rem;
    }
  }
}
</style>
