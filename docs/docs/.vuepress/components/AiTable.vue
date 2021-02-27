<template>
  <div>
    <p>{{ title }}</p>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="prop" label="参数" width="120"> </el-table-column>
      <el-table-column prop="des" label="说明" width="240"> </el-table-column>
      <el-table-column prop="type" label="类型" width="100"> </el-table-column>
      <el-table-column prop="options" label="可选值" width="120"> </el-table-column>
      <el-table-column prop="default" label="默认值">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AiTable",
  props: {
    data: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
};
</script>

<style>
.el-table__body, .el-table__header {
    margin: 0 ;
}
</style>

<style lang="scss" scoped>
</style>