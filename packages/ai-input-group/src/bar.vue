<template>
	<div class='input-bar-group'>
        <el-input 
            :placeholder="placeholder" 
            v-model.trim="input"
            @input="inputInput"
            @blur="blurInput"
            :class="{'input-error': inputError}"
            @keydown.enter.native="addInputBar">
        <el-button 
            slot="append" 
            icon="el-icon-plus" 
            :disabled="!!((size&&barList.length>=size) || !input || inputErrorTxt)"
            @click="addInputBar"></el-button>
        </el-input>
        <div v-for="(item, i) in barList" :key="i" class="bar-item">
            <el-input
                :value="item"
                :disabled="disabled"
                @input="changeBarData($event, i)">
                <i slot="suffix" class="el-input__icon el-icon-delete" @click="deleteBar(i)"></i>
            </el-input>
        </div>
		<div class="inputErrorTxt" v-if="inputError">{{inputErrorTxt}}</div>
	</div>
</template>
<script type="text/javascript">
// import _cloneDeep from 'lodash/cloneDeep'

export default {
	name:'bar',
	props:{
        list: Array,
        size: Number,
        validator:Function,
        formatInput:Function,
		placeholder: String,
		disabled: Boolean,
				inputName: String,
				minlength: {
					type: Number,
					default: 1
				}
	},
	data(){
		return {
			input: '',
			inputError: false,
			inputErrorTxt: '',
			barList: []
		}
	},
	methods:{
		addInputBar () {
			if (!this.input) { return }
			if(this.size&&this.barList.length>=this.size){
				this.Alert({
					type: 'warning',
				  message: this.inputName+'最多为'+this.size+'条'
				})
				return
			}
			this.barList.push(this.input)
			this.input = ''
			this.$emit('change', this.barList)
		},
		deleteBar (i) {
			if (!this.input&&this.barList.length <= this.minlength) {
				this.Alert({
					type: 'warning',
					message: this.inputName+'不能为空'
				})
				return
			}
			this.barList.splice(i, 1)
			this.$emit('change', this.barList)
		},
		changeBarData (val, index) {
			const newBarList = this.barList.cloneDeep()
			newBarList[index] = val
			this.barList = newBarList
			this.$emit('change', this.barList)
		},
		inputInput(val){
						this.inputErrorTxt = this.validator?this.validator(val):''
						this.$emit('input', val);
			// if (typeof this.validate == 'function') {
			// 	this.validate({
			// 		message: 'IP地址有误'
			// 	}, this.input, (msg) => {
			// 		this.inputError = !!msg
			// 		this.inputErrorTxt = msg.message
			// 	})
			// }
		},
		blurInput(){
			if(this.size&&this.barList.length>=this.size){
				this.input = ''
			}
		}
	},
	created(){
		this.barList = this.list.cloneDeep()
	}
}
</script>
<style lang="scss" scoped>
.input-bar-group{
  .el-input__icon.el-icon-delete{
    cursor: pointer;
    font-weight: 800;
    &:hover{
      color: #888;
    }
  }
  .bar-item{
    margin-top: 10px;
  }
  .input-error {
    input {
      border-color:#f56c6c !important; 
    }
  }
  .inputErrorTxt {
    position: absolute;
    bottom: -16px;
    color: #f56c6c;
    font-size: 12px;
    background-color: #fff;
    line-height: 1;
    z-index: 1;
  }
  .el-input.is-disabled .el-input__icon {
    cursor: pointer;
  }
}

</style>