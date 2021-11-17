<template>
  <div class="home">
    <div class="header">
      <div
        class="stars"
        :class="{
          fade: pageStep >= 1,
        }"
      >
        <lottie-player
          src="/home-star.json"
          background="transparent"
          speed="1"
          autoplay
          renderer="canvas"
        />
      </div>
      <lottie-player
        id="lottieAngelPlayer"
        src="/home-angel.json"
        background="transparent"
        speed="1"
        autoplay
        class="angel"
      />
      <nuxt-link
        to="/about"
        class="about-link"
        :class="{
          show: pageStep >= 2,
        }"
      >
        <v-icon color="white">
          help_outline
        </v-icon>
      </nuxt-link>
    </div>
    <bubble-box
      :show="pageStep >= 1"
      :is-speech="hasVisitedAngelsPage"
      @done="onSpeechDone"
    />
    <div class="footer">
      <v-btn
        color="primary"
        elevation="4"
        raised
        rounded
        nuxt
        :class="{
          show: pageStep >= 2,
        }"
        @click="onClick"
      >
        {{ buttonText }}
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { IAngel } from '~/types/angel';
import { IAnimation } from '~/types/animation';
import { animationDelays } from '~/lib/delays';
import BubbleBox from '~/components/BubbleBox.vue';

@Component({
  components: {
    BubbleBox,
  },
  async asyncData({ $content }) {
    const angelData = await $content('angels')
      .fetch()
      .catch((err: unknown) => {
        console.error(err);
      });
    const animationData: any = await $content('animations')
      .fetch()
      .catch((err: unknown) => {
        console.error(err);
      });
    return { angelData, animationData };
  },
})
export default class IndexPage extends Vue {
  private angelData: IAngel[] = [];
  private animationData: IAnimation[] = [];
  private pageStep: number = 0;
  private greetings: boolean = false;
  private button: boolean = false;
  private hasVisitedAngelsPage: boolean = false;

  get angels(): IAngel[] {
    return this.$store.getters['angels/angels'];
  }
  get buttonText(): string {
    if (this.hasVisitedAngelsPage) {
      return 'Meet another Angel';
    }
    return 'Meet an Angel';
  }

  beforeRouteEnter(to: unknown, from: any, next: any) {
    next((vm: any) => {
      vm.hasVisitedAngelsPage = from && from.name === 'angels-slug';
    });
  }
  mounted() {
    this.$store.commit('animations/setAnimations', this.animationData);
    this.$store.commit('angels/setAngels', this.angelData);
    const lottieAngelPlayer = document.getElementById('lottieAngelPlayer');
    if (!lottieAngelPlayer) return;
    lottieAngelPlayer.addEventListener('complete', () => {
      if (this.pageStep !== 0) return;
      this.loadPageNextStep();
      setTimeout(() => {
        this.$nuxt.$emit('activate-single-animator');
        setTimeout(() => {
          this.$nuxt.$emit('activate-multiple-animator');
        }, animationDelays.animator * 10);
      }, animationDelays.animator);
    });
  }

  public loadPageNextStep(delaySpeed: string = '') {
    setTimeout(() => {
      this.pageStep++;
    }, animationDelays[delaySpeed] || animationDelays.fast);
  }
  public onSpeechDone() {
    this.loadPageNextStep();
  }
  public onClick() {
    const index = Math.floor(Math.random() * this.angels.length);
    let angel = this.angels[index];
    const shared = location.search.split('s=')[1];
    if (shared) {
      const slug = atob(decodeURIComponent(shared));
      angel = this.angels.find(a => a.slug === slug) || angel;
    }
    this.$router.push(`/angels/${angel.slug}`);
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: center;;

    .angel {
      width: 22rem;
    }

    .stars {
      position: absolute;
      left: 1.5rem;
      top: -5rem;
      width: 100%;
      opacity: 0.5;
      transition: 1800ms ease-in;

      &.fade {
        opacity: 0.2;
        top: -26rem;
      }
    }

    .about-link {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      overflow: hidden;

      ::v-deep .v-icon {
        font-size: 4.3rem;
        opacity: 0;
        transition: 1000ms ease-out;
      }

      &.show {
        ::v-deep .v-icon {
          opacity: 0.8;
        }
      }
    }
  }

  .footer {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep .v-btn {
      width: 0%;
      opacity: 0;
      padding: 2rem;
      font-size: 2rem;
      border-radius: 2rem;
      transition: 1000ms ease-out;

      &.show {
        width: $page-box-width;
        opacity: 1;
      }
    }
  }
}

@media (orientation: portrait) {
  .home {
    .header {
      .angel {
        width: 26rem;
      }

      .stars {
        top: 2rem;

        &.fade {
          top: -8rem;
        }
      }

      .about-link {
        ::v-deep .v-icon {
          font-size: 4.5rem;
        }
      }
    }
    .footer {
      ::v-deep .v-btn {
        font-size: 2.3rem;
        padding: 2.5rem 2rem;
      }
    }
  }
}
</style>
