<template>
  <v-card class="px-12 py-10">
    <article>
      <h3>
        <span class="gray--text">{{ page.date }}</span>
      </h3>
      <h1 class="pb-4 text-h4">{{ page.title }}</h1>
      <v-divider></v-divider>
      <v-card flat max-width="100%" class="py-8">
        <v-img v-if="page.imageSource" :src="page.imageSource" alt="image" height="300"></v-img>
      </v-card>
      <nuxt-content :document="page" />
    </article>
  </v-card>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const page = await $content('articles', params.slug).fetch()
    return {
      page
    }
  }
}
</script>
