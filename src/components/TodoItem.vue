<template>
  <div class="todo-item">
    <input
      type="checkbox"
      class="todo-item__done"
      v-model="done"
    >
    <input
      type="text"
      class="todo-item__text"
      placeholder="what needs to be done?"
      v-model.lazy="title"
    >
    <button
      class="button button--delete"
      @click="$emit('deleteTodo', { noteId, id: todo.id })"
    >
      delete
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    noteId: {
      type: String,
      required: true,
    },
    todo: {
      type: Object,
      requeired: true,
    },
  },
  computed: {
    done: {
      get() { return this.todo.done; },
      set(newVal) { this.$emit('toggleTodo', { noteId: this.noteId, id: this.todo.id, value: newVal }); },
    },
    title: {
      get() { return this.todo.title; },
      set(newVal) { this.$emit('editTodoTitle', { noteId: this.noteId, id: this.todo.id, title: newVal }); },
    },
  },
};
</script>

<style scoped lang="stylus">
.todo-item
  display flex
  align-items center
  margin-bottom 10px
  input
    margin-right 10px
  &__text
    height 30px
    width 100%
    max-width 357px
    border-radius 4px
    padding 4px
    font-size 16px
  &__done
    width 20px
    height 20px
.button
  border-radius 4px
  width 70px
  height 30px
</style>
