<template>
  <div class="app-container">
    <el-form
      :label-position="'left'"
      :model="article"
      ref="article"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="标 题：" prop="title">
        <el-input v-model="article.title"></el-input>
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
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save('article')">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import {getPostFormArticle, savePostFormArticle} from '@/api/PostFormArticle'
// import {uploadImg} from '@/api/PostFormArticleImg'

import { fetchArticle, updateArticle } from "@/api/article";

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
        title: "",
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
  created() {
    this.fetchArticle();
  },
  methods: {
    fetchArticle: function() {
      fetchArticle(this.$route.params.id).then(response => {
        // 赋值
        this.article = response.data;
      });
    },
    save() {
      updateArticle(this.article).then(response => {
        if (20000 === response.code) {
          this.$notify({
            title: "成功",
            duration: 950,
            message: "恭喜你，文章修改成功 ！",
            type: "success"
          });

          clearTimeout(this.timer); //清除延迟执行

          this.timer = setTimeout(() => {
            //设置延迟执行
            this.$router.push("/article/list");
          }, 1000);
        } else {
          this.$message({
            message: "修改失败",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
</style>
