<template>
  <div
    class="background-animator-container"
    :style="containerStyles"
  >
    <lottie-player
      v-if="animation"
      :src="`/animations/${animation.file}.json`"
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

import { Animation } from '~/models/animation';
import { FrequencyRange } from '~/models/frequency';
import {
  IAnimation,
  Movement,
  Position,
  PositionName,
} from '~/types/animation';
import { frequency } from '~/types/frequency';

type componentType = 'single' | 'multiple';

@Component({})
export default class BackgroundAnimator extends Vue {
  @Prop({ required: true })
  type!: componentType;

  @Prop({ default: '' })
  name?: string;

  @Prop({ default: 'medium' })
  frequency!: frequency;

  @Prop({ default: () => [] })
  exclude!: string[];

  private movementInterval: ReturnType<typeof setInterval> | null = null;

  private windowWidth: number = 0;
  private windowHeight: number = 0;

  private animation: Animation | null = null;
  private frequencyRange!: FrequencyRange;

  private containerZIndex: number = 0;
  private containerOpacity: number = 0;

  private movStep: number = 120;

  get isSingle(): boolean {
    return !!(this.type === 'single' && this.name);
  }

  get animationData(): IAnimation | IAnimation[] {
    if (this.isSingle) {
      return this.$store.getters['animations/getAnimation'](this.name) as IAnimation;
    }
    return this.$store.getters['animations/animations'];
  }

  get containerStyles() {
    const appBgImg = document.querySelector('.app-background-image');
    const styles = {
      'opacity': this.containerOpacity,
    };
    if (!this.animation || !appBgImg) {
      return styles;
    }
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

  public async animate(lastAnimated?: string) {
    const hasPersistentAnimation = this.isSingle && this.animationData;
    const hasAnimationArray = !this.isSingle && (this.animationData as IAnimation[]).length;

    if (!hasPersistentAnimation && !hasAnimationArray) return;

    if (this.movementInterval) {
      this.unanimate();
      await this.$nextTick();
    }

    let nextAnimation: IAnimation;

    if (this.isSingle) {
      nextAnimation = this.animationData as IAnimation;
    } else {
      const animations: IAnimation[] = (this.animationData as IAnimation[]).filter((a) => {
        return (!lastAnimated || a.name !== lastAnimated) && !this.exclude.includes(a.name);
      });
      const aIndex = Math.floor(Math.random() * animations.length);
      nextAnimation = animations[aIndex];
    }

    this.animation = new Animation(nextAnimation, this.windowWidth, this.windowHeight);

    setTimeout(() => {
      this.containerOpacity = 1;

      if (!this.animation) return;

      const step = (this.animation!.duration * 1000) / this.movStep;
      const intervalStep: number = Math.floor(step);
      this.movementInterval = setInterval(() => {
        if (!this.animation) return
        const isVisible = this.animation.move(this.windowWidth, this.windowHeight, intervalStep);
        if (this.movementInterval && !isVisible) {
          const { name } = this.animation;
          this.unanimate();
          setTimeout(() => {
            this.animate(name);
          }, this.frequencyRange.getValue());
        }
      }, intervalStep);
    }, 100);
  }

  public unanimate() {
    if (!this.movementInterval) return;
    clearInterval(this.movementInterval);
    this.animation = null;
    this.containerOpacity = 0;
  }

  mounted() {
    this.frequencyRange = new FrequencyRange(this.frequency);

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

    const onVisibilitChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(() => {
          this.animate();
        }, this.frequencyRange.getValue());
      } else {
        this.unanimate();
      }
    };
    window.addEventListener('visibilitychange', onVisibilitChange);

    this.animate();
  }
}
</script>
<style lang="scss" scoped>
.background-animator-container {
  width: 100%;
  height: 100%;
  position: absolute;
  transition: opacity 1200ms ease-out;

  .animation {
    position: absolute;

    &.xsmall {
      width: 7.25rem;
      height: 7.25rem
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
      width: 15rem;
      height: 15rem;
    }

    &.xlarge {
      width: 18rem;
      height: 18rem;
    }
  }
}
</style>
