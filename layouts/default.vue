<template>
  <v-app>
    <v-main class="app-container">
      <Nuxt />
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
html, body {
  overflow: hidden;
  font-size: 32px;;
}

.app-container {
  background-color: $background-blue;
  background-image: url('assets/background.jpg');
  background-size: cover;
  background-position: center center;
}
</style>
