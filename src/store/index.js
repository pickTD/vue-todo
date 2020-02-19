import Vue from 'vue';
import Vuex from 'vuex';
import uuid from 'uuid';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    history: [],
    historyIdx: -1,
    upcomingChange: null,
    notes: [],
    modal: null,
  },
  mutations: {
    SET_MODAL(state, modal) {
      state.modal = modal;
    },
    SET_UPCOMING_CHANGE(state, change) {
      state.upcomingChange = change;
    },
    APPLY_UPCOMING_CHANGE(state) {
      if (state.upcomingChange) {
        state.upcomingChange();
      }
    },
    ADD_NOTES(state, notes) {
      state.notes = [...notes, ...state.notes];
    },
    DELETE_NOTE(state, id) {
      state.notes = state.notes.filter((n) => n.id !== id);
    },
    EDIT_NOTE_TITLE(state, { id, title }) {
      const idx = state.notes.findIndex((n) => n.id === id);
      if (~idx) {
        state.notes[idx].title = title;
      }
    },
    ADD_TODO(state, { id }) {
      const idx = state.notes.findIndex((n) => n.id === id);
      if (~idx) {
        state.notes[idx].todos = [{ title: '', id: uuid.v4(), done: false }, ...state.notes[idx].todos];
      }
    },
    EDIT_TODO_TITLE(state, { noteId, id, title }) {
      const noteIdx = state.notes.findIndex((n) => n.id === noteId);
      if (~noteIdx) {
        const todoIdx = state.notes[noteIdx].todos.findIndex((t) => t.id === id);
        if (~todoIdx) {
          state.notes[noteIdx].todos[todoIdx].title = title;
        }
      }
    },
    TOGGLE_TODO(state, { noteId, id, value }) {
      const noteIdx = state.notes.findIndex((n) => n.id === noteId);
      if (~noteIdx) {
        const todoIdx = state.notes[noteIdx].todos.findIndex((t) => t.id === id);
        if (~todoIdx) {
          state.notes[noteIdx].todos[todoIdx].done = value;
        }
      }
    },
    DELETE_TODO(state, { noteId, id }) {
      const noteIdx = state.notes.findIndex((n) => n.id === noteId);
      if (~noteIdx) {
        state.notes[noteIdx].todos = state.notes[noteIdx].todos.filter((t) => t.id !== id);
      }
    },
    RESET_HISTORY(state) {
      state.history = [];
      state.historyIdx = -1;
    },
    ADD_SNAPSHOT(state) {
      if (state.historyIdx < state.history.length - 1) {
        state.history = state.history.slice(0, state.historyIdx + 1);
      }
      const currentNotes = JSON.stringify(state.notes);
      state.history.push(currentNotes);
      state.historyIdx += 1;
      localStorage.setItem('notes', currentNotes);
    },
    APPLY_SNAPSHOT(state, idx) {
      state.notes = JSON.parse(state.history[idx]);
      state.historyIdx = idx;
    },
  },
  actions: {
    addNote({ commit }, note) {
      commit('ADD_NOTES', [note]);
      commit('ADD_SNAPSHOT');
    },
    deleteNote({ commit }, id) {
      commit('SET_MODAL', {
        title: 'delete?',
        text: 'click \'delete\' if you really want to delete the note',
        okButton: 'delete',
        cancelButton: 'no',
      });
      commit('SET_UPCOMING_CHANGE', () => {
        commit('DELETE_NOTE', id);
        commit('ADD_SNAPSHOT');
      });
    },
    editNoteTitle({ commit }, { id, title }) {
      commit('EDIT_NOTE_TITLE', { id, title });
      commit('ADD_SNAPSHOT');
    },
    addTodo({ commit }, { id }) {
      commit('ADD_TODO', { id });
      commit('ADD_SNAPSHOT');
    },
    editTodoTitle({ commit }, { noteId, id, title }) {
      commit('EDIT_TODO_TITLE', { noteId, id, title });
      commit('ADD_SNAPSHOT');
    },
    toggleTodo({ commit }, { noteId, id, value }) {
      commit('TOGGLE_TODO', { noteId, id, value });
      commit('ADD_SNAPSHOT');
    },
    deleteTodo({ commit }, { noteId, id }) {
      commit('DELETE_TODO', { noteId, id });
      commit('ADD_SNAPSHOT');
    },
    saveNote({ commit }) {
      commit('RESET_HISTORY');
    },
    resetHistory({ state, commit }) {
      if (state.history.length) {
        commit('APPLY_SNAPSHOT', 0);
        commit('RESET_HISTORY');
      }
    },
    cancelChanges({ commit }) {
      commit('SET_MODAL', {
        title: 'cancel changes?',
        text: 'click \'cancel\' if you really want to discard the changes',
        okButton: 'cancel',
        cancelButton: 'no',
      });
      commit('SET_UPCOMING_CHANGE', () => commit('APPLY_SNAPSHOT', 0));
    },
    undoChange({ state, commit }) {
      commit('APPLY_SNAPSHOT', state.historyIdx - 1);
    },
    redoChange({ state, commit }) {
      commit('APPLY_SNAPSHOT', state.historyIdx + 1);
    },
  },
  getters: {
    getModal: (state) => state.modal,
    getAllNotes: (state) => state.notes,
    getNoteById: (state) => (id) => state.notes.find((n) => n.id === id),
    isCancelAvailable: (state) => state.history.length > 1,
    isUndoAvailable: (state) => state.historyIdx > 0,
    isRedoAvailable: (state) => state.historyIdx < state.history.length - 1,
  },
});
