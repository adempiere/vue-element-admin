<template>
  <el-card class="box-card">
    <!-- <div slot="header" class="clearfix">
      <span> {{ $t('profile.favorites') }} </span>
    </div> -->
    <div class="recent-items">
      <el-table
        :data="favorites"
      >
        <el-table-column width="40" />
        <el-table-column :label="$t('profile.favorites')" />
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
    checkOpened(uuid) {
      return this.cachedViews.includes(uuid)
    },
    handleClick(row) {
      if (!this.isEmptyValue(row.uuidRecord)) {
        this.$router.push({ name: row.menuUuid, query: { action: row.uuidRecord, tabParent: 0 }})
      } else {
        this.$router.push({ name: row.menuUuid })
      }
    },
    filterResult(search) {
      return this.recentItems.filter(item => this.ignoreAccent(item.displayName).toLowerCase().includes(this.ignoreAccent(search.toLowerCase())))
    },
    ignoreAccent(s) {
      if (!s) { return '' }
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },
    translateDate(value) {
      return this.$d(new Date(value), 'long', this.language)
    }
  }
}
</script>

<style scoped>
  .search_recent {
    width: 50%!important;
    float: right;
  }
	.header {
		padding-bottom: 10px;
	}
	.recent-items {
		height: 455px;
		overflow: auto;
	}
  .time {
    float: left;
    font-size: 11px;
    color: #999;
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
