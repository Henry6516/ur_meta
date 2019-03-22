<template>
  <section>
    <el-col :span="24"
            class="toolbar"
            style="position:fixed;bottom:0px;text-align:center;z-index:1000;padding-bottom:10px;">
      <el-button type="primary"
                 @click="update"
                 style="margin-left: 480px">更新</el-button>
      <el-dropdown @command="handleCommand"
                   placement="top-start">
        <el-button type="primary">标记完善<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">Wish</el-dropdown-item>
          <el-dropdown-item command="b">Joom</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="success">导出ibay模板</el-button>
      <el-select v-model="select"
                 placeholder="--请选择账号--">
        <el-option label="是"
                   value="是"></el-option>
        <el-option label="否"
                   value="否"></el-option>
      </el-select>
      <el-button type="info">导出Joom模板</el-button>
    </el-col>
    <h3 class="toolbar">基本信息</h3>
    <el-form :model="wishForm"
             :inline="true"
             label-width="100px"
             ref="wishForm">
      <el-row>
        <el-col :span="5">
          <el-form-item label=" ">
            <a :href="wishForm.mainImage"
               target="_blank">
              <img :src="wishForm.mainImage"
                   style="width:230px;height:150px;" />
            </a>
          </el-form-item>
        </el-col>
        <el-col :span="19">
          <el-form-item label="主图">
            <el-input v-model="wishForm.mainImage"
                      size="small"
                      style="width:1150px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="19">
          <el-form-item label="SKU">
            <el-input size="small"
                      v-model="wishForm.SKU"
                      style="width:1150px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="19">
          <el-form-item label="是否备货">
            <el-input v-model="wishForm.stockUp"
                      size="small"
                      disabled
                      style="width:1150px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in url"
              :key="index">
        <el-col :span="3">
          <div style="margin-left:80px;">附加图{{index}}</div>
          <a :href="url[index]"
             target="_blank">
            <img :src="url[index]"
                 class="image" />
          </a>
        </el-col>
        <el-col :span="21">
          <el-form-item>
            <el-input v-model="url[index]"
                      size="small"
                      style="width:1390px;"></el-input>
          </el-form-item>
        </el-col>
        <el-button size="small"
                   @click="addUrl">
          <font size="3">增加</font>
        </el-button>
        <el-button size="small"
                   @click="delUrl(index)">
          <font size="3">删除</font>
        </el-button>
        <el-button size="small"
                   @click="up(index)">
          <font size="3">上移动</font>
        </el-button>
        <el-button size="small"
                   @click="down(index)">
          <font size="3">下移动</font>
        </el-button>
      </el-row>
      <h3 class="toolbar">主信息</h3>
      <el-col :span="24">
        <el-form-item label="关键词Tags:">
          <el-input v-model="wishForm.wishTags"
                    size="small"
                    style="width:1500px;"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="最前关键词">
          <span>
            <font style="color: red">说明：</font>性别定位/多个一卖等。如Women/Men/Girl/Baby/Kids/1PC/2PC/5PC/4
            Colors/5Pcs Set…
          </span>
          <br />
          <el-input v-model="wishForm.headKeywords"
                    size="small"
                    style="width:1500px"
                    placeholder="--一个关键词--"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="必选关键词">
          <span>
            <font style="color: red">说明：</font>物品名/材质/特征等。如T-Shirt(物品名)/V-neck(特征)/Cotton(材质)
          </span>
          <el-button type="text"
                     @click="setVisible = true">批量设置</el-button>
          <div>
            必填
            <el-input v-model="wishForm.requiredKeywords"
                      size="small"
                      style="width:487px"></el-input>
            <el-input size="small"
                      style="width:487px"></el-input>
            <el-input size="small"
                      style="width:487px"></el-input>
          </div>
          <div>
            选填
            <el-input size="small"
                      style="width:487px"></el-input>
            <el-input size="small"
                      style="width:487px"></el-input>
            <el-input size="small"
                      style="width:487px"></el-input>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="随机关键词">
          <span>
            <font style="color: red">说明：</font>形容词/品类热词等。如Fashion/Elegant/Hot/DIY/Casual…
          </span>
          <el-button type="text"
                     @click="setVisible = true">批量设置</el-button>
          <div>
            必填
            <el-input v-model="wishForm.randomKeywords"
                      size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
          </div>
          <div>
            选填
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
            <el-input size="small"
                      style="width:290px"></el-input>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="最后关键词">
          <span>
            <font style="color: red">说明：</font>附加说明词。如Randomly/S-3XL/2ml/(Color: Nude)/Big Size…
          </span>
          <br />
          <el-input v-model="wishForm.tailKeywords"
                    size="small"
                    style="width: 1500px"
                    placeholder="--最多一个关键词--"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="描述">
          <el-input size="small"
                    v-model="wishForm.description"
                    type="textarea"
                    style="width:1500px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="数量">
          <el-input size="small"
                    v-model="wishForm.inventory"
                    style="width:1500px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="运输时间">
          <el-input size="small"
                    v-model="wishForm.shippingTime"
                    style="width:1500px"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <el-col :span="24">
      <h3 class="toolbar">多属性(Varations)设置</h3>
    </el-col>
    <el-button @click="dialogVisible = true"
               style="margin-left:10px;">多属性设置</el-button>
    <!-- 多属性设置对话框 -->
    <el-dialog title="多属性"
               :visible.sync="dialogVisible"
               width="80%">
      <el-table :data="tableData">
        <el-table-column type="selection"
                         width="30"
                         align="center"
                         header-align="center"></el-table-column>
        <el-table-column type="index"
                         width="50"
                         align="center"
                         header-align="center">
        </el-table-column>
        <el-table-column label="操作"
                         width="50"
                         header-align="center"
                         align="center">
          <template slot-scope="scope">
            <el-tooltip content="删除">
              <i class="el-icon-delete"
                 @click="del(scope.$index, scope.row)"
                 style="color:#409EFF;cursor:pointer;"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="SKU"
                         prop="sku"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.sku"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="颜色"
                         prop="color"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.color"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="尺寸"
                         prop="size"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.size"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量"
                         prop="inventory"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.inventory"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="价格(USD)"
                         prop="price"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="运费(USD)"
                         prop="shipping"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.shipping"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="建议零售价(USD)"
                         prop="msrp"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.msrp"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="Joom零售价(USD)"
                         prop="joomPrice"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.joomPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="Joom运费(USD)"
                         prop="joomShipping"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.joomShipping"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="运输时间"
                         prop="shippingTime"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.shippingTime"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="主图"
                         prop="linkUrl"
                         header-align="center">
          <template slot-scope="scope">
            <el-input size="small"
                      v-model="scope.row.linkUrl"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="图片"
                         prop="linkUrl"
                         header-align="center">
          <template slot-scope="scope">
            <img :src="scope.row.linkUrl"
                 style="width:50px;height:50px;">
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:5px;">
        <el-col :span="6">
          <el-input v-model="rows"
                    size="small"
                    placeholder="行数"
                    style="width:190px"></el-input>
          <el-button size="small"
                     @click="addClomun">新增行</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="num"
                    size="small"
                    placeholder="数量"
                    style="width:190px"></el-input>
          <el-button size="small"
                     @click="setNum">数量确定</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="price"
                    size="small"
                    placeholder="价格"
                    style="width:190px"></el-input>
          <el-button size="small"
                     @click="setPrice">价格确定</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="ship"
                    size="small"
                    placeholder="运费"
                    style="width:190px"></el-input>
          <el-button size="small"
                     @click="setShip">运费确定</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="advicePrice"
                    size="small"
                    placeholder="建议零售价"
                    style="width:190px"></el-input>
          <el-button size="small"
                     @click="setAdvice">建议零售价</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="joomPrice"
                    size="small"
                    placeholder="Joom零售价"
                    style="width:185px"></el-input>
          <el-button size="small"
                     @click="setJoom">Joom零售价</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="transport"
                    size="small"
                    placeholder="Joom运费"
                    style="width:185px"></el-input>
          <el-button size="small"
                     @click="setTransport">Joom运费</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="time"
                    size="small"
                    placeholder="运输时间"
                    style="width:185px"></el-input>
          <el-button size="small"
                     @click="setTime">运输时间</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 批量设置对话框 -->
    <el-dialog title="批量增加关键词"
               :visible.sync="setVisible"
               width="30%">
      <el-input type="textarea"
                placeholder="--多个必选关键词--"
                rows="16"></el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="setVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
  import { APIPlatInfo, APISaveWishInfo, APIFinishPlat } from '../../api/product'
  export default {
    props: {
      id: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        url: [],
        rows: null,
        num: null,
        price: null,
        ship: null,
        advicePrice: null,
        joomPrice: null,
        transport: null,
        time: null,
        dialogVisible: false,
        setVisible: false,
        select: '',
        wishForm: {},
        tableData: [],
        condition: {
          id: 5,
          plat: 'wish'
        }
      }
    },
    methods: {
      // 删除URL
      delUrl(index) {
        this.url.splice(index, 1)
      },
      // 删除table行
      del(index, row) {
        this.tableData.splice(index, 1)
      },
      // 增加URL
      addUrl() {
        this.url.push('')
      },
      // 上移
      up(index) {
        if (index > 0) {
          const upData = this.url[index - 1]
          this.url.splice(index - 1, 1)
          this.url.splice(index, 0, upData)
        } else {
          alert('已经是第一条，不可上移')
        }
      },
      // 下移
      down(index) {
        if (index + 1 === this.url.length) {
          alert('已经是最后一条，不可下移')
        } else {
          const downData = this.url[index + 1]
          this.url.splice(index + 1, 1)
          this.url.splice(index, 0, downData)
        }
      },
      // 增加行
      addClomun() {
        const data = {
          id: null,
          infoId: null,
          sid: null,
          sku: '',
          color: '',
          size: null,
          inventory: null,
          price: null,
          shipping: '',
          msrp: '',
          shippingTime: '',
          linkUrl: '',
          goodsSkuId: null,
          weight: null,
          joomPrice: null,
          joomShipping: null
        }
        for (let i = 0; i < this.rows; i++) {
          this.tableData.push(data)
        }
      },
      // 数量
      setNum() {
        if (this.num) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].inventory = this.num
          }
        } else {
          return false
        }
      },
      // 价格
      setPrice() {
        if (this.price) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].price = this.price
          }
        } else {
          return false
        }
      },
      // 运费
      setShip() {
        if (this.ship) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].shipping = this.ship
          }
        } else {
          return false
        }
      },
      // 建议零售价
      setAdvice() {
        if (this.advicePrice) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].msrp = this.advicePrice
          }
        } else {
          return false
        }
      },
      // joom零售价格
      setJoom() {
        if (this.joomPrice) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].joomPrice = this.joomPrice
          }
        } else {
          return false
        }
      },
      // joom运费
      setTransport() {
        if (this.transport) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].joomShipping = this.transport
          }
        } else {
          return false
        }
      },
      // 运输时间
      setTime() {
        if (this.time) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].shippingTime = this.time
          }
        } else {
          return false
        }
      },
      // 更新
      update() {
        const data = {
          basicInfo: {},
          skuInfo: []
        }
        data.basicInfo = this.wishForm
        data.basicInfo.extraImages = this.url.join('\\n')
        data.skuInfo = this.tableData
        APISaveWishInfo(data).then(res => {
          if (res.data.data[0] === 'success') {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.getData()
          } else {
            this.$message.error('保存失败')
          }
        })
      },
      // 标记
      handleCommand(command) {
        const data = {
          id: 5,
          plat: []
        }
        if (command === 'a') {
          data.plat = ['wish']
        } else {
          data.plat = ['joom']
        }
        APIFinishPlat(data).then(res => {
          if (res.data.data[0] === 'success') {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message.error('保存失败')
          }
        })
      },
      getData() {
        APIPlatInfo(this.condition).then(res => {
          this.wishForm = res.data.data.basicInfo
          this.tableData = res.data.data.skuInfo
          const extraPic = res.data.data.basicInfo.extraImages
          const picture = extraPic.split('\n')[0]
          this.url = picture.split('\\n')
          this.url.pop()
        })
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>
<style lang="scss" scoped>
  .image {
    width: 100px;
    height: 90px;
    margin-left: 80px;
  }
  h3 {
    padding: 5px;
    margin: 10px;
  }
</style>