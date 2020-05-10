<template>
  <div class="app-container">
    <el-form ref="channelForm" :rules="rules" :model="channel" label-width="120px">

      <el-form-item label="菜单名称" prop="name">
        <el-input
          maxlength="20"
          show-word-limit
          v-model="channel.name"
          placeholder="请输入菜单名称"/>
      </el-form-item>

      <el-form-item label="菜单标志" prop="icon">
        <el-input
          maxlength="100"
          show-word-limit
          v-model="channel.icon"
          placeholder="请输入图标代码"/>
      </el-form-item>

      <el-form-item label="权重" prop="weight">
        <el-input
          v-model="channel.weight"
          placeholder="请输入权重编号，默认：1"/>
      </el-form-item>

      <el-form-item label="菜单状态" prop="status">
        <el-radio-group v-model="channel.status">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="createChannel('channelForm')">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {createChannel} from "@/api/channel";

  export default {
    data() {
      return {
        channel: {},
        rules: {
          name: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1-20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 更新菜单
      createChannel(channel) {
        this.$refs[channel].validate((valid) => {
          if (valid) {
            createChannel(this.channel).then(response => {
              console.log(response)
              if (20000 === response.code) {
                this.$message({
                  message: '添加成功!',
                  type: 'success'
                });
                this.$router.push('/channel/list');
              } else {
                this.$message({
                  message: response.message,
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '错误的提交',
              type: 'error'
            });
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>

