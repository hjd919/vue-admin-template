<template>
  <div class="app-container">
    <el-form
      ref="postForm"
      label-position="left"
      :model="postForm"
      :rules="rules"
      class="form-container"
      label-width="100px"
    >
      <el-row :gutter="10">
        <el-col :span="6" :xs="24">
          <el-form-item label-width="90px" label="渠道" prop="fetch_num">
            <el-input v-model="postForm.channel" :disabled="true" />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6" :xs="24">
          <el-form-item label-width="90px" label="关键词" prop="keyword">
            <el-input v-model="postForm.keyword" placeholder="请输入关键词" />
          </el-form-item>
        </el-col>-->
        <el-col :span="6" :xs="24">
          <el-form-item label-width="90px" label="手机组号" prop="group">
            <el-input-number v-model="postForm.group" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label-width="90px" label="手机数" prop="mobile_num">
            <el-input-number v-model="postForm.mobile_num" placeholder="请输入手机数" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label-width="90px" label="开始时间" prop="time">
        <el-date-picker
          v-model="postForm.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        <!-- <el-input v-model="postForm.start_time" placeholder="请输入内容" /> -->
      </el-form-item>

      <el-form-item label-width="90px" label="状态" prop="status">
        <el-radio-group v-model="postForm.status">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0">下架</el-radio>
        </el-radio-group>
        <!-- <el-input v-model="postForm.status" placeholder="请输入内容" /> -->
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="12" :xs="24">
          <el-form-item label-width="90px" label="下单成功数" prop="order_num">
            <el-input-number v-model="postForm.order_num" placeholder="请输入下单成功数" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label-width="90px" label="接口返回数" prop="fetch_num">
            <el-input-number v-model="postForm.fetch_num" placeholder="请输入接口返回数" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="90px" label="关键词" prop="fetch_num">
        <el-autocomplete
          v-model="postForm.keyword"
          :fetch-suggestions="keywordSearchAsync"
          placeholder="请输入"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/api/task'

const defaultForm = {
  appid: '',
  keywords: [],
  group: '',
  mobile_num: '',
  start_time: '',
  end_time: '',
  status: 1,
  order_num: '',
  fetch_num: '',
  time: null
}

export default {
  name: 'AppDetail',
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyword: '11',
      // keywords: ['11', '222'],
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {}
    }
  },
  computed: {},
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
      // 初始化
      const query = this.$route.query
      this.postForm.channel = query.channel
      // this.postForm.keywords =
      //   typeof query.keywords === 'string' ? [query.keywords] : query.keywords
      // this.postForm.keyword = query.keyword
    }
  },
  methods: {
    async keywordSearchAsync(queryString, cb) {
      const results = await api.keywordSearch(
        queryString,
        this.postForm.channel
      )
      cb(results.data.res)
    },
    handleSelect(item) {
      console.log(item)
    },
    goBack() {
      this.$router.go(-1)
    },
    fetchData(id) {
      api
        .fetchDetail(id)
        .then(response => {
          // keywords格式化
          response.data.keywords = this.formatKeywords2(response.data.keywords)

          this.postForm = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitForm() {
      console.log('submitForm')
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 获取开始和结束时间
          this.postForm.start_time = this.postForm.time[0]
          this.postForm.end_time = this.postForm.time[1]
          const nowTS = (new Date()).valueOf()
          const endTS = (new Date(this.postForm.end_time)).valueOf()
          if (nowTS > endTS) {
            this.$message({
              message: '结束时间不能小于当前时间',
              type: 'error'
            })
            return
          }

          // 提交
          api
            .add(this.postForm)
            .then(response => {
              if (response.code < 0) {
                this.$message({
                  message: response.data,
                  type: 'error'
                })
                return
              }
              this.$notify({
                title: '成功',
                message: '提交成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false

              this.$router.push('/task/list')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removeKeyword(item) {
      var index = this.postForm.keywords.indexOf(item)
      if (index !== -1) {
        this.postForm.keywords.splice(index, 1)
      }
    },
    addKeyword() {
      this.postForm.keywords.push({
        value: '',
        key: Date.now()
      })
    },
    formatKeywords(keywords) {
      const kfs = []
      for (const kw of keywords) {
        kfs.push(kw.value)
      }
      return kfs
    },
    formatKeywords2(keywords) {
      const kfs = []
      for (const index in keywords) {
        kfs.push({
          value: keywords[index],
          key: Date.now() + index
        })
      }
      return kfs
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
