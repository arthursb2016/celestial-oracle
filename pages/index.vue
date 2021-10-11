<template>
  <div class="home">
    <div class="header">
      <lottie-player
        id="lottiePlayer"
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
import WelcomeGreetings from '~/components/WelcomeGreetings';

const ANIMATION_DELAY = 200;

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
    const lottiePlayer = document.getElementById('lottiePlayer');
    try {
      lottiePlayer.addEventListener('complete', this.showGreetings);
      this.loadAngels();
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
      }, ANIMATION_DELAY);
    },
    onGreetingsDone() {
      setTimeout(() => {
        this.button = true;
      }, ANIMATION_DELAY);
    },
    onClick() {
      const angel = this.angels[Math.floor(Math.random() * this.angels.length)];
      this.$router.push(`/${angel.slug}`);
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
      transition: 600ms ease-out;

      &.show {
        width: $home-box-width;
        opacity: 1;
      }
    }
  }
}
</style>
