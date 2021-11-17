<template>
  <v-app>
    <v-main
      class="app-container"
      :class="{
        'day': !isNight,
        'night': isNight,
      }"
    >
      <background-animator-container />
      <div
        class="app-background-image"
        :class="{
          'night': isNight,
        }"
      ></div>
      <div class="app-content">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { getCurrentHour } from '~/lib/functions/datetime';

import BackgroundAnimatorContainer from '~/components/BackgroundAnimatorContainer.vue';

@Component({
  components: {
    BackgroundAnimatorContainer,
  },
})
export default class DefaultLayout extends Vue {
  private isNight: boolean = false;

  mounted() {
    const currHour = getCurrentHour();
    this.isNight = currHour >= 18 || currHour < 5;
  }
}
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

  &.night {
    background-color: $background-black;
  }

  .app-background-image {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    background-image: url('assets/background.png');
    background-size: cover;
    background-position: center center;

    &.night {
      opacity: 0.8;
    }
  }

  .app-content {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
  }
}
</style>
