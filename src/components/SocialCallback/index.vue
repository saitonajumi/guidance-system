<template>
  <div>
    <el-container>
      <el-main>
        <el-tag>Authenticating... Please wait</el-tag>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  mounted() {
    const params = this.$route.query
    if (params.token) {
      this.$store
        .dispatch('user/loginSocial', { access_token: this.$route.query.token })
        .then(() => {
          this.$router.push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
        })
        .catch(response => {
          if (this.$message) {
            this.$message({
              message: response,
              dangerouslyUseHTMLString: true,
              type: 'error'
            })
          }
        })
    } else {
      this.$message({
        message: 'Unauthenticated',
        type: 'error'
      })

      this.$router.push({
        path: this.redirect || '/',
        query: this.otherQuery
      })
    }
  }
}
</script>
