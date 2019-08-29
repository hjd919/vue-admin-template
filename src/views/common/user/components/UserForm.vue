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
          <el-form-item label-width="90px" label="用户名" prop="username">
            <el-input v-model="postForm.username" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label-width="90px" label="密码" prop="password">
            <el-input v-model="postForm.password" type="password" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm('postForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/api/common/user'

const defaultForm = {
  id: '',
  username: '',
  password: ''
}

export default {
  name: 'UserForm',
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
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  created() {
    if (this.isEdit) {
      console.log(this.$route)
      const id = this.$route.query.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    fetchData(id) {
      api
        .fetchDetail(id)
        .then(response => {
          this.postForm = response.data

          // set page title
          this.setPageTitle()
        })
        .catch(err => {
          console.log(err)
        })
    },
    setPageTitle() {
      const title = '编辑'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true

          api
            .createOrEdit(this.postForm)
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

              this.$router.push('/user/list')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
