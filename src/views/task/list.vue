<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.channel"
        placeholder="渠道号"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.app_name"
        placeholder="应用"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-reload" @click="refreshList">刷新</el-button>
      <!-- <router-link :to="'/task/create'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >添加</el-button>
      </router-link>-->
      <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>-->
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="channel" label="渠道" />
      <el-table-column prop="group" label="组号" />
      <el-table-column prop="app_name" label="应用" />
      <el-table-column prop="keyword" label="关键词" />
      <el-table-column prop="start_time" label="开始时间" />
      <el-table-column prop="end_time" label="结束时间" />
      <el-table-column align="center" label="状态" width="80px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status|statusTagFilter">{{ scope.row.status|statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order_num" label="下单数" width="80px" />
      <el-table-column prop="success_num" label="完成数" width="80px" />
      <el-table-column prop="fetch_num" label="返回数" width="80px" />
      <el-table-column prop="return_num" label="已返回数" width="80px" />

      <el-table-column min-width="80px" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/task/create?channel='+scope.row.channel">
            <el-button type="primary" size="mini">添加</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="stopTask(scope.row.id)">停止</el-button>
        </template>
      </el-table-column>
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
import * as api from "@/api/task";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

const statusDesc = ["已停止", "进行中", "已完成"];
const statusTag = ["info", "", "success"];

export default {
  name: "TaskList",
  components: { Pagination },
  filters: {
    statusFilter: function(value) {
      if (statusDesc[value]) {
        return statusDesc[value];
      } else {
        return "未知";
      }
    },
    statusTagFilter: function(value) {
      if (statusTag[value]) {
        return statusTag[value];
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        channel: undefined,
        app_name: null,
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    refreshList() {
      this.getList();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    stopTask(id) {
      const that = this;
      api.stopTask(id).then(response => {
        if (response.data.code) {
          that.$alert("操作错误", "温馨提示");
          return;
        }
        that.$message({
          message: "操作成功",
          type: "success"
        });
        that.getList();
      });
      return;
    },
    getList() {
      this.listLoading = true;
      api.getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    }
  }
};
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
