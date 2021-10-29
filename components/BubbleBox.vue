<template>
  <div id="bubble">
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';

import { typewriter } from '../lib/typewritter';
import { greetings, speeches } from '../lib/speeches';

const TYPEWRITER_SPEED_MS = 80;

const animationDelays = require('~/lib/delays');

@Component({})
export default class BubbleBox extends Vue {
  @Prop({ default: false })
  show!: boolean

  @Prop({ default: false })
  isSpeech!: boolean

  @Watch('show')
  onShowChange() {
    if (!this.show) return;
    const bubble = document.getElementById('bubble');
    if (!bubble) return;
    bubble.style.transition = `${animationDelays.slow}ms ease-out`;
    bubble.className = 'show';
    setTimeout(() => {
      const lines = this.isSpeech ? speeches : greetings;
      const index = Math.floor(Math.random() * lines.length);
      typewriter(bubble, lines[index](), TYPEWRITER_SPEED_MS, () => this.$emit('done'));
    }, animationDelays.slow / 2);
  }
};
</script>
<style lang="scss" scoped>
#bubble {
  font-size: 2.25rem;
  font-weight: 600;
  position: relative;
  background: $light-golden;
  border: 2px solid $harsh-golden;
  color: white;
  border-radius: 2rem;
  width: $page-box-width;
  margin: auto;
  margin-top: -3.75rem;
  padding: 1rem 2rem;
  text-align: justify;
  box-shadow: -2px 0px 8px $light-golden, 2px 0px 8px $light-golden;
  opacity: 0;

  &.show {
    opacity: 0.8;;
    margin-top: -1.75rem;
  }
}

#bubble:after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 38px solid transparent;
  border-bottom-color: $harsh-golden;
  border-top: 0;
  margin-left: -38px;
  margin-top: -38px;
}

@media (orientation: portrait) {
  #bubble {
    font-size: 3rem;
    margin-top: -2.9rem;
  }
}
</style>
