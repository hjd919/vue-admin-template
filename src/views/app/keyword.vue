<template>
  <div class="app-container">
    <!-- <el-button type="primary" size="mini" @click="handleAddTask">添加任务</el-button> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="keyword" label="关键词" />
      <el-table-column min-width="50px" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleAddTask(scope.row.keyword)">添加任务</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import * as api from '@/api/app'
export default {
  data() {
    return {
      // appid
      appid: 0,
      // 选择
      multipleSelection: [],
      // 列表
      list: null,
      total: 0,
      listLoading: true
    }
  },
  created() {
    const appid = this.$route.params && this.$route.params.appid
    this.appid = appid
    this.getList(appid)
  },
  methods: {
    handleAddTask(keyword) {
      // const list = this.list
      // 传参数：关键词
      // const keywords = this.multipleSelection.map((val, index) => {
      //   return list[index]['keyword']
      // })
      // 跳到添加任务页面
      // this.$router.push({
      //   name: 'CreateTask',
      //   query: { appid: this.appid, keyword: keyword }
      // })
      const routeUrl = this.$router.resolve({
        name: 'CreateTask',
        query: { appid: this.appid, keyword: keyword }
      })
      window.open(routeUrl.href, '_blank')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getList(appid) {
      this.listLoading = true
      api.getKeywordList({ appid }).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
