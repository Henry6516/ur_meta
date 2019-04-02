<template>
    <el-form :model='condition' label-width="12rem" class="demo-ruleForm login-container" ref="condition">
        <el-form-item label="捡货人：" prop="suffix" :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]">
            <el-select v-model="condition.suffix">
                <el-option v-for="item in suffix" :key="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="批次号：" prop="goodsCode" :rules="[{required: true, message: '请填写字段', trigger: 'blur'}]">
            <el-input v-model="condition.goodsCode" placeholder="--必填--" @change="myFunction()" ref="gName"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="input" @click="onSubmit()">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/ecmascript-6">
    import { geteBaytemplate, getToolaccount,getPickMembe,APIPick } from '../../api/profit'
    export default {
        data() {
            return {
                suffix: [],
                goodsCode: '',
                condition: {
                    suffix: [],
                    goodsCode: ''
                }
            }
        },
        methods: {
            myFunction(){
                this.onSubmit()
            },
            onSubmit(form) {
                this.$refs.condition.validate(valid => {
                    if(valid){
                        let obj={
                            picker:this.condition.suffix,
                            batchNumber:this.condition.goodsCode
                        }
                        APIPick(obj).then(response => {
                            if(response.data.code==200){
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                })
                                this.condition.goodsCode=''
                                this.$refs.gName.focus()
                            }else {
                                this.$message.error(res.data.message)
                            }
                        })
                    }
                    if(!valid){
                        this.$refs.gName.focus()
                    }
                })
            }
        },
        mounted() {
            getPickMembe().then(response => {
                this.suffix = response.data.data
            })
        }
    }
</script>

<style lang="scss" scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 8rem auto;
        width: 40rem;
        padding: 6rem 2rem 2rem 4.5rem;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

    .el-form-item {
        margin-bottom: 4rem;

    .el-input {
        width: 18rem;
    }

    .el-button {
        margin-left: 3rem;
    }

    }
    }
</style>

