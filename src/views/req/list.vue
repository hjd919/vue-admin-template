<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.channel"
        placeholder="渠道"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.mobile"
        placeholder="手机UUID"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="channel" label="渠道" />
      <el-table-column prop="mobile" label="手机UUID" />
      <el-table-column prop="url_type" label="接口类型" />
      <el-table-column prop="url" label="接口URL" />
      <el-table-column prop="res" label="接口结果" />
      <el-table-column prop="created_at" label="创建时间" />
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
import * as api from '@/api/req'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import toastMixin from '@/mixin/toast' // Secondary package based on el-pagination

export default {
  name: 'ReqList',
  components: { Pagination },
  mixins: [toastMixin],
  data() {
    return {
      // 选择
      multipleSelection: [],
      // 列表
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        // search
        channel: undefined,
        mobile: undefined,
        // page
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
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
