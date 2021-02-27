<template>
  <div>
    <el-divider content-position="left">
      基本用法
      <i class="el-icon-edit-outline"></i>
    </el-divider>
    <p class="bref_intro">{{ bref_intro }}</p>
    <div class="action">
      <el-tooltip class="item" effect="dark" content="复制代码" placement="top">
        <span class="icon" @click="handleCopy">
          <i class="el-icon-document-copy"></i>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="isOpen ? '收起代码' : '显示代码'" placement="top">
        <span class="icon" @click="handleOpen">
          <i class="el-icon-full-screen"></i>
        </span>
      </el-tooltip>
    </div>
    <hr />
    <codemirror
      :class="{ open: isOpen, close: !isOpen }"
      ref="myCm"
      v-bind="$attrs"
      :value="value"
    >
    </codemirror>
  </div>
</template>

<script>
import copy from "copy-to-clipboard";

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    bref_intro: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    handleOpen() {
      this.isOpen = !this.isOpen;
    },
    handleCopy() {
      copy(this.value);
      this.Alert({
        type: 'success',
        message: '复制成功！'
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  cursor: pointer;

  i {
    transition: all 0.3s linear;
  }
}

.icon:hover i {
  transform: scale(1.1);
}

.close {
  height: 0;
  overflow: hidden;
}

.open {
  height: auto;
}

.bref_intro {
  padding: 0 40px 10px;
  border-bottom: 1px solid #eee;
}

.action {
  padding-left: 30%;

  .item {
    margin: 0 10px;
  }
}
</style>
<style lang="scss">
</style>