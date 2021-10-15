<template>
  <page-container :show="showPage">
    <div class="body">
      <div class="content">
        <v-tabs
          grow
          background-color="transparent"
        >
          <v-tab>
            About Angels
          </v-tab>
          <v-tab>
            About the Website
          </v-tab>
          <v-tab-item>
            <nuxt-content
              :document="aboutAngels"
            />
          </v-tab-item>
          <v-tab-item>
            Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
          </v-tab-item>
        </v-tabs>
      </div>
      <page-footer
        show
      >
        <a
          href="https://www.youtube.com/watch?v=C_e-XtC1dDI"
          target="_blank"
          class="link"
        >
          <v-icon
            color="primary"
            class="mr-1 mb-2"
          >
            ondemand_video
          </v-icon>
          Bring the Angels to your life
        </a>
      </page-footer>
    </div>
  </page-container>
</template>
<script>
import animationDelays from '~/lib/delays';

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
  async asyncData({ $content }) {
    const aboutAngels = await $content('about/angels')
      .fetch()
      .catch((err) => {
        console.error(err);
      });
    return { aboutAngels };
  },
  async mounted() {
    setTimeout(() => {
      this.showPage = true;
    }, animationDelays.pageMounted);
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.body {
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    flex-grow: 1;
  }
}

::v-deep .v-tabs{
  font-size: 1.8rem;
  text-align: justify;

  .v-tabs-bar {
    height: 3.8rem;
  }
  .v-tab {
    font-size: 2.1rem;

    &:not(.v-tab--active) {
      color: $text-grey;
    }
  }
  .v-tabs-items {
    background-color: transparent;
    margin-top: 2rem;
  }
}

::v-deep .v-icon {
  font-size: 2.2rem;
}

.link {
  text-decoration: none;
}
</style>
