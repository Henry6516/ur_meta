<template>
  <div class="toolbar">
    <el-form v-model="condition" label-width="100px" class="demo-form-inline" :inline='true'>
      <el-form-item label="卖家账号：">
        <el-select size="small" v-model="condition.suffix" filterable clearable style="width:215px;">
          <el-option v-for='(item,index) in suffix' :index='index' :key='item.ebaySuffix' :label='item.ebayName' :value='item.ebayName'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="站 点：">
        <el-select size="small" v-model="condition.Site" filterable clearable style="width:215px;">
          <el-option v-for='item in site' :key='item' :value='item'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品类别：">
        <el-input size="small" v-model="condition.Cat1" style="width:106px;" placeholder="Category1"></el-input>
        <el-input size="small" v-model="condition.Cat2" style="width:106px;" placeholder="Category2"></el-input>
      </el-form-item>
      <el-form-item label="商品编码：">
        <el-input size="small" v-model="condition.goodsCode" style="width:215px;"></el-input>
      </el-form-item>
      <el-form-item label="售 价：">
        <el-input size="small" v-model="condition.price" style="width:215px;"></el-input>
      </el-form-item>
      <el-form-item label="运 费：">
        <el-input size="small" v-model="condition.shipping1" style="width:106px;" placeholder="首件运费"></el-input>
        <el-input size="small" v-model="condition.shipping2" style="width:106px;" placeholder="续件运费"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:50px;">
        <el-button size="small" type="primary" @click="onSubmit(condition)">
          属性设置
          <i class="el-icon-caret-right"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <div class="modal-dialog" v-show="this.tableData.length>0?true:false">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">多属性设置</h4>
        </div>
        <div class="modal-body">
          <el-form :model='condition1'>
            <el-table :data="tableData" class="table table-hover" id="tb">
              <el-table-column prop="SKU" label="SKU">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="SKUChange(scope.$index,scope.row.SKU,'0')" v-model="scope.row.SKU"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="quantity" label="数量">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="quantityChange(scope.$index,scope.row.quantity,'1')" v-model="scope.row.quantity"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="StartPrice" label="价格">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="priceChange(scope.$index,scope.row.StartPrice,'2')" v-model="scope.row.StartPrice"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="BmpFileName" label="图片路径" width="300">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="BmpFileNameChange(scope.$index,scope.row.BmpFileName,'3')" v-model="scope.row.BmpFileName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="pro1" label="Color">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="pro1Change(scope.$index,scope.row.pro1,'4')" v-model="scope.row.pro1"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="pro2" label="Size">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="pro2Change(scope.$index,scope.row.pro2,'5')" v-model="scope.row.pro2"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="UPC" label="UPC" width="140">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="priceChange(scope.$index,scope.row.UPC,'6')" v-model="scope.row.UPC"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="EAN" label="EAN" width="140">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="EANChange(scope.$index,scope.row.EAN,'7')" v-model="scope.row.EAN"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property1" label="款式1">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="property1Change(scope.$index,scope.row.property1,'8')" v-model="scope.row.property1"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="property2" label="款式2">
                <template slot-scope="scope">
                  <el-input size=mini @keyup.native="property2Change(scope.$index,scope.row.property2,'9')" v-model="scope.row.property2"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </div>
      <div class="modal-footer">
        <input type="button" @click="btnSavekkk(condition1)" id="btnSavekkk" value="导出多属性表">
      </div>
      </div>
    </div>
</template>

<script>
import {
  getToolaccount,
  getToolsite,
  geteBaysku,
  geteBayskutemplate
} from '../../api/profit'
export default {
  data() {
    return {
      tableData: [],
      tableData1: [],
      site: [],
      suffix: [],
      condition: {
        suffix: '',
        goodsCode: '',
        Site: '',
        Cat1: '',
        Cat2: '',
        price: '',
        shipping1: '',
        shipping2: ''
      },
      condition1: {
        setting: {
          suffix: '',
          goodsCode: '',
          Site: '',
          Cat1: '',
          Cat2: '',
          price: '',
          shipping1: '',
          shipping2: ''
        },
        contents: {
          remark: [],
          SKU: [],
          Quantity: [],
          StartPrice: [],
          PictureURL: [],
          Color: [],
          Size: [],
          pro1: [],
          pro2: [],
          EAN: [],
          UPC: []
        }
      }
    }
  },
  methods: {
    SKUChange(row, index) {},
    quantityChange(row, index) {},
    priceChange(row, index) {},
    BmpFileNameChange(row, index) {},
    pro1Change(row, index) {},
    pro2Change(row, index) {},
    EANChange(row, index) {},
    property1Change(row, index) {},
    property2Change(row, index) {},
    onSubmit() {
      geteBaysku(this.condition).then(response => {
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
      this.condition1.setting.Site = this.tableData1.Site
      this.condition1.setting.Cat1 = this.tableData1.Cat1
      this.condition1.setting.Cat2 = this.tableData1.Cat2
      this.condition1.setting.price = this.tableData1.price
      this.condition1.setting.shipping1 = this.tableData1.shipping1
      this.condition1.setting.shipping2 = this.tableData1.shipping2

      this.condition1.contents.remark = this.tableData.map(e => e.remark)
      this.condition1.contents.SKU = this.tableData.map(e => e.SKU)
      this.condition1.contents.Quantity = this.tableData.map(e => e.quantity)
      this.condition1.contents.StartPrice = this.tableData1.price
      this.condition1.contents.PictureURL = this.tableData.map(
        e => e.BmpFileName
      )
      this.condition1.contents.Color = this.tableData.map(e => e.pro1)
      this.condition1.contents.Size = this.tableData.map(e => e.pro2)
      this.condition1.contents.pro1 = this.tableData.map(e => e.property1)
      this.condition1.contents.pro2 = this.tableData.map(e => e.property2)
      this.condition1.contents.EAN = this.tableData.map(e => e.EAN)
      this.condition1.contents.UPC = this.tableData.map(e => e.UPC)
      geteBayskutemplate(this.condition1).then(response => {
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
    getToolaccount({ type: 'eBay' }).then(response => {
      this.suffix = response.data.data
    })
    getToolsite().then(response => {
      const s = response.data.data
      this.site = s.map(m => {
        return m.Name
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 10px;
}
.modal-content {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  outline: 0;
  background-clip: padding-box;
}
.modal-header {
  padding: 1rem;
  border-bottom: 0.1rem solid #e5e5e5;
}
.h4 {
  font-size: 18px;
  font-weight: 500;
}
.h5 {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.1;
}
.modal-body {
  position: relative;
  padding: 2rem;
  .table {
    margin-bottom: 2rem;
    border-collapse: collapse;
    max-height: 45rem;
    overflow: auto;
  }
}
.modal-footer {
  padding: 1.9rem 2rem 2rem;
  margin-top: 1.5rem;
  text-align: right;
  border-top: 1px solid #e5e5e5;
  input[type="button"] {
    cursor: pointer;
  }
}
</style>

