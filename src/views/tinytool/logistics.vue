<template>
    <section class="toolbar">
        <el-row>
            <el-form :inline="true" :model='condition'>
                <el-form-item prop="suffix" label="账号">
                    <el-input size="small" v-model="condition.suffix" placeholder="请填写账号"></el-input>
                </el-form-item>
                <el-form-item prop="tradeId" label="订单编号">
                    <el-input size="small" v-model="condition.tradeId" placeholder="请填写订单编号"></el-input>
                </el-form-item>
                <el-form-item prop="expressName" label="物流名称">
                    <el-input size="small" v-model="condition.expressName" placeholder="请填写物流名称"></el-input>
                </el-form-item>
                <el-form-item prop="trackNo" label="跟踪号">
                    <el-input size="small" v-model="condition.trackNo" placeholder="请填写跟踪号"></el-input>
                </el-form-item>
                <el-form-item label="订单时间">
                    <el-date-picker size="small"
                                    v-model="date"
                                    @change="time"
                                    type="daterange"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="onSubmit()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-table :data="tableData1" style="width:100%" @sort-change='sortChange'>
            <el-table-column prop="suffix" label="账号" sortable='custom'></el-table-column>
            <el-table-column prop="tradeId" label="订单编号" sortable='custom'></el-table-column>
            <el-table-column prop="expressName" label="物流名称"></el-table-column>
            <el-table-column prop="trackNo" label="跟踪号"></el-table-column>
            <el-table-column prop="orderTime" label="订单时间" sortable='custom'></el-table-column>
            <el-table-column prop="lastDate" label="物流更新时间" sortable='custom'></el-table-column>
            <el-table-column prop="lastDetail" label="当前物流状态"></el-table-column>
        </el-table>
        <el-pagination background
                       @size-change="handleSizeChangePic"
                       @current-change="handleCurrentChangePic"
                       :current-page="this.condition.currentPage"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="this.condition.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="this.totalPic">
        </el-pagination>
    </section>
</template>

<script type="text/ecmascript-6">
    import {getExpressTracking  } from '../../api/profit'
    export default {
        data() {
            return {
                listLoading: false,
                tableData1: [],
                date:null,
                totalPic:null,
                condition: {
                    "pageSize": 20,
                    "currentPage": 1,
                    "suffix": null,
                    "tradeId": null,
                    "expressName": null,
                    "trackNo": null,
                    "orderTime": [],
                    "sortProperty": null,
                    "sortOrder": null
                }
            }
        },
        mounted(){
          this.onSubmit()
        },
        methods: {
            sortChange: function(column, prop, order) {
                if(column.order=="ascending"){
                    this.condition.sortOrder="ASC"
                    this.condition.sortProperty=column.prop
                    this.onSubmit1()
                }
                if(column.order=="descending"){
                    this.condition.sortOrder="DESC"
                    this.condition.sortProperty=column.prop
                    this.onSubmit1()
                }
            },
            handleSizeChangePic(val) {
                this.condition.pageSize = val
                this.onSubmit1()
            },
            handleCurrentChangePic(val) {
                this.condition.currentPage = val
                this.onSubmit1()
            },
            time() {
                if (this.date !== null) {
                    this.condition.orderTime = this.date
                } else {
                  this.condition.orderTime=[]
                }
            },
            onSubmit1() {
                getExpressTracking(this.condition).then(response => {
                    this.tableData1 = response.data.data.items
                    this.totalPic = response.data.data._meta.totalCount
                    this.condition.pageSize = response.data.data._meta.perPage
                    this.condition.currentPage = response.data.data._meta.currentPage
                })
            },
            onSubmit() {
                this.condition.currentPage=1
                this.condition.sortProperty=null
                this.condition.sortOrder=null
                getExpressTracking(this.condition).then(response => {
                    this.tableData1 = response.data.data.items
                    this.totalPic = response.data.data._meta.totalCount
                    this.condition.pageSize = response.data.data._meta.perPage
                    this.condition.currentPage = response.data.data._meta.currentPage
            })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .toolbar{
        padding: 10px;
    }
</style>


