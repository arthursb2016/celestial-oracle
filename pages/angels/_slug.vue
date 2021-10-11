<template>
  <page-container :show="showPage">
    <div
      v-if="angel.slug"
      class="body"
    >
      <div class="image-column">
        <v-img
          :src="require(`/assets/angels/${angel.slug}.jpg`)"
          alt="Image of a beatiful Angel"
          class="angel-image"
        />
        Image from:
        <a
          :href="angel.img_author_link"
          target="_blank"
        >
          {{ angel.img_author }}
        </a>
      </div>
      <div class="content-column">
        <h1 class="angel-name">
          {{ angel.name }}
        </h1>
        <div class="angel-description">
          {{ angel.description }}
        </div>
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
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100%;
  font-size: 1.75rem;
  color: white;
  font-family: FANTASY;
  letter-spacing: 0.1rem;
  padding-bottom: 1rem;
  display: flex;

  .image-column {
    display: flex;
    flex-direction: column;

    .angel-image {
      max-width: 20rem;
      margin-bottom: 2rem;
    }
  }

  .content-column {
    flex-grow: 1;
    padding-left: 2.5rem;
    text-align: center;

    .angel-name {
      border-bottom: 2px solid white;
      margin-bottom: 1rem;
    }

    .angel-description {
      text-align: justify;
      font-size: 2rem;
    }
  }
}
</style>
