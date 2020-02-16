<template>
  <div class="note-controls">
    <button
      v-for="button in controls"
      :key="button"
      :class="`button button--${button}`"
      @click="$emit(button)"
    >
      {{ button }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'NoteControls',
  data() {
    return {
      homeControls: [
        'add',
      ],
      editControls: [
        'save',
        'cancel',
        'delete',
        'undo',
        'redo',
      ],
    };
  },
  computed: {
    controls() {
      switch (this.$route.name) {
        case 'home':
          return this.homeControls;
        case 'edit':
          return this.editControls;
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
