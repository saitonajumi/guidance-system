<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Dashboard</span>
        <el-dropdown style="margin-left: 1%; float: right;" @command="exportData">
          <el-button
            size="medium"
            class="filter-item defaultColor"
            type="primary"
            icon="el-icon-download"
            :loading="printLoading">
            Export as<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="xlsx">Excel</el-dropdown-item>
            <el-dropdown-item command="pdf">PDF</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          class="defaultColor"
          style="margin-left: 1%; float: right;"
          size="medium"
          type="primary"
          icon="el-icon-plus">
          Add New Record
        </el-button>
        <div style="float: right;">
          <el-input size="medium" placeholder="search here" v-model="searchValue" class="input-with-select" @keyup.enter.native="handleSearch">
            <el-button
              @click="handleSearch"
              size="medium"
              style="background-color: #409EFF; color: white"
              slot="append"
              icon="el-icon-search">Search
            </el-button>
          </el-input>
        </div>
      </div>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.first"
        @pagination="get"/>
      <el-table
        :header-cell-style="{ background: '#409EFF', color: 'white' }"
        style="width: 100%"
        stripe
        border
        fit
        :data="allUsersData"
        v-loading="tableLoading"
        height="650">
        <el-table-column
          prop="id"
          type="index"
          label="#"
          :index="indexMethod"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          width="auto">
        </el-table-column>
        <el-table-column
          label="Status"
          width="200">
          <template slot-scope="{row}">
            <div style="text-align: center">
              <el-tag v-if="row.status === 'P'" stype="success">Approved</el-tag>
              <el-tag v-else-if="row.status === 'W'">Review</el-tag>
              <el-tag v-else-if="row.status === 'D'" type="danger">Denied</el-tag>
              <el-tag style="width: 100%" v-else stype="success">Open</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Actions"
          width="150">
          <template slot-scope="{row}">
            <span>
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="openDeleteQuestion(row)"></el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding: 14px;">
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="query.page"
          :limit.sync="query.first"
          @pagination="get"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {
  allUsers,
  deleteUser
} from '@/graphql/users/'
export default {
  name: 'Dashboard',
  components: {
    Pagination
  },
  data() {
    return {
      tableLoading: false,
      printLoading: false,
      searchValue: '',
      currentUser: JSON.parse(localStorage.getItem('user')),
      query: {
        first: 10,
        page: 1,
        student: '',
        registration_type: '',
        status: ''
      },
      total: 0,
      allUsersData: []
    }
  },
  mounted() {
    this.get()
  },
  watch: {
    searchValue: function() {
      if (this.searchValue === '') {
        this.handleSearch()
      }
    }
  },
  methods: {
    get() {
      this.tableLoading = true
      this.allUsersData = []
      allUsers(this.query, (response, success) => {
        if (success) {
          const data = response.allUsers.data
          this.total = response.allUsers.paginator_info.total
          if (data.length > 0) {
            this.allUsersData = data
            this.tableLoading = false
          }
        } else {
          this.tableLoading = false
          this.$message({
            message: `Unable to retrieve the data.`,
            dangerouslyUseHTMLString: true,
            type: 'error'
          })
        }
      })
    },
    handleSearch() {
      this.query.page = 1
      this.query.student = this.searchValue
      this.get()
    },
    indexMethod(index) {
      return (index + 1) + ((this.query.page - 1) * this.query.first)
    },
    openDeleteQuestion(data) {
      this.$confirm('This will permanently delete the record. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        deleteUser({ id: data.id }, (response, success) => {
          if (success) {
            this.$message({
              type: 'success',
              message: response.deleteUser.message
            })
            this.get()
          } else {
            this.$message({
              message: `Unable to retrieve the data.`,
              dangerouslyUseHTMLString: true,
              type: 'error'
            })
          }
        })
      })
    },
    exportData(type) {}
  }
}
</script>

<style lang="scss" scoped>
.defaultColor {
  background: #409EFF;
  color: white;
}
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
