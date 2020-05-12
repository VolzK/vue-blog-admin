<template>
  <div class="app-container">
    <el-form ref="channelForm" :model="channel" label-width="120px">
      <el-form-item label="菜单ID">
        <el-input v-model="channel.id" disabled />
      </el-form-item>

      <el-form-item label="菜单名称">
        <el-input v-model="channel.name" placeholder="请输入新的菜单名称" />
      </el-form-item>

      <el-form-item label="菜单标志">
        <el-input v-model="channel.icon" placeholder="请输入新的图标代码" />
      </el-form-item>

      <el-form-item label="菜单状态">
        <el-radio-group v-model="channel.status">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updateChannel('channelForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchChannelById, updateChannel } from "@/api/channel";

export default {
  data() {
    return {
      channel: {},
      rules: {
        name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1-20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchChannelById();
  },
  methods: {
    // 获取菜单
    fetchChannelById: function() {
      this.listLoading = true;
      fetchChannelById(this.$route.params.id).then(response => {
        this.channel = response.data;
        this.listLoading = false;
      });
    },

    // 更新菜单
    updateChannel(channel) {
      // 更新菜单
      this.$refs[channel].validate(valid => {
        if (valid) {
          updateChannel(this.channel).then(response => {
            if (20000 === response.code) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$router.push("/channel/list");
            } else {
              this.$message({
                message: "修改失败",
                type: "error"
              });
            }
          });
        } else {
          this.$message({
            message: "错误的修改",
            type: "error"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>

