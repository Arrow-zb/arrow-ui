<template>
	<div class='input-card-group'>
		<div v-for="(item, i) in cardList" :key="i" class="card-item">
            <el-input
                :value="item" 
                placeholder="请输入内容" 
                @input="changeCardData($event, i)"
                @blur="blurEvent(item, i)"
                :class="{error:errorMessageArr[i]}"></el-input>
            <i class="el-icon-close" @click="deleteCard(i)"></i>
            <transition name="slide-fade">
                <div class="addExitError" v-if="errorMessageArr[i]">{{errorMessageArr[i]}}</div>
            </transition>
        </div>
        <div>
        <el-button 
            class="el-icon-plus" 
            @click="addInputCard" 
            :disabled="addBtnFlag">添加</el-button>
        </div>
	</div>
</template>
<script>
// import _forEach from 'lodash/forEach'
// import _cloneDeep from 'lodash/cloneDeep'
export default{
  name: 'card',
  props:{
      list: Array,
      size: Number,
      validator:Function,
      formatInput:Function
  },
  data(){
      return {
          cardList: [],
          curIndex:'',
          errorMessageArr: []
      }
  },
  computed: {
    addBtnFlag () {
      let errorflag = false
      this.errorMessageArr.forEach(item => {
        if (item) {
          errorflag = true
        }
      })
      // _forEach(this.errorMessageArr, item => {
      //   if (item) {
      //     errorflag = true
      //   }
      // })
      return this.cardList.length>=this.size||
              (this.cardList.length&&!this.cardList[this.cardList.length-1])
              ||errorflag
    }
  },
	methods:{
      addInputCard () {
        this.cardList.push('')
      },
      changeCardData(val, index){
        let tarVal = val
        const newErrorMessageArr = this.errorMessageArr.cloneDeep()
        const tarInitVal = this.cardList[index]
        let repeatData = []
        for (var i = 0; i < this.cardList.length; i++) {
          if (i!==index&&this.cardList[i] === tarInitVal) {
            repeatData.push(i)
          }
        }
        if (repeatData.length===1) {
          newErrorMessageArr[repeatData[0]] = ''
        }
        newErrorMessageArr[index] = this.validator?this.validator(val):''
        this.errorMessageArr = newErrorMessageArr
        const newCardList = this.cardList.cloneDeep()
        if (typeof this.formatInput ==='function') {
          tarVal = this.formatInput(val)||val
        }
        newCardList[index] = tarVal
        this.cardList = newCardList
      },
      deleteCard (index){
        const newErrorMessageArr = this.errorMessageArr.cloneDeep()
        const deleteVal = this.cardList[index]
        let repeatData = []
        for (var i = 0; i < this.cardList.length; i++) {
          if (i!==index&&this.cardList[i] === deleteVal) {
            repeatData.push(i)
          }
        }
        if (repeatData.length) {
          newErrorMessageArr[index] = ''
        }
        if (repeatData.length===1) {
          newErrorMessageArr[repeatData[0]] = ''
        }
        this.errorMessageArr = newErrorMessageArr
        this.errorMessageArr.splice(index, 1)
        this.cardList.splice(index, 1)
        this.$emit('update', this.cardList)
      },
      
      blurEvent (val, index) {
        let errorflag = false
        // _forEach(this.errorMessageArr, item => {
        //   if (item) {
        //     errorflag = true
        //   }
        // })
        this.errorMessageArr.forEach(item => {
          if (item) {
            errorflag = true
          }
        })
        if (errorflag) return
        
        this.$emit('update', this.cardList)
      }
    },
    created () {
      this.cardList = this.list.cloneDeep()
    },

}
</script>
<style lang="scss" scoped>
.input-card-group{
  display: flex;
  flex-wrap: wrap;
  .card-item {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    min-width: 100px;
    
    .el-input {
      >input{
        padding-right: 30px;
        border-color: #DCDFE6;
        background-color: #F9F9FA;
        &:focus{
          background-color: #fff;
        }
      }
    }
    .el-input.error {
      >input{
        border-color: #ff4949;
      }
    }
    >i{
      position: absolute;
      top: 14px;
      right: 10px;
      color: #909399;
    }
  }
  .addExitError {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
}

</style>