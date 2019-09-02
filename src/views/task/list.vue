<template>
  <div class="app-container">
    <!-- <div class="filter-container"> -->
    <!-- <el-input
        v-model="listQuery.appid"
        placeholder="appid"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button> -->
    <!-- <router-link :to="'/task/create'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >添加</el-button>
      </router-link> -->
    <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>-->
    <!-- </div> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="appid" label="appid" />
      <el-table-column prop="app_name" label="应用" />
      <el-table-column prop="keyword" label="关键词" />
      <el-table-column prop="start_time" label="开始时间" />
      <el-table-column prop="end_time" label="结束时间" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="order_num" label="下单数" />
      <el-table-column prop="success_num" label="成功数" />
      <el-table-column prop="fetch_num" label="返回数" />
      <el-table-column prop="return_num" label="已返回数" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import * as api from '@/api/task'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'TaskList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        appid: undefined,
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      api.getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
