<template>
  <section>
    <el-col
      :span="24"
      style="position: fixed; bottom:0; z-index:999;background: #f2f2f2;padding: 15px 0; padding-top:12px; border-top: #eee solid 1px;"
    >
      <el-col :span="16" class="leftmedia">
        <el-button @click="keep()" type="primary" style="float: left;margin-right:10px">保存当前数据</el-button>
        <el-button
          style="margin-left: 0;float: left;margin-right:10px"
          type="success"
          @click="keepWs()"
        >保存并完善</el-button>
        <el-select
          placeholder="--所有账号--"
          clearable
          multiple
          collapse-tags
          v-model="accountNum"
          style="width: 250px;float: left;"
          class="selee"
        >
          <el-button plain type="info" @click="selectalld1">全选</el-button>
          <el-button plain type="info" @click="noselectd1">取消</el-button>
          <el-option
            v-for="(item, key) in accountNumber"
            :key="item.key"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <span class="exportAccount" @click="exportSmt">添加导出队列</span>
      </el-col>
    </el-col>
    <el-row>
      <el-col :span="24" style="padding: 0;margin-left: 15px">
        <h3 class="toolbar essential">基本信息</h3>
      </el-col>
      <el-form
        :model="smtForm"
        :inline="true"
        label-width="100px"
        ref="smtForm"
        style="margin-left: 15px"
      >
        <el-row>
          <el-row style="margin-top: 0px">
            <el-col :span="8" style="margin-top: 10px;">
              <el-col :span="6" style="text-align: center;margin-top: 8px" class="font13">SKU</el-col>
              <el-col :span="17">
                <el-input v-model="smtForm.sku"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-col
                :span="6"
                style="text-align: center;margin-top: 8px;color: red;"
                class="font13"
              >*刊登标题</el-col>
              <el-col :span="17">
                <el-input v-model="smtForm.itemtitle"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-col :span="6" style="text-align: center;margin-top: 8px" class="font13">商品单价</el-col>
              <el-col :span="17">
                <el-input v-model="smtForm.productPrice"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col
                :span="6"
                style="text-align: center;margin-top: 8px;color: red;"
                class="font13"
              >*数量</el-col>
              <el-col :span="17">
                <el-input v-model="smtForm.quantity"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col :span="6" style="text-align: center;margin-top: 8px" class="font13">是否打包销售</el-col>
              <el-col :span="17">
                <el-select
                  v-model="smtForm.packageType"
                  placeholder="请选择"
                  style="width:100%"
                  clearable
                >
                  <el-option v-for="item in packageType" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col :span="6" style="text-align: center;margin-top: 8px" class="font13">每包件数量</el-col>
              <el-col :span="17">
                <el-input v-model="smtForm.lotNum"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col
                :span="6"
                style="text-align: center;margin-top: 8px;color: red;"
                class="font13"
              >*商品单位</el-col>
              <el-col :span="17">
                <el-select v-model="smtForm.productunit" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in productunit"
                    :key="item"
                    :label="item"
                    :value="item"
                    clearable
                  ></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col :span="6" style="text-align: center;margin-top: 8px" class="font13">产品分组</el-col>
              <el-col :span="17">
                <el-input v-model="smtForm.groupid"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col
                :span="6"
                style="text-align: center;margin-top: 8px;color: red;"
                class="font13"
              >*商品有效天数</el-col>
              <el-col :span="17">
                <el-select
                  v-model="smtForm.wsvalidnum"
                  placeholder="请选择"
                  style="width:100%"
                  clearable
                >
                  <el-option v-for="item in wsvalidnum" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col :span="6" style="text-align: center;margin-top: 8px" class="font13">批发最小数量</el-col>
              <el-col :span="17">
                <el-input v-model="smtForm.bulkOrder"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col :span="6" style="text-align: center;margin-top: 8px" class="font13">批发折扣</el-col>
              <el-col :span="17">
                <el-input v-model="smtForm.bulkDiscount"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col
                :span="6"
                style="text-align: center;margin-top: 8px;color: red;"
                class="font13"
              >*配货时间</el-col>
              <el-col :span="17">
                <el-input v-model="smtForm.deliverytime"></el-input>
              </el-col>
            </el-col>
          </el-row>
          <el-col :span="24" style="padding: 0;margin-top:10px;">
            <h3 class="toolbar essential">图片及描述</h3>
          </el-col>
          <el-col :span="24">
            <el-col
              :span="12"
              style="margin-top: 15px;margin-bottom: 2px"
              v-for="(item,index) in url"
              :key="index"
            >
              <el-col :span="19">
                <el-col :span="24">
                  <el-input v-model="url[index]" @input="revise($event,index)"></el-input>
                </el-col>
                <el-col>
                  <p class="sx" @click="botIndex(index)">
                    <i class="el-icon-arrow-down"></i>下移动
                  </p>
                  <p class="sx" @click="topIndex(index)">
                    <i class="el-icon-arrow-up"></i>上移动
                  </p>
                  <!-- <p class="sx" @click="delDz(index)">
                <i class="el-icon-delete"></i>删除
                  </p>-->
                  <p class="ss">#{{index+1}}</p>
                </el-col>
              </el-col>
              <el-col :span="3" style="margin-left: 15px">
                <a :href="url[index]" target="_blank">
                  <img :src="url[index]" style="display: block;width: 90px;height: 90px" />
                </a>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="padding: 0;margin-top:10px;">
            <h3 class="toolbar essential">刊登细节</h3>
          </el-col>
          <el-col :span="24">
            <el-col :span="8" style="margin-top: 10px">
              <el-col :span="8" style="text-align: center;margin-top: 8px" class="font13">分类</el-col>
              <el-col :span="15">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="提示：此分类对应所有所选产品，不同类的产品请分多次操作！"
                  placement="top-start"
                >
                  <el-cascader
                    v-model="category"
                    style="width: 100%;"
                    :show-all-levels="false"
                    placeholder="选择类目"
                    :options="options"
                    clearable
                    :props="defaultPropsApp"
                    @change="handleChange"
                  ></el-cascader>
                </el-tooltip>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-col :span="8" style="text-align: center;margin-top: 8px" class="font13">商品包装长度(CM)</el-col>
              <el-col :span="15">
                <el-input v-model="smtForm.packageLength" placeholder="CM"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-col :span="8" style="text-align: center;margin-top: 8px" class="font13">商品包装宽度(CM)</el-col>
              <el-col :span="15">
                <el-input v-model="smtForm.packageWidth" placeholder="CM"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
              <el-col :span="8" style="text-align: center;margin-top: 8px" class="font13">商品包装高度(CM)</el-col>
              <el-col :span="15">
                <el-input v-model="smtForm.packageHeight" placeholder="CM"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col :span="8" style="text-align: center;margin-top: 8px" class="font13">商品毛重(KG)</el-col>
              <el-col :span="15">
                <el-input v-model="smtForm.grossWeight" placeholder="KG"></el-input>
              </el-col>
            </el-col>
            <el-col :span="8" style="margin-top: 20px">
              <el-col :span="8" style="text-align: center;margin-top: 8px" class="font13">是否自定义计重</el-col>
              <el-col :span="15">
                <el-select
                  v-model="smtForm.isPackSell"
                  placeholder="请选择"
                  style="width:100%"
                  clearable
                >
                  <el-option v-for="item in packageType" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="padding: 0;margin-top:10px;">
            <h3 class="toolbar essential">到期自动延时设置</h3>
          </el-col>
          <el-col :span="24">
            <el-col :span="8" style="margin-top: 0px">
              <el-col :span="12" style="text-align: center;margin-top: 8px" class="font13">
                <p class="smtp">listing到期是否自动延时</p>
                <p class="smtp">(延长商品的有效期到30天后)</p>
              </el-col>
              <el-col :span="12" style="margin-top:5px">
                <el-select
                  v-model="smtForm.autoDelay"
                  placeholder="请选择"
                  style="width:100%"
                  clearable
                >
                  <el-option v-for="item in packageType" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="padding: 0;margin-top:10px;">
            <h3 class="toolbar essential">多属性</h3>
          </el-col>
          <el-col :span="24">
            <el-button style="margin-left:17px;float:left" type="primary" @click="showAttribute">
              <i :class="[showattribute?'el-icon-minus':'el-icon-plus']" style="margin-right: 5px"></i>多属性设置
            </el-button>
            <el-input
              style="float:left;width:100px;margin-left:10px;"
              placeholder="替换前"
              v-model="ordColor"
            ></el-input>
            <el-input
              style="float:left;width:100px;margin-left:5px;"
              placeholder="替换后"
              v-model="newColor"
            ></el-input>
            <el-button
              type="success"
              style="float:left;width:100px;margin-left:5px;"
              @click="replaceColor"
            >替换颜色</el-button>
            <el-input
              style="float:left;width:100px;margin-left:10px;"
              placeholder="替换前"
              v-model="ordSize"
            ></el-input>
            <el-input
              style="float:left;width:100px;margin-left:5px;"
              placeholder="替换后"
              v-model="newSize"
            ></el-input>
            <el-button
              type="danger"
              style="float:left;width:100px;margin-left:5px;"
              @click="replaceSize"
            >替换尺寸</el-button>
            <el-button
              type="warning"
              style="float:left;width:100px;margin-left:10px;"
              @click="clearColor"
            >清空颜色</el-button>
            <el-button
              type="warning"
              style="float:left;width:100px;margin-left:10px;"
              @click="clearSize"
            >清空尺寸</el-button>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="tableData"
              border
              style="width:98%;margin-left:1%;margin-top:15px;"
              v-if="showattribute"
              max-height="550"
            >
              <!-- <el-table-column type="selection" width="30" align="center" header-align="center"></el-table-column> -->
              <el-table-column type="index" width="50" align="center" header-align="center" fixed></el-table-column>
              <el-table-column label="操作" width="50" header-align="center" align="center" fixed>
                <template slot-scope="scope">
                  <el-tooltip content="删除">
                    <i
                      class="el-icon-delete"
                      @click="delSku(scope.$index, scope.row)"
                      style="color:#409EFF;cursor:pointer;"
                    ></i>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                label="SKU"
                prop="sku"
                header-align="center"
                align="center"
                min-width="140"
                fixed
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.sku"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="颜色"
                prop="color"
                header-align="center"
                align="center"
                min-width="110"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.color"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="尺寸"
                prop="size"
                header-align="center"
                align="center"
                min-width="80"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.size"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                prop="quantity"
                header-align="center"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.quantity"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="重量"
                prop="weight"
                header-align="center"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.weight"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="价格(USD)"
                prop="price"
                header-align="center"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.price"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="运费(USD)"
                prop="shipping"
                header-align="center"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.shipping"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="建议零售价(USD)"
                prop="msrp"
                min-width="130"
                align="center"
                header-align="center"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.msrp"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="运输时间"
                prop="shippingTime"
                header-align="center"
                align="center"
                min-width="90"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.shippingTime"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="主图"
                prop="pic_url"
                header-align="center"
                min-width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.pic_url"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="图片" prop="pic_url" header-align="center" width="70">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.pic_url"
                    style="width:50px;height:50px;display: block;margin: auto"
                  />
                </template>
              </el-table-column>
            </el-table>
            <el-col style="margin-left:1%;" v-if="showattribute">
              <div style="width:135px;overflow:hidden;float:left;margin-top:15px;" class="rd1">
                <input
                  placeholder="行数"
                  v-model="rows"
                  class="rn1"
                  style="width:53%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
                />
                <span class="xzz" @click="addClomun">新增行</span>
              </div>
              <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
                <input
                  placeholder="数量"
                  v-model="num"
                  class="rn2"
                  style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
                />
                <span class="xzz1" @click="setNum">数量确定</span>
              </div>
              <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
                <input
                  placeholder="价格"
                  v-model="price"
                  class="rn2"
                  style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
                />
                <span class="xzz1" @click="setPrice">价格确定</span>
              </div>
              <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
                <input
                  placeholder="重量"
                  v-model="weight"
                  class="rn2"
                  style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
                />
                <span class="xzz1" @click="setWeight">重量确定</span>
              </div>
              <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
                <input
                  placeholder="运费"
                  v-model="ship"
                  class="rn2"
                  style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
                />
                <span class="xzz1" @click="setShip">运费确定</span>
              </div>
              <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
                <input
                  placeholder="建议零售价"
                  v-model="advicePrice"
                  class="rn2"
                  style="width:54%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
                />
                <span class="xzz1" @click="setAdvice">零售确定</span>
              </div>
              <div style="width:180px;overflow:hidden;float:left;margin-top:15px;" class="rd2">
                <input
                  placeholder="运输时间"
                  v-model="time"
                  class="rn2"
                  style="width:55%;float: left;border: #ccc solid 1px;border-right: none !important;border-top-left-radius: 4px;border-bottom-left-radius: 4px; line-height: 28px;text-align: center"
                />
                <span class="xzz1" @click="setTime">时间确定</span>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </section>
