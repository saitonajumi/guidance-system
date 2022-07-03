<template>
  <el-dialog
    width="33%"
    :title="textMap[formType]"
    :visible="formVisible"
    :before-close="exitForm"
    :destroy-on-close="true"
    :close-on-click-modal="false">
    <el-form
      v-loading="loading"
      ref="dataForm"
      :rules="rules"
      :model="dataForm"
      label-position="top">
      <el-form-item label="Name">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="dataForm.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel" size="medium" @click="formVisible = false">CANCEL</el-button>
      <el-button size="medium" @click="onSubmit">SAVE</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CallOutForm',
  props: [
    'formVisible',
    'formTypes',
    'formType',
    'formData'
  ],
  watch: {
    formVisible: function() {
      if (this.formTypes) {
        if (this.formType === this.formTypes.add) {
          this.handleCreate()
        } else if (this.formType === this.formTypes.edit) {
          this.handleUpdate(this.formData)
        }
      }
    }
  },
  data() {
    return {
      loading: true,
      titleForm: 'User',
      textMap: {
        add: '',
        edit: ''
      },
      dataForm: {
        id: undefined,
        name: '',
        email: '',
        created_by: '',
        updated_by: ''
      },
      rules: {}
    }
  },
  mounted() {
    this.textMap.add = `Add New ${this.titleForm}`
    this.textMap.edit = `Edit ${this.titleForm}`
  },
  methods: {
    handleCreate() {
      console.log('handleUpdate')
      this.loading = false
    },
    handleUpdate(row) {
      console.log('handleUpdate', row)
      this.loading = false
    },
    onSubmit() {},
    resetModel() {},
    exitForm() {
      this.resetModel()
      this.$emit('formVisible')
    },
    successForm() {
      this.$emit('formSuccess')
    }
  }
}
</script>

<style lang="scss" scoped>
.cancel {
  background-color: $cancel;
  color: gray;
}
</style>
