<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ currentUser.name }}</div>
  </div>
</template>

<script>
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
