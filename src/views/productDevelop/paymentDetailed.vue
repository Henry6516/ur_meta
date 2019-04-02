<template>
    <section>
        <div v-show="show.management">
            <el-table :data="tableData" class="elTablee" style="width: 98%;margin-left: 1%;margin-top: 10px">
                <el-table-column type="index"
                                 fixed
                                 header-align="center"
                                 width="50"></el-table-column>
                <el-table-column label="操作"
                                 fixed
                                 header-align="center"
                                 width="65">
                    <template slot-scope="scope">
                        <el-tooltip content="前往付款">
                            <i @click="Edit(scope.$index, scope.row)"
                               class="el-icon-edit" style="margin-left: 16px"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="订单编号"
                                 header-align="center">
                    <el-table-column prop="billNumber"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="请求付款时间"
                                 header-align="center">
                    <el-table-column prop="requestTime"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="请求付款金额"
                                 header-align="center">
                    <el-table-column prop="requestAmt"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="付款状态"
                                 header-align="center">
                    <el-table-column prop="paymentStatus"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="备注"
                                 header-align="center">
                    <el-table-column prop="comment"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="付款时间"
                                 header-align="center">
                    <el-table-column prop="paymentTime"
                                     :render-header="renderHeader"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="付款金额"
                                 header-align="center">
                    <el-table-column prop="paymentAmt"
                                     align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="未付金额"
                                 header-align="center">
                    <el-table-column prop="unpaidAmt"
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
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { getMenu } from '../../api/login'
    import SupplierProduct from './supplierProduct.vue'
    import {APIPaymentList} from '../../api/product'
    export default {
        components: {
            SupplierProduct
        },
        data() {
            return {
                loading: false,
                addVisible: false,
                editVisible: false,
                viewVisible: false,
                total: null,
                activeName: '付款明细',
                options4: [],
                allMenu: [],
                tableData: [],
                addForm: {},
                editForm: {},
                viewForm: {},
                show: {
                    management: true,
                    product: false,
                    order: false,
                    payment: false
                },
                condition: {
                    billNumber: null,
                    paymentStatus: null,
                    comment: null,
                    requestTime: null,
                    paymentTime: null,
                    page: 1,
                    pageSize: 20
                }
            }
        },
        methods: {
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
                APIPaymentList(this.condition).then(res => {
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

