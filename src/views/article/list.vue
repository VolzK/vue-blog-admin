<template>
  <div class="app-container">

    <!--搜索-->
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="请输入标题" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>

      <el-button type="primary" icon="el-icon-search" @click="handleSearch">
        搜索
      </el-button>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate"/>
      发布文章
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.summary }}</span>
        </template>
      </el-table-column>

      <el-table-column label="浏览量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageview }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="createTime" label="发布时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>

      <!--编辑-->
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            编辑
          </el-button>

          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--分页-->
    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="fetchData"/>

  </div>
</template>

<script>

  import {deleteArticleById, fetchList} from '@/api/article'

  import Pagination from '@/components/Pagination'

  export default {
    name: 'List',
    components: {Pagination},
    data() {
      return {
        list: [],
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData: function () {
        // 判空
        // if (this.list.title == null || this.list.title == "" || this.list.title == 'undefined') {
        //   this.this.list.title = "";
        // }
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records;
          this.total = response.data.total

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 0.2 * 1000)
        })
      },
      // 删除
      handleDelete: function (row, index) {
        deleteArticleById(row.id).then(response => {
          if (20000 === response.code) {
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
            this.list.splice(list, 1);
          } else {
            this.$message({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      // 发布文章
      handleCreate: function () {
        this.$router.push('/article/create');
      },
      // todo 查询文章
      handleFilter() {
        this.listQuery.page = 1
        this.fetchData()
      },
      // 编辑
      handleEdit: function (row) {
        this.$router.push('/article/edit/' + row.id)
      },
    }
  }
</script>

<style scoped>
  .filter-container {
    padding-bottom: 10px;
  }
</style>
