<template>
  <div class="app-container">
    <el-form :model="article" ref="article" :rules="rules" label-width="100px">
      <el-form-item label="文章标题：" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>

      <el-form-item label="文章摘要：" prop="summary">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          placeholder="请输入文章摘要"
          v-model="article.summary"
        ></el-input>
      </el-form-item>

      <el-form-item label="文章内容：" prop="contentMarkdown">
        <mavon-editor
          ref="md"
          v-model="article.contentMarkdown"
          :codeStyle="markdown.codeStyle"
          :ishljs="markdown.ishljs"
          :boxShadow="false"
          :placeholder="markdown.placeholder"
          :navigation="markdown.navigation"
          :toolbars="markdown.toolbars"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save('article')">立即发布</el-button>
        <el-button @click="resetForm('article')">重新编写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveArticle } from "@/api/article";

export default {
  data() {
    return {
      // markdown配置
      markdown: {
        codeStyle: "atom-one-dark",
        ishljs: true, // 代码高亮
        navigation: true, // 目录
        placeholder: "开始编辑吧~"
      },

      // 表单
      article: {
        title: "", // 标题
        summary: "", // 摘要
        contentMarkdown: "", // markdown文章内容
        contentHtml: null // markdown==>html内容
      },
      // 校验规则
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 80, message: "长度在1到100个字符", trigger: "blur" }
        ]
      },
      lastSaveTime: null,
      timer: null
    };
  },
  methods: {
    //保存文章内容
    save(article) {
      this.$refs[article].validate(valid => {
        if (valid) {
          // 赋值HTML内容
          this.article.contentHtml = this.$refs.md.d_render;
          saveArticle(this.article).then(r => {
            this.$notify({
              title: "成功",
              message: "恭喜你，文章发布成功！",
              type: "success"
            });
            this.$router.push("/article/list");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(article) {
      this.$refs[article].resetFields();
    }
  }
};
</script>

<style lang="scss">
.v-note-panel.shadow {
  min-height: 440px; //设置编辑框最小高度
}
</style>
