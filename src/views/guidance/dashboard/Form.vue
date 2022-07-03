<template>
  <el-dialog
    :title="textMap[formType]"
    :visible="formVisible"
    :before-close="exitForm"
    :destroy-on-close="true"
    :close-on-click-modal="false">
    <span>This is a message</span>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="formVisible = false">CANCEL</el-button>
      <el-button size="medium" type="primary" @click="formVisible = false">SAVE</el-button>
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
      titleForm: 'User',
      textMap: {
        add: '',
        edit: ''
      },
      dataForm: {
        id: undefined
      }
    }
  },
  mounted() {
    this.textMap.add = `Add New ${this.titleForm}`
    this.textMap.edit = `Edit ${this.titleForm}`
  },
  methods: {
    handleCreate() {
      console.log('handleUpdate')
    },
    handleUpdate(row) {
      console.log('handleUpdate', row)
    },
    resetModel() {

    },
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

<style scoped>

</style>
