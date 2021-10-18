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
        Meet an Angel
      </v-btn>
    </div>
  </div>
</template>
<script>
import animationDelays from '~/lib/delays';
import BubbleBox from '~/components/BubbleBox';

export default {
  name: '',
  components: {
    BubbleBox,
  },
  mixins: [],
  props: {},
  data() {
    return {
      pageStep: 0,
      greetings: false,
      button: false,
    };
  },
  computed: {
    angels() {
      return this.$store.getters['angels/angels'];
    },
  },
  mounted() {
    const lottieAngelPlayer = document.getElementById('lottieAngelPlayer');
    try {
      this.loadAngels();
      lottieAngelPlayer.addEventListener('complete', () => {
        this.loadPageNextStep();
      });
    } catch(err) {
      console.error(err);
    }
  },
  methods: {
    async loadAngels() {
      const data = await this.$content('angels')
        .fetch()
        .catch((err) => {
          console.error(err);
        });
      this.$store.commit('angels/setAngels', data);
    },
    loadPageNextStep(delaySpeed) {
      setTimeout(() => {
        this.pageStep++;
      }, animationDelays[delaySpeed] || animationDelays.fast);
    },
    onSpeechDone() {
      this.loadPageNextStep();
    },
    onClick() {
      const index = Math.floor(Math.random() * this.angels.length);
      const angel = this.angels[index];
      this.$router.push(`/angels/${angel.slug}`);
    },
  },
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
</style>
