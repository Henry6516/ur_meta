<template>
    <section>
        <div v-show="show.management">
            <el-row>
                <el-col :span="24" style="margin-top: 15px">
                    <el-button type="primary" style="margin-left: 1%" @click="fhTemplate">发货单模板</el-button>
                    <el-button type="primary" @click="goPurchase">同步采购单</el-button>
                    <el-button type="primary" @click="synchroTotal">同步普源数据</el-button>
                    <el-button type="primary" @click="importWlTotal">导入物流单号</el-button>
                    <el-button type="primary">导入发货单</el-button>
                    <el-button type="primary" @click="toExamineTotal">审核单据</el-button>
                    <el-button type="primary" @click="importMxTotal">导出采购单明细</el-button>
                </el-col>
            </el-row>
            <el-table :data="tableData" class="elTablee" style="width: 98%;margin-left: 1%;margin-top: 10px" @selection-change="selsChange">
                <el-table-column type="selection"
                                 fixed
                                 align="center"
                                 header-align="center"
                                 width="65"></el-table-column>
                <el-table-column label="动作"
                                 fixed
                                 header-align="center"
                                 width="85">
                    <template slot-scope="scope">
                        <el-dropdown :hide-on-click="false">
                            <span class="el-dropdown-link" style="font-size: 14px;margin-left: 10px">操作<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><span @click="mx(scope.$index, scope.row)">订单明细</span></el-dropdown-item>
                                <!--<el-dropdown-item>编辑订单</el-dropdown-item>-->
                                <el-dropdown-item><span @click="synchro(scope.$index, scope.row)">同步普源数据</span></el-dropdown-item>
                                <el-dropdown-item><span @click="pay(scope.$index, scope.row)">请求付款</span></el-dropdown-item>
                                <el-dropdown-item><span @click="payMx(scope.$index, scope.row)">付款明细</span></el-dropdown-item>
                                <el-dropdown-item><span @click="delivery(scope.$index, scope.row)">发货</span></el-dropdown-item>
                                <el-dropdown-item><span @click="importWl(scope.$index, scope.row)">导入物流单号</span></el-dropdown-item>
                                <el-dropdown-item>导入发货单</el-dropdown-item>
                                <el-dropdown-item><span @click="toExamine(scope.$index, scope.row)">审核单据</span></el-dropdown-item>
                                <el-dropdown-item><span @click="importMx(scope.$index, scope.row)">导出采购单明细</span></el-dropdown-item>
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
    import {APIPaymentList,APISupplierRrderList,APIDeliveryTemplate,APISyncQuery,APIPay,APIDelivery,APIInputExpress,APICheck,APIExportDetail } from '../../api/product'
    export default {
        data() {
            return {
                loading: false,
                addVisible: false,
                editVisible: false,
                viewVisible: false,
                dialogTableVisible:false,
                dialogTableVisible1:false,
                dialogTableVisible2:false,
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
            goPurchase(){
                this.$router.push({
                    path: `/v1/basic-info/cgd`
                })
            },
            importMxTotal(){
                const aryMx=[]
                this.sels.map(e => aryMx.push(e.id))
                let objMx={
                    ids:aryMx
                }
                APIExportDetail(objMx).then(res => {
                    const blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel;charset=UTF-8'
                    })
                    const downloadElement = document.createElement('a')
                    const objectUrl = window.URL.createObjectURL(blob)
                    downloadElement.href = objectUrl
                    const date = new Date()
                    const year = date.getFullYear()
                    let month = date.getMonth() + 1
                    let strDate = date.getDate()
                    let hour = date.getHours()
                    let minute = date.getMinutes()
                    let second = date.getSeconds()
                    if (month >= 1 && month <= 9) {
                        month = '0' + month
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = '0' + strDate
                    }
                    if (hour >= 0 && hour <= 9) {
                        hour = '0' + hour
                    }
                    if (minute >= 0 && minute <= 9) {
                        minute = '0' + minute
                    }
                    if (second >= 0 && second <= 9) {
                        second = '0' + second
                    }
                    const filename =
                            '采购单明细' + year + month + strDate + hour + minute + second
                    downloadElement.download = filename + '.xls'
                    document.body.appendChild(downloadElement)
                    downloadElement.click()
                    document.body.removeChild(downloadElement)
                })
            },
            toExamineTotal(){
                const aryTo=[]
                this.sels.map(e => aryTo.push(e.id))
                let objTo={
                    ids:aryTo
                }
                APICheck(objTo).then(res=>{
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
            importWlTotal(){
                let aryWl=[]
                this.sels.map(e => aryWl.push(e.id))
                let strWl={
                    ids:aryWl
                }
                APIInputExpress(strWl).then(res=>{
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
            selsChange(sels) {
                this.sels = sels
            },
            synchroTotal(){
                let arySyn=[]
                this.sels.map(e => arySyn.push(e.id))
                let strSyn={
                    ids:arySyn
                }
                APISyncQuery(strSyn).then(res => {
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
            importMx(index,row){
                const aryy2=[]
                let obj2={
                    ids:aryy2
                }
                APIExportDetail(obj2).then(res => {
                    const blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel;charset=UTF-8'
                    })
                    const downloadElement = document.createElement('a')
                    const objectUrl = window.URL.createObjectURL(blob)
                    downloadElement.href = objectUrl
                    const date = new Date()
                    const year = date.getFullYear()
                    let month = date.getMonth() + 1
                    let strDate = date.getDate()
                    let hour = date.getHours()
                    let minute = date.getMinutes()
                    let second = date.getSeconds()
                    if (month >= 1 && month <= 9) {
                        month = '0' + month
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = '0' + strDate
                    }
                    if (hour >= 0 && hour <= 9) {
                        hour = '0' + hour
                    }
                    if (minute >= 0 && minute <= 9) {
                        minute = '0' + minute
                    }
                    if (second >= 0 && second <= 9) {
                        second = '0' + second
                    }
                    const filename =
                            '采购单明细' + year + month + strDate + hour + minute + second
                    downloadElement.download = filename + '.xls'
                    document.body.appendChild(downloadElement)
                    downloadElement.click()
                    document.body.removeChild(downloadElement)
                })
            },
            toExamine(index,row){
                const aryy1=[]
                let obj1={
                    ids:aryy1
                }
                APICheck(obj1).then(res=>{
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
            importWl(index,row){
                const aryy=[]
                aryy.push(row.id)
                let obj={
                    ids:aryy
                }
                APIInputExpress(obj).then(res=>{
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
                    const blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel;charset=UTF-8'
                    })
                    const downloadElement = document.createElement('a')
                    const objectUrl = window.URL.createObjectURL(blob)
                    downloadElement.href = objectUrl
                    const date = new Date()
                    const year = date.getFullYear()
                    let month = date.getMonth() + 1
                    let strDate = date.getDate()
                    let hour = date.getHours()
                    let minute = date.getMinutes()
                    let second = date.getSeconds()
                    if (month >= 1 && month <= 9) {
                        month = '0' + month
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = '0' + strDate
                    }
                    if (hour >= 0 && hour <= 9) {
                        hour = '0' + hour
                    }
                    if (minute >= 0 && minute <= 9) {
                        minute = '0' + minute
                    }
                    if (second >= 0 && second <= 9) {
                        second = '0' + second
                    }
                    const filename =
                            '发货单模板' + year + month + strDate + hour + minute + second
                    downloadElement.download = filename + '.xls'
                    document.body.appendChild(downloadElement)
                    downloadElement.click()
                    document.body.removeChild(downloadElement)
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
                                        value: this.condition.supplierName,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.supplierName = value
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
                                        value: this.condition.billStatus,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.billStatus = value
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
                                        value: this.condition.purchaser,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.purchaser = value
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
                                        value: this.condition.paymentAmt,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.paymentAmt = value
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
                                        value: this.condition.paymentAmt,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.paymentAmt = value
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
                                        value: this.condition.unpaidAmt,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.unpaidAmt = value
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
                                        value: this.condition.deliveryStatus,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.deliveryStatus = value
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
                                        value: this.condition.expressNumber,
                                        size: 'mini',
                                        clearable: true
                                    },
                                    on: {
                                        input: value => {
                                            this.condition.expressNumber = value
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

