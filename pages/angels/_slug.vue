<template>
  <div class="container">angel page</div>
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
  async asyncData({ params }) {
    console.log(params)
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.container {
  width: $page-box-width;
}
</style>
