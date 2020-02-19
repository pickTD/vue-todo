<template>
  <div class="note-controls">
    <button
      v-for="button in controls"
      :key="button.type"
      :class="['button', `button--${button.type}`, { 'button--disabled': button.disabled }]"
      :disabled="button.disabled"
      @click="$emit(button.type)"
    >
      {{ button.type }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NoteControls',
  computed: {
    ...mapGetters([
      'isCancelAvailable',
      'isUndoAvailable',
      'isRedoAvailable',
    ]),
    controls() {
      switch (this.$route.name) {
        case 'home':
          return [{ type: 'add', disabled: false }];
        case 'edit':
          return [
            { type: 'save', disabled: false },
            { type: 'cancel', disabled: !this.isCancelAvailable },
            { type: 'delete', disabled: false },
            { type: 'undo', disabled: !this.isUndoAvailable },
            { type: 'redo', disabled: !this.isRedoAvailable },
          ];
        default:
          return [];
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.note-controls
  display flex
.button
  border-radius 4px
  width 70px
  height 40px
  &:not(:last-child)
    margin-right 10px
</style>
