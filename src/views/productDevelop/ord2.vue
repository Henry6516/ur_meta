<template>
    <div>
        <el-row>
            <el-col :span="24">
                订单总金额(￥):100
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="23" style="margin-left: 1%;margin-top: 20px">
                共1-{{totalPay}}条数据
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                border
                style="width: 98%;margin-left: 1%;margin-top: 20px" class="elTable11">
            <el-table-column
                    prop="sku"
                    label="SKU"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop="billNumber"
                    label="采购单号"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="图片"
                    header-align="center"
                    width="85">
                <template slot-scope="scope">
                    <img :src="scope.row.image" style="width: 55px;height: 55px;display: block;margin-left: 5px">
                </template>
            </el-table-column>
            <el-table-column
                    prop="supplierGoodsSku"
                    label="供应商SKU"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop="property1"
                    label="款式1"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop="property2"
                    label="款式2"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop="property3"
                    label="款式3"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop="purchaseNumber"
                    label="采购数量"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop="purchasePrice"
                    label="采购价格"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop="deliveryAmt"
                    label="发货数量"
                    header-align="center">
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import {APIRrderAttribute} from '../../api/product'
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
                APIRrderAttribute(this.condition).then(res => {
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


