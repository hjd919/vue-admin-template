<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.uuid"
        placeholder="uuid"
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
      <el-table-column type="selection" width="55" />
      <el-table-column prop="uuid" label="手机ID" />
      <el-table-column prop="group" label="组号" />
      <el-table-column prop="use_end_time" label="使用结束时间" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <div class="filter-container">
      <el-input-number v-model="editForm.group" placeholder="先勾选再设置组号" controls-position="right" />
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleEdit">修改</el-button>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/mobile'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import toastMixin from '@/mixin/toast' // Secondary package based on el-pagination

export default {
  name: 'MobileList',
  components: { Pagination },
  mixins: [toastMixin],
  data() {
    return {
      // 批量修改组号
      editForm: {
        group: undefined,
        uuids: []
      },
      // 选择
      multipleSelection: [],
      // 列表
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        // search
        uuid: undefined,
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
    async handleEdit() {
      // 检查是否有勾选
      if (this.multipleSelection.length === 0) {
        this.$alert('请勾选', '温馨提示')
        return
      }
      // 获取勾选内容
      const uuids = this.multipleSelection.map((val, index) => {
        return val['uuid']
      })
      // 整理数据
      this.editForm.group
      this.editForm.uuids = uuids
      // 提交数据
      const editRes = await api.edit(this.editForm)
      if (editRes.code !== 0) {
        this.errAlert('服务器异常')
        return
      }
      this.okAlert('修改成功')
      // 刷新列表
      this.getList()
    },
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
