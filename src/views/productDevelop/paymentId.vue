<template>
    <div>
        <el-row>
            <el-col :span="23" style="margin-left: 1%;margin-top: 20px">
                共1-{{totalPay}}条数据
            </el-col>
        </el-row>
    <el-table
            :data="tableData"
            border
            style="width: 98%;margin-left: 1%;margin-top: 20px" class="elTable11">
        <el-table-column type="index"
                         fixed
                         width="50"
                         header-align="center"></el-table-column>
        <el-table-column label="动作"
                         fixed
                         header-align="center"
                         width="85">
            <template slot-scope="scope">
               <a style="background: #409EFF;padding: 6px 15px;color: #fff;display: block;cursor: pointer" @click="payMent(scope.$index, scope.row)">付款</a>
            </template>
        </el-table-column>
        <el-table-column
                label="凭证"
                width="80"
                header-align="center">
            <template slot-scope="scope">
                <a :href="scope.row.img" target="_blank"><img :src="scope.row.img" style="width: 55px;height: 55px;display: block;margin-left: 2px"></a>
            </template>
        </el-table-column>
        <el-table-column
                prop="billNumber"
                label="订单编号"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="requestTime"
                label="请求付款时间"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="requestAmt"
                label="请求付款金额"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="paymentStatus"
                label="付款状态"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="comment"
                label="备注"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="paymentTime"
                label="付款时间"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="paymentAmt"
                label="付款金额"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="unpaidAmt"
                label="未付金额"
                header-align="center">
        </el-table-column>
    </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import {APIPayment,APISavePayment} from '../../api/product'
    export default {
        data() {
            return {
                tableData: [],
                condition: {
                  id:null
                },
                totalPay:0
            }
        },
        methods:{
            payMent(index,row){
                let data={
                    id:row.id,
                    img:row.img,
                    comment:row.comment,
                    paymentAmt:row.paymentAmt
                }
                APISavePayment(data).then(res=>{
                    if(res.data.message=="success"){
                        this.$message({
                            message: '付款成功',
                            type: 'success'
                        })
                    }
                })
            },
            getData(){
                APIPayment(this.condition).then(res => {
                    this.tableData=res.data.data.items
                    this.totalPay=res.data.data.items.length
                })
            }
        },
        mounted() {
            this.condition.id = this.$route.params.id
            this.getData()
        }
    }
</script>
<style lang="scss">
    .elTable11 td{
        padding: 10px 0 !important;
        text-align: center;
    }
</style>


