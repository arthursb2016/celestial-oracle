<template>
  <page-container :show="showPage">
    <div
      v-if="angel.slug"
      class="body"
      :class="{
        show: showContent,
      }"
    >
      <div class="image-column">
        <v-img
          :src="require(`/assets/angels/${angel.slug}.jpg`)"
          alt="Image of a beatiful Angel"
          class="angel-image"
        />
        <div>
          Image from:
        </div>
        <div>
          <a
            :href="angel.img_author_link"
            target="_blank"
            class="link"
          >
            {{ angel.img_author }}
          </a>
        </div>
      </div>
      <div class="content-column">
        <h2 class="angel-name">
          {{ angel.name }}
        </h2>
        <div class="angel-description mb-8">
          {{ angel.description }}
        </div>
        <div class="primary--text angel-phrase">
          "{{ angel.phrase }}"
        </div>
        <div
          class="content-footer"
          :class="{
            show: showContentFooter,
          }"
        >
          <v-icon
            class="back-icon"
            @click="$router.push('/')"
          >
            keyboard_return
          </v-icon>
        </div>
      </div>
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
      showContent: false,
      showContentFooter: false,
      angel: {},
    };
  },
  computed: {},
  async asyncData({ params }) {
    const { slug } = params;
    return { slug };
  },
  async mounted() {
    /* remove this later */
    const data = await this.$content('angels')
      .fetch()
      .catch((err) => {
        console.error(err);
      });
    this.$store.commit('angels/setAngels', data);
    /* end of remove later */
    this.showPage = true;
    const angel = this.$store.getters['angels/getAngel'](this.slug);
    if (!angel) {
      console.error('Angel not found');
      this.$router.push('/');
      return;
    }
    this.angel = { ...angel };
    setTimeout(() => {
        this.showContentFooter = true;
    }, animationDelays.slow * 6);
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.body {
  display: flex;
  height: 100%;

  .image-column {
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;

    .angel-image {
      max-width: 20rem;
      margin-bottom: 2rem;
      max-height: 75%;
    }
  }

  .content-column {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-left: 2.5rem;
    text-align: center;

    .angel-name {
      border-bottom: 2px solid white;
      margin-bottom: 1rem;
    }

    .angel-description, .angel-phrase {
      text-align: justify;
      font-size: 1.8rem;
    }

    .content-footer {
      flex-grow: 1;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      opacity: 0;
      transition: 1500ms ease out;

      &.show {
        opacity: 1;
      }

      ::v-deep .v-icon {
        font-size: 2.6rem;
        opacity: 0.8;
      }
    }
  }
}

.link {
  color: $text-grey;
  text-decoration: none;
}
</style>
