<template>
  <page-container :show="showPage">
    <div class="body">
      <h2>
        The Angels
      </h2>
      <div class="content">
        Blah blah blah
      </div>
      <h2>
        About the website
      </h2>
      <div class="content">
        Di di di di
      </div>
    </div>
  </page-container>
</template>
<script>
import PageContainer from '~/components/PageContainer';

export default {
  name: '',
  components: {
    PageContainer,
  },
  mixins: [],
  props: {},
  data() {
    return {
      showPage: false,
    };
  },
  computed: {},
  mounted() {
    this.showPage = true;
  },
  methods: {},
};
</script>
<style lang="scss" scoped>

</style>