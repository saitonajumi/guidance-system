<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ this.$route.name }}</span>
        <el-dropdown style="margin-left: 1%; float: right;" @command="exportData">
          <el-button
            size="medium"
            class="filter-item"
            icon="el-icon-download"
            :loading="printLoading"
          >
            Export as<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="xlsx">Excel</el-dropdown-item>
            <el-dropdown-item command="pdf">PDF</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          style="margin-left: 1%; float: right;"
          size="medium"
          icon="el-icon-plus"
          @click="addNewRecord"
        >
          Add New Record
        </el-button>
        <div style="float: right;">
          <el-row>
            <el-col :span="16"><div class="grid-content bg-purple">
              <el-input v-model="searchValue" size="medium" placeholder="search here" class="input-with-select" @keyup.enter.native="handleSearch" />
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light">
              <el-button
                slot="append"
                size="medium"
                icon="el-icon-search"
                @click="handleSearch"
              >Search
              </el-button>
            </div></el-col>
          </el-row>
        </div>
      </div>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.first"
        @pagination="get"
      />
      <el-table
        v-loading="tableLoading"
        :header-cell-style="{ background: '#7c96a6', color: 'white' }"
        style="width: 100%"
        stripe
        border
        fit
        :data="allUsersData"
        height="650"
      >
        <el-table-column
          prop="id"
          type="index"
          label="#"
          :index="indexMethod"
          width="50"
          align="center"
        />
        <el-table-column
          label="Name"
          width="auto"
        >
          <template slot-scope="{row}">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="Email"
          width="auto"
        >
          <template slot-scope="{row}">
            {{ row.email }}
          </template>
        </el-table-column>
        <el-table-column
          label="Status"
          width="200"
        >
          <template slot-scope="{row}">
            <div style="text-align: center">
              <el-tag v-if="row.status === 'P'" stype="success">Approved</el-tag>
              <el-tag v-else-if="row.status === 'W'">Review</el-tag>
              <el-tag v-else-if="row.status === 'D'" type="danger">Denied</el-tag>
              <el-tag v-else style="width: 100%" stype="success">Open</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Actions"
          width="150"
        >
          <template slot-scope="{row}">
            <span>
              <el-button class="btn-update" icon="el-icon-edit" circle @click="updateRecord(row)" />
              <el-button class="btn-danger" icon="el-icon-delete" circle @click="openDeleteQuestion(row)" />
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding: 14px;">
        <pagination
          v-show="total>0"
          background
          :total="total"
          :page.sync="query.page"
          :limit.sync="query.first"
          @pagination="get"
        />
      </div>
    </el-card>
    <call-out-form
      :form-visible="formVisible"
      :form-types="formTypes"
      :form-type="formType"
      :form-data="formData"
      @formSuccess="get"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import CallOutForm from '@/views/guidance/dashboard/Form'
import {
  allUsers,
  deleteUser
} from '@/graphql/users/'
export default {
  name: 'Dashboard',
  components: {
    Pagination,
    CallOutForm
  },
  data() {
    return {
      formTypes: {
        add: 'add',
        edit: 'edit'
      },
      formType: '',
      formData: {},
      formVisible: false,
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
  watch: {
    searchValue: function() {
      if (this.searchValue === '') {
        this.handleSearch()
      }
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    get() {
      this.formVisible = false
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
        type: 'warning',
        center: true,
        showCancelButton: false
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
    addNewRecord() {
      this.formVisible = true
      this.formType = this.formTypes.add
      this.formData = {}
    },
    updateRecord(row) {
      this.formVisible = true
      this.formType = this.formTypes.edit
      this.formData = row
    },
    exportData(type) {}
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  &__header-cell-style {
    text-align: start;
    background-color: $primary;
  }
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
.btn-danger {
  background-color: $danger;
}
.btn-update {
  background-color: $update;
}
</style>
