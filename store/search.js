export const state = () => ({
  keywords: ''
})

export const mutations = {
  set(state, keywords) {
    if (!keywords) {
      keywords = ''
    }
    state.keywords = keywords
  },
  remove(state) {
    state.keywords = ''
  }
}
