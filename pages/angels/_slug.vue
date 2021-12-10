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
          Painted by:
        </div>
        <div class="author-container">
          <a
            :href="angel.img_author_link"
            target="_blank"
            class="link"
          >
            <v-icon class="mr-1">
              open_in_new
            </v-icon>
            {{ angel.img_author }}
          </a>
        </div>
      </div>
      <div class="content-column">
        <div class="content">
          <h2 class="angel-name">
            {{ angel.name }}
          </h2>
          <div class="angel-description">
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
import { isPortraitScreen } from '~/lib/functions/utils';

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
      this.$router.push('/');
      return;
    }
    setTimeout(() => {
      this.showPage = true;
      this.angel = new Angel(angel);
      this.$nextTick(() => {
        this.updateContentHeight();
        setTimeout(() => {
            this.showFooter = true;
            window.addEventListener('resize', this.updateContentHeight);
        }, animationDelays.footer);
      });
    }, animationDelays.pageMounted);
  }

  public updateContentHeight() {
    if (isPortraitScreen()) return;
    const angelImage: HTMLElement = document.querySelector('.angel-image') as HTMLElement;
    const contentContainer: HTMLElement = document.querySelector('.content') as HTMLElement;
    if (!angelImage || !contentContainer) {
      return;
    }
    contentContainer.style.maxHeight = `${angelImage.offsetHeight}px`;
  }

  public onShare(method: shareMethod) {
    const origin = window.location.origin;
    const slug = btoa(this.angel.slug);
    const m1 = 'Hey there!\n';
    const m2 = 'I just met an actual Angel and wanted to share a very special message from it with you.\n\n';
    const m3 = 'Check the following website, it was built to preserve and share a very special book\'s content.\n\n';
    const m4 = '\n\nTake 2 minutes from your day to read an inspirational message.\nOpen it up and then tell me later what you have felt or learned.\n\nI look forward to hear from you soon my dear, I wish you very well :)';
    const message = `${m1}${m2}${m3}${origin}?s=${slug}${m4}`;
    if (method === 'whatsapp') {
      window.open(`https://wa.me?text=${encodeURIComponent(message)}`, '_blank');
    }
  }
};
</script>
<style lang="scss" scoped>
.author-container {
  ::v-deep .v-icon {
    font-size: 1.6rem;
    margin-bottom: 0.3rem;
  }
}

.body {
  display: flex;
  height: 100%;

  .image-column {
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;

    .angel-image {
      width: 20rem;
      margin-bottom: 1rem;
      max-height: 76%;
      border-radius: 2rem;
      border-top-right-radius: 0;
      border-bottom-left-radius: 0;
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
      max-height: none;

      .angel-name {
        margin-bottom: 1rem;
        padding: 0;
        display: flex;
      }

      .angel-description, .angel-phrase {
        text-align: justify;
        font-size: 1.8rem;
      }

      .angel-description {
        overflow-y: auto;
        margin-bottom: 1rem;
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
      margin-bottom: 2rem;
      .angel-image {
        width: 80%;
        margin: auto;
        border-radius: 2rem;
      }
    }

    .content-column {
      padding-left: 0rem;

      .content {
        .angel-name {
          justify-content: center;
        }
        .angel-description {
          margin-bottom: 2rem;
        }
        .angel-description, .angel-phrase {
          text-align: justify;
          font-size: 2.1rem;
          overflow: hidden;
        }
        .angel-phrase {
          margin-bottom: 4rem;
        }
      }
    }
  }
}
</style>
