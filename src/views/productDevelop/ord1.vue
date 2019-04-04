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
                @selection-change="selsChange"
                style="width: 98%;margin-left: 1%;margin-top: 20px" class="elTable11or">
            <el-table-column type="selection"
                             fixed
                             align="center"
                             header-align="center"></el-table-column>
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
                    prop=""
                    label="发货数量"
                    header-align="center">
                <template slot-scope="scope">
                    <el-input size="small"
                              v-model="scope.row.deliveryAmt" style="text-align: center"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" style="margin-left: 1%;
                margin-top: 15px" @click="keepData()">保存</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
    import {APIRrderAttribute,APISaveRrderDetail} from '../../api/product'
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
            selsChange(sels) {
                this.sels = sels
            },
            keepData(){
                if(this.sels){
                    const aryKeep=[]
                    for(let i=0;i<this.sels.length;i++){
                        let objKeep={
                            id:this.sels[i].id,
                            deliveryAmt:this.sels[i].deliveryAmt
                        }
                        aryKeep.push(objKeep)
                    }
                    APISaveRrderDetail(aryKeep).then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                message: '成功',
                                type: 'success'
                            })
                        }else {
                            this.$message.error(res.data.message)
                        }
                    })
                }else {
                    this.$message.error("请选择订单")
                }
            },
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
    .elTable11or td{
        padding: 5px 0 !important;
        text-align: center;
        font-size: 12px;
    }
    .elTable11or th{
        font-size: 13px;
    }
    .holdord{
        background: #409EFF;
        display: block;
        color: #fff;
        line-height: 35px;
        width: 80%;
        margin: auto;
        cursor: pointer;
    }
</style>


