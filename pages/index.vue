<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="article in articles" :key="article.slug" fluid>
        <v-card max-width="350" @click="toArticle(article)">
          <v-img v-if="article.imageSource" :src="article.imageSource" height="100" alt="image"></v-img>

          <v-card-title primary-title>
            {{ article.title }}
          </v-card-title>

          <v-card-text>
            {{ $omitText(article.abstract, 100) }}
          </v-card-text>

          <v-card-text>
            <div>
              <v-icon>mdi-folder-outline</v-icon>
              {{ article.showCategory }}
              <span class="px-4"></span>
              <v-icon>mdi-tag-multiple-outline</v-icon>
              {{ article.tags }}
            </div>
            <div class="py-2">
              <v-icon>mdi-clock-outline</v-icon>
              {{ article.date }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const query = await $content('articles')
    const articles = await query.fetch()
    return {
      articles
    }
  },

  computed: {
    selectedCategory() {
      return this.$store.state.category.selectedCategory
    },
    searchKeywords() {
      return this.$store.state.search.keywords
    }
  },

  watch: {
    async selectedCategory(newValue) {
      if (this.searchKeywords) {
        this.$store.commit('search/remove')
      }

      const query = await this.$content('articles')
      if (!newValue) {
        this.articles = await query.fetch()
      } else {
        this.articles = await query.where({ category: newValue }).fetch()
      }
    },

    async searchKeywords(newValue) {
      if (this.selectedCategory) {
        this.$store.commit('category/remove')
      }
      this.articles = await this.$content('articles').search(newValue).fetch()
    }
  },

  methods: {
    toArticle(article) {
      this.$router.push({name: 'articles-slug', params: {slug: article.slug}})
    }
  },
}
</script>
