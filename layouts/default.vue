<template>
  <v-app>
    <v-main
      class="app-container"
      :class="{
        'day': !isNight,
        'night': isNight,
      }"
    >
      <div class="app-background-image"></div>
      <div class="app-content">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>
<script>
import { getCurrentHour } from '~/lib/functions/datetime';

export default {
  name: '',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      isNight: false,
    };
  },
  computed: {},
  mounted() {
    const currHour = getCurrentHour();
    this.isNight = currHour >= 18 || currHour < 5;
  },
  methods: {},
};
</script>
<style lang="scss">
@import '~/assets/queries.scss';

html, body {
  overflow: hidden;
}

.app-container {
  position: relative;
  
  &.day {
    background-color: $background-blue;
  }

  .app-background-image {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background-image: url('assets/background.png');
    background-size: cover;
    background-position: center center;
  }

  .app-content {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
  }
}
</style>
