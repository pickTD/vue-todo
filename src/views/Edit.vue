<template>
  <div>
    <div class="app-title">
      <input
        type="text"
        class="note-edit__title"
        placeholder="note title"
        v-model.lazy="noteTitle"
      >
      <note-controls
        @delete="deleteNote(currentNote.id)"
        @save="save"
        @cancel="cancelChanges"
        @undo="undoChange"
        @redo="redoChange"
      />
    </div>
    <div class="input-wrapper">
      <button
        class="button button--add"
        @click="addTodo(currentNote)"
      >
        Add
      </button>
      <ul class="note-edit__list">
        <li
          v-for="todo in todos"
          :key="todo.id"
        >
          <todo-item
            :note-id="currentNote.id"
            :todo="todo"
            @editTodoTitle="editTodoTitle"
            @toggleTodo="toggleTodo"
            @deleteTodo="deleteTodo"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NoteControls from '@/components/NoteControls.vue';
import TodoItem from '@/components/TodoItem.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Edit',
  components: {
    NoteControls,
    TodoItem,
  },
  computed: {
    currentNote() {
      return this.$store.getters.getNoteById(this.$route.params.id);
    },
    todos() {
      return this.currentNote && this.currentNote.todos;
    },
    noteTitle: {
      get() { return this.currentNote && this.currentNote.title; },
      set(newVal) { this.editNoteTitle({ id: this.currentNote.id, title: newVal }); },
    },
  },
  watch: {
    currentNote(newVal) {
      if (!newVal) {
        this.$router.push({ name: 'home' });
      }
    },
  },
  mounted() {
    if (this.currentNote) {
      this.$store.commit('ADD_SNAPSHOT');
    } else {
      this.$router.push({ name: 'home' });
    }
  },
  methods: {
    ...mapActions([
      'deleteNote',
      'editNoteTitle',
      'addTodo',
      'editTodoTitle',
      'toggleTodo',
      'deleteTodo',
      'saveNote',
      'cancelChanges',
      'undoChange',
      'redoChange',
    ]),
    save() {
      this.saveNote();
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style lang="stylus" scoped>
.note-edit
  &__title
    display block
    font-size 2em
    margin 0.67em 0
    padding 4px
    font-weight bold
    border-radius 4px
  &__list
    margin 20px 0 0
    padding 0
    list-style none
.button
  border-radius 4px
  width 390px
  height 30px
</style>
