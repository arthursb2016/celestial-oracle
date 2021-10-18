<template>
  <div id="bubble">
  </div>
</template>
<script>
import { typewriter } from '../lib/typewritter';
import { greetings } from '../lib/speeches';

const TRANSITION_DURATION_MS = 600;
const TYPEWRITER_SPEED_MS = 80;

export default {
  name: 'WelcomeGreetings',
  components: {},
  mixins: [],
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    show() {
      if (!this.show) return;
      const bubble = document.getElementById('bubble');
      bubble.style.transition = `${TRANSITION_DURATION_MS}ms ease-out`;
      bubble.className = 'show';
      setTimeout(() => {
        typewriter(bubble, greetings[0](), TYPEWRITER_SPEED_MS, () => this.$emit('done'));
      }, TRANSITION_DURATION_MS / 2);
    },
  },
  mounted() {},
  methods: {},
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

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}
</style>
