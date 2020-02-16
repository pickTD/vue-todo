<template>
  <div id="app">
    <router-view/>
    <div
      v-if="currentModal"
      class="modal"
    >
      <div class="modal__wrap">
        <div class="modal__title">
          {{ currentModal.title }}
        </div>
        <p class="modal__text">
          {{ currentModal.text }}
        </p>
        <div class="modal__buttons">
          <button
            class="button button--danger"
            @click="confirm"
          >
            {{ currentModal.okButton }}
          </button>
          <button
            class="button"
            @click="reject"
          >
            {{ currentModal.cancelButton }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    currentModal() {
      return this.$store.getters.getModal;
    },
  },
  mounted() {
    if (localStorage.getItem('notes')) {
      const localNotes = JSON.parse(localStorage.getItem('notes'));
      this.$store.commit('ADD_NOTES', localNotes);
    }
  },
  methods: {
    confirm() {
      this.$store.commit('APPLY_UPCOMING_CHANGE');
      this.$store.commit('SET_UPCOMING_CHANGE', null);
      this.$store.commit('SET_MODAL', null);
    },
    reject() {
      this.$store.commit('SET_UPCOMING_CHANGE', null);
      this.$store.commit('SET_MODAL', null);
    },
  },
};
</script>

<style lang="stylus">
html
  box-sizing border-box
  line-height 1.15
  -webkit-text-size-adjust 100%

*,
*::before,
*::after
  box-sizing inherit

body
  margin 0
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  background-color #f8f8f8
  color #2c3e50

input
  color inherit

#app
  width 100%
  max-width 1200px
  margin 0 auto
  padding 0

.app-title
  width 100%
  margin 20px 0

.button
  width 100%
  height 50%
  background #85C1E9
  color white
  border none
  outline none
  text-transform uppercase
  font-weight bold
  cursor pointer
  opacity .7
  transition opacity .3s
  &--add, &--save
    background #82E0AA
  &--cancel, &--delete, &--danger
    background #F1948A
  &:hover
    opacity 1

.modal
  position fixed
  z-index 1
  display flex
  justify-content center
  align-items center
  overflow-y scroll
  width 100vw
  height 100vh
  top 0
  left 0
  background-color rgba(53,52,58,0.6)
  &__wrap
    display flex
    flex-direction column
    width 400px
    background-color white
    border-radius 4px
  &__title
    height 30px
    text-align center
    line-height 30px
    color white
    text-transform uppercase
    font-weight bold
    background-color #F1948A
    border-radius 4px 4px 0 0
  &__text
    padding 10px
    text-align center
  &__buttons
    display flex
    justify-content center
    align-items center
    margin-bottom 10px
    :first-child
      margin-right 10px
    .button
      width 70px
      height 30px
      border-radius 4px
</style>
