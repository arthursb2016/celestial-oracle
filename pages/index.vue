<template>
  <div class="home">
    <div class="header">
      <div
        class="stars"
        :class="{
          show: greetings,
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
    </div>
    <welcome-greetings
      :show="greetings"
      @done="onGreetingsDone"
    />
    <div class="footer">
      <v-btn
        color="primary"
        elevation="4"
        raised
        rounded
        nuxt
        :class="{
          show: button,
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
import WelcomeGreetings from '~/components/WelcomeGreetings';

export default {
  name: '',
  components: {
    WelcomeGreetings,
  },
  mixins: [],
  props: {},
  data() {
    return {
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
      lottieAngelPlayer.addEventListener('complete', this.showGreetings);
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
    showGreetings() {
      setTimeout(() => {
        this.greetings = true;
      }, animationDelays.fast);
    },
    onGreetingsDone() {
      setTimeout(() => {
        this.button = true;
      }, animationDelays.fast);
    },
    onClick() {
      const angel = this.angels[Math.floor(Math.random() * this.angels.length)];
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
      max-width: 25rem;
    }

    .stars {
      position: absolute;
      left: 1.5rem;
      top: -5rem;
      width: 100%;
      opacity: 0.5;
      transition: 1800ms ease-in;

      &.show {
        opacity: 0.2;
        top: -26rem;
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
      font-size: 2.25rem;
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
