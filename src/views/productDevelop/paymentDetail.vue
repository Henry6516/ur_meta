<template>
<div class="contentBox">
  <el-row>
    <el-col :span="24">
      <el-col :span="4" class="top15">
       <el-col :span="7" class="suppliername">
         供应商名称
       </el-col>
        <el-col :span="16">
          <el-input size="small"  v-model="condition.supplierName"></el-input>
        </el-col>
      </el-col>
      <el-col :span="5" class="top15">
        <el-col :span="5" class="suppliername">
          下单时间
        </el-col>
        <el-col :span="18">
          <el-date-picker size="small"
                          v-model="date"
                          @change="time"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-col>
      <el-col :span="4" class="top15">
        <el-col :span="7" class="suppliername">
          产品编码
        </el-col>
        <el-col :span="16">
          <el-input size="small"  v-model="condition.goodsCode"></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="top15">
        <el-col :span="7" class="suppliername">
          SKU
        </el-col>
        <el-col :span="16">
          <el-input size="small" v-model="condition.sku"></el-input>
        </el-col>
      </el-col>
      <el-col :span="4" class="top15">
        <el-col :span="7" class="suppliername">
          采购单号
        </el-col>
        <el-col :span="16">
          <el-input size="small"  v-model="condition.billNumber"></el-input>
        </el-col>
      </el-col>
      <el-col :span="1">
        <a class="query" @click="query">查询</a>
      </el-col>
    </el-col>
    <el-col :span="24" class="top15">
      <el-button type="primary" @click="confirm">确定同步</el-button>
    </el-col>
    <el-col :span="24" v-show="showIS">
      <el-table
              :data="tableData"
              border
              @selection-change="selsChange"
              style="margin-top: 20px" class="elTable11">
        <el-table-column type="selection"
                         fixed
                         align="center"
                         header-align="center"></el-table-column>
        <el-table-column type="index"
                         fixed
                         align="center"
                         width="40"
                         header-align="center">
        </el-table-column>
          <el-table-column label="操作"
                           fixed
                           header-align="center"
                           width="55">
            <template slot-scope="scope">
              <el-tooltip content="查看">
                <i class="el-icon-view" style="margin-left: 2px;cursor: pointer" @click="look(scope.$index, scope.row)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        <el-table-column
                prop="billNumber"
                label="订单编号"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="supplierName"
                label="供应商名称"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="checkFlag"
                label="订单状态"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="recorder"
                label="采购员"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="makeDate"
                label="订单时间"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="delivDate"
                label="到货时间"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="orderAmount"
                label="订单数量"
                header-align="center">
        </el-table-column>
        <el-table-column
                prop="orderMoney"
                label="订单金额"
                header-align="center">
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
    </el-col>
    <el-dialog title="订单明细" :visible.sync="dialogTableVisible" width="90%">
      <el-table :data="gridData" style="width: 100%" border>
        <el-table-column prop="goodsCode" label="商品编码"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="sku" label="商品SKU码" width="100"></el-table-column>
        <el-table-column prop="class" label="规格"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="property1" label="款式1"></el-table-column>
        <el-table-column prop="property2" label="款式2"></el-table-column>
        <el-table-column prop="property3" label="款式3"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="amount" label="采购数量"></el-table-column>
        <el-table-column prop="price" label="含税单价"></el-table-column>
        <el-table-column prop="price" label="含税金额"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="taxMoney" label="税额"></el-table-column>
        <el-table-column prop="allMoney" label="金额"></el-table-column>
      </el-table>
    </el-dialog>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6">
  import { APIQuery,APIQueryDetail,APISyncQueryCon } from '../../api/product'
  export default {
    data() {
      return {
        date:null,
        orderTime:[],
        tableData:[],
        gridData:[],
        total:0,
        showIS:false,
        dialogTableVisible:false,
        condition: {
          "supplierName": null,
          "dateRange": [],
          "billNumber": null,
          "goodsCode": null,
          "sku": null,
          "page": 1,
          "pageSize": 20
        }
      }
    },
    methods:{
      look(index,row){
        let objLook={
          id:row.nid
        }
        APIQueryDetail(objLook).then(res=>{
          if(res.data.code==200){
            this.gridData=res.data.data
            this.dialogTableVisible=true
          }else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleCurrentChange(val) {
        this.condition.page = val
        this.query()
      },
      handleSizeChange(val) {
        this.condition.pageSize = val
        this.query()
      },
      query(){
          this.showIS=true
          APIQuery(this.condition).then(res=>{
            if(res.data.code==200){
              this.tableData=res.data.data.items
              this.total=res.data.data._meta.totalCount
              this.condition.page=res.data.data._meta.currentPage
              this.condition.pageSize=res.data.data._meta.perPage
          }else {
            this.$message.error(res.data.message)
          }
        })
      },
      selsChange(sels) {
        this.sels = sels
      },
      time() {
        if (this.date !== null) {
          this.orderTime = this.date
        } else {
          this.orderTime=[]
        }
      },
      confirm(){
        const aryMx=[]
        if(this.sels){
          this.sels.map(e => aryMx.push(e.nid))
          let objMx={
            ids:aryMx
          }
          APISyncQueryCon(objMx).then(res=>{
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  .contentBox{
    width: 98%;
    margin: auto;
  }
  .top15{
    margin-top: 15px;
  }
  .suppliername{
    margin-top: 6px;
    text-align: center;
  }
  .query{
    background: #409EFF;
    text-align: center;
    line-height: 31px;
    cursor: pointer;
    border-radius: 3px;
    color: #fff;
    margin-top: 15px;
    display: block;
  }
</style>


