<template>
    <section>
        <div v-show="show.management">
            <el-row>
                <el-col :span="24" style="margin-top: 15px">
                    <el-button type="primary" style="margin-left: 1%" @click="fhTemplate">发货单模板</el-button>
                    <el-button type="primary">同步采购单</el-button>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-table :data="tableData" class="elTablee" style="width: 98%;margin-left: 1%;margin-top: 10px">
                <el-table-column type="selection"
                                 fixed
                                 align="center"
                                 header-align="center"></el-table-column>
                <el-table-column label="动作"
                                 fixed
                                 header-align="center"
                                 width="85">
                    <template slot-scope="scope">
                        <el-dropdown :hide-on-click="false">
                            <span class="el-dropdown-link" style="font-size: 14px;margin-left: 10px">操作<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><span @click="mx(scope.$index, scope.row)">订单明细</span></el-dropdown-item>
                                <el-dropdown-item>编辑订单</el-dropdown-item>
                                <el-dropdown-item><span @click="synchro(scope.$index, scope.row)">同步普源数据</span></el-dropdown-item>
                                <el-dropdown-item><span @click="pay(scope.$index, scope.row)">请求付款</span></el-dropdown-item>
                                <el-dropdown-item><span @click="payMx(scope.$index, scope.row)">付款明细</span></el-dropdown-item>
                                <el-dropdown-item><span @click="delivery(scope.$index, scope.row)">发货</span></el-dropdown-item>
                                <el-dropdown-item><span @click="importWl(scope.$index, scope.row)">导入物流单号</span></el-dropdown-item>
                                <el-dropdown-item>导入发货单</el-dropdown-item>
                                <el-dropdown-item>审核单据</el-dropdown-item>
                                <el-dropdown-item>导出采购单明细</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
                <el-table-column label="采购单号"
                                 header-align="center">
                    <el-table-column prop="billNumber"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="供应商名称"
                                 header-align="center">
                    <el-table-column prop="supplierName"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="采购单状态"
                                 header-align="center">
                    <el-table-column prop="billStatus"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="线下采购"
                                 header-align="center">
                    <el-table-column prop="purchaser"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="同步时间"
                                 header-align="center">
                    <el-table-column prop="syncTime"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="总数量"
                                 header-align="center">
                    <el-table-column prop="totalNumber"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="总金额(￥)"
                                 header-align="center">
                    <el-table-column prop="amt"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="支付金额(￥)"
                                 header-align="center">
                    <el-table-column prop="paymentAmt"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="未支付金额(￥)"
                                 header-align="center">
                    <el-table-column prop="unpaidAmt"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="发货状态"
                                 header-align="center">
                    <el-table-column prop="deliveryStatus"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="物流单号"
                                 header-align="center">
                    <el-table-column prop="expressNumber"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="支付状态"
                                 header-align="center">
                    <el-table-column prop="paymentStatus"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-pagination class="toolbar"
                           background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="condition.page"
                           :page-sizes="[20, 30, 40, 50]"
                           :page-size="condition.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.total"
                           style="padding: 10px 0;padding-left: 1%;">
            </el-pagination>
            <el-dialog title="填写支付金额" :visible.sync="dialogTableVisible">
               <el-input v-model="je"></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updae()">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="填写物流单号" :visible.sync="dialogTableVisible1">
                <el-input v-model="wl" placeholder="多个单号请用逗号隔开(例如0000,1111)"></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="updae1()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { getMenu } from '../../api/login'
    import {APIPaymentList,APISupplierRrderList,APIDeliveryTemplate,APISyncQuery,APIPay,APIDelivery} from '../../api/product'
    export default {
        data() {
            return {
                loading: false,
                addVisible: false,
                editVisible: false,
                viewVisible: false,
                dialogTableVisible:false,
                dialogTableVisible1:false,
                total: null,
                activeName: '供应商订单管理',
                options4: [],
                allMenu: [],
                tableData: [],
                sels: [],
                addForm: {},
                editForm: {},
                viewForm: {},
                je:null,
                jeID:null,
                wl:null,
                wlId:null,
                options: [{
                    value: '选项1',
                    label: '同步普源数据'
                }, {
                    value: '选项2',
                    label: '导入物流单号'
                }, {
                    value: '选项3',
                    label: '导入发货单'
                }, {
                    value: '选项4',
                    label: '审核单据'
                }, {
                    value: '选项5',
                    label: '导出采购单明细'
                }],
                show: {
                    management: true,
                    product: false,
                    order: false,
                    payment: false
                },
                value: '',
                condition: {
                   "purchaser": null,
                   "billNumber": null,
                   "billStatus": null,
                   "supplierName": null,
                   "deliveryStatus": null,
                   "paymentStatus": null,
                   "expressNumber": null,
                   "amt": null,
                   "paymentAmt": null,
                   "unpaidAmt": null,
                    page: 1,
                    pageSize: 20
                }
            }
        },
        methods: {
            importWl(index,row){

            },
            delivery(index,row){
                this.wlID=row.id
                this.dialogTableVisible1=true
            },
            payMx(index,row){
                this.$router.push({
                    path: `/payment/${row.id}`
                })
            },
            pay(index,row){
                this.jeID=row.id
                this.dialogTableVisible=true
            },
            updae1(){
                let strr={
                    id:this.wlID,
                    number:this.wl
                }
                if(this.wl){
                    APIDelivery(strr).then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                message: '成功',
                                type: 'success'
                            })
                            this.dialogTableVisible1=false
                        }else {
                            this.$message.error(res.data.message)
                        }
                    })
                }else {
                    this.$message.error("请填写物流单号")
                }
            },
            updae(){
                let strr={
                    id:this.jeID,
                    number:this.je
                }
                if(this.je){
                    APIPay(strr).then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                message: '成功',
                                type: 'success'
                            })
                            this.dialogTableVisible=false
                        }else {
                            this.$message.error(res.data.message)
                        }
                    })
                }else {
                    this.$message.error("请填写金额")
                }
            },
            selsChange(sels) {
                this.sels = sels
            },
            synchro(index,row){
                let ids=[]
                ids.push(row.id)
                let str={
                    ids:ids
                }
                APISyncQuery(str).then(res => {
                    if(res.data.code==200){
                        this.$message({
                            message: '成功',
                            type: 'success'
                        })
                    }else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            fhTemplate(){
                APIDeliveryTemplate().then(res => {
                    console.log(encodeURI(res.data));
                })
            },
            mx(index, row){
                this.$router.push({
                    path: `/ord1/${row.id}`
                })
            },
            Edit(index, row){
                this.$router.push({
                    path: `/payment/${row.id}`
                })
            },
            handleClick(tab, event) {
                if (tab.label === '供应商管理') {
                    this.$router.push({
                        path: `/v1/supplier/supplier-list`
                    })
                }
                if (tab.label === '供应商产品管理') {

                }
                if (tab.label === '供应商订单管理') {
                    this.$router.push({
                        path: `/v1/supplier/gl`
                    })
                }
                if (tab.label === '付款明细') {
                    this.$router.push({
                        path: `/v1/supplier/mx`
                    })
                }
            },
            //分页
            handleCurrentChange(val) {
                this.condition.page = val
                this.getData()
            },
            handleSizeChange(val) {
                this.condition.pageSize = val
                this.getData()
            },
            //查看
            view(index, row) {
                this.viewVisible = true
                let data = {}
                data.id = row.id
                APIDetail(data).then(res => {
                    this.viewForm = res.data.data
                })
            },
            getData() {
                APISupplierRrderList(this.condition).then(res => {
                    this.tableData = res.data.data.items
                    this.condition.page = res.data.data._meta.currentPage
                    this.condition.pageSize = res.data.data._meta.perPage
                    this.total = res.data.data._meta.totalCount
                })
            },
            renderHeader(h, { column, $index }) {
                if ($index === 0) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.billNumber,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.billNumber = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 1) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.requestTime,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.requestTime = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 2) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.contactPerson1,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.contactPerson1 = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 3) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.paymentStatus,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.paymentStatus = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 4) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.comment,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.comment = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 5) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.paymentTime,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.paymentTime = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 6) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.paymentDays,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.paymentDays = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 7) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.payChannel,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.payChannel = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 8) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.payChannel,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.payChannel = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 9) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.payChannel,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.payChannel = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 10) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.payChannel,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.payChannel = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                } else if ($index === 11) {
                    return h(
                            'div',
                            {
                                style: {
                                    height: '40px'
                                }
                            },
                            [
                                h('el-input', {
                                    props: {
                                        value: this.condition.payChannel,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.payChannel = value
                                            this.$emit('input', value)
                                        },
                                        change: value => {
                                            this.getData()
                                        }
                                    }
                                })
                            ]
                    )
                }
            }
        },
        mounted() {
            getMenu().then(response => {
                const res = response.data.data
                const menu = res.filter(e => e.name === '产品中心')
                let arr=menu[0].children
                for(let i=0;i<arr.length;i++){
                    if(arr[i].name=="供应链管理"){
                        this.allMenu=arr[i].tabs
                    }
                }
            })
            this.getData()
        }
    }
</script>
<style lang="scss" scoped>
    i {
        color: #409eff;
        cursor: pointer;
    }
</style>
<style>
    .item .el-form-item__label {
        color: #99a9bf;
        margin-right: 1%;
    }
    .elTablee td{
        padding: 16px 0 !important;
    }
</style>

