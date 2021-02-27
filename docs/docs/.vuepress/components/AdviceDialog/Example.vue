<template>
  <div class="container">
    <button v-if="wo.adviceDialog">111</button>

    <el-button @click="wo.adviceDialog = true">显示dialog</el-button>
    <ai-codemirror ref="myCm" :value="code" :bref_intro="bref_intro"></ai-codemirror>

    <ai-table :data="tableData" title="API"></ai-table>
  </div>
</template>

<script>
import { basic } from './data'

export default {
  data() {
    return {
      code: basic,
      bref_intro: '基础使用',
      tableData: [
        {
          prop: "user",
          des: "user信息",
          type: "Object",
          options: "-",
          default: "{}"
        }
      ],
      user: {
        nickName: "",
        roleId: "",
        userName: "",
        userId: "",
        contactMobile: "",
        contactMobileFlag: 0,
        cardId: "",
        contactEmail: "",
        mobile: "546456",
        email: "",
        group: [],
        industry: [],
        authentication: {},
        verified: 0,
        isInternal: 0,
        acctId: ""
      },
      company: { info: "" },
      wo: {
        types: [],
        advice: {
          tips: ""
        },
        adviceDialogType: "dddd",
        adviceDialog: false
      },
    };
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
