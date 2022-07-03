<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ currentUser.name }}</div>
  </div>
</template>

<script>
import AllUsers from '@/graphql/users'
export default {
  name: 'Dashboard',
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('user')),
      query: {
        first: 10,
        page: 1,
        student: '',
        registration_type: '',
        status: ''
      }
    }
  },
  mounted() {
    this.get(0)
  },
  methods: {
    get() {
      AllUsers(this.query, (response, success) => {
        if (success) {
          const data = response.allUsers.data
          console.log('allUsers', data)
        } else {
          this.$message({
            message: `Unable to retrieve the data.`,
            dangerouslyUseHTMLString: true,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
