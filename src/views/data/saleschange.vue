<template>
    <section>
        <el-table :data="tableData" @sort-change="sortNumber" style="width:100%">
            <el-table-column prop="suffix" label="账号简称" sortable align="center"></el-table-column>
            <el-table-column prop="username" label="销售员" sortable align="center"></el-table-column>
            <el-table-column prop="goodsCode" label="商品编码" sortable align="center"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="lastNum" label="上周销量" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="lastAmt" label="上周销售额" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="num" label="上上周销量" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="amt" label="上上周销售额" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="numDiff" label="销量变化" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="amtDiff" label="销售额变化" sortable="custom" align="center"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" :formatter="empty" align="center"></el-table-column>
        </el-table>
        <div class="toolbar">
            <el-pagination 
                background 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="this.condition.page" 
                :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.condition.pageSize" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="this.total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
import { getSalesChange } from '../../api/profit'
import { compareUp, compareDown } from '../../api/tools'

export default {
    data() {
        return {
            total: null,
            tableData: [],
            condition: {
                page: 1,
                pageSize: 10
            }
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        empty(row, column) {
            return row.createDate.substring(0, 10)
        },
        // 数字排序
        sortNumber(column, prop, order) {
            const data = this.tableData
            if (column.order === 'descending') {
                this.tableData = data.sort(compareDown(data, column.prop))
            } else {
                this.tableData = data.sort(compareUp(data, column.prop))
            }
        },
        handleCurrentChange(val) {
            this.condition.page = val
            this.getData()
        },
        handleSizeChange(val) {
            this.condition.pageSize = val
            this.getData()
        },
        getData() {
            getSalesChange(this.condition).then(res => {
                this.tableData = res.data.data.items
                this.condition.page = res.data.data._meta.currentPage
                this.condition.pageSize = res.data.data._meta.perPage
                this.total = res.data.data._meta.totalCount
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

