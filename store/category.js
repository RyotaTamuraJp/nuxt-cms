export const state = () => ({
  selectedCategory: ''
})

export const mutations = {
  set(state, category) {
    state.selectedCategory = category
  },
  remove(state) {
    state.selectedCategory = ''
  }
}
