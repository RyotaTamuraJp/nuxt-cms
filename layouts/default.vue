<template>
  <v-app light>
    <v-container fluid>
      <v-card flat>
        <v-card-title class="justify-center">
          <h1>{{ title }}</h1>
        </v-card-title>
        <v-card-subtitle class="text-center pt-4">
          <h3>{{ subtitle }}</h3>
        </v-card-subtitle>
      </v-card>

      <v-tabs v-model="tabNum" fixed-tabs background-color="primary" class="fixed-tabs-bar">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab
          v-for="(item, index) in tabNames"
          :key="index"
          class="justify-center white--text font-weight-bold"
          @click="setCategory(item.category, index, false)"
        >
          <div>
            {{ item.name }}
          </div>
        </v-tab>
      </v-tabs>
    </v-container>

    <v-main class="px-4">
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="9">
            <Nuxt />
          </v-col>

          <v-col cols="3" class="pl-4">
            <v-card flat>
              <v-text-field
                v-model="keywords"
                placeholder="キーワード検索"
                prepend-inner-icon="mdi-magnify"
                clearable
              ></v-text-field>
            </v-card>

            <div class="py-2"></div>

            <v-card flat>
              <v-card-title primary-title class="justify-center font-weight-bold">
                カテゴリー
              </v-card-title>
              <v-divider></v-divider>
              <v-list>
                <v-list-item-group v-model="listNum" color="primary">
                  <v-list-item v-for="(item, index) in tabNames" :key="index">
                    <v-list-item-content @click="setCategory(item.category, index, true)">
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer
      app
      absolute
    >
      <span class="gray--text">&copy; {{ new Date().getFullYear() }} {{ title }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'ブログ名',
      subtitle: 'サブタイトル',
      tabNames: [
        {name: 'ホーム', category: ''},
        {name: 'test', category: 'test'},
      ],
      tabNum: 0,
      listNum: 0,
      keywords: '',
      iconPath: '/favicon.ico',
    }
  },

  watch: {
    keywords(newValue) {
      this.$store.commit('search/set', this.keywords)
    }
  },

  methods: {
    movePath(path) {
      this.$router.push(path)
    },
    setCategory(category, index, isClickedList) {
      this.tabNum = index
      if (!isClickedList) {
        this.listNum = index
      }
      this.$store.commit('category/set', category)
    }
  },
}
</script>
