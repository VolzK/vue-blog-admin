<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ name }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        name: "基于Vue-admin-template开发轻量级博客管理系统"
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
