<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="never">
    <div class="recent-items">
      <el-table
        :data="search.length ? filterResult(search) : favorites"
        @row-click="handleClick"
      >
        <el-table-column width="40">
          <template slot-scope="{row}">
            <svg-icon :icon-class="row.icon" class="icon-window" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              :metadata="scope"
              :placeholder="$t('table.dataTable.search')"
            />
          </template>
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
            <el-tag class="action-tag">{{ $t(`views.${row.action}`) }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'Favorites',
  data() {
    return {
      favorites: [],
      isLoaded: true,
      search: '',
      accentRegexp: /[\u0300-\u036f]/g
    }
  },
  computed: {
    getterFavoritesList() {
      return this.$store.getters.getFavoritesList
    },
    cachedViews() {
      return this.$store.getters.cachedViews
    }
  },
  mounted() {
    this.getRecentItems()
    this.subscribeChanges()
  },
  methods: {
    getRecentItems() {
      this.$store.dispatch('getFavoritesFromServer')
        .then(response => {
          this.favorites = response
          this.isLoaded = false
        }).catch(error => {
          console.log(error)
        })
    },
    subscribeChanges() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'setFavorites') {
          this.recentItems = this.getterFavoritesList
        }
      })
    },
    handleClick(row) {
      this.$router.push({ name: row.uuid })
    },
    filterResult(search) {
      return this.favorites.filter(item => this.ignoreAccent(item.name).toLowerCase().includes(this.ignoreAccent(search.toLowerCase())))
    },
    ignoreAccent(s) {
      if (!s) { return '' }
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }
  }
}
</script>

<style scoped>
	.header {
		padding-bottom: 10px;
	}
	.recent-items {
		height: 455px;
		overflow: auto;
	}
  .card-box {
    cursor: pointer;
  }
  .card-content {
    font-size: 15px;
  }
  .icon-window {
    font-size: x-large;
    color: #36a3f7;
  }
  .action-tag {
    float: right;
  }
</style>
