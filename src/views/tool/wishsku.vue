<template>
  <div class="toolbar">
    <el-form :model="condition" label-width="20rem" class="demo-form-inline" :inline='true'>
      <el-form-item label="卖家账号：">
        <el-select size="small" v-model="condition.suffix" filterable clearable>
          <el-option v-for='(item,index) in type' :index='index' :key='item.ibaySuffix' :label='item.ibaySuffix' :value='item.ibaySuffix'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品编码：">
        <el-input size="small" v-model="condition.goodsCode" style="width:18.1rem"></el-input>
      </el-form-item>
      <el-form-item label="保留价(msrp$)：">
        <el-input size="small" v-model="condition.msrp" style="width:18.1rem"></el-input>
      </el-form-item>
      <el-form-item label="商品售价(Price$)：">
        <el-input size="small" v-model="condition.price" style="width:18.1rem"></el-input>
      </el-form-item>
      <el-form-item label="运费(Shipping$)：">
        <el-input size="small" v-model="condition.shipping" style="width:18.1rem"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:28.5rem">
        <el-button size="small" type="primary" @click="onSubmit()">属性设置
          <i class="el-icon-caret-right"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <div v-show="this.tableData.length>0?true:false" class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">多属性设置</h4>
        </div>
        <div class="modal-body">
          <el-form :model="condition1">
            <el-table :data="tableData" class="table table-hover" id="tb">
              <el-table-column prop="SKU" label="SKU*" width="95">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="SKUChange(scope.$index,scope.row.SKU,'0')" v-model="scope.row.SKU"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property2" label="颜色">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="variation1Change(scope.$index,scope.row.property2,'1')" v-model="scope.row.property2"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property1" label="尺寸">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="property2Change(scope.$index,scope.row.property1,'2')" v-model="scope.row.property1"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="quantity" label="数量*">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="quantityChange(scope.$index,scope.row.quantity,'3')" v-model="scope.row.quantity"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="价格(USD)*">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="priceChange(scope.$index,scope.row.price,'4')" v-model="scope.row.price"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="shipping" label="运费(USD)*">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="shippingChange(scope.$index,scope.row.shipping,'5')" v-model="scope.row.shipping"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="msrp" label="建议零售价(USD)*">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="msrpChange(scope.$index,scope.row.msrp,'6')" v-model="scope.row.msrp"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="$shippingTime" label="运输时间">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="shippingTimeChange(scope.$index,scope.row.$shippingTime,'7')" v-model="scope.row.$shippingTime"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="pic_url" label="主图" width="280">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="picChange(scope.$index,scope.row.pic_url,'8')" v-model="scope.row.pic_url"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="variation1" label="款式1">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="property1Change(scope.$index,scope.row.variation1,'9')" v-model="scope.row.variation1"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="variation2" label="款式2">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="varition2Change(scope.$index,scope.row.variation2,'10')" v-model="scope.row.variation2"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </div>
      <div class="modal-footer">
        <input type="button" @click="btnSavekkk" id="btnSavekkk" value="导出多属性表">
      </div>
      </div>
    </div>
</template>

<script>
import {
  getToolaccount,
  getwishsku,
  getwishskutemplate
} from '../../api/profit'
export default {
  data() {
    return {
      tableData: [],
      tableData1: [],
      type: [],
      condition: {
        suffix: '',
        goodsCode: '',
        price: '',
        msrp: '',
        shipping: ''
      },
      condition1: {
        setting: {
          suffix: '',
          goodsCode: '',
          price: '',
          msrp: '',
          shipping: ''
        },
        contents: {
          SKU: [],
          variation1: [],
          variation2: [],
          pic_url: [],
          property2: [],
          property1: [],
          quantity: [],
          price: [],
          msrp: [],
          shipping: [],
          shippingTime: []
        }
      }
    }
  },
  methods: {
    SKUChange(row, index) {},
    variation1Change(row, index) {},
    property2Change(row, index) {},
    quantityChange(row, index) {},
    priceChange(row, index) {},
    shippingChange(row, index) {},
    msrpChange(row, index) {},
    shippingTimeChange(row, index) {},
    picChange(row, index) {},
    property1Change(row, index) {},
    varition2Change(row, index) {},
    onSubmit() {
      getwishsku(this.condition).then(response => {
        if (response.data.data.length !== 0) {
          this.tableData = response.data.data.payload
          this.tableData1 = response.data.data.setting
        } else {
          alert('商品编码不匹配！')
          this.tableData = []
        }
      })
    },
    btnSavekkk() {
      this.condition1.setting.suffix = this.tableData1.suffix
      this.condition1.setting.goodsCode = this.tableData1.goodsCode
      this.condition1.setting.price = this.tableData1.price
      this.condition1.setting.msrp = this.tableData1.msrp
      this.condition1.setting.shipping = this.tableData1.shipping
      this.condition1.contents.SKU = this.tableData.map(e => e.SKU)
      this.condition1.contents.variation1 = this.tableData.map(
        e => e.variation1
      )
      this.condition1.contents.variation2 = this.tableData.map(
        e => e.variation2
      )
      this.condition1.contents.pic_url = this.tableData.map(e => e.pic_url)
      this.condition1.contents.property2 = this.tableData.map(e => e.property2)
      this.condition1.contents.property1 = this.tableData.map(e => e.property1)
      this.condition1.contents.quantity = this.tableData.map(e => e.quantity)
      this.condition1.contents.price = this.tableData.map(e => e.price)
      this.condition1.contents.msrp = this.tableData.map(e => e.msrp)
      this.condition1.contents.shipping = this.tableData.map(e => e.shipping)
      this.condition1.contents.shippingTime = this.tableData.map(
        e => e.$shippingTime
      )
      getwishskutemplate(this.condition1).then(response => {
        const blob = new Blob([response.data], {
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
          this.condition1.setting.goodsCode +
          '_' +
          year +
          month +
          strDate +
          hour +
          minute +
          second
        downloadElement.download = filename + '.xls'
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
      })
    }
  },
  mounted() {
    getToolaccount({ type: 'Wish' }).then(response => {
      this.type = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 10px;
}
.modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  outline: 0;
  background-clip: padding-box;
}
.modal-header {
  min-height: 1.6rem;
  padding: 1.5rem;
  border-bottom: 0.1rem solid #e5e5e5;
}
.modal-body {
  position: relative;
  padding: 2rem;
  .table {
    margin-bottom: 2rem;
    border-collapse: collapse;
    max-height: 44rem;
    overflow: auto;
  }
}
.modal-footer {
  padding: 1.9rem 2rem 2rem;
  margin-top: 1.5rem;
  text-align: right;
  border-top: 0.1rem solid #e5e5e5;
  input[type="button"] {
    cursor: pointer;
  }
}
</style>

