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
          <el-form-item label-width="90px" label="appid" prop="appid">
            <el-input v-model="postForm.appid" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label-width="90px" label="app名称" prop="app_name">
            <el-input v-model="postForm.app_name" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label-width="90px" label="channel" prop="channel">
            <el-input v-model="postForm.channel" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label-width="90px" label="bundleId" prop="bundleId">
            <el-input v-model="postForm.bundleId" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12" :xs="24">
          <el-form-item label-width="90px" label="排重url" prop="query_url">
            <el-input v-model="postForm.query_url" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label-width="90px" label="点击url" prop="click_url">
            <el-input v-model="postForm.click_url" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12" :xs="24">
          <el-form-item label-width="90px" label="激活url" prop="active_url">
            <el-input v-model="postForm.active_url" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label-width="90px" label="回调url" prop="callback_url">
            <el-input v-model="postForm.callback_url" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6" :xs="24">
          <el-form-item
            label-width="100px"
            type="number"
            label="callback_time"
            prop="callback_time"
          >
            <el-input-number v-model="postForm.callback_time" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item
            label-width="120px"
            type="number"
            label="max_callback_time"
            prop="max_callback_time"
          >
            <el-input-number v-model="postForm.max_callback_time" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label-width="100px" type="number" label="open_time" prop="open_time">
            <el-input-number v-model="postForm.open_time" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item
            label-width="120px"
            type="number"
            label="max_open_time"
            prop="max_open_time"
          >
            <el-input-number v-model="postForm.max_open_time" controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6" :xs="24">
          <el-form-item label-width="100px" type="number" label="double_open" prop="double_open">
            <el-input-number v-model="postForm.double_open" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label-width="100px" type="number" label="taskType" prop="taskType">
            <el-input-number v-model="postForm.taskType" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label-width="100px" type="number" label="needClean" prop="needClean">
            <el-input-number v-model="postForm.needClean" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item
            label-width="100px"
            type="number"
            label="version_limit"
            prop="version_limit"
          >
            <el-input-number v-model="postForm.version_limit" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label-width="100px" type="text" label="process" prop="process">
            <el-input v-model="postForm.process" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col v-for="(keyword, index) in postForm.keywords" :key="keyword.key" :span="6" :xs="24">
          <el-form-item
            :label="'关键词' + (index+1)"
            :prop="'keywords.' + index + '.value'"
            :rules="{required: true, message: '关键词不能为空', trigger: 'blur'}"
          >
            <el-input v-model="keyword.value" />
            <el-button @click.prevent="removeKeyword(keyword)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button @click="addKeyword">新增关键词</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/api/app'

const defaultForm = {
  id: '',
  appid: '',
  app_name: '',
  channel: '',
  bundleId: '',
  keywords: [{ value: '' }]
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
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        // appid: [{ required: true, message: '请输入appid', trigger: 'blur' }],
        // app_name: [
        //   { required: true, message: '请输入app_name', trigger: 'blur' }
        // ],
        // channel: [
        //   { required: true, message: '请输入channel', trigger: 'blur' }
        // ],
        // bundleId: [
        //   { required: true, message: '请输入bundleId', trigger: 'blur' }
        // ],
        // query_url: [
        //   { required: true, message: '请输入query_url', trigger: 'blur' }
        // ],
        // click_url: [
        //   { required: true, message: '请输入click_url', trigger: 'blur' }
        // ],
        // active_url: [
        //   { required: true, message: '请输入active_url', trigger: 'blur' }
        // ],
        // callback_url: [
        //   { required: true, message: '请输入callback_url', trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {},
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    // this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      api
        .fetchApp(id)
        .then(response => {
          // keywords格式化
          response.data.keywords = this.formatKeywords2(response.data.keywords)

          this.postForm = response.data

          // set tagsview title
          // this.setTagsViewTitle()

          // set page title
          this.setPageTitle()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // setTagsViewTitle() {
    //   const title = 'Edit Article'
    //   const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
    //   this.$store.dispatch('tagsView/updateVisitedView', route)
    // },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true

          // keywords格式化
          this.postForm.keywords = this.formatKeywords(this.postForm.keywords)

          api
            .createOrEditApp(this.postForm)
            .then(response => {
              if (response.code) {
                this.$message({
                  message: '提交失败',
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

              this.$router.push('/app/list')
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
