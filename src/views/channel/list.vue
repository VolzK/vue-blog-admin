<template>
  <div class="app-container">

    <!--搜索-->
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="请输入标题" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>

      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        添加
      </el-button>
    </div>


    <!--表单-->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="200">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="菜单" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="配置图标" width="400" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.icon }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status | formatStatus }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="权重" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.weight }}
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
  </div>
</template>

<script>

  import {deleteChannel, fetchList} from '@/api/channel'

  export default {
    filters: {
      // el-tag类型转换
      statusFilter(status) {
        const statusMap = {
          1: 'primary',
          0: 'warning'
        }
        return statusMap[status]
      },
      // 状态显示转换
      formatStatus(status) {
        const statusMap = {
          1: '展示中',
          0: '已隐藏',
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: [],
        listLoading: true,

        tableKey: 0,
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 列表
      fetchData: function () {
        this.listLoading = true
        // 判空
        if (this.listQuery.title == null || this.listQuery.title == "" || this.listQuery.title == 'undefined') {
          this.listQuery.title = "";
        }
        fetchList(this.listQuery.title).then(response => {
          this.list = response.data

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 0.1 * 1000)
        })
      },
      // 查询
      handleFilter() {
        this.listQuery.page = 1
        this.fetchData()
      },
      // 编辑
      handleEdit: function (row) {
        this.$router.push('/channel/edit/' + row.id)
      },
      // 删除
      handleDelete: function (row, index) {
        deleteChannel(row.id).then(response => {
          if (20000 === response.code) {
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
            this.list.splice(index, 1);
          } else {
            this.$message({
              message: '删除失败!',
              type: 'error'
            });
          }
        });
      },
      // 新增
      handleCreate: function () {
        this.$router.push('/channel/add/');
      }
    }
  }
</script>

<style scoped>
  .filter-container {
    padding-bottom: 10px;
  }
</style>
