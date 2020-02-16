<template>
  <div class="todo-note">
    <h4 class="todo-note__title">{{ note.title }}</h4>
    <ul  class="todo-note__todos">
      <li
        v-for="todo in todosToShow"
        :key="todo.id"
        class="todo-note__todo-item"
        :class="{ 'todo-note__todo-item--done': todo.done }"
      >
        {{ todo.title }}
      </li>
    </ul>
    <div class="todo-note__controls">
      <button class="button button--edit" @click="$emit('edit', note.id)">Edit</button>
      <button class="button button--delete" @click="$emit('delete', note.id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoNote',
  props: {
    note: {
      type: Object,
      required: true,
    },
    todosLimit: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    todosToShow() {
      return this.todosLimit
        ? this.note.todos.slice(0, this.todosLimit)
        : this.note.todos;
    },
  },
};
</script>

<style lang="stylus" scoped>
.todo-note
  display flex
  justify-content space-between
  align-items center
  width 100%
  min-height 78px
  background white
  border 1px solid #35343a1a
  border-radius 4px
  margin-bottom 20px
  &__title
    align-self flex-start
    width 300px
    margin 0
    padding 10px 0 10px 20px
    font-size 20px
  &__todos
    display flex
    flex 1
    flex-wrap wrap
    min-height 78px
    margin 0
    padding 0
    list-style none
    font-size 18px
  &__todo-item
    width 50%
    padding 10px
    color #F1948A
    &--done
      color #82E0AA
  &__controls
    align-self stretch
    display flex
    flex-direction column
    width 100px

.button
  &--edit
    border-radius 0 4px 0 0
  &--delete
    background #F1948A
    border-radius 0 0 4px 0
</style>
