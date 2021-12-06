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
        <div class="content">
          <h2 class="angel-name">
            {{ angel.name }}
          </h2>
          <div class="angel-description mb-8">
            {{ angel.description }}
          </div>
          <div class="primary--text angel-phrase">
            "{{ angel.phrase }}"
          </div>
        </div>
        <page-footer
          :show="showFooter"
        >
          <div class="share-container">
            Share:
            <v-img
              :src="require('~/assets/icons/whatsapp.svg?inline')"
              @click="onShare('whatsapp')"
            />
          </div>
        </page-footer>
      </div>
    </div>
  </page-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { angelsStore } from '~/store';
import { animationDelays } from '~/lib/delays';
import { Angel } from '~/models/angel';

import PageContainer from '~/components/PageContainer.vue';
import PageFooter from '~/components/PageFooter.vue';

type shareMethod = 'whatsapp';

@Component({
  components: {
    PageContainer,
    PageFooter,
  },
  async asyncData({ params }) {
    const { slug } = params;
    return { slug };
  },
})
export default class SlugPage extends Vue {
  private showPage: boolean = false;
  private showFooter: boolean = false;
  private slug: string = '';
  private angel: Angel = new Angel();

  head() {
    return {
      title: this.angel.name,
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.angel.phrase,
        },
      ],
    };
  }

  mounted() {
    const angel = angelsStore.getAngel(this.slug);
    if (!angel) {
      console.error('Angel not found');
      this.$router.push('/');
      return;
    }
    setTimeout(() => {
      this.showPage = true;
      this.angel = new Angel(angel);
      setTimeout(() => {
          this.showFooter = true;
      }, animationDelays.footer);
    }, animationDelays.pageMounted);
  }

  public onShare(method: shareMethod) {
    const origin = window.location.origin;
    const slug = btoa(this.angel.slug);
    const m1 = 'Hey there';
    const m2 = 'I met an actual Angel today and wanted to share a very special message from it with you';
    const m3 = 'Access the following link to see it';
    const message = `${m1}! ${m2}. ${m3}: ${origin}?s=${slug}`;
    if (method === 'whatsapp') {
      window.open(`https://wa.me?text=${encodeURIComponent(message)}`, '_blank');
    }
  }
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
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 2.5rem;
    text-align: center;

    .content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      max-height: 90%;

      .angel-name {
        border-bottom: 2px solid white;
        margin-bottom: 1rem;
      }

      .angel-description, .angel-phrase {
        text-align: justify;
        font-size: 1.8rem;
      }

      .angel-description {
        overflow-y: auto;
      }
      .angel-phrase {
        font-style: italic;
      }
    }
  }
}

.link {
  color: $text-grey;
  text-decoration: none;
  font-weight: 600;
}

.share-container {
  padding: 0.3em 0.6rem;
  border-radius: 0.4rem;
  background: rgba(0, 0, 0, 0.54);
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;

  ::v-deep .v-image {
    width: 2.2rem;
    margin-left: 0.5rem;
    cursor: pointer;
  }
}

@media (orientation: portrait) {
  .body {
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;

    .image-column {
      align-items: center;
      font-size: 1.6rem;
      margin-bottom: 1.5rem;

      .angel-image {
        max-width: 14rem;
      }
    }

    .content-column {
      padding-left: 0rem;
      padding-top: 1rem;

      .content {
        max-height: none;

        .angel-description, .angel-phrase {
          text-align: justify;
          font-size: 2.1rem;
          overflow: hidden;
        }

        .angel-phrase {
          margin-bottom: 2rem;
        }
      }
    }
  }
}
</style>
