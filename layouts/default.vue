<template>
  <v-app>
    <v-main class="app-container">
      <div class="app-background-image"></div>
      <div class="app-content">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: '',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
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
  background-color: $background-blue;

  .app-background-image {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background-image: url('assets/background.jpg');
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
