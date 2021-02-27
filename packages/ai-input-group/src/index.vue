<template>
    <div class="ai-input-group">
        <Bar v-if="type==='bar'" 
            :disabled="updateDisabled"
            :list="inputList" 
            :validator="inputValidator" 
            :size="maxGroupSize" 
            :minlength="minlength"
            :placeholder="placeholder"
            :inputName="inputName"
            @change="updateList"
            @input="changeInput"/>
        <Card v-if="type==='card'" 
            :list="inputList" 
            :validator="inputValidator" 
            :size="maxGroupSize" 
            @update="updateList"/>
    </div>
</template>
<script>
import Bar from './bar.vue'
import Card from './card.vue'
export default {
    name:'AiInputGroup',
    model:{
        prop: 'inputList',
        event: 'update'
    },
    props:{
        type:{
            type:String
        },
        maxGroupSize:{
            type:Number
        },
        minlength: {
            type: Number,
            default: 1
        },
        inputList: {
            type:Array,
            default:[]
        },
        inputValidator:{
            type:Function
        },
        formatInput:{
            type:Function
        },
        placeholder: {
            type:String
        },
		updateDisabled: {
            type:Boolean,
            default: false
        },
        inputName:{
            type: String
        }
    },
    components:{
        Bar,
        Card
    },
    methods: {
        updateList(list){
            this.$emit('update',list)
        },
        changeInput(v) {
          this.$emit('input', v);
        }
    }
}
</script>