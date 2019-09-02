const showPic = {
  methods: {
    errAlert: function(content) {
      this.$alert(content, '温馨提示')
    },
    okAlert: function(content) {
      this.$message({
        message: content,
        type: 'success'
      })
    }
  }
}

export default showPic
