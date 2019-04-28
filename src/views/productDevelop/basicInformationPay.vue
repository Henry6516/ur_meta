<template>
    <section>
        <div>
            <el-row class="contentt">
                <el-col :span="24">
                    <el-button type="primary" @click="addJoomPay()"><i class="el-icon-plus"></i>添加PayPal账号</el-button>
                </el-col>
            </el-row>
            <el-row class="content1">
                <el-col :span="24" class="font14">
                    第1-20条，共{{totalPay}}条数据.
                </el-col>
                <el-col :span="24" style="margin-top: 20px">
                    <el-table :data="datePay"
                              border
                              class="elTable"
                              style="width: 98%;">
                        <el-table-column type="index"
                                         fixed
                                         align="center"
                                         width="80"
                                         header-align="center">
                        </el-table-column>
                        <el-table-column label="操作"
                                         fixed
                                         header-align="center"
                                         width="80">
                            <template slot-scope="scope">
                                <el-tooltip content="查看">
                                    <i class="el-icon-view"
                                       @click="viewPicPay(scope.$index, scope.row)"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="更新">
                                    <i @click="editPay(scope.$index, scope.row)"
                                       class="el-icon-edit"
                                       style="color: #409EFF;cursor:pointer;"></i>
                                </el-tooltip>
                                <el-tooltip content="删除">
                                    <i class="el-icon-delete"
                                       style="color: #409EFF;cursor:pointer;" @click="delPay(scope.$index, scope.row)"></i>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="PayPal账号"
                                         header-align="center">
                            <el-table-column prop="paypal"
                                             :render-header="renderHeaderPicPay"
                                             align="center">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="创建时间"
                                         prop="createDate"
                                         align="center"
                                         header-align="center">
                        </el-table-column>
                        <el-table-column label="更新时间"
                                         prop="updateDate"
                                         align="center"
                                         header-align="center">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-pagination
                    background
                    @size-change="handleSizeChangePay"
                    @current-change="handleCurrentChangePay"
                    :current-page="conditionPay.page"
                    :page-size="conditionPay.pageSize"
                    :total="this.totalPay"
                    background
                    layout="prev, pager, next" style="margin: 20px 0;margin-left: 10px">
            </el-pagination>
            <el-dialog title="运输方式详情" :visible.sync="dialogPicturePay">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">PayPal账号</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input :value="delistPay.paypal" :disabled="true"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
            </el-dialog>
            <el-dialog title="添加payPal账号" :visible.sync="dialogPictureBjPay">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">PayPal账号</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="payCount"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPictureBjPay = false">取 消</el-button>
                    <el-button type="primary" @click="addJoomPayAnd()">添 加</el-button>
                </div>
            </el-dialog>
            <el-dialog title="编辑payPal账号" :visible.sync="disLoginPay">
                <el-row class="contentt" style="margin-top: 0">
                    <el-col :span="24" class="cTop">
                        <el-col :span="24" style="margin-bottom: 20px">
                            <el-col :span="3">
                                <p class="basp">payPal账号</p>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="contenPay.paypal"></el-input>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="disLoginPay = false">取 消</el-button>
                    <el-button type="primary" @click="savePay()">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import { APICreatePaypal,APIPaypal,APIPaypalInfo,APIUpdatePaypal,APIDeletePaypal} from '../../api/product'
    import { getMenu } from '../../api/login'
    export default {
        data() {
            return {
                allMenu:[],
                activeName: 'eBay运输方式',
                datePay:[],
                totalPay:0,
                dialogPicturePay:false,
                dialogPictureBjPay:false,
                disLoginPay:false,
                payCount:null,
                contenPay:[],
                delistPay:[],
                conditionPay:{
                    "paypal": null,
                    "pageSize": 20,
                    "page":1
                }
            }
        },
        methods: {
            addJoomPayAnd(){
                    var condate={
                        "paypal": this.payCount,
                    }
                    this.payCount = null;
                    APICreatePaypal(condate).then(res => {
                        if(res.data.code==200){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.conditionPay.page=1
                            this.conditionPay.paypal=null
                            this.conditionPay.pageSize=20
                            this.getDatePay()
                            this.dialogPictureBjPay = false
                        }else{
                            this.$message.error(res.data.message)
                        }
                    })
            },
            editPay(index,row){
                this.disLoginPay = true
                let conId={
                    id:row.id
                }
                APIPaypalInfo(conId).then(res => {
                    if(res.data.message=="success"){
                        this.contenPay=res.data.data
                    }
                })
            },
            savePay(){
                APIUpdatePaypal(this.contenPay).then(res => {
                    if(res.data.data){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.disLoginPay = false
                        this.getDatePay()
                    }
                })
            },
            delPay(index, row){
                this.$confirm('确定删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                        .then(() => {
                            let conId={
                                id:row.id
                            }
                            APIDeletePaypal(conId).then(res => {
                                if(res.data.code==200){
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    })
                                    this.getDatePay()
                                }else{
                                   this.$message.error(res.data.message) 
                                }
                            })
                        })
                        .catch(() => {})
            },
            addJoomPay(){
                this.dialogPictureBjPay = true
            },
            viewPicPay(index, row) {
                let conId={
                    id:row.id
                }
                this.dialogPicturePay = true
                APIPaypalInfo(conId).then(res => {
                    if(res.data.message=="success"){
                        this.delistPay=res.data.data
                    }
                })
            },

            handleSizeChangePay(val) {
                this.conditionPay.pageSize = val
                this.getDatePay()
            },
            handleCurrentChangePay(val) {
                this.conditionPay.page = val
                this.getDatePay()
            },
            renderHeaderPicPay(h, { column, $index }) {
                if ($index === 0) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '30px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.conditionPay.paypal,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.conditionPay.paypal = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getDatePay()
                                        }
                                    }
                                })
                            ]
                    )
                } 
            },
            getDatePay(){
                APIPaypal(this.conditionPay).then(res => {
                    this.datePay = res.data.data.items
                    this.totalPay= res.data.data._meta.totalCount
                    this.conditionPay.pageSize = res.data.data._meta.perPage
                    this.conditionPay.page = res.data.data._meta.currentPage
                })
            },
        },
        mounted() {
            getMenu().then(response => {
                const res = response.data.data
                const menu = res.filter(e => e.name === '产品中心')
                let arr=menu[0].children
                for(let i=0;i<arr.length;i++){
                    if(arr[i].name=="基本信息"){
                        this.allMenu=arr[i].tabs
                    }
                }
            })
            this.getDatePay()
        }
    }
</script>

<style lang="scss">
    .contentt{
        margin-left: 20px;
        margin-top: 15px;
    }
    .content1{
        margin-left: 20px;
        margin-top: 20px;
    }
    .basp{
        padding: 0;
        margin: 0;
        line-height: 40px;
    }
    .cTop{
        margin-top: 0px;
    }
    .baspj{
        text-align: center;
    }
    .top20{
        margin-top: 25px;
    }
    .font14{
        font-size: 14px;
    }
    .elTable td{
        padding: 16px 0 !important;
    }
</style>
