<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    max-width="600"
  >
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <slot name="activator" />
      </div>
    </template>
    <template v-slot:default>
      <v-card>
        <v-toolbar
          color="primary"
        >
          {{ title }}
        </v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">
            <slot name="body" />
          </div>
        </v-card-text>
        <v-card-actions
          v-if="$slots.actions"
          class="justify-end"
        >
          <slot name="actions" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';

@Component({})
export default class DefaultDialog extends Vue {
  private dialog: boolean = false;

  mounted() {
    this.$nuxt.$on('open-dialog', () => {
      this.dialog = true;
    })
  }
};
</script>
<style lang="scss" scoped>

</style>