</template>
<script type="text/ecmascript-6">
import {
  APIPlatInfo,
  APIDeleteEbaySku,
  APISaveSmt,
  APISaveFinishPlat,
  getPlatSmtAccount,
  getPlatSmtCategory,
  APIPlatExportSmt
} from "../../api/product";
export default {
  data() {
    return {
      defaultPropsApp: {
        children: "children",
        label: "name",
        value: "id"
      },
      category: [],
      options: [],
      accountNum: [],
      accountNumber: [],
      rows: null,
      time: null,
      advicePrice: null,
      ship: null,
      weight: null,
      price: null,
      num: null,
      ordColor: null,
      newColor: null,
      ordSize: null,
      newSize: null,
      showattribute: false,
      url: [],
      tableData: [],
      condition: {
        id: 0,
        plat: "smt"
      },
      packageType: ["是", "否"],
      productunit: [
        "袋",
        "桶",
        "蒲式耳",
        "箱",
        "厘米",
        "立方米",
        "打",
        "英尺",
        "加仑",
        "克",
        "英寸",
        "千克",
        "千升",
        "千米",
        "升",
        "英吨",
        "米",
        "公吨",
        "毫克",
        "毫升",
        "毫米",
        "盎司",
        "包",
        "双",
        "件/个",
        "磅",
        "夸脱",
        "套",
        "美吨",
        "平方英尺",
        "平方英寸",
        "平方米",
        "平方码",
        "吨",
        "码"
      ],
      wsvalidnum: [14, 30],
      smtForm: {}
    };
  },
  methods: {
    handleChange(value) {},
    selectalld1() {
      var ard1 = [];
      for (const item in this.accountNumber) {
        ard1.push(this.accountNumber[item]);
      }
      this.accountNum = ard1;
    },
    noselectd1() {
      this.accountNum = [];
    },
    exportSmt() {
      if (this.accountNum.length != 0) {
        let objStr = {
          ids: [this.smtForm.infoId],
          suffix: this.accountNum,
        };
        APIPlatExportSmt(objStr).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message.error("请选择账号");
      }
    },
    delSku(index, row) {
      let aryId = {
        id: row.id,
        plat: "smt"
      };
      APIDeleteEbaySku(aryId).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.tableData.splice(index, 1);
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // 数量
    setNum() {
      if (this.num) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].quantity = this.num;
        }
      } else {
        return false;
      }
    },
    // 价格
    setPrice() {
      if (this.price) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].price = this.price;
        }
      } else {
        return false;
      }
    },
    // 运费
    setShip() {
      if (this.ship) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].shipping = this.ship;
        }
      } else {
        return false;
      }
    },
    // 建议零售价
    setAdvice() {
      if (this.advicePrice) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].msrp = this.advicePrice;
        }
      } else {
        return false;
      }
    },
    // 运输时间
    setTime() {
      if (this.time) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].shippingTime = this.time;
        }
      } else {
        return false;
      }
    },
    // 运输时间
    setWeight() {
      if (this.weight) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].weight = this.weight;
        }
      } else {
        return false;
      }
    },
    addClomun() {
      for (let i = 0; i < this.rows; i++) {
        var obj = {};
        obj.id = null;
        obj.infoId = this.smtForm.infoId;
        obj.sku = "";
        obj.color = "";
        obj.sid = "";
        obj.size = null;
        obj.quantity = null;
        obj.price = null;
        obj.shipping = "";
        obj.msrp = null;
        obj.shippingTime = "";
        obj.pic_url = "";
        obj.goodsSkuId = null;
        obj.weight = null;
        this.tableData.push(obj);
      }
    },
    clearColor() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].color = null;
      }
    },
    clearSize() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].size = null;
      }
    },
    replaceColor() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.ordColor == this.tableData[i].color) {
          this.tableData[i].color = this.newColor;
        }
      }
    },
    replaceSize() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.ordSize == this.tableData[i].size) {
          this.tableData[i].size = this.newSize;
        }
      }
    },
    showAttribute() {
      this.showattribute = !this.showattribute;
    },
    keep() {
      if (this.category.length != 0) {
        const data = {
          plat: "smt",
          basicInfo: {},
          skuInfo: []
        };
        data.basicInfo = this.smtForm;
        const url = this.url;
        for (var y = 0; y < url.length; y++) {
          data.basicInfo["imageUrl" + y] = url[y];
        }
        data.basicInfo.packageType == "是"
          ? (data.basicInfo.packageType = "1")
          : (data.basicInfo.packageType = "0");
        data.basicInfo.isPackSell == "是"
          ? (data.basicInfo.isPackSell = "1")
          : (data.basicInfo.isPackSell = "0");
        data.basicInfo.autoDelay == "是"
          ? (data.basicInfo.autoDelay = "1")
          : (data.basicInfo.autoDelay = "0");
        if (this.category.length != 0) {
          data.basicInfo.category1 = this.category[this.category.length - 1];
        } else {
          data.basicInfo.category1 = null;
        }
        data.skuInfo = this.tableData;
        APISaveSmt(data).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getData();
          } else {
            this.$message.error("保存失败");
          }
        });
      } else {
        this.$message.error("请选择分类");
      }
    },
    keepWs() {
      if (this.category.length != 0) {
        const data = {
          id: this.smtForm.infoId,
          plat: "smt",
          basicInfo: {},
          skuInfo: []
        };
        data.basicInfo = this.smtForm;
        const url = this.url;
        for (var y = 0; y < url.length; y++) {
          data.basicInfo["imageUrl" + y] = url[y];
        }
        data.basicInfo.packageType == "是"
          ? (data.basicInfo.packageType = "1")
          : (data.basicInfo.packageType = "0");
        data.basicInfo.isPackSell == "是"
          ? (data.basicInfo.isPackSell = "1")
          : (data.basicInfo.isPackSell = "0");
        data.basicInfo.autoDelay == "是"
          ? (data.basicInfo.autoDelay = "1")
          : (data.basicInfo.autoDelay = "0");
        if (this.category.length != 0) {
          data.basicInfo.category1 = this.category[this.category.length - 1];
        } else {
          data.basicInfo.category1 = null;
        }
        data.skuInfo = this.tableData;
        APISaveFinishPlat(data).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getData();
          } else {
            this.$message.error("保存失败");
          }
        });
      } else {
        this.$message.error("请选择分类");
      }
    },
    revise(e, index) {
      this.url[index] = e;
    },
    botOm(arr, index1, index2, direction) {
      if (direction == "down") {
        arr.push(arr[index1]);
        arr.splice(index1, 1);
        return arr;
      }
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    swapItems(arr, index1, index2, direction) {
      if (direction == "up") {
        // 置顶
        arr.unshift(arr[index1]);
        arr.splice(index1 + 1, 1);
        return arr;
      }
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    botIndex(index) {
      if (index == this.url.length - 1) {
        this.$message({
          message: "已经是最后一张了",
          type: "success"
        });
        return;
      }
      this.botOm(this.url, index, index + 1);
    },
    topIndex(index) {
      if (index == 0) {
        this.$message({
          message: "已经是第一张了",
          type: "success"
        });
        return;
      }
      this.swapItems(this.url, index, index - 1);
    },
    getData() {
      APIPlatInfo(this.condition).then(res => {
        this.smtForm = res.data.data.basicInfo;
        this.tableData = res.data.data.skuInfo;
        this.smtForm.packageType == "1"
          ? (this.smtForm.packageType = "是")
          : (this.smtForm.packageType = "否");
        this.smtForm.isPackSell == "1"
          ? (this.smtForm.isPackSell = "是")
          : (this.smtForm.isPackSell = "否");
        this.smtForm.autoDelay == "1"
          ? (this.smtForm.autoDelay = "是")
          : (this.smtForm.autoDelay = "否");
        //图片添加到数组
        this.url = [];
        for (let key in this.smtForm) {
          if (key.indexOf("imageUrl") > -1) {
            this.url.push(this.smtForm[key]);
          }
        }
        this.url.shift();
        if (this.smtForm.category1 != null) {
          setTimeout(() => {
            const arr = this.regroupCascaderData(
              this.smtForm.category1,
              this.options,
              "name",
              "id",
              "children"
            );
            this.category = arr["arr"];
          }, 1500);
        } else {
          this.category = [];
        }
      });
    },
    regroupCascaderData(
      id, //要寻找的唯一值
      data, // 列表总数据
      key = "name", //列表总数据 的key
      val = "id", //列表总数据 的value
      list = "children" //列表总数据 下属关系的key
    ) {
      let _allObj = {};
      const _allArr = [];
      const setData = function(data) {
        let Obj;
        for (const item of data) {
          Obj = {
            [key]: item[key],
            [val]: item[val]
          };
          if (item[val] == id) {
            Obj["isOk"] = true; //如果条件符合，接下来就不会再判断
            return Obj;
          } else if (item[list] && item[list].length) {
            Obj[list] = setData(item[list]);
            if (Obj[list] && Obj[list]["isOk"]) {
              Obj["isOk"] = true;
              return Obj;
            }
          } else {
            Obj = null;
          }
        }
        return Obj;
      };
      const getObjData = function(data) {
        // 递归向数组中填充数据
        _allArr.push(data[val]);
        if (data[list]) {
          getObjData(data[list]);
        }
      };
      _allObj = setData(data);
      getObjData(_allObj);
      return {
        Obj: _allObj,
        arr: _allArr
      };
    }
  },
  mounted() {
    this.condition.id = this.$route.params.id;
    this.getData();
    getPlatSmtAccount().then(response => {
      this.accountNumber = response.data.data;
    });
    getPlatSmtCategory().then(response => {
      this.options = response.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 40px;
}
.image {
  width: 100px;
  height: 90px;
  margin-left: 10px;
}
.essential {
  font-size: 16px;
  line-height: 45px;
  font-weight: normal;
  padding-left: 18px;
  border-left: 2px solid #2395f1;
}
.spsz {
  font-size: 15px;
  font-weight: normal;
  line-height: 40px;
  padding: 0;
  margin: 0;
  float: left;
  margin-right: 10px;
}
.textZt {
  line-height: 38px;
  text-align: center;
}
.sx {
  background: #eee;
  text-align: center;
  line-height: 34px;
  margin-left: 15px;
  margin-top: 12px;
  border-radius: 3px;
  cursor: pointer;
  width: 80px;
  float: right;
  font-size: 13px;
  border: #eee solid 1px;
}
.sx:nth-child(4) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:nth-child(3) {
  background: #fef0f0;
  color: #f56c6c;
  border: #fbc4c4 solid 1px;
}
.sx:nth-child(1) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:nth-child(2) {
  background: #ecf5ff;
  color: #409eff;
  border: #b3d8ff solid 1px;
}
.sx:hover {
  background: #409eff;
  color: #fff;
}
.sx:nth-child(3):hover {
  background: #f56c6c;
  color: #fff;
}
.ss {
  text-align: center;
  line-height: 38px;
  margin-left: 10px;
  margin-top: 12px;
  border-radius: 3px;
  cursor: pointer;
  width: 20px;
  float: left;
  color: red;
}
.adres {
  font-weight: normal;
  margin-top: 15px;
  margin-left: 5px;
}
.xzz {
  display: block;
  float: left;
  text-align: center;
  line-height: 30px;
  border: #ccc solid 1px;
  cursor: pointer;
  padding: 0 5px;
  font-size: 13px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.xzz1 {
  display: block;
  float: left;
  text-align: center;
  line-height: 30px;
  border: #ccc solid 1px;
  cursor: pointer;
  padding: 0 8px;
  font-size: 13px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.el-form-item {
  margin-bottom: 10px;
}
.exportAccount {
  display: block;
  float: left;
  border: #dcdfe6 solid 1px;
  height: 38px;
  line-height: 38px;
  border-left: none;
  background: #fff;
  padding: 0 10px;
  font-size: 13px;
  cursor: pointer;
  background: linear-gradient(to bottom, #f5f7fa 0%, #f5f7fa 45%, #d4d4d4 100%);
}
.exportAccount1 {
  display: block;
  float: left;
  border: #dcdfe6 solid 1px;
  height: 38px;
  line-height: 38px;
  border-right: none;
  background: #fff;
  padding: 0 14px;
  font-size: 13px;
  cursor: pointer;
  background: linear-gradient(to bottom, #f5f7fa 0%, #f5f7fa 45%, #d4d4d4 100%);
}
.leftmedia {
  margin-left: 22.5%;
}
@media screen and (max-width: 1600px) {
  .leftmedia {
    margin-left: 18.5%;
  }
  //  .ptom60{
  //    padding-bottom: 50px;
  //  }
  .rd1 {
    width: 105px !important;
  }
  .rn1 {
    width: 43% !important;
  }
  .rd2 {
    width: 143px !important;
  }
  .rn2 {
    width: 45% !important;
  }
  .rn3 {
    width: 42% !important;
  }
  .clshopify {
    width: 115px !important;
  }
  .top1601 {
    width: 185px !important;
  }
}
@media screen and (max-width: 1360px) {
  .font13 {
    font-size: 13px;
  }
}
@media screen and (max-width: 1350px) {
  .sx {
    background: #eee;
    text-align: center;
    line-height: 34px;
    margin-left: 15px;
    margin-top: 12px;
    border-radius: 3px;
    cursor: pointer;
    width: 60px;
    float: right;
    font-size: 13px;
    border: #eee solid 1px;
  }
}
.smtp {
  margin: 0;
}
</style>
