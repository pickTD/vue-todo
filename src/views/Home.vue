<template>
  <div class="homepage-content">
    <div class="app-title">
      <h1>TODO APP</h1>
      <note-controls
        @add="add"
      />
    </div>
    <todo-note
      v-for="note in notes"
      :key="note.id"
      :note="note"
      :todos-limit="4"
      @edit="editNote"
      @delete="deleteNote"
    />
  </div>
</template>

<script>
import NoteControls from '@/components/NoteControls.vue';
import TodoNote from '@/components/TodoNote.vue';
import uuid from 'uuid';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    NoteControls,
    TodoNote,
  },
  computed: {
    ...mapGetters({
      notes: 'getAllNotes',
    }),
  },
  methods: {
    ...mapActions([
      'addNote',
      'deleteNote',
    ]),
    editNote(id) {
      this.$router.push({ name: 'edit', params: { id } });
    },
    add() {
      const id = uuid.v4();
      this.addNote({ title: '', id, todos: [] });
      this.editNote(id);
    },
  },
};
</script>

<style lang="stylus" scoped>
.homepage-content
  display flex
  flex-direction column
  width 100%
  margin 0
</style>
