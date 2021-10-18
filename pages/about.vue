<template>
  <page-container :show="showPage">
    <div class="body">
      <div class="content">
        <v-tabs
          v-model="selectedTab"
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
            <div class="about-website-container">
              <v-img
                :src="require('~/assets/the-book.jpg')"
                alt="Image of a book"
                class="the-book-image"
              />
              <nuxt-content
                :document="aboutWebsite"
              />
            </div>
          </v-tab-item>
        </v-tabs>
      </div>
      <page-footer
        :show="showFooter"
      >
        <a
          :href="footerLink"
          target="_blank"
          class="link"
        >
          <v-icon
            v-if="selectedTab === 0"
            color="primary"
            class="mr-1 mb-2"
          >
            ondemand_video
          </v-icon>
          <v-img
            v-else
            :src="require('~/assets/icons/github.svg?inline')"
            class="github-icon"
          />
          {{ footerText }}
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
      selectedTab: 0,
      showPage: false,
      showFooter: false,
    };
  },
  computed: {
    footerLink() {
      if (this.selectedTab === 0) {
        return 'https://www.youtube.com/watch?v=C_e-XtC1dDI';
      }
      return 'https://github.com/arthursb2016/house-of-angels';
    },
    footerText() {
      if (this.selectedTab === 0) {
        return 'Bring Angels to your life';
      }
      return 'Check out the repository';
    },
  },
  async asyncData({ $content }) {
    const aboutAngels = await $content('about/angels')
      .fetch()
      .catch((err) => {
        console.error(err);
      });
    const aboutWebsite = await $content('about/website')
      .fetch()
      .catch((err) => {
        console.error(err);
      });
    return { aboutAngels, aboutWebsite };
  },
  async mounted() {
    setTimeout(() => {
      this.showPage = true;
      setTimeout(() => {
        this.showFooter = true;
      }, animationDelays.footer);
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

    .about-website-container {
      display: flex;

      .the-book-image {
        max-width: 20rem;
        opacity: 0.9;
        margin-right: 2rem;
        border-radius: 1rem;
      }
    }
  }
}

::v-deep .v-tabs {
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

.github-icon {
  width: 1.8rem;
  display: inline-block;
}

.link {
  text-decoration: none;
}

@media (orientation: portrait) {
  .body {
    .content {
      .about-website-container {
        flex-direction: column;
        align-items: center;

        .the-book-image {
          max-width: 17rem;
          margin: 1rem 0rem;
        }
      }
    }
  }

  ::v-deep .v-tabs {
    .v-tab {
      font-size: 1.8rem;
    }
    .v-slide-group__prev.v-slide-group__prev--disabled {
      display: none !important;
    }
  }
}
</style>
